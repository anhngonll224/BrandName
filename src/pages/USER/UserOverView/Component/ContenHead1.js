import React from "react"
import { ContenHeadStyle } from "../styled"
import { Col, Row } from "antd"
import SvgIcon from "src/components/SvgIcon"
import { useNavigate } from "react-router-dom"
import ROUTER from "src/router"

const ContenHead1 = ({ overView }) => {
  const navigate = useNavigate()

  return (
    <ContenHeadStyle>
      <Row className="maine">
        <Col className="maineBox paddingBottom">
          <Row>
            <Col span={8} className="img">
              <SvgIcon name="pendding" />
            </Col>
            <Col span={10}>
              <div className="textHeadConten pt-3">Cấp lại hồ sơ </div>
              <span
                className="numblerContenHead"
                onClick={() =>
                  navigate(`${ROUTER.QUAN_LY_TAI_KHOAN_HO_SO_CHO_XU_LY}`, {
                    state: 2,
                  })
                }
              >
                {overView.NumberDossierReIssue}
              </span>
            </Col>
            <Col span={6}>
              <a
                className="pt-3"
                // href="#"
                onClick={() =>
                  navigate(`${ROUTER.QUAN_LY_TAI_KHOAN_HO_SO_CHO_XU_LY}`, {
                    state: 2,
                  })
                }
              >
                Xem
              </a>
            </Col>
          </Row>
        </Col>
        <Col className="maineBox">
          <Row>
            <Col span={8} className="img">
              <SvgIcon name="idic" />
            </Col>
            <Col span={10}>
              <div className="textHeadConten pt-3">Hồ sơ thay đổi </div>
              <span
                className="numblerContenHead"
                onClick={() =>
                  navigate(`${ROUTER.QUAN_LY_TAI_KHOAN_HO_SO_CHO_XU_LY}`, {
                    state: 5,
                  })
                }
              >
                {overView.NumberDossierChangeInfor}
              </span>
            </Col>
            <Col span={6}>
              <a
                className="pt-3"
                // href="#"
                onClick={() =>
                  navigate(`${ROUTER.QUAN_LY_TAI_KHOAN_HO_SO_CHO_XU_LY}`, {
                    state: 5,
                  })
                }
              >
                Xem
              </a>
            </Col>
          </Row>
        </Col>
      </Row>
    </ContenHeadStyle>
  )
}

export default ContenHead1
