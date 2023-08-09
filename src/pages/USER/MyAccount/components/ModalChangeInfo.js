import { Col, DatePicker, Form, Input, Row, Select } from "antd"
import dayjs from "dayjs"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import CustomModal from "src/components/Modal/CustomModal"
import Button from "src/components/MyButton/Button"
import Notice from "src/components/Notice"
import SpinCustom from "src/components/Spin"
import TinyEditor from "src/components/TinyEditor"
import { SYSTEM_KEY } from "src/constants/constants"
import STORAGE, { setStorage } from "src/lib/storage"
import { getRegexEmail, getRegexMobile } from "src/lib/stringsUtils"
import { getListComboByKey } from "src/lib/utils"
import { setUserInfo } from "src/redux/appGlobal"
import RegionService from "src/services/RegionService"
import UserService from "src/services/UserService"
const { Option } = Select

const ModalChangeInfo = ({ onOk, onCancel, open, userInfo }) => {
  const dispatch = useDispatch()
  const [form] = Form.useForm()
  const [listProvince, setListProvince] = useState()
  const [listDistrict, setListDistrict] = useState()
  const [listWard, setListWard] = useState()
  const [loading, setLoading] = useState(false)
  const { listSystemKey } = useSelector(state => state.appGlobal)

  const userStorage = JSON.parse(localStorage.getItem(STORAGE.USER_INFO))

  const getListProvinceVN = () => {
    setLoading(true)
    RegionService.getByRegionId({ regionId: 234 })
      .then(res => {
        if (res?.isError) return
        setListProvince(res?.Object)
      })
      .finally(() => setLoading(false))
  }

  const onChangeProvince = e => {
    form.resetFields([`DistrictID`, `WardID`])
    if (!e) return setListDistrict([])
    setLoading(true)
    RegionService.getByRegionId({ regionId: e })
      .then(res => {
        if (res?.isError) return
        const lstDistrict = res?.Object?.filter(i => i.ParentID === e)
        setListDistrict(lstDistrict)
      })
      .finally(() => setLoading(false))
  }

  const onChangeDistrict = e => {
    form.resetFields([`WardID`])
    if (!e) return setListWard([])
    setLoading(true)
    RegionService.getByRegionId({ regionId: e })
      .then(res => {
        if (res?.isError) return
        const lstWard = res?.Object?.filter(i => i.ParentID === e)
        setListWard(lstWard)
      })
      .finally(() => setLoading(false))
  }

  const onsubmit = async () => {
    try {
      setLoading(true)
      const values = await form.validateFields()
      const res = await UserService.changeInfor({
        ...values,
        Birthday: values?.Birthday ? values?.Birthday.format() : undefined,
        FullName: values?.FullName,
        PhoneNumber: values?.PhoneNumber,
        Email: values?.Email,
        Address: values?.Address,
        WardID: values?.WardID,
        DistrictID: values?.DistrictID,
        ProvinceID: values?.ProvinceID,
      })
      if (res?.isError) return
      let obj = {
        ...userStorage,
        FullName: values?.FullName,
        PhoneNumber: values?.PhoneNumber,
        Email: values?.Email,
        Address: values?.Address,
        WardID: values?.WardID,
        DistrictID: values?.DistrictID,
        ProvinceID: values?.ProvinceID,
      }

      setStorage(STORAGE.USER_INFO, obj)
      dispatch(setUserInfo(obj))
      onOk()
      Notice({
        msg: "Cập nhật thông tin thành công.",
      })
      onCancel()
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getListProvinceVN()
  }, [])
  useEffect(() => {
    onChangeProvince(userInfo.ProvinceID)
    onChangeDistrict(userInfo.DistrictID)
    form.setFieldsValue({
      ...userInfo,
      Birthday: !!userInfo?.Birthday ? dayjs(userInfo?.Birthday) : undefined,
      ProvinceID: !!userInfo.ProvinceID ? userInfo.ProvinceID : undefined,
      DistrictID: !!userInfo.DistrictID ? userInfo.DistrictID : undefined,
      WardID: !!userInfo.WardID ? userInfo.WardID : undefined,
      IdCard: !!userInfo.IdCard ? userInfo.IdCard : undefined,
      FullName: !!userInfo.FullName ? userInfo.FullName : undefined,
      IdCard: !!userInfo.IdCard ? userInfo.IdCard : undefined,
      Sex: !!userInfo.Sex ? userInfo.Sex : undefined,
    })
  }, [userInfo])

  const renderFooter = () => (
    <div className="d-flex justify-content-flex-end">
      <Button btnType="primary" className="btn-hover-shadow" onClick={onsubmit}>
        Ghi lại
      </Button>
    </div>
  )
  return (
    <CustomModal
      title={"Sửa thông tin tài khoản"}
      footer={renderFooter()}
      width={1024}
      open={open}
      onCancel={onCancel}
    >
      <SpinCustom spinning={loading}>
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            Username: userInfo.Username,
          }}
        >
          <Row gutter={[16, 16]}>
            <Col span={9}>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Bạn chưa nhập họ và tên đệm!",
                  },
                ]}
                label="Họ và Tên"
                name="FullName"
              >
                <Input placeholder="Nhập họ và tên đệm" />
              </Form.Item>
            </Col>
            <Col span={9}>
              <Form.Item
                // rules={[
                //   {
                //     required: true,
                //     message: "Thông tin không được để trống!",
                //   },
                // ]}
                label="CMND/CCCD hoặc Hộ chiếu"
                name="Identification"
              >
                <Input placeholder="Nhập tên" disabled />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="Sex" label="Giới tính">
                <Select placeholder="Chọn">
                  {getListComboByKey(SYSTEM_KEY?.SEX_TYPE, listSystemKey)?.map(
                    i => (
                      <Select.Option key={i?.CodeValue} value={i?.CodeValue}>
                        {i?.Description}
                      </Select.Option>
                    ),
                  )}
                </Select>
              </Form.Item>
            </Col>
            <Col span={9}>
              <Form.Item
                name="PhoneNumber"
                label="Số điện thoại"
                required
                rules={[
                  { required: true, message: "Thông tin không được để trống" },
                  {
                    pattern: getRegexMobile(),
                    message: "Số điện thoại là chuỗi từ 8 đến 15 kí tự chữ số",
                  },
                ]}
              >
                <Input placeholder="Nhập" />
              </Form.Item>
            </Col>
            <Col span={9}>
              <Form.Item
                name="Email"
                label="Email"
                rules={[
                  { required: true, message: "Thông tin không được để trống" },
                  {
                    pattern: getRegexEmail(),
                    message: "Email sai định dạng",
                  },
                ]}
              >
                <Input placeholder="Nhập" />
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item
                name="Birthday"
                label="Ngày sinh"
                rules={[
                  () => ({
                    validator(_, value) {
                      if (!!value) {
                        const today = dayjs()
                        const birthDate = value
                        let age

                        if (today?.format("MM") > birthDate?.format("MM")) {
                          // Calculate the age of the user
                          age = today.diff(birthDate, "years") - 1
                        } else if (
                          today?.format("MM") === birthDate?.format("MM") &&
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
              >
                <DatePicker placeholder="Chọn ngày sinh" format="DD/MM/YYYY" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="ProvinceID"
                rules={[
                  {
                    required: true,
                    message: "Thông tin không được để trống",
                  },
                ]}
                required
                label="Tỉnh/Thành phố"
              >
                <Select
                  showSearch
                  placeholder="--Chọn--"
                  onChange={onChangeProvince}
                  style={{ width: "100%" }}
                >
                  {listProvince?.length &&
                    listProvince?.map(i => (
                      <Option key={i.RegionID} value={i.RegionID}>
                        {i.RegionName}
                      </Option>
                    ))}
                </Select>
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                name="DistrictID"
                rules={[
                  {
                    required: true,
                    message: "Thông tin không được để trống",
                  },
                ]}
                required
                label="Quận/Huyện"
              >
                <Select
                  showSearch
                  placeholder="--Chọn--"
                  onChange={onChangeDistrict}
                  style={{ width: "100%" }}
                >
                  {listDistrict?.length &&
                    listDistrict?.map(i => (
                      <Option key={i.RegionID} value={i.RegionID}>
                        {i.RegionName}
                      </Option>
                    ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="WardID"
                rules={[
                  {
                    required: true,
                    message: "Thông tin không được để trống",
                  },
                ]}
                required
                label="Xã/Phường"
              >
                <Select
                  showSearch
                  placeholder="--Chọn--"
                  style={{ width: "100%" }}
                >
                  {listWard?.length &&
                    listWard?.map(i => (
                      <Option key={i.RegionID} value={i.RegionID}>
                        {i.RegionName}
                      </Option>
                    ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={18}>
              <Form.Item
                label="Số nhà/tổ/thôn/xóm... "
                name="Address"
                rules={[
                  {
                    required: true,
                    message: "Bạn chưa nhập Số nhà/tổ/thôn/xóm...!",
                  },
                ]}
              >
                <Input placeholder="Số nhà/tổ/thôn/xóm... " />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="Position" label="Chức vụ">
                <Input placeholder="Nhập Chức vụ" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </SpinCustom>
    </CustomModal>
  )
}

export default ModalChangeInfo
