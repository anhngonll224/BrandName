import { Col, Form, Row } from "antd"
import { useEffect, useState } from "react"
import CB2 from "src/components/Modal/CB2"
import CustomModal from "src/components/Modal/CustomModal"
import Button from "src/components/MyButton/Button"
import Notice from "src/components/Notice"
import PaymentService from "src/services/PaymentService"
import styled from "styled-components"
const ModalComplainStyle = styled.div`
  .box-complain {
    background: #0000000d;
    border-radius: 8px;
    /* box-shadow: 1px 4px 10px rgba(0, 0, 0, 0.3); */
    padding: 20px;
  }
`
const ModalComplain = ({ open, onCancel, onOk }) => {
  const [loading, setLoading] = useState()
  const [detail, setDetail] = useState()
  const [form2] = Form.useForm()
  const handle = async () => {
    try {
      setLoading(true)
      const res = await PaymentService?.acceptPaymentDossier(open?.DossierID)
      if (res?.isError) return
      Notice({ msg: `Cập nhật thành công!` })
      onCancel()
      onOk()
    } finally {
      setLoading(false)
    }
  }
  const handle2 = async () => {
    CB2({
      title: `Từ chối`,
      icon: "warning-usb2",
      nameFormItem: "Reason",
      okText: "Từ chối",
      titleFormItem: "Vui lòng nhập lý do từ chối thanh toán ",
      formCB2: form2,
      onOk: async close => {
        try {
          setLoading(true)
          const res = await PaymentService?.refusePaymentDossier(
            open?.DossierID,
          )
          if (res?.isError) return
          Notice({ msg: `Cập nhật thành công!` })
          onCancel()
          onOk()
          form2.setFieldsValue({ Reason: undefined })
        } finally {
          setLoading(false)
        }
        close()
      },
      onCancel() {
        form2.setFieldsValue({ Reason: undefined })
      },
    })
  }

  const getDetail = async isPay => {
    try {
      const res = await PaymentService.getDetailPaymentDossier(open?.DossierID)
      if (res?.isError) return
      setDetail(res?.Object?.Data)
    } finally {
    }
  }
  useEffect(() => {
    getDetail()
  }, [open])

  return (
    <CustomModal
      title={"Chi tiết khiếu nại"}
      open={!!open}
      onCancel={onCancel}
      footer={
        <div className="d-flex-end">
          <Button
            loading={loading}
            btnType="third"
            onClick={() => {
              handle()
            }}
          >
            Đã thanh toán
          </Button>
          <Button
            loading={loading}
            btnType="primary"
            onClick={() => {
              handle2()
            }}
          >
            Chưa thanh toán
          </Button>
        </div>
      }
    >
      <ModalComplainStyle>
        <Row>
          <Col span={24}>
            <div className="fw-600 mb-16">Khiếu nại của khách hàng</div>
          </Col>
          <Col span={24}>
            <div
              className="box-complain"
              dangerouslySetInnerHTML={{
                __html: detail?.Reason,
              }}
            />
          </Col>
        </Row>
      </ModalComplainStyle>
    </CustomModal>
  )
}

export default ModalComplain
