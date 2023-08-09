import { Col, Form, Input, Row, Upload } from "antd"
import { useEffect, useState } from "react"
import Button from "src/components/MyButton/Button"
import Notice from "src/components/Notice"
import SpinCustom from "src/components/Spin"
import SvgIcon from "src/components/SvgIcon"
import { getRegexEmail, getRegexMobile } from "src/lib/stringsUtils"
import FileService from "src/services/FileService"
import GuestServices from "src/services/GuestService"
import { FormContactStyled } from "../styled"

const FormContact = () => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [topicDetail, setTopicDetail] = useState(false)
  const [listTopic, setListTopic] = useState([])

  useEffect(() => {
    getListTopic()
  }, [])

  const getListTopic = async () => {
    try {
      setLoading(true)
      // const res = await GuestService.getAllTopic()
      // if (res?.isError) return
      // setListTopic(res?.Object)
    } finally {
      setLoading(false)
    }
  }
  // product
  const onSubmit = async () => {
    try {
      setLoading(true)
      const values = await form.validateFields()
      const res = await GuestServices.sendContact({
        ...values,
        FileList: undefined,
      })
      if (res?.isError) return
      let resUpload
      if (values?.FileList?.length) {
        const formData = new FormData()
        formData.append("GuidID", res?.Object?.ContactID)
        values?.FileList?.map(img =>
          formData.append("InsertFileList", img?.originFileObj),
        )
        resUpload = await FileService.uploadFileList(formData)
      }

      if (resUpload?.isError) return
      Notice({
        msg: "Gửi yêu cầu thành công ! Chúng tôi sẽ liên hệ sớm với bạn.",
      })
      form.resetFields()
    } finally {
      setLoading(false)
    }
  }

  const normFile = e => {
    if (Array.isArray(e)) {
      return e
    }
    return e?.fileList
  }

  return (
    <FormContactStyled>
      <div className="title-type-2 mt-15">Gửi yêu cầu hỗ trợ</div>
      <div className="form-contact-box">
        <div className="note-text m-0 mb-8">
          Lưu ý những ô đánh dấu * là bắt buộc phải nhập
        </div>
        <SpinCustom spinning={loading}>
          <Form form={form} layout="vertical">
            <Row gutter={[24, 0]}>
              <Col xs={24} md={12}>
                <Form.Item
                  name="FullName"
                  label="Họ và tên"
                  required
                  rules={[
                    {
                      required: true,
                      message: "Thông tin không được để trống",
                    },
                  ]}
                >
                  <Input placeholder="Nhập họ tên" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Số điện thoại"
                  required
                  name="PhoneNumber"
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
                  <Input placeholder="Nhập số điện thoại" />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label="Địa chỉ  "
                  name="Address"
                  rules={[
                    {
                      required: true,
                      message: "Thông tin không được để trống",
                    },
                    () => ({
                      validator(_, value) {
                        if (!!(value?.length > 255)) {
                          return Promise.reject(
                            new Error("Địa chỉ tối đa 255 ký tự"),
                          )
                        }
                        return Promise.resolve()
                      },
                    }),
                  ]}
                >
                  <Input placeholder="Nhập địa chỉ (tối đa 255 ký tự) " />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label="Email"
                  name="Email"
                  required
                  rules={[
                    // {
                    //   required: true,
                    //   message: "Thông tin không được để trống",
                    // },
                    {
                      pattern: getRegexEmail(),
                      message: "Email không đúng định dạng",
                    },
                  ]}
                >
                  <Input placeholder="Nhập " />
                </Form.Item>
              </Col>

              <Col xs={24}>
                <Form.Item
                  label="Nội dung"
                  required
                  rules={[
                    {
                      required: true,
                      message: "Thông tin không được để trống",
                    },
                  ]}
                  name="Content"
                >
                  <Input.TextArea
                    style={{ minHeight: 120, overflow: "hidden auto" }}
                    placeholder="Nhập nội dung"
                  />
                </Form.Item>
              </Col>
              <Col xs={24}>
                <Form.Item
                  valuePropName="fileList"
                  name="FileList"
                  getValueFromEvent={normFile}
                  rules={[
                    () => ({
                      validator(_, value) {
                        if (!!value?.find(i => i?.size > 5 * 1024 * 1024)) {
                          return Promise.reject(
                            new Error("Dung lượng file tối đa 5MB"),
                          )
                        }
                        return Promise.resolve()
                      },
                    }),
                  ]}
                >
                  <Upload
                    multiple
                    beforeUpload={() => false}
                    className="pointer"
                  >
                    <Row gutter={10} className="align-items-center">
                      <Col>
                        <SvgIcon name="code-request" className="blue-color" />
                      </Col>
                      <Col>
                        <div className="file-upload">Đính kèm file</div>
                      </Col>
                    </Row>
                    <div className="notic-upload-file">
                      Dung lượng file tối đa 5MB
                    </div>
                  </Upload>
                </Form.Item>
              </Col>
              <Col span={24}>
                <Button
                  btnType="linear"
                  className="form-contact-submit hover-shadow"
                  onClick={onSubmit}
                >
                  Gửi
                </Button>
              </Col>
            </Row>
          </Form>
        </SpinCustom>
      </div>
    </FormContactStyled>
  )
}

export default FormContact
