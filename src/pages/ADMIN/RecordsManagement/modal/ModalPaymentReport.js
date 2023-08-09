import { Col, Form, Row } from "antd"
import { useMemo, useState } from "react"
import CustomModal from "src/components/Modal/CustomModal"
import Button from "src/components/MyButton/Button"
import Notice from "src/components/Notice"
import { RenderTiny } from "src/components/TinyEditor"
import PaymentService from "src/services/PaymentService"
const ModalPaymentReport = ({ open, onCancel, onOk }) => {
  const [loading, setLoading] = useState()
  const [form] = Form.useForm()
  const handle = async () => {
    try {
      setLoading(true)
      const value = await form.validateFields()
      const res = await PaymentService?.reportPaymentDossier({
        DossierID: open?.DossierID,
        Reason: value?.Reason,
      })
      if (res?.isError) return
      Notice({ msg: `Báo cáo thành công!` })
      onCancel()
      onOk()
    } finally {
      setLoading(false)
    }
  }
  return (
    <CustomModal
      title={"Báo cáo lỗi thanh toán"}
      open={!!open}
      onCancel={onCancel}
      footer={
        <div className="d-flex-end">
          <Button
            loading={loading}
            btnType="primary"
            onClick={() => {
              handle()
            }}
          >
            Ghi lại
          </Button>
        </div>
      }
    >
      <Form layout="vertical" form={form}>
        <Row>
          <Col span={24}>
            <Form.Item label={"Nội dung muốn báo cáo"} name={"Reason"}>
              {useMemo(
                () => (
                  <RenderTiny defaultheight={"420px"} setLoading={setLoading} />
                ),
                [],
              )}
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </CustomModal>
  )
}

export default ModalPaymentReport
