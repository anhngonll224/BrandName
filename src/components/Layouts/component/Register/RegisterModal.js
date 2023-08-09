import { Col, Form, Row, Segmented } from "antd"
import { useState } from "react"
import logo_vnc from "src/assets/images/logo/logo.png"
import bgr_login from "src/assets/images/modalLogin/bgr_login.png"
import Button from "src/components/MyButton/Button"
import SpinCustom from "src/components/Spin"
import AuthService from "src/services/AuthService"
import styled from "styled-components"
import { ModalLoginStyle, StyleLoginModal } from "../Login/styled"
import OrganizationRegister from "./components/OrganizationRegister"
import PersonRegister from "./components/PersonalRegister"
import Notice from "src/components/Notice"

const ModalStyle = styled.div`
  .ant-input-search-button,
  .ant-btn-primary:not(:disabled):hover {
    color: #fff;
    background-color: #52c41a;
    display: flex;
    align-items: center;

    span {
      transform: translateY(-2px);
    }
  }
`

const RegisterModal = ({ open, handleCancel, handleLogin, handleOk }) => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const TypeRegister = [
    {
      Label: "Cá nhân",
      Content: <PersonRegister form={form} setLoading={setLoading} />,
      value: 2,
    },
    {
      Label: "Tổ chức",
      Content: <OrganizationRegister form={form} setLoading={setLoading} />,
      value: 3,
    },
  ]
  const [typeActive, setTypeActive] = useState(TypeRegister[0])

  const handleSubmit = async () => {
    try {
      setLoading(true)
      const values = await form.validateFields()
      const res = await AuthService.register({
        ...values,
        Birthday: values.Birthday ? values.Birthday.format() : undefined,
        AccountType: typeActive.value,
      })
      if (res?.isError) return
      Notice({
        msg: "Đăng ký thành công, Vui lòng kiểm tra email!",
      })
      handleCancel()
    } finally {
      setLoading(false)
    }
  }

  return (
    <ModalLoginStyle
      title={false}
      width="1260px"
      style={{ top: 20 }}
      footer={null}
      open={open}
      onCancel={handleCancel}
    >
      <ModalStyle>
        <SpinCustom spinning={loading}>
          <Row>
            <Col span={12}>
              <img src={bgr_login} alt="" width="100%" />
            </Col>
            <Col span={12}>
              <StyleLoginModal>
                <div className="text-center mt-30 mb-30">
                  <img src={logo_vnc} alt="" width="200px" />
                  <div className="fs-22 fw-600">
                    Hệ thống quản lý tên định danh quốc gia
                  </div>
                </div>
                <div>
                  <div className="d-flex align-items-center justify-content-center mb-24">
                    <Segmented
                      size="middle"
                      options={TypeRegister.map(i => i.Label)}
                      onChange={value =>
                        setTypeActive(
                          TypeRegister.filter(i => value === i.Label)[0],
                        )
                      }
                      value={typeActive.Label}
                    />
                  </div>
                  <Form form={form} layout="vertical">
                    {typeActive.Content}
                    <Row>
                      <Button
                        loading={loading}
                        btnType="third"
                        className="btn-login"
                        onClick={handleSubmit}
                      >
                        Đăng ký
                      </Button>
                    </Row>
                  </Form>
                  {/* <Divider plain>Hoặc</Divider>
              <Button
                loading={loading}
                btnType="third"
                className="btn-login"
                onClick={() => {
                  handleCancel()
                  handleLogin()
                }}
              >
                Đăng nhập
              </Button> */}
                  <div className="mt-12 fs-16">
                    Đã có tài khoản{" "}
                    <a
                      href="#"
                      onClick={() => {
                        handleCancel()
                        handleLogin()
                      }}
                    >
                      Đăng nhập
                    </a>{" "}
                    ngay.
                  </div>
                </div>
              </StyleLoginModal>
            </Col>
          </Row>
        </SpinCustom>
      </ModalStyle>
    </ModalLoginStyle>
  )
}

export default RegisterModal
