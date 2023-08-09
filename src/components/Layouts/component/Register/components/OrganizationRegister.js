import { Col, Form, Row, Select } from "antd"
import { useState } from "react"
import FlInput from "src/components/FloatingLabel/Input"
import FlSelect from "src/components/FloatingLabel/Select"
import Notice from "src/components/Notice"
import SelectAddress from "src/components/SelectAddress"
import { getRegexEmail, getRegexMobile } from "src/lib/stringsUtils"
import AuthService from "src/services/AuthService"

const OrganizationRegister = ({ form, setLoading }) => {
  const [regionCode, setRegionCode] = useState({})
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
          OrganizationName: res1.data?.data?.name,
          ...res2?.Object,
          DistrictID: res2?.Object?.DistricID,
          BusinessAddress: res2?.Object?.Address,
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
  return (
    <Row gutter={16}>
      <Col xs={24} md={12}>
        <Form.Item
          rules={[
            {
              required: true,
              message: "Bạn chưa nhập trường này!",
            },
          ]}
          name="Identification"
        >
          <FlInput
            label="Mã số thuế"
            isRequired
            search
            enterButton={"Lấy thông tin"}
            onSearch={searchInfoByCode}
          />
        </Form.Item>
      </Col>
      <Col xs={24} md={12}>
        <Form.Item
          rules={[
            {
              required: true,
              message: "Bạn chưa nhập trường này!",
            },
          ]}
          name="OrganizationName"
        >
          <FlInput label="Tên tổ chức/doanh nghiệp" isRequired />
        </Form.Item>
      </Col>
      <Col span={24}>
        <SelectAddress
          floating={true}
          form={form}
          required={false}
          isGuest
          initValue={
            regionCode
              ? {
                  ProvinceID: regionCode?.ProvinceID,
                  DistrictID: regionCode?.DistrictID,
                  WardID: regionCode?.WardID,
                }
              : {}
          }
          listFormName={["ProvinceID", "DistrictID", "WardID"]}
        />
      </Col>
      <Col md={24}>
        <Form.Item name="Address">
          <FlInput label="Địa chỉ" />
        </Form.Item>
      </Col>
      {/* <Col xs={24} md={12}>
        <Form.Item
          rules={[
            {
              required: true,
              message: "Bạn chưa nhập trường này!",
            },
          ]}
          name="FullName"
        >
          <FlInput label="Tên người liên hệ" isRequired />
        </Form.Item>
      </Col>
      <Col xs={24} md={12}>
        <Form.Item name="Sex">
          <FlSelect style={{ width: "100%" }} label="Giới tính">
            <Select.Option value={1} key={1}>
              Nam
            </Select.Option>
            <Select.Option value={0} key={0}>
              Nữ
            </Select.Option>
          </FlSelect>
        </Form.Item>
      </Col> */}
      <Col xs={24} md={12}>
        <Form.Item
          name="PhoneNumber"
          rules={[
            { required: true, message: "Thông tin không được để trống" },
            {
              pattern: getRegexMobile(),
              message: "Số điện thoại là chuỗi từ 8 đến 15 kí tự chữ số",
            },
          ]}
        >
          <FlInput label="Số điện thoại" isRequired />
        </Form.Item>
      </Col>
      <Col xs={24} md={12}>
        <Form.Item
          name="Email"
          rules={[
            { required: true, message: "Thông tin không được để trống" },
            {
              pattern: getRegexEmail(),
              message: "Email sai định dạng",
            },
          ]}
        >
          <FlInput label="Email " isRequired />
        </Form.Item>
      </Col>
    </Row>
  )
}

export default OrganizationRegister
