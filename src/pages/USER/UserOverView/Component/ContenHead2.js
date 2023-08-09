import React from "react"
import { ContenHeadStyle } from "../styled"
import { Col, Row } from "antd"
import SvgIcon from "src/components/SvgIcon"
import { useNavigate } from "react-router-dom"
import ROUTER from "src/router"

const ContenHead2 = ({ overView }) => {
  const navigate = useNavigate()

  return (
    <ContenHeadStyle>
      <Row className="maine">
        <Col className="maineBox paddingBottom">
          <Row>
            <Col span={8} className="img">
              <SvgIcon name="new" />
            </Col>
            <Col span={10}>
              <div className="textHeadConten pt-3">Hồ sơ cấp mới</div>
              <span
                className="numblerContenHead"
                onClick={() =>
                  navigate(`${ROUTER.QUAN_LY_TAI_KHOAN_HO_SO_CHO_XU_LY}`, {
                    state: 1,
                  })
                }
              >
                {overView.NumberDossierNew}
              </span>
            </Col>
            <Col span={6}>
              <a
                className="pt-3"
                onClick={() =>
                  navigate(`${ROUTER.QUAN_LY_TAI_KHOAN_HO_SO_CHO_XU_LY}`, {
                    state: 1,
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
              <SvgIcon name="more" />
            </Col>
            <Col span={10}>
              <div className="textHeadConten pt-3">Hồ sơ gia hạn </div>

              <span
                className="numblerContenHead"
                onClick={() =>
                  navigate(`${ROUTER.QUAN_LY_TAI_KHOAN_HO_SO_CHO_XU_LY}`, {
                    state: 3,
                  })
                }
              >
                {overView.NumberDossierRenew}
              </span>
            </Col>
            <Col span={6}>
              <a
                className="pt-3"
                onClick={() =>
                  navigate(`${ROUTER.QUAN_LY_TAI_KHOAN_HO_SO_CHO_XU_LY}`, {
                    state: 3,
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

export default ContenHead2
