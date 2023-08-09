import { Col, Form, Row } from "antd"
import { useMemo, useState } from "react"
import CustomModal from "src/components/Modal/CustomModal"
import Button from "src/components/MyButton/Button"
import Notice from "src/components/Notice"
import { RenderTiny } from "src/components/TinyEditor"
const ModelRessonDossier = ({ open, onCancel, onOk }) => {
  const [loading, setLoading] = useState()
  const [form] = Form.useForm()
  const handle = async () => {
    try {
      setLoading(true)
      const value = await form.validateFields()
      const res = await open?.requestHandle({
        DossierID: open?.DossierID,
        ...value,
      })
      if (res?.isError) return
      Notice({ msg: `${open?.title} thành công!` })
      onCancel()
      onOk()
    } finally {
      setLoading(false)
    }
  }
  return (
    <CustomModal
      title={open?.title}
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
            <Form.Item label={open?.titleItem} name={open?.nameItem}>
              {useMemo(
                () => (
                  <RenderTiny isSimple setLoading={setLoading} />
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

export default ModelRessonDossier
