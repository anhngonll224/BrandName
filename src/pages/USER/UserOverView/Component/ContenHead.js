import React from "react"
import { ContenHeadStyle } from "../styled"
import { Col, Row } from "antd"
import SvgIcon from "src/components/SvgIcon"
import ROUTER from "src/router"
import { useNavigate } from "react-router-dom"
const ContenHead = ({ overView }) => {
  const navigate = useNavigate()

  return (
    <ContenHeadStyle>
      <Row className="maine">
        <Col className="maineBox paddingBottom">
          <Row>
            <Col span={8} className="img">
              <SvgIcon name="fileClole" />
            </Col>
            <Col span={10}>
              <div className="textHeadConten pt-3">Tổng hồ sơ </div>
              <span
                className="numblerContenHead"
                onClick={() =>
                  navigate(`${ROUTER.QUAN_LY_TAI_KHOAN_HO_SO_CHO_XU_LY}`, {
                    state: 0,
                  })
                }
              >
                {overView.NumberDossier}
              </span>
            </Col>
            <Col span={6}>
              <a
                className="pt-3"
                // href="#"
                onClick={() =>
                  navigate(`${ROUTER.QUAN_LY_TAI_KHOAN_HO_SO_CHO_XU_LY}`, {
                    state: 0,
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
              <SvgIcon name="fileRecovery" />
            </Col>
            <Col span={10}>
              <div className="textHeadConten pt-3">Hồ sơ thu hồi</div>
              <span
                className="numblerContenHead"
                onClick={() =>
                  navigate(`${ROUTER.QUAN_LY_TAI_KHOAN_HO_SO_CHO_XU_LY}`, {
                    state: 4,
                  })
                }
              >
                {overView.NumberDossierRecall}
              </span>
            </Col>
            <Col span={6}>
              <a
                className="pt-3"
                onClick={() =>
                  navigate(`${ROUTER.QUAN_LY_TAI_KHOAN_HO_SO_CHO_XU_LY}`, {
                    state: 4,
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

export default ContenHead
