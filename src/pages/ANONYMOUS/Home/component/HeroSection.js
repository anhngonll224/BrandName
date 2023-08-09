import { SearchOutlined } from "@ant-design/icons"
import { Button, Col, Form, Input, Row, Spin } from "antd"
import { useRef, useState } from "react"
import Slider from "react-slick"
import SvgIcon from "src/components/SvgIcon"
import STORAGE, { clearStorage, getStorage, setStorage } from "src/lib/storage"
import {
  HeroSectionstyle,
  SildeListStyled,
  SvgRStyled,
  SvgStyled,
} from "../styled"
import { Navigate, useLocation, useNavigate } from "react-router-dom"
import ROUTER from "src/router"
import GuestServices from "src/services/GuestService"
import HomeOverView from "./HomeOverView"
import Notice from "src/components/Notice"
import SpinCustom from "src/components/Spin"
// import useWindowSize from "src/lib/useWindowSize"
import UseWindowSize from "src/lib/useWindowSize"

const HeroSection = () => {
  const [dataSource, setDataSource] = useState([])
  const isLogin = getStorage(STORAGE.TOKEN)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const { Search } = Input
  const SlideRef = useRef()
  const settings = {
    slidesToShow: 5,
    focusOnSelect: true,
    accessibility: false,
    draggable: false,
    speed: 2000,
    arrows: false,
    autoplay: true,
    ref: SlideRef,
  }
  const [pagination, setPagination] = useState({
    CurrentPage: 1,
    PageSize: 20,
    TextSearch: "",
  })
  const next = () => {
    SlideRef.current.slickNext()
  }

  const previous = () => {
    SlideRef.current.slickPrev()
  }
  const isMobile = UseWindowSize.isMobile()

  return (
    <HeroSectionstyle>
      <Row className="Hero">
        {/* banner left */}
        <Col span={11} className="imgHeader">
          <div>
            <img
              alt=""
              className="imge-banner-home"
              src={require("src/assets/images/home/imageHome.png")}
            />
          </div>
        </Col>
        <Col span={13}>
          <Row className="headerLeft">
            <Col span={24} className="text-header">
              TRUNG TÂM ỨNG CỨU KHẨN CẤP KHÔNG GIAN MẠNG VIỆT NAM
            </Col>
            <Col span={24} className="text-header-son">
              Tra cứu tên định danh tại đây
            </Col>
            <Col span={18}>
              <Form form={form}>
                <Form.Item
                  name="TextSearch"
                  rules={[
                    { required: true, message: "Vui lòng nhập tên định danh" },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!!value) {
                          let myRegex = /[^A-Za-z0-9\-_.\s]/g
                          let isBrand = myRegex.exec(value)
                          if (isBrand || value?.length > 11)
                            return Promise.reject(
                              new Error("Tên tìm kiếm sai định dạng!"),
                            )
                          else return Promise.resolve()
                        } else return Promise.resolve()
                      },
                    }),
                  ]}
                // rules={[
                //   { required: true, message: "Vui lòng nhập tên định danh" },
                //   {
                //     validator: (_, value) => {
                //       if (value) {
                //         const myRegex = /[^A-Za-z0-9\-_.\s]/g;
                //         const isInvalid = myRegex.test(value) || value.length > 11;
                //         return isInvalid
                //           ? Promise.reject(new Error("Tên tìm kiếm sai định dạng!"))
                //           : Promise.resolve();
                //       } else {
                //         return Promise.resolve();
                //       }
                //     },
                //   },
                // ]}

                >
                  <Search
                    placeholder="Nhập tên định danh bạn muốn tra cứu"
                    search="true"
                    allowClear
                    label="Nhập tên mã ngành"
                    // style={{ width: 450 }}
                    style={!isMobile ? { width: 450 } : { width: 310 }}
                    onSearch={async TextSearch => {
                      try {
                        await form.validateFields();
                        if (TextSearch.length > 0) {
                          navigate(ROUTER.TIM_KIEM, { state: { TextSearch } });
                        } else {
                          Notice({
                            isSuccess: false,
                            msg: "Hãy nhập tên định danh",
                          });
                        }
                      } catch (errorInfo) {
                        console.error("Validation failed:", errorInfo);
                      }
                    }}
                    enterButton={
                      <div className="d-flex">
                        <SpinCustom spinning={loading}>
                          <SearchOutlined twoToneColor="#EEF5FF" />
                          <span>Tra cứu</span>
                        </SpinCustom>
                      </div>
                    }
                    size="large"
                  // maxLength={11}
                  // onSearch={handledChangeText}
                  // onChange={e => {
                  //   const searchText = e.target.value
                  //   formatter(searchText)
                  // }}
                  />
                </Form.Item>
                {/* <Form.Item
                  name="TextSearch"
                  rules={[
                    { required: true, message: "Vui lòng nhập tên định danh" },
                    {
                      validator: (_, value) => {
                        if (value) {
                          const myRegex = /[^A-Za-z0-9\-_.\s]/g;
                          const isInvalid = myRegex.test(value) || value.length > 11;
                          return isInvalid
                            ? Promise.reject(new Error("Tên tìm kiếm sai định dạng!"))
                            : Promise.resolve();
                        } else {
                          return Promise.resolve();
                        }
                      },
                    },
                  ]}
                >
                  <Search
                    placeholder="Nhập tên định danh bạn muốn tra cứu"
                    search="true"
                    allowClear
                    label="Nhập tên mã ngành"
                    style={!isMobile ? { width: 450 } : { width: 310 }}
                    onSearch={async (TextSearch) => {
                      try {
                      await form.validateFields();
                      if (TextSearch.length > 0) {
                        navigate(ROUTER.TIM_KIEM, { state: { TextSearch } });
                      } else {
                        Notice({
                          isSuccess: false,
                          msg: "Hãy nhập tên định danh",
                        });
                      }
                      }
                      catch (errorInfo) {
                        console.error("Validation failed:", errorInfo);
                      }
                    }}
                    enterButton={
                      <div className="d-flex">
                        <SpinCustom spinning={loading}>
                          <SearchOutlined twoToneColor="#EEF5FF" />
                          <span>Tra cứu</span>
                        </SpinCustom>
                      </div>
                    }
                    size="large"
                  />
                </Form.Item> */}

              </Form>
            </Col>
            <Col span={18} className="text-header-son">
              Lưu ý: Tên định danh không quá 11 ký tự viết liền nhau sử dụng chữ
              cái Latin, chữ số (từ 0 đến 9) hoặc các ký tự (-), (_), (.),
              khoảng trắng; không phân biệt chữ hoa, chữ thường; không là một
              tập hợp chỉ gồm các chữ số và được sử dụng để hiển thị hoặc xác
              định thông tin về nguồn gửi!
            </Col>
            <Col
              span={18}
              style={{ marginTop: "60px" }}
              className="text-header-son"
            >
              Tổ chức, doanh nghiệp đã đăng ký tên định danh
            </Col>
            <Col span={24}>
              <Row>
                <Col
                  span={2}
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <button style={{ border: "none" }} onClick={previous}>
                    <SvgStyled>
                      <SvgIcon
                        style={{
                          border: "none",
                          backgroundColor: "#41218a",
                        }}
                        name="left-arrow-backup"
                      />
                    </SvgStyled>
                  </button>
                </Col>

                <Col span={20}>
                  <SildeListStyled>
                    <Slider {...settings}>
                      <div className="image-logos">
                        <h3>
                          <img
                            alt=""
                            className="img-logo-companies"
                            src={require("src/assets/images/home/logoCompany/logo-vinastone-vn.png")}
                          />
                        </h3>
                      </div>
                      <div className="image-logos">
                        <h3>
                          <img
                            alt=""
                            className="img-logo-companies"
                            src={require("src/assets/images/home/logoCompany/image26.png")}
                          />
                        </h3>
                      </div>
                      <div className="image-logos">
                        <h3>
                          <img
                            alt=""
                            className="img-logo-companies"
                            src={require("src/assets/images/home/logoCompany/image27.png")}
                          />
                        </h3>
                      </div>
                      <div className="image-logos">
                        <h3>
                          <img
                            alt=""
                            className="img-logo-companies"
                            src={require("src/assets/images/home/logoCompany/image28.png")}
                          />
                        </h3>
                      </div>
                      <div className="image-logos">
                        <h3>
                          <img
                            alt=""
                            className="img-logo-companies"
                            src={require("src/assets/images/home/logoCompany/image29.png")}
                          />
                        </h3>
                      </div>
                      <div className="image-logos">
                        <h3>
                          <img
                            alt=""
                            className="img-logo-companies"
                            src={require("src/assets/images/home/logoCompany/image30.png")}
                          />
                        </h3>
                      </div>
                    </Slider>
                  </SildeListStyled>
                </Col>
                <Col
                  span={2}
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <button style={{ border: "none" }} onClick={next}>
                    <SvgRStyled>
                      <SvgIcon name="right-arrow-backup" />
                    </SvgRStyled>
                  </button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
      {/* Title giữa trang */}
      <Row className="title-cotent-1">
        <Col span={isMobile ? 24 : 14}>
          <Row>
            <Col span={24} className="text-content-TTUC">
              <h1 className="textMidle">
                Trung tâm Ứng cứu khẩn cấp không gian mạng Việt Nam
              </h1>
            </Col>
            <Col span={24} className="text-content-GT">
              VNCERT/CC - Cơ quan điều phối quốc gia về ứng cứu sự cố, thuộc Cục
              An toàn thông tin - Bộ Thông tin và Truyền thông. Có chức năng
              điều phối, ứng cứu các sự cố an toàn thông tin mạng trên toàn quốc
            </Col>
            {!isMobile && (
              <Col span={24}>
                <Button className="button-show-everywhere">
                  <a href="https://vncert.vn/">Tìm hiểu thêm về chúng tôi</a>
                </Button>
              </Col>
            )}
          </Row>
        </Col>
        <Col span={isMobile ? 24 : 10}>
          <img
            style={{
              width: isMobile ? "100%" : "500px",
              float: isMobile ? "right" : "right",
              marginLeft: !isMobile ? "30px" : "30px",
            }}
            // style={{

            //   marginLeft: "30px",
            //   width: "500px",
            //   float: 'right'
            // }}
            className="img-logo-companies"
            src={require("src/assets/images/home/bannerCenter.png")}
            alt=""
          />
        </Col>
      </Row>
    </HeroSectionstyle>
  )
}

export default HeroSection
