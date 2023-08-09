import { Col, Form, Row } from "antd"
import { useEffect, useState } from "react"
import CustomModal from "src/components/Modal/CustomModal"
import SpinCustom from "src/components/Spin"
import ContactSer from "src/services/ContactSer"
// import CommentRefuse from "../component/CommentRefuse"
import { StyleModalDetailRequest } from "src/pages/ADMIN/RequestSupport/styled"
import InforRequest from "./InforRequest"
// import InforRequest from "./InforRequest"

export const COLOR = ["#00AEAC", "#FF4648", "#172B4D"]
const ModalDetailRequest = ({ open, onCancel, onOk }) => {
  const [loading, setLoading] = useState(true)
  const [detailContact, setDetailContact] = useState()
  const [form] = Form.useForm()




  return (
    <CustomModal
      open={!!open}
      onCancel={onCancel}
      width={1024}
      title={`Chi tiết phiếu yêu cầu hỗ trợ`}
      footer={null}
    >
      <StyleModalDetailRequest>
        <SpinCustom spinning={!!open ? false : loading}>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <InforRequest detailContact={open} />
            </Col>

          </Row>
        </SpinCustom>
      </StyleModalDetailRequest>
    </CustomModal>
  )
}

export default ModalDetailRequest
