import { Col, Divider, Form, Row } from "antd"
import { useContext, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import logo_vnc from "src/assets/images/logo/logo.png"
import bgr_login from "src/assets/images/modalLogin/bgr_login.png"
import FlInput from "src/components/FloatingLabel/Input"
import Button from "src/components/MyButton/Button"
import { ACCOUNT_TYPE_ADMIN } from "src/constants/constants"
import STORAGE, { setStorage } from "src/lib/storage"
import { StoreContext } from "src/lib/store"
import { hasPermission } from "src/lib/utils"
import { getListSystemKey, setListTabs, setUserInfo } from "src/redux/appGlobal"
import { setListProductInCart, setTotalProductInCart } from "src/redux/cart"
import { setIsFirstLogin } from "src/redux/loginModal"
import ROUTER from "src/router"
import AuthService from "src/services/AuthService"
import RoleService from "src/services/RoleService"
import MenuItemBreadcrumb, { MenuItemAdmin } from "../../MenuItems"
import FormLoginSocial from "../FormLoginSocial"
import { ModalLoginStyle, StyleLoginModal } from "./styled"
import CartService from "src/services/CartService"
import CommonService from "src/services/CommonService"
import { useEffect } from "react"
import Dossier from "src/services/Dossier"
import { changeTotalDossier } from "src/redux/dossier"

const LoginModal = ({
  openLoginModal,
  handleCancel,
  handleRegister,
  setOpenForgetPassModal,
  stopNavigate = false,
  idRouter,
}) => {
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { dossierTotal } = useSelector(state => state.dossier)
  const { routerStore } = useContext(StoreContext)
  const [routerBeforeLogin, setRouterBeforeLogin] = routerStore
  const { typeMenu } = useSelector(state => state?.appGlobal)

  const comeStartPage = async () => {
    const resp = await RoleService.getListTab()
    if (resp.isError) return
    dispatch(setListTabs(resp.Object))
    const responsiveTask = {
      Object: [],
    }
    const treeLabel = tree =>
      tree?.map(i => ({
        ...i,
        title: i?.label,
        children: treeLabel(i?.children),
      }))

    const items = treeLabel(MenuItemAdmin(dossierTotal))

    const menuAdmin = items
      ?.filter(i => i?.showOnAdmin)
      ?.filter(x => hasPermission(x?.TabID, [...resp.Object]))
      ?.map(i => ({
        ...i,
        children: i?.children?.filter(x =>
          hasPermission(x?.TabID, [...resp.Object]),
        ),
      }))

    let startPage = "/"
    if (idRouter) {
      startPage = ""
    } else if (!!menuAdmin && !!menuAdmin[0]?.children?.length) {
      startPage = menuAdmin[0]?.children[0]?.key
    } else if (!!(menuAdmin[0]?.key?.charAt(0) === "/")) {
      startPage = menuAdmin[0]?.key
    }
    console.log("startPage", startPage)
    console.log("menuAdmin", menuAdmin)
    navigate(startPage)
  }
  const getTotalDossier = () => {
    setLoading(true)
    Dossier.getCountDossier()
      .then(res => {
        if (res.isOk) {
          if (res?.Object?.length) {
            console.log({
              totalDossier: res?.Object[0]?.TotalDossier,
              totalDossierTracking: res?.Object[0]?.TotalDossierTracking,
              totalSubmission: res?.Object[0]?.TotalSubmission,
              totalBrandName: res?.Object[0]?.TotalBrandName,
            })
            dispatch(
              changeTotalDossier({
                totalDossier: res?.Object[0]?.TotalDossier,
                totalDossierTracking: res?.Object[0]?.TotalDossierTracking,
                totalSubmission: res?.Object[0]?.TotalSubmission,
                totalBrandName: res?.Object[0]?.TotalBrandName,
              }),
            )
          }
        }
      })
      .finally(() => setLoading(false))
  }
  const onLogin = async () => {
    try {
      setLoading(true)
      const values = await form.validateFields()
      const res = await AuthService.login({ ...values })
      if (res?.isOk) {
        setStorage(STORAGE.TOKEN, res?.Object?.Token)
        setStorage(STORAGE.USER_INFO, res?.Object)
        dispatch(setUserInfo(res?.Object))

        dispatch(setIsFirstLogin(res?.Object?.IsFirstLogin))
        setRouterBeforeLogin(undefined)
        handleCancel()
        if (stopNavigate) return
        else {
          navigate(
            routerBeforeLogin
              ? routerBeforeLogin
              : ACCOUNT_TYPE_ADMIN?.includes(res?.Object?.AccountType)
              ? comeStartPage()
              : ROUTER.QUAN_LY_TAI_KHOAN_HO_SO_CHO_XU_LY,
          )
          const resp = await RoleService.getListTab()
          if (resp.isOk) {
            dispatch(setListTabs(resp.Object))
          }
          // navigate(
          //   routerBeforeLogin
          //     ? routerBeforeLogin
          //     : ACCOUNT_TYPE_ADMIN?.includes(res?.Object?.AccountType)
          //     ? ROUTER?.TONG_QUAN
          //     : ROUTER.QUAN_LY_TAI_KHOAN_HO_SO_CHO_XU_LY,
          //   // ROUTER.:HOME
          // )
          getListCart()
          getSystemKey()
          getTotalDossier()
        }
      }
    } finally {
      setLoading(false)
    }
  }

  const getSystemKey = async () => {
    const res = await CommonService.getSystemKey("All")
    if (res.IsError) return
    dispatch(getListSystemKey(res.Object))
  }
  const getListCart = () => {
    setLoading(true)
    CartService.getAllProductInCart()
      .then(res => {
        if (res.isOk) {
          dispatch(setListProductInCart(res?.Object))
          dispatch(setTotalProductInCart(res?.Object.length))
        }
      })
      .finally(() => setLoading(false))
  }
  return (
    <ModalLoginStyle
      title={false}
      width="1000px"
      footer={null}
      open={openLoginModal}
      onCancel={handleCancel}
    >
      <Row>
        <Col span={12}>
          <img src={bgr_login} alt="" width="100%" />
        </Col>
        <Col span={12}>
          <StyleLoginModal>
            <div className="text-center mt-30 mb-40">
              <img src={logo_vnc} alt="" width="200px" />
              <div className="fs-22 fw-600">
                Hệ thống quản lý tên định danh quốc gia
              </div>
            </div>
            <div className="pl-40 pr-40">
              <Form form={form} layout="vertical">
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: "Thông tin không được để trống!",
                    },
                  ]}
                  name="Username"
                >
                  <FlInput label="Tên đăng nhập" isRequired />
                </Form.Item>
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: "Bạn chưa nhập mật khẩu!",
                    },
                    // {
                    //   pattern: getRegexPassword(),
                    //   message:
                    //     "Mật khẩu có chứa ít nhất 8 ký tự, trong đó có ít nhất một số và bao gồm cả chữ thường và chữ hoa và ký tự đặc biệt, ví dụ @, #, ?, !.",
                    // },
                  ]}
                  name="Password"
                >
                  <FlInput label="Mật khẩu" isPass isRequired />
                </Form.Item>
                <Row className="d-flex justify-content-flex-end">
                  <Link
                    onClick={() => {
                      setOpenForgetPassModal()
                      handleCancel()
                    }}
                    className="forget-pass"
                  >
                    <i>Quên mật khẩu?</i>
                  </Link>
                </Row>
                <Row>
                  <Button
                    loading={loading}
                    btnType="third"
                    className="btn-login"
                    type="submit"
                    htmlType="submit"
                    onClick={onLogin}
                  >
                    Đăng nhập
                  </Button>
                </Row>
              </Form>
              <Divider plain>Hoặc</Divider>
              <Button
                loading={loading}
                btnType="third"
                className="btn-login"
                onClick={() => {
                  handleCancel()
                  handleRegister()
                }}
              >
                Đăng ký
              </Button>
            </div>
          </StyleLoginModal>
        </Col>
      </Row>
    </ModalLoginStyle>
  )
}

export default LoginModal
