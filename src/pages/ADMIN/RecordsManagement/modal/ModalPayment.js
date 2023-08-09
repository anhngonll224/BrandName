import { Col, Image, Row } from "antd"
import { useEffect } from "react"
import { useState } from "react"
import CustomModal from "src/components/Modal/CustomModal"
import Button from "src/components/MyButton/Button"
import Notice from "src/components/Notice"
import Payment from "src/pages/USER/payment"
import PaymentService from "src/services/PaymentService"
const ModalPayment = ({ open, onCancel, onOk, columns }) => {
  const [loading, setLoading] = useState()
  const [data, setData] = useState()

  const handle = async () => {
    try {
      setLoading(true)
      const res = await PaymentService?.paymentDossier(open?.DossierID)
      if (res?.isError) return
      Notice({ msg: `Nộp lệ phí thành công!` })
      onCancel()
      onOk()
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    if (!!open?.DossierID) getQr()
  }, [open?.DossierID])

  const getQr = async () => {
    try {
      setLoading(true)
      const res = await PaymentService?.getPaymentDossier(open?.DossierID)
      if (res?.isError) return
      setData(res?.Object)
    } finally {
      setLoading(false)
    }
  }

  return (
    <CustomModal
      title={"Nộp lệ phí"}
      open={!!open}
      onCancel={onCancel}
      width="40vw"
      footer={
        <div className="d-flex-end">
          {/* <Button
            loading={loading}
            btnType="primary"
            onClick={() => {
              handle()
            }}
          >
            Nộp lệ phí
          </Button> */}

          <Button
            loading={loading}
            btnType="primary"
            onClick={() => {
              onCancel()
            }}
          >
            Đóng
          </Button>
        </div>
      }
    >
      <Row gutter={[16, 4]}>
        <Col span={24}>
          <div className="d-flex-center" style={{ flexDirection: "column" }}>
            <Image src={data?.QR} width={"25vw"} />
          </div>
          {/* <Payment /> */}
        </Col>

        <Col span={12}>
          <div className="d-flex-end" style={{ color: "#154398" }}>
            STK:
          </div>
        </Col>
        <Col span={12}>
          <div className="d-flex-start" style={{ color: "#154398" }}>
            <b>{data?.STK}</b>
          </div>
        </Col>

        <Col span={12}>
          <div className="d-flex-end" style={{ color: "#154398" }}>
            Ngân hàng:
          </div>
        </Col>
        <Col span={12}>
          <div className="d-flex-start" style={{ color: "#154398" }}>
            <b>{data?.BankingName}</b>
          </div>
        </Col>
        <Col span={12}>
          <div className="d-flex-end" style={{ color: "#154398" }}>
            Tên chủ tài khoản:
          </div>
        </Col>

        <Col span={12}>
          <div className="d-flex-start" style={{ color: "#154398" }}>
            <b> {data?.PReceive}</b>
          </div>
        </Col>

        <Col span={12}>
          <div className="d-flex-end" style={{ color: "#154398" }}>
            Nội dung chuyển khoản:
          </div>
        </Col>
        <Col span={12}>
          <div className="d-flex-start" style={{ color: "#154398" }}>
            <b>{data?.Content}</b>
          </div>
        </Col>
        <Col span={24}>
          <b>Lưu ý: </b>{" "}
          <i>
            Sau khi chuyển khoản thành công, vui lòng chờ trong giây lát chúng
            tôi sẽ phản hồi lại. Chân thành cảm ơn!!!
          </i>
        </Col>
      </Row>
    </CustomModal>
  )
}

export default ModalPayment
