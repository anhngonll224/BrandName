import { Button, Col, Row } from "antd"
import { useState } from "react"
import styled from "styled-components"
import IconNewRegistrations from "src/assets/images/home/homeOverView/newRegistrations.svg"
import IconExpiringRecords from "src/assets/images/home/homeOverView/expiringRecords.svg"
import IconPaymentConfirmation from "src/assets/images/home/homeOverView/paymentConfirmation .svg"
import IconCertificateSending from "src/assets/images/home/homeOverView/certificateSending.svg"

export const HomeOverViewStyle = styled.div`
  .title {
    font-size: 40px;
    font-weight: 700;
    color: #0b428a;
  }
  .number {
    font-size: 40px;
    font-weight: 700;
    color: #0b428a;
  }
`
const HomeOverView = () => {
  const [data, setData] = useState({
    newRegistrations: 2,
    expiringRecords: 3,
    paymentConfirmation: 4,
    certificateSending: 5,
  })
  return (
    <HomeOverViewStyle>
      <div className="title"> Bạn đang có</div>
      <Row className="mt-50">
        <Col md={12}>
          <Row>
            <Col className="d-flex-center ">
              <img src={IconNewRegistrations} />
            </Col>
            <Col className="number d-flex-start">{data?.newRegistrations}</Col>
          </Row>
          <div className="fs-18 mt-10">Hồ sơ đăng ký mới</div>
          <div>
            Xem{" "}
            <Button className="p-0" type="link">
              tại đây
            </Button>
          </div>
        </Col>
        <Col md={12}>
          <Row>
            <Col className="d-flex-center ">
              <img src={IconExpiringRecords} />
            </Col>
            <Col className="number d-flex-start">{data?.expiringRecords}</Col>
          </Row>
          <div className="fs-18 mt-10">Hồ sơ sắp hết hạn chuyển tiếp</div>
          <div>
            Xem{" "}
            <Button className="p-0" type="link">
              tại đây
            </Button>
          </div>
        </Col>
        <Col md={12}>
          <Row>
            <Col className="d-flex-center ">
              <img src={IconPaymentConfirmation} />
            </Col>
            <Col className="number d-flex-start">
              {data?.paymentConfirmation}
            </Col>
          </Row>
          <div className="fs-18 mt-10">Hồ sơ cần xác nhận thanh toán</div>
          <div>
            Xem{" "}
            <Button className="p-0" type="link">
              tại đây
            </Button>
          </div>
        </Col>
        <Col md={12}>
          <Row>
            <Col className="d-flex-center ">
              <img src={IconCertificateSending} />
            </Col>
            <Col className="number d-flex-start">
              {data?.certificateSending}
            </Col>
          </Row>
          <div className="fs-18 mt-10">Hồ sơ cần gửi giấy chứng nhận</div>
          <div>
            Xem{" "}
            <Button className="p-0" type="link">
              tại đây
            </Button>
          </div>
        </Col>
      </Row>
    </HomeOverViewStyle>
  )
}
export default HomeOverView
