import { Form, Modal, Space, Spin, Radio } from "antd"
import { useEffect, useState } from "react"
import Button from "src/components/MyButton/Button"
import UserManualService from "src/services/UserManual"
import TinyEditor from "src/components/TinyEditor"
import Notice from "src/components/Notice"
import SpinCustom from "src/components/Spin"

const UpdateUserManual = ({ visible, onCancel }) => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(true)
  const [accountType, setAccountType] = useState(1)
  const [htmlContent, setHtmlContent] = useState("")
  useEffect(() => {
    UserManualService.getUserGuide({ AccountType: accountType }).then(res => {
      if (res.isError) return
      if (!!res?.Object?.Data) {
        setHtmlContent(res?.Object?.Data)
      } else {
        setHtmlContent("")
      }
    })
  }, [accountType])

  const handleSubmit = () => {
    form
      .validateFields()
      .then(values => {
        UserManualService.updateUserGuide({
          content: htmlContent,
          type: accountType,
        }).then(res => {
          if (res.isError) return
          onCancel()
          Notice({
            msg: "Cập nhật thành công.",
          })
        })
      })
      .finally(() => setLoading(false))
  }
  return (
    <Modal
      title="Cập nhật hướng dẫn sử dụng"
      open={visible}
      onCancel={onCancel}
      footer={
        <Space>
          <Button btnType="primary" onClick={handleSubmit}>
            Lưu
          </Button>
        </Space>
      }
      width={1200}
      style={{ top: 20 }}
    >
      <SpinCustom spinning={loading}>
        <Form form={form} layout="vertical">
          <Form.Item label="Đối tượng hướng dẫn">
            <Radio.Group
              name="AccountType"
              value={accountType}
              onChange={val => setAccountType(val.target.value)}
            >
              <Radio value={2}>Cá nhân</Radio>
              <Radio value={3}>Tổ chức/doanh nghiệp</Radio>
              <Radio value={1}>Chuyên viên</Radio>
              <Radio value={4}>Lãnh đạo trung tâm</Radio>
              <Radio value={5}>Lãnh đạo cục</Radio>
              <Radio value={6}>Văn thư cục</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="Nội dung hướng dẫn">
            <TinyEditor
              onEditorChange={setHtmlContent}
              value={htmlContent}
              setLoading={setLoading}
              placeholder="Nhập nội dung"
            />
          </Form.Item>
        </Form>
      </SpinCustom>
    </Modal>
  )
}

export default UpdateUserManual
