import React from "react"
import { Col, Form, Row, Input, Button } from "antd"
import { LogoListCompany, LogoListCompanyStyle } from "../styled"
import UseWindowSize from "src/lib/useWindowSize"

const ListCompany = () => {
    const containerStyle = {
        width: "-webkit-fill-available",
        // Thêm bất kỳ thuộc tính CSS nào khác bạn muốn ở đây
    }
    let isMobile = UseWindowSize.isMobile()
    return (
        <LogoListCompanyStyle>
            <LogoListCompany>
                <hr
                    style={{
                        color: "red",
                        border: "1px solid #9FA5C4",
                    }}
                />
                <Row>
                    <Col className="title-logo-company" span={24}>

                        <b style={{
                            fontSize: isMobile ? "13px" : "32px",
                        }}>Thành viên của</b>
                    </Col>
                    {/* {!isMobile && ( */}
                    <Col span={24} className="logo-image-row-1">
                        {/* <Row
                            className="element-img-all"
                            style={{
                                justifyContent: "center",
                                display: "flex",
                                justifyItems: "center",
                                textAlign: "center",
                            }}
                        > */}
                        {/* <Col span={4}></Col> */}
                        <Col span={24} className="d-flex all-logo" style={{
                            justifyContent: "center",
                            display: "flex",
                            justifyItems: "center",
                            textAlign: "center",
                        }}>
                            <div className="w-200">
                                <img
                                    className="test"
                                    src={require("src/assets/images/home/logoCompany/image33.png")}
                                />
                            </div>
                            <div className="w-200">
                                <img
                                    className="img"
                                    src={require("src/assets/images/home/logoCompany/image34.png")}
                                />
                            </div>
                            <div className="w-200">
                                <img
                                    className="img"
                                    src={require("src/assets/images/home/logoCompany/image35.png")}
                                />
                            </div>
                        </Col>
                        {/* <Col span={4}></Col> */}
                        {/* </Row> */}
                    </Col>
                    {/* )} */}

                    <Col span={24} className="text-logo-net-world">
                        Mạng lưới ƯCSC an toàn thông tin mạng quốc gia
                    </Col>
                    <Col
                        span={24}
                        style={{ justifyContent: "center", display: "flex" }}
                        tyle={{ float: "right", textAlign: "center" }}
                    >
                        <img
                            className="imge-logo-home imgBottom"
                            src={require("src/assets/images/home/logoCompany/Group8891.png")}
                        />
                    </Col>
                </Row>
            </LogoListCompany>
        </LogoListCompanyStyle>
    )
}

export default ListCompany
