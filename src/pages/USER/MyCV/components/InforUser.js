import { Col, DatePicker, Form, Input, Radio, Row } from "antd"
import { useSelector } from "react-redux"
import ButtonCircle from "src/components/MyButton/ButtonCircle"
import { SYSTEM_KEY } from "src/constants/constants"
import { getRegexEmail, getRegexMobile } from "src/lib/stringsUtils"
import { getListComboByKey } from "src/lib/utils"
import dayjs from "dayjs"
const InforUser = ({ isCopy, form, isPersonal, fieldCCCD, IsAdditional }) => {
  const { listSystemKey } = useSelector(state => state.appGlobal)
  const copy = async () => {
    const values = await form.getFieldsValue()
    if (!!isPersonal) {
      if (!!isCopy) {
        form.setFieldsValue({
          ManagerName: values?.RegisterName,
          ManagerIdentify: values?.RegisterIdentify,
          ManagerPhone: values?.RegisterPhone,
          ManagerFax: values?.RegisterFax,
          ManagerEmail: values?.RegisterEmail,
          ManagerAddress: values?.RegisterAddress,

          ManagerBirthDay: fieldCCCD?.RegisterBirthDay
            ? fieldCCCD?.RegisterBirthDay
            : undefined,
          ManagerGender: fieldCCCD?.RegisterGender,
          ManagerPosition: fieldCCCD?.RegisterPosition,
        })
      } else
        form.setFieldsValue({
          RepresentativeName: values?.ManagerName,
          RepresentativeIdentify: values?.ManagerIdentify,
          RepresentativePhone: values?.ManagerPhone,
          RepresentativeFax: values?.ManagerFax,
          RepresentativeEmail: values?.ManagerEmail,
          RepresentativeAddress: values?.ManagerAddress,

          RepresentativeBirthDay: values?.ManagerBirthDay
            ? values?.ManagerBirthDay
            : undefined,
          RepresentativeGender: values?.ManagerGender,
          RepresentativePosition: values?.ManagerPosition,
        })
    } else {
      if (!!isCopy) {
        form.setFieldsValue({
          // ManagerName: values?.RegisterName,
          // ManagerIdentify: values?.RegisterIdentify,
          ManagerPhone: values?.RegisterPhone,
          ManagerFax: values?.RegisterFax,
          ManagerEmail: values?.RegisterEmail,
          ManagerAddress: values?.RegisterAddress,

          ManagerBirthDay: fieldCCCD?.RegisterBirthDay
            ? fieldCCCD?.RegisterBirthDay
            : undefined,
          ManagerGender: fieldCCCD?.RegisterGender,
          ManagerPosition: fieldCCCD?.RegisterPosition,
        })
      } else
        form.setFieldsValue({
          RepresentativeName: values?.ManagerName,
          RepresentativeIdentify: values?.ManagerIdentify,
          RepresentativePhone: values?.ManagerPhone,
          RepresentativeFax: values?.ManagerFax,
          RepresentativeEmail: values?.ManagerEmail,
          RepresentativeAddress: values?.ManagerAddress,

          RepresentativeBirthDay: values?.ManagerBirthDay
            ? values?.ManagerBirthDay
            : undefined,
          RepresentativeGender: values?.ManagerGender,
          RepresentativePosition: values?.ManagerPosition,
        })
    }
  }
  return (
    <div className="box-infor relative ">
      <Row gutter={[16, 0]}>
        <Col span={24}>
          <div className="text-header">
            {!!isCopy
              ? "8. Người quản lý tên định danh (phải là cá nhân)"
              : "9. Người đại diện làm thủ tục (phải là cá nhân)"}
          </div>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Họ và tên"
            name={!!isCopy ? "ManagerName" : "RepresentativeName"}
            required
            rules={[
              {
                required: true,
                message: "Thông tin không được để trống!",
              },
            ]}
          >
            <Input placeholder="Nhập" disabled={!!IsAdditional} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="CMND//CCCD hoặc Hộ chiếu "
            name={!!isCopy ? "ManagerIdentify" : "RepresentativeIdentify"}
            required
            // disabled={true}
            rules={[
              {
                required: true,
                message: "Thông tin không được để trống!",
              },
            ]}
          >
            <Input placeholder="Nhập" disabled={!!IsAdditional} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Ngày tháng năm sinh"
            name={!!isCopy ? "ManagerBirthDay" : "RepresentativeBirthDay"}
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
            <DatePicker
              placeholder="Chọn ngày"
              format={"DD/MM/YYYY"}
              disabled={!!IsAdditional}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Giới tính"
            name={!!isCopy ? "ManagerGender" : "RepresentativeGender"}
            required
            rules={[
              {
                required: true,
                message: "Thông tin không được để trống!",
              },
            ]}
          >
            <Radio.Group>
              {getListComboByKey(SYSTEM_KEY?.SEX_TYPE, listSystemKey)?.map(
                i => (
                  <Radio
                    disabled={!!IsAdditional}
                    key={`${
                      !!isCopy ? "ManagerGender" : "RepresentativeGender"
                    }sex${+i?.CodeValue}`}
                    value={+i?.CodeValue}
                  >
                    {i?.Description}
                  </Radio>
                ),
              )}
            </Radio.Group>
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            label="Chức vụ"
            name={!!isCopy ? "ManagerPosition" : "RepresentativePosition"}
            required
            rules={[
              {
                required: true,
                message: "Thông tin không được để trống!",
              },
            ]}
          >
            <Input placeholder="Nhập" disabled={!!IsAdditional} />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            label="Số điện thoại "
            name={!!isCopy ? "ManagerPhone" : "RepresentativePhone"}
            required
            rules={[
              {
                required: true,
                message: "Thông tin không được để trống!",
              },
              {
                pattern: getRegexMobile(),
                message: "Số điện thoại là chuỗi từ 8 đến 15 kí tự chữ số",
              },
            ]}
          >
            <Input placeholder="Nhập" disabled={!!IsAdditional} />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            label="Fax"
            rules={[
              {
                pattern: getRegexMobile(),
                message: "Số điện thoại là chuỗi từ 8 đến 15 kí tự chữ số",
              },
            ]}
            name={!!isCopy ? "ManagerFax" : "RepresentativeFax"}
          >
            <Input placeholder="Nhập" disabled={!!IsAdditional} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Email"
            name={!!isCopy ? "ManagerEmail" : "RepresentativeEmail"}
            required
            rules={[
              {
                required: true,
                message: "Thông tin không được để trống!",
              },
              {
                pattern: getRegexEmail(),
                message: "Email nhập sai định dạng!",
              },
            ]}
          >
            <Input placeholder="Nhập" disabled={!!IsAdditional} />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item
            label="Địa chỉ"
            name={!!isCopy ? "ManagerAddress" : "RepresentativeAddress"}
            required
            rules={[
              {
                required: true,
                message: "Thông tin không được để trống!",
              },
            ]}
          >
            <Input placeholder="Nhập" disabled={!!IsAdditional} />
          </Form.Item>
        </Col>
      </Row>
      <div className="copy-btn">
        <ButtonCircle
          disabled={!!IsAdditional}
          title={
            !isCopy
              ? "Bấm vào để coppy thông tin nếu người quản lý và người đại diện làm thủ tục là một"
              : "Bấm vào để coppy thông tin từ mục 7"
          }
          iconName="copy-black"
          style={{
            background: "rgba(46, 75, 102, 0.15)",
            boxShadow: "0px 2px 4px rgba(208, 206, 187, 0.5)",
          }}
          onClick={copy}
        />
      </div>
    </div>
  )
}

export default InforUser
