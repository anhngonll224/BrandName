import { Col, DatePicker, Form, Input, Row, Select } from "antd"
import dayjs from "dayjs"
import moment from "moment"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import FlInput from "src/components/FloatingLabel/Input"
import CustomModal from "src/components/Modal/CustomModal"
import Button from "src/components/MyButton/Button"
import Notice from "src/components/Notice"
import SelectAddress from "src/components/SelectAddress"
import SpinCustom from "src/components/Spin"
import { SYSTEM_KEY } from "src/constants/constants"
import { getRegexEmail, getRegexMobile } from "src/lib/stringsUtils"
import { getListComboByKey } from "src/lib/utils"
import AuthService from "src/services/AuthService"
import UserService from "src/services/UserService"
import styled from "styled-components"
const { Option } = Select
const OrganStyle = styled.div`
  .ant-input-search-button,
  .ant-btn-primary:not(:disabled):hover {
    color: #fff;
    background-color: #52c41a;
    display: flex;
    align-items: center;

    span {
      transform: translateY(-2px);
    }
  }
`

const ModalInsertUpdateCustomer = ({ open, onCancel, onOk, pagination }) => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [regionCode, setRegionCode] = useState({})
  const { listSystemKey } = useSelector(state => state.appGlobal)
  const listStatus = getListComboByKey("ACCOUNT_STATUS", listSystemKey)?.map(
    i => ({ ...i, label: i?.Description, value: i?.CodeValue }),
  )

  const searchInfoByCode = async code => {
    if (!code) return
    try {
      setLoading(true)
      const res1 = await AuthService.getInfoByTaxCode(code)
      if (res1.data.code === "00") {
        const res2 = await AuthService.convertAddress({
          address: res1.data?.data?.address,
        })
        if (res2.isError) return

        setRegionCode({
          ProvinceID: res2?.Object?.ProvinceID,
          DistrictID: res2?.Object?.DistricID,
          WardID: res2?.Object?.WardID,
        })
        form.setFieldsValue({
          ...res2?.Object,
          FullName: res1.data?.data?.name,
          BusinessAddress: res2?.Object?.Address,
          Birthday: !!res2?.Object?.Birthday
            ? dayjs(res2?.Object?.Birthday)
            : undefined,
        })
      } else {
        Notice({
          isSuccess: false,
          msg: res1.data.desc,
        })
      }
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    if (open?.UserID) {
      setRegionCode({
        ProvinceID: !!open?.ProvinceID ? open?.ProvinceID : undefined,
        DistrictID: !!open?.DistrictID ? open?.DistrictID : undefined,
        WardID: !!open?.WardID ? open?.WardID : undefined,
      })
      form.setFieldsValue({
        ...open,
        Birthday: !!open?.Birthday ? dayjs(open?.Birthday) : undefined,
      })
    }
  }, [open])
  const onSubmit = async () => {
    try {
      setLoading(true)
      const values = await form?.validateFields()
      const res = await UserService[
        pagination?.AccountType === 2
          ? open?.UserID
            ? "updateGuest"
            : "InsertGuest"
          : open?.UserID
          ? "updateCompany"
          : "insertCompany"
      ]({
        ...values,
        AccountType: pagination?.AccountType,
        UserID: !!open?.UserID ? open?.UserID : undefined,
        Status: !!values?.Status ? values?.Status : 1,
        Birthday: values?.Birthday?.format("YYYY-MM-DD"),
        IdentificationDateRange: moment(
          values?.IdentificationDateRange,
        )?.format("YYYY-MM-DD"),
      })

      if (res?.isError) return
      Notice({
        msg: open?.UserID
          ? `Cập nhật thông tin khách hàng thành công!`
          : `Thêm khách hàng mới thành công!`,
      })
      onOk && onOk()
      onCancel()
    } finally {
      setLoading(false)
    }
  }

  const renderFooter = (
    <div className="d-flex justify-content-flex-end">
      <Button
        btnType="primary"
        className="btn-hover-shadow"
        disabled={loading}
        onClick={onSubmit}
      >
        Ghi lại
      </Button>
    </div>
  )

  return (
    <CustomModal
      title={
        pagination.AccountType === 2
          ? open?.UserID
            ? `Cập nhật thông tin khách hàng `
            : `Thêm khách hàng mới`
          : open?.UserID
          ? `Cập nhật thông tin doanh nghiệp `
          : `Thêm doanh nghiệp`
      }
      open={!!open}
      onCancel={onCancel}
      footer={renderFooter}
    >
      <SpinCustom spinning={loading}>
        <OrganStyle>
          <Form form={form} layout="vertical">
            <Row gutter={16}>
              {pagination?.AccountType !== 2 ? (
                <Col span={12}>
                  <Form.Item
                    label="Mã số thuế"
                    required
                    rules={[
                      {
                        required: true,
                        message: "Bạn chưa nhập trường này!",
                      },
                    ]}
                    name="TaxCode"
                  >
                    <FlInput
                      placeholder="Mã số thuế"
                      isRequired
                      search
                      enterButton={"Lấy thông tin"}
                      onSearch={searchInfoByCode}
                    />
                  </Form.Item>
                </Col>
              ) : (
                <></>
              )}
              <Col span={12}>
                <Form.Item
                  name="FullName"
                  label={
                    pagination?.AccountType === 2
                      ? "Tên khách hàng"
                      : "Tên tổ chức/doanh nghiệp"
                  }
                  required
                  rules={[
                    {
                      required: true,
                      message: "Thông tin không được để trống",
                    },
                  ]}
                >
                  <Input
                    placeholder={
                      pagination?.AccountType === 2
                        ? "Nhập tên khách hàng"
                        : "Nhập tên tổ chức/doanh nghiệp"
                    }
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="PhoneNumber"
                  label="Số điện thoại"
                  required
                  rules={[
                    {
                      required: true,
                      message: "Thông tin không được để trống",
                    },
                    {
                      pattern: getRegexMobile(),
                      message:
                        "Số điện thoại là chuỗi từ 8 đến 15 kí tự chữ số",
                    },
                  ]}
                >
                  <Input placeholder="Nhập Số điện thoại" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="Email"
                  label="Email"
                  rules={[
                    {
                      required: true,
                      message: "Thông tin không được để trống",
                    },
                    {
                      pattern: getRegexEmail(),
                      message: "Email sai định dạng",
                    },
                  ]}
                >
                  <Input placeholder="Nhập Email" />
                </Form.Item>
              </Col>
              {pagination?.AccountType === 2 ? (
                <>
                  <Col span={6}>
                    <Form.Item label="Giới tính" name="Sex">
                      <Select placeholder="Chọn" allowClear>
                        {getListComboByKey(
                          SYSTEM_KEY?.SEX_TYPE,
                          listSystemKey,
                        )?.map(i => (
                          <Option key={+i?.CodeValue} value={+i?.CodeValue}>
                            {i?.Description}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item
                      label="Ngày sinh"
                      name="Birthday"
                      rules={[
                        () => ({
                          validator(_, value) {
                            if (!!value) {
                              const today = dayjs()
                              const birthDate = value
                              let age

                              if (
                                today?.format("MM") > birthDate?.format("MM")
                              ) {
                                // Calculate the age of the user
                                age = today.diff(birthDate, "years") - 1
                              } else if (
                                today?.format("MM") ===
                                  birthDate?.format("MM") &&
                                today?.format("DD") > birthDate?.format("DD")
                              ) {
                                age = today.diff(birthDate, "years") - 1
                              } else {
                                age = today.diff(birthDate, "years")
                              }

                              // Check if the age is 14 or more
                              if (age < 14) {
                                // The user is over 14 years old
                                return Promise.reject(
                                  new Error("Ngày sinh chưa đủ 14 tuổi"),
                                )
                              } else {
                                // The user is under 14 years old
                                return Promise.resolve()
                              }
                            }
                            return Promise.resolve()
                          },
                        }),
                      ]}
                      style={{
                        paddingBottom: "5px",
                      }}
                    >
                      <DatePicker
                        style={{
                          // paddingTop: "25px",
                          // display: "flex",
                          // alignItems: "center",
                          paddingBottom: "5px",
                        }}
                        placeholder="Chọn"
                        format="DD/MM/YYYY"
                        allowClear
                      />
                    </Form.Item>
                  </Col>
                </>
              ) : (
                <></>
              )}

              {!!open?.UserID && (
                <Col span={12}>
                  <Form.Item
                    label="Trạng thái"
                    name="Status"
                    required
                    rules={[
                      {
                        required: true,
                        message: "Thông tin không được để trống",
                      },
                    ]}
                  >
                    <Select
                      placeholder="Chọn trạng thái"
                      options={listStatus}
                    />
                  </Form.Item>
                </Col>
              )}

              <Col span={!!open?.UserID ? 12 : 24}>
                <div className="mb-8">
                  <b>Chọn</b>
                </div>
                <SelectAddress
                  floating={true}
                  form={form}
                  required={false}
                  isGuest
                  listFormName={["ProvinceID", "DistrictID", "WardID"]}
                  initValue={
                    {
                      ProvinceID: regionCode?.ProvinceID,
                      DistrictID: regionCode?.DistrictID,
                      WardID: regionCode?.WardID,
                    } || {}
                  }
                />
              </Col>
              <Col
                span={!!open?.UserID || pagination?.AccountType === 3 ? 24 : 12}
              >
                <Form.Item
                  name="Address"
                  label="Địa chỉ"
                  // rules={[
                  //   {
                  //     required: true,
                  //     message: "Thông tin không được để trống",
                  //   },
                  // ]}
                >
                  <Input placeholder="Nhập Số nhà/tổ/thôn/xóm..." />
                </Form.Item>
              </Col>
              {/* Nhập căn cước */}
              {open?.UserID || pagination?.AccountType === 3 ? (
                ` `
              ) : (
                <>
                  <Col span={12}>
                    <Form.Item
                      label="CMT/CCCD"
                      required
                      rules={[
                        {
                          required: true,
                          message: "Bạn chưa nhập trường này!",
                        },
                      ]}
                      name="Identification"
                    >
                      <Input placeholder="CMT/CCCD" isRequired />
                    </Form.Item>
                  </Col>
                  {/* <Col span={8}>
                  <Form.Item
                    label="Ngày cấp"
                    required
                    rules={[
                      {
                        required: true,
                        message: "Bạn chưa nhập trường này!",
                      },
                    ]}
                    name="IdentificationDateRange"
                    style={{ width: "100%" }}
                  >
                    <FlDatePicker format="DD/MM/YYYY" placeholder="Nhập ngày" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="Nơi cấp CMT/CCCD"
                    required
                    rules={[
                      {
                        required: true,
                        message: "Bạn chưa nhập trường này!",
                      },
                    ]}
                    name="IdentificationIssuedBy"
                  >
                    <Input placeholder="Nơi cấp" isRequired />
                  </Form.Item>
                </Col> */}
                </>
              )}
            </Row>
          </Form>
        </OrganStyle>
      </SpinCustom>
    </CustomModal>
  )
}

export default ModalInsertUpdateCustomer
