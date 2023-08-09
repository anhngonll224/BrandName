import { Col, Form, Input, Row } from "antd"
import { useState, useEffect } from "react"
import CustomModal from "src/components/Modal/CustomModal"
import Button from "src/components/MyButton/Button"
import { getRegexMobile } from "src/lib/stringsUtils"
import ContactSer from "src/services/ContactSer"
import styled from "styled-components"
import Notice from "src/components/Notice"
const Styled = styled.div`
  border-radius: 8px;
  padding: 0px 16px;
  .ant-form-item {
    margin-bottom: 0px !important;
  }
`
const { TextArea } = Input

const AddQuestionModal = ({ open, onCancel, customerInfo, onOk, getList }) => {
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()
  // useEffect(() => {
  //   onSubmit()
  // }, [])
  const onSubmit = async () => {
    try {
      setLoading(true)
      const values = await form.validateFields()
      const res = await ContactSer.sendContact({
        ...values,
      })
      if (res?.isError) return
      let resUpload
      // if (values?.FileList?.length) {
      //   const formData = new FormData()
      //   formData.append("GuidID", res?.Object?.ContactID)
      //   values?.FileList?.map(img =>
      //     formData.append("InsertFileList", img?.originFileObj),
      //   )
      //   resUpload = await FileService.uploadFileList(formData)
      // }

      if (resUpload?.isError) return
      Notice({
        msg: "Gửi yêu cầu thành công ! Chúng tôi sẽ liên hệ sớm với bạn.",
      })
      form.resetFields()
      getList()
      onCancel()
    } finally {
      setLoading(false)
    }
  }
  const footer = (
    <div className="d-flex justify-content-flex-end">
      <Button loading={loading} btnType="primary" onClick={() => onSubmit()}>
        Gửi
      </Button>
    </div>
  )

  return (
    <CustomModal
      footer={footer}
      open={!!open}
      onCancel={onCancel}
      title="Chi tiết khách hàng"
    >
      <Form form={form} layout="vertical">
        <Styled>
          <Row>
            <Col md={12} xs={24} className="p-5">
              <Row gutter={[20, 8]}>
                <Col md={24} xs={24}>
                  <Form.Item
                    name="FullName"
                    label="Họ và Tên"
                    required
                    rules={[
                      {
                        required: true,
                        message: "Thông tin không được để trống!",
                      },
                    ]}
                  >
                    <Input placeholder="Họ và Tên" />
                  </Form.Item>
                </Col>
                <Col md={24} xs={24}>
                  <Form.Item
                    name="PhoneNumber"
                    label="Số điện thoại"
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
                    <Input placeholder="Số điện thoại" />
                  </Form.Item>
                </Col>

                <Col md={24} xs={24}>
                  <Form.Item
                    name="Address"
                    label="Địa chỉ"
                    rules={[
                      {
                        required: true,
                        message: "Thông tin không được để trống!",
                      },
                    ]}
                  >
                    <Input placeholder="Địa chỉ" />
                  </Form.Item>
                </Col>

                <Col md={24} xs={24}>
                  <Form.Item
                    name="Email"
                    label="Email"
                    rules={[
                      {
                        required: true,
                        message: "Thông tin không được để trống!",
                      },
                    ]}
                  >
                    <Input placeholder="Email" />
                  </Form.Item>
                </Col>

                <Col md={24} xs={24}>
                  <Form.Item
                    name="Content"
                    label="Nội dung"
                    rules={[
                      {
                        required: true,
                        message: "Thông tin không được để trống!",
                      },
                    ]}
                  >
                    <TextArea placeholder="Nội dung" rows={4} />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
            <Col md={12} xs={0} className="p-5">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d15726.35347144328!2d105.63611355295369!3d9.800853658087656!3m2!1i1024!2i768!4f13.1!5e0!3m2!1svi!2s!4v1688375230734!5m2!1svi!2s"
                width="100%"
                height="100%"
                style={{
                  border: 0,
                }}
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </Col>
          </Row>
        </Styled>
      </Form>
    </CustomModal>
  )
}

export default AddQuestionModal
