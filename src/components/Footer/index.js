import { Col, Divider, Row } from "antd"
import { useSelector } from "react-redux"
import useWindowSize from "src/lib/useWindowSize"
import styled from "styled-components"
import LayoutCommon from "../Common/Layout"
import SvgIcon from "../SvgIcon"
import { FooterStyle } from "./styled"
const FooterStyled = styled.div`
  position: relative;

  .to-top {
    .title-to-top {
      display: none;
    }
    position: fixed;
    bottom: 62px;
    right: 62px;
    :hover {
      .title-to-top {
        display: flex;
      }
    }
  }
  .ant-menu-title-content {
    color: #838383 !important;
    font-weight: 400 !important;
  }
  .ant-menu-item {
    padding: 0px;
  }
  .ant-menu-vertical {
    border-right: unset !important;
  }
  .dkkd {
    font-weight: 600;
    font-size: 12px;
    color: #838383;
  }
  .button-to-top {
    background: #ffffff;
    box-shadow: -2px 1px 4px rgba(0, 0, 0, 0.1);
    width: 40px;
    height: 40px;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .orange-color {
    font-weight: 600;
    font-size: 12px;
    color: #f88c00;
  }

  .ant-menu-vertical .ant-menu-item {
    border: unset !important;
    padding: 0px !important;
  }

  .ant-menu-item,
  .ant-menu-submenu {
    top: 0 !important;
  }
  .ant-menu-item:hover .ant-menu-title-content {
    color: #838383 !important;
  }
  .ant-menu-item-selected {
    background-color: #ffffff !important;
    .ant-menu-item:hover .ant-menu-title-content,
    .ant-menu-title-content {
      color: #838383 !important;
    }
  }
  .input-email {
    width: 359px;
    background: #f4f6fb;
    border-radius: 4px;
    border: unset;
    input {
      background: transparent;
      border: unset;
    }
    .ant-btn,
    .ant-input-group-addon {
      border: unset;
      background: transparent;
    }
    .ant-btn-primary {
      text-shadow: unset;
      box-shadow: unset;
    }
    .ant-input:focus {
      border: unset;
      box-shadow: unset;
    }
  }
  .fist-row {
    background-color: #0e0127;
  }
  .secont-row {
    background-color: #04224c;
  }
  .svg-color {
    path {
      fill: #0b428a;
    }
  }
  .under-line {
    background-color: white;
    height: 3px;
    width: 20%;
    margin-bottom: 10px;
  }
  
.footerBottom{
    line-height: 2rem;
}
`

const Footer = () => {
  const footer = useSelector(state => state?.banner?.footer)

  return (
    <FooterStyled>
      <Divider />
      <div className="fist-row pt-20">
        <LayoutCommon>
          <div className="pl-20 pr-20">
            <Row gutter={[10, 24]}>
              <Col xs={24} md={6} lg={6}>
                <div className="fs-16 fw-600 white mb-5">Liên hệ</div>
                <div className="under-line" />
                <span dangerouslySetInnerHTML={{ __html: footer?.Footer }} />
                <Row>
                  <Col className="p-5" md={3}>
                    <SvgIcon name="phone" className="svg-color" />
                  </Col>
                  <Col className="p-5" md={21}>
                    <div className="fw-600 white pb-5">Hotline:</div>
                    <div className=" white pb-5">0869 100317</div>
                    <div className="fw-600 white pb-5">Fax:</div>
                    <div className=" white pb-5">84.24.36404425</div>
                  </Col>
                </Row>
                <Row>
                  <Col className="p-5" md={3}>
                    <SvgIcon name="email" className="svg-color" />
                  </Col>
                  <Col className="p-5" md={21}>
                    <div className="fw-600 white pb-5">Email:</div>
                    <div className=" white pb-5">office@vncert.vn</div>
                  </Col>
                </Row>
                <Row>
                  <Col className="p-5" md={3}>
                    <SvgIcon name="location" className="svg-color" />
                  </Col>
                  <Col className="p-5" md={21}>
                    <div className="fw-600 white pb-5">Địa chỉ:</div>
                    <div className=" white pb-5">
                      Tầng 5, 115 Trần Duy Hưng, Trung Hòa,Cầu Giấy, Hà Nội
                    </div>
                  </Col>
                </Row>
              </Col>
              <Col xs={24} md={6} lg={6}>
                <div className="fs-16 fw-600 white mb-5">
                  Văn bản mạng lưới ƯCSC
                </div>
                <div className="under-line" />

                <Row>
                  <Col className="p-5" md={3}>
                    <SvgIcon name="arrow-right" className="svg-color" />
                  </Col>
                  <Col className="p-5" md={21}>
                    <div className=" white pb-5">
                      Quyết định 1439/QĐ-BTTTT ngày 26/07/2022
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col className="p-5" md={3}>
                    <SvgIcon name="arrow-right" className="svg-color" />
                  </Col>
                  <Col className="p-5" md={21}>
                    <div className=" white pb-5">
                      Chỉ thị 60/CT-BTTTT ngày 16/09/2021
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col className="p-5" md={3}>
                    <SvgIcon name="arrow-right" className="svg-color" />
                  </Col>
                  <Col className="p-5" md={21}>
                    <div className=" white pb-5">Đăng ký mạng lưới ƯCSC</div>
                  </Col>
                </Row>
                <Row>
                  <Col className="p-5" md={3}>
                    <SvgIcon name="arrow-right" className="svg-color" />
                  </Col>
                  <Col className="p-5" md={21}>
                    <div className=" white pb-5">Bản khai hồ sơ thành viên</div>
                  </Col>
                </Row>
                <Row>
                  <Col className="p-5" md={3}>
                    <SvgIcon name="arrow-right" className="svg-color" />
                  </Col>
                  <Col className="p-5" md={21}>
                    <div className=" white pb-5">
                      Quyết định 1622/QĐ-TTg ngày 25/10/2017
                    </div>
                  </Col>
                </Row>
              </Col>
              <Col xs={24} md={6} lg={6}>
                <div className="fs-16 fw-600 white mb-5">
                  Văn bản quy phạm pháp luật
                </div>
                <div className="under-line" />

                <Row>
                  <Col className="p-5" md={3}>
                    <SvgIcon name="arrow-right" className="svg-color" />
                  </Col>
                  <Col className="p-5" md={21}>
                    <div className=" white pb-5">
                      Văn bản quy phạm pháp luật lĩnh vực An toàn thông tin
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col className="p-5" md={3}>
                    <SvgIcon name="arrow-right" className="svg-color" />
                  </Col>
                  <Col className="p-5" md={21}>
                    <div className=" white pb-5">
                      Tổng hợp văn bản QPPL về ATTT
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col className="p-5" md={3}>
                    <SvgIcon name="arrow-right" className="svg-color" />
                  </Col>
                  <Col className="p-5" md={21}>
                    <div className=" white pb-5">
                      Luật viễn thông 41/2009/QH12
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col className="p-5" md={3}>
                    <SvgIcon name="arrow-right" className="svg-color" />
                  </Col>
                  <Col className="p-5" md={21}>
                    <div className=" white pb-5">
                      QĐ 1671/QĐ-BTTTT chức năng nhiệm vụ VNCERT/CC
                    </div>
                  </Col>
                </Row>
              </Col>
              <Col xs={24} md={6} lg={6}>
                <div className="fs-16 fw-600 white mb-5">
                  Tài liệu hướng dẫn và tham khảo
                </div>
                <div className="under-line" />

                <Row>
                  <Col className="p-5" md={3}>
                    <SvgIcon name="arrow-right" className="svg-color" />
                  </Col>
                  <Col className="p-5" md={21}>
                    <div className=" white pb-5">
                      Phiếu khảo sát HD đảm bảo ATTT Webside
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col className="p-5" md={3}>
                    <SvgIcon name="arrow-right" className="svg-color" />
                  </Col>
                  <Col className="p-5" md={21}>
                    <div className=" white pb-5">
                      Khoanh vùng và bóc gỡ Botnet
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col className="p-5" md={3}>
                    <SvgIcon name="arrow-right" className="svg-color" />
                  </Col>
                  <Col className="p-5" md={21}>
                    <div className=" white pb-5">
                      Sử dụng an toàn email công vụ
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col className="p-5" md={3}>
                    <SvgIcon name="arrow-right" className="svg-color" />
                  </Col>
                  <Col className="p-5" md={21}>
                    <div className=" white pb-5">Sử dụng mật khẩu an toàn</div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </LayoutCommon>
      </div>

      <div className="secont-row p-10 lh-2rem footerBottom">
        <LayoutCommon>
          <div >
            <Row>
              <div className=" white pb-5">
                PGP KEY for ir@vncert.vn: 7D178B1183B11F192263A9C412EB37281DF03474
              </div>
            </Row>
            <Row>
              <div className=" white pb-5">
                Cơ quan chủ quản: Cục An toàn thông tin – Trung tâm Ứng cứu khẩn
                cấp không gian mạng Việt Nam
              </div>
            </Row>
            <Row>
              <div className=" white pb-5">
                Giấy phép số: 303/GP-BC do Cục Báo chí - Bộ Văn hoá Thông tin cấp
                ngày 4/10/2006
              </div>
            </Row>
            <Row>
              <div className=" white pb-5">
                Chịu trách nhim chính - Quyền Giám đốc Trung Tâm VNCERT/CC: Ông
                Nguyễn Đức Tuân
              </div>
            </Row>
          </div>
        </LayoutCommon>
      </div>
      {/* <LayoutCommon>
        <Row gutter={10} className="justify-content-center p-10">
          <span className="dkkd ">
            <span className="black-color">© 2020</span> Bản quyền thuộc
            <span className="black-color">CÔNG TY CỔ PHẦN H2Q SOLUTION </span>
          </span>
          <br />
        </Row>
      </LayoutCommon> */}
      {useWindowSize.isMobile() && (
        <Row
          className="align-items-center justify-content-flex-end to-top"
          onClick={() =>
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
          }
        >
          <Col className="button-to-top">
            <SvgIcon name="arrow-up-orange" />
          </Col>
        </Row>
      )}
    </FooterStyled>
  )
}

export default Footer
