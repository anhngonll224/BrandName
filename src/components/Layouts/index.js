import { MenuFoldOutlined, UserOutlined } from "@ant-design/icons"
import { HubConnectionBuilder } from "@microsoft/signalr"
import {
  Avatar,
  Badge,
  Col,
  Divider,
  Drawer,
  Dropdown,
  Layout,
  Menu,
  Row,
} from "antd"
import React, { useContext, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import Logo from "src/assets/images/logo/logo.png"
import { ACCOUNT_TYPE_ADMIN } from "src/constants/constants"
import STORAGE, { clearStorage, getStorage, setStorage } from "src/lib/storage"
import { StoreContext } from "src/lib/store"
import UseWindowSize from "src/lib/useWindowSize"
import { hasPermission } from "src/lib/utils"
import { setUserInfo } from "src/redux/appGlobal"
import { changeTotalDossier } from "src/redux/dossier"
import { setOpenLoginModal } from "src/redux/loginModal"
import ROUTER from "src/router"
import AuthService from "src/services/AuthService"
import {
  default as NotifyApi,
  default as NotifyService,
} from "src/services/NotifyService"
import LayoutCommon from "../Common/Layout"
import LayoutAdminCommon from "../Common/LayoutAdmin"
import Footer from "../Footer"
import Notice from "../Notice"
import SvgIcon from "../SvgIcon"
import { SubTableHeader } from "../Table/CustomTable/styled"
import BreadcrumbHome from "./BreadcrumbHome/BreadcrumbHome"
import MenuItemBreadcrumb, { MenuItemAdmin } from "./MenuItems"
import NotifyForm from "./Notify"
import ForgetModal from "./component/Forget/ForgetModal"
import RePasswordModal from "./component/Forget/components/RePasswordModal"
import VerifyForgetModal from "./component/Forget/components/VerifyForgotModal"
import LayoutAdmin from "./component/LayoutAdmin"
import LayoutUser from "./component/LayoutUser"
import LoginModal from "./component/Login/LoginModal"
import MenuHeader from "./component/MenuHeader"
import RegisterModal from "./component/Register/RegisterModal"
import { LayoutStyled, StyleMenuAccount } from "./styled"
import "./styles.scss"
const { Header, Content } = Layout

const MainLayout = ({ children, isAdmin, isUser }) => {
  const { listTabs, userInfo } = useSelector(state => state?.appGlobal)
  const { totalProductInCart } = useSelector(state => state.cart)
  const { IsFirstLogin } = useSelector(state => state.loginModal)

  const { routerStore } = useContext(StoreContext)
  const [, setRouterBeforeLogin] = routerStore
  const isLogin = getStorage(STORAGE.TOKEN)
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  let isManagerPage = location.pathname.includes(ROUTER.QUAN_LY_TAI_KHOAN)
  const [email, setEmail] = useState(false)
  const [codeVerify, setCodeVerify] = useState()
  const [open, setOpen] = useState(false)
  const [selectedKey, setSelectedKey] = useState(
    getStorage(STORAGE.KEY_MENU_ACTIVE) || ["/"],
  )
  const { openLoginModal } = useSelector(state => state.loginModal)
  const [openForgetPassModal, setOpenForgetPassModal] = useState(false)
  const [openVerifyModal, setOpenVerifyModal] = useState(false)
  const [rePasswordModal, setRePasswordModal] = useState(false)
  const [openRegisterModal, setOpenRegisterModal] = useState(false)
  const [listNotify, setListNotify] = useState([])
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(false)
  const [numberOfNewNotifies, setNumberOfNewNotifies] = useState()
  const [menuAdmin, setMenuAdmin] = useState([])
  const [connection, setConnection] = useState()
  const isMobile = UseWindowSize.isMobile()

  const { dossierTotal } = useSelector(state => state.dossier)
  const [paginationNof, setPaginationNof] = useState({
    CurrentPage: 1,
    PageSize: 4,
    TextSearch: "",
  })
  useEffect(() => {
    if (!!isLogin) getListNotify()
  }, [paginationNof])
  useEffect(() => {
    if (!!IsFirstLogin) setRePasswordModal(userInfo?.IsFirstLogin)
  }, [IsFirstLogin])

  useEffect(() => {
    if (!!isLogin) {
      const RESTFUL_BASE_URL = process.env.REACT_APP_API_WS || ""
      const connect = new HubConnectionBuilder()
        .withUrl(
          `${RESTFUL_BASE_URL}/signalrServer?Authorization=` +
            encodeURIComponent(isLogin),
          {
            headers: {
              Authorization: isLogin,
              // MaintenanceModeCode: getStorage(STORAGE.MAINTENANCE_CODE),
            },
          },
        )
        .withAutomaticReconnect()
        .build()
      console.log("connection", connect)
      setConnection(connect)
    }
  }, [isLogin])
  useEffect(() => {
    if (!!connection) {
      connection.start().catch(error => console.log(error))
      connection.on("Dossier", message => {
        console.log("messageDossier", message)
        if (!!message.data) {
          message.data.forEach(item => {
            if (item.userId === userInfo.userID && !!message?.data?.length) {
              dispatch(changeTotalDossier(message?.data[0]))
            }
          })
        }
      })
      connection.on("NotifyMessage", message => {
        console.log("messageNo", message)
        if (!!message.data) {
          message.data.forEach(item => {
            if (item.userId === userInfo.userID) {
              if (item.numberUnseen > 0) {
                getListNotify("")
                setNumberOfNewNotifies(item.numberUnseen)
              }
            }
          })
        }
      })
      // NotifyMessage
    }
  }, [connection])
  const getListNotify = async () => {
    try {
      setLoading(true)
      const res = await NotifyService.GetListNotify({
        // TextSearch: TextSearch,
        ...paginationNof,
      })

      console.log(res);
      if (res?.isError) return
      setListNotify(res?.Object)
    } finally {
      setLoading(false)
    }
  }
  const getNewNotification = () => {
    NotifyApi.GetNewNotification().then(res => {
      if (res.isOk) {
        res?.Object &&
          res?.Object?.forEach(item => {
            if (item?.UserId === userInfo?.UserID) {
              setNumberOfNewNotifies(item.NumberUnseen)
            }
          })
      }
    })
  }

  useEffect(() => {
    if (!!isLogin) {
      const menu = MenuItemAdmin(dossierTotal)
        ?.filter(x => hasPermission(x?.TabID, [...listTabs]))
        ?.map(i => ({
          ...i,
          children: i?.children?.filter(x =>
            hasPermission(x?.TabID, [...listTabs]),
          ),
        }))
      setMenuAdmin(menu)
    }
  }, [userInfo, listTabs, dossierTotal])

  useEffect(() => {
    let key = location?.pathname
    setSelectedKey([key])
    if (!!isLogin) {
      setPaginationNof(pre => ({
        CurrentPage: 1,
        PageSize: 4,
        TextSearch: "",
      }))
      getNewNotification()
    }
  }, [location, isLogin])

  const onClickMenu = key => {
    setStorage(STORAGE.KEY_MENU_ACTIVE, key.keyPath)
    setSelectedKey(key.key.keyPath)
    if (!key.key.includes("subkey")) navigate(key.key)
  }
  const hanleLogout = async () => {
    if (isLogin) {
      await AuthService.logout()
      clearStorage()
      dispatch(setUserInfo({}))
      return navigate(ROUTER?.HOME)
    }
    dispatch(setOpenLoginModal(true))
  }
  const filterMenu = data =>
    data?.filter(o => {
      if (o?.children) {
        if (filterMenu(o?.children)?.length)
          o.children = filterMenu(o?.children)
        else delete o?.children
      }
      return !o?.hideOnMenu
    })
  const fbTest = () => {
    let chatbox = document.getElementById("fb-customer-chat")
    if (chatbox) {
      chatbox?.setAttribute("page_id", `109362535310723`)
      chatbox?.setAttribute("attribution", "biz_inbox")
      window.fbAsyncInit = function () {
        /*global FB*/
        FB?.init({
          xfbml: true,
          version: "v14.0",
        })
      }
      ;(function (d, s, id) {
        let js,
          fjs = d.getElementsByTagName(s)[0]
        if (d.getElementById(id)) return
        js = d.createElement(s)
        js.id = id
        js.src = "https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js"
        fjs.parentNode.insertBefore(js, fjs)
      })(document, "script", "facebook-jssdk")
    }
  }
  useEffect(() => {
    fbTest()
  }, [])

  const menuAccount = (
    <StyleMenuAccount>
      <div className="menu-account">
        <Menu className="dropdown-option">
          <div className="account-infor">
            <Row gutter={[16, 8]} className="infor">
              <Col span={6}>
                <div className="text-center">
                  <Avatar
                    src={userInfo?.Avatar}
                    size={52}
                    icon={<UserOutlined style={{ fontSize: "36px" }} />}
                  />
                </div>
              </Col>
              <Col span={18}>
                <div className="sumary-infor-user">
                  {!!userInfo?.FullName && (
                    <div className="fullname">{userInfo?.FullName}</div>
                  )}
                  {!!userInfo?.Username && (
                    <SubTableHeader>{userInfo?.Username}</SubTableHeader>
                  )}
                </div>
              </Col>
            </Row>
            <Divider />

            {!!ACCOUNT_TYPE_ADMIN?.includes(userInfo?.AccountType) ? (
              <Menu.Item
                key="1"
                onClick={() => {
                  let startPage = undefined
                  if (!!menuAdmin && !!menuAdmin[0]) {
                    startPage =
                      menuAdmin[0]?.children?.[0]?.key || menuAdmin[0]?.key
                  } else if (!!(menuAdmin[0]?.key?.charAt(0) === "/")) {
                    startPage = menuAdmin[0]?.key
                  }
                  navigate(!!menuAdmin?.length ? startPage : ROUTER.HOME)
                }}
              >
                <div className="btn-function">
                  <SvgIcon name="user_login" />
                  <span className="fw-400">Quản trị hệ thống</span>
                </div>
              </Menu.Item>
            ) : (
              <Menu.Item
                key="2"
                onClick={() => {
                  navigate(ROUTER.QUAN_LY_TAI_KHOAN_HO_SO_CHO_XU_LY)
                }}
              >
                <div className="btn-function">
                  <SvgIcon name="user-setting" />
                  <span className="fw-400">Dịch vụ</span>
                </div>
              </Menu.Item>
            )}

            <Menu.Item
              key="3"
              onClick={() => {
                navigate(ROUTER.HO_SO_CA_NHAN)
              }}
            >
              <div className="btn-function strok-btn-function">
                <SvgIcon name="user-info" />
                <span className="fw-400">Thông tin tài khoản</span>
              </div>
            </Menu.Item>
            <Menu.Item
              key="4"
              onClick={() => {
                setRePasswordModal(true)
              }}
            >
              <div className="btn-function strok-btn-function">
                <SvgIcon name="reset-pass" />
                <span className="fw-400">Đổi mật khẩu</span>
              </div>
            </Menu.Item>
            {/* {!!listTabs?.find(item => item?.CategoryID === 32)?.IsVistTab &&
              !!listTabs?.find(item => item?.CategoryID === 32)?.IsUpdate ? (
              <Menu.Item key="6" onClick={() => setOpenChangManual(true)}>
                <div className="btn-function">
                  <SvgIcon name="refresh" />
                  Cập nhật hướng dẫn
                </div>
              </Menu.Item>
            ) : (
              <></>
            )} */}
          </div>
          <div className="account-logout">
            <Menu.Item
              key="5"
              style={{ color: "#ED1117" }}
              onClick={hanleLogout}
            >
              <div className="btn-logout">
                <SvgIcon name="logoutIcon" />
                Đăng xuất
              </div>
            </Menu.Item>
          </div>
        </Menu>
      </div>
    </StyleMenuAccount>
  )

  return (
    <LayoutStyled>
      <Header
        className={`header-background ${isAdmin && "admin-header"}`}
        style={{
          background: "#fff",
          position: "sticky",
          zIndex: 100,
          boxShadow: "1px 1px 2px #ddd",
        }}
      >
        <div className="d-flex-start">
          <div className="w-100">
            {!isAdmin &&
              React.createElement(
                isAdmin || isManagerPage ? LayoutAdminCommon : LayoutCommon,
                {
                  children: (
                    <Row
                      gutter={[24]}
                      className="justify-content-space-between align-items-flex-end pt-5 pb-5"
                      style={{
                        margin: "auto",
                      }}
                    >
                      <div
                        className="align-items-center d-flex"
                        style={{ flex: 1, height: "40px" }}
                      >
                        {React.createElement(
                          !!isMobile ? MenuFoldOutlined : Col,
                          {
                            onClick: () => setOpen(true),
                            className: !!isMobile && "mr-10",
                          },
                        )}

                        <Col
                          onClick={() => {
                            if (!isAdmin) navigate(ROUTER.HOME)
                          }}
                          className={`d-flex-center nowrap mr-20 avata ${
                            !isAdmin && "pointer"
                          } `}
                          style={{
                            whiteSpace: "nowrap",
                            height: "40px",
                            paddingLeft: 0,
                            // paddingRight: 0
                          }}
                        >
                          {!!userInfo?.FileUrl && !!isAdmin ? (
                            <div className="name-branch ml-10">
                              <span className="fw-600">
                                {userInfo?.AccountName}
                              </span>
                            </div>
                          ) : (
                            <div
                              className={`name-branch h-100pe ${
                                isAdmin ? "" : "hover-menu"
                              }`}
                              onClick={() => {
                                navigate(ROUTER.HOME)
                              }}
                            >
                              <span
                                className={`fw-600 d-flex-center h-100pe ${
                                  !!isMobile ? "fs-12" : "fs-20"
                                }`}
                              >
                                <img src={Logo} className="logo " />
                                {!isMobile && (
                                  <div className="h-100pe d-flex-center logo-text">
                                    Hệ thống quản lý tên định danh quốc gia
                                  </div>
                                )}
                              </span>
                            </div>
                          )}
                        </Col>
                        {isMobile && (
                          <Col
                            style={{
                              flex: "auto",
                              display: "flex",
                              justifyContent: "flex-end",
                            }}
                          >
                            <Dropdown
                              overlay={menuAccount}
                              // overlayStyle={{ minWidth: "300px" }}
                            >
                              <Row gutter={5} className="pointer ">
                                <Col>
                                  <div
                                    className="d-flex-end"
                                    // style={{ maxWidth: "195px" }}
                                  >
                                    <div
                                      className="sumary-infor-user"
                                      // style={{ minWidth: "100px" }}
                                    >
                                      {!!userInfo?.FullName && (
                                        <div className="fullname max-line1 mt-3">
                                          {userInfo?.FullName}
                                        </div>
                                      )}
                                      {!!userInfo?.Username && (
                                        <SubTableHeader className="max-line1 mt-2">
                                          {userInfo?.Username}
                                        </SubTableHeader>
                                      )}
                                    </div>
                                    {/* </Tooltip> */}
                                    <div className="account-infor-avatar">
                                      <Avatar
                                        src={userInfo?.Avatar}
                                        size={40}
                                        className="style-avt mr-8"
                                        style={{ border: "1px solid #ddd" }}
                                        icon={
                                          <UserOutlined
                                            style={{ fontSize: "24px" }}
                                          />
                                        }
                                      />
                                      <div
                                        className="account-infor-sumary"
                                        style={{ height: "100%" }}
                                      ></div>
                                    </div>
                                  </div>
                                </Col>
                              </Row>
                            </Dropdown>
                          </Col>
                        )}
                      </div>
                      {!isMobile && (
                        <Col>
                          <Row
                            gutter={30}
                            className="align-items-center layout-action"
                          >
                            <MenuHeader />
                            {!!isLogin ? (
                              <div className="d-flex justify-content-flex-end align-items-center">
                                {/* <Dropdown
                                overlay={<Card />}
                                trigger={["hover", "click"]}
                              > */}
                                {/* {!isMobile && ( */}
                                <Col
                                  className="pointer hover-menu"
                                  onClick={() => {
                                    if (!isLogin) {
                                      // setRouterBeforeLogin(
                                      //   `${location.pathname}${location?.search}`,
                                      // )
                                      dispatch(setOpenLoginModal(true))
                                    } else navigate(ROUTER.GIO_HANG)
                                  }}
                                >
                                  <Badge
                                    count={totalProductInCart}
                                    size="small"
                                  >
                                    <SvgIcon name="shopping" />
                                  </Badge>
                                </Col>
                                {/* )} */}
                                {/* </Dropdown> */}
                                {/* {!isMobile && ( */}
                                <Dropdown
                                  overlay={
                                    <NotifyForm
                                      getList={() => getListNotify()}
                                      paginationNof={paginationNof}
                                      setPaginationNof={setPaginationNof}
                                      listNotify={listNotify}
                                      loading={loading}
                                      onClose={() => setVisible(false)}
                                    />
                                  }
                                  onOpenChange={setVisible}
                                  open={visible}
                                  trigger={["hover", "click"]}
                                >
                                  <Col
                                    className="pointer mr-16"
                                    onClick={() => {
                                      if (numberOfNewNotifies > 0) {
                                        setNumberOfNewNotifies(0)
                                        setLoading(true)
                                        NotifyApi.MarkAsSeen("")
                                          .then(res => {
                                            if (res.isOk) {
                                              // getListNotify("")
                                            }
                                          })
                                          .finally(() => setLoading(false))
                                      }
                                    }}
                                  >
                                    <Badge
                                      count={listNotify?.TotalIsRead || 0}
                                      overflowCount={99}
                                      size="small"
                                      className="notification_count"
                                    >
                                      <SvgIcon name="bell" />
                                    </Badge>
                                  </Col>
                                </Dropdown>
                                {/* )} */}

                                {/* {!isMobile && ( */}
                                <Dropdown
                                  overlay={menuAccount}
                                  overlayStyle={{ minWidth: "300px" }}
                                >
                                  <Row gutter={5} className="pointer ">
                                    <Col>
                                      <div
                                        className="d-flex-end"
                                        style={{ maxWidth: "195px" }}
                                      >
                                        <div
                                          className="sumary-infor-user"
                                          style={{ minWidth: "100px" }}
                                        >
                                          {!!userInfo?.FullName && (
                                            <div className="fullname max-line1 mt-3">
                                              {userInfo?.FullName}
                                            </div>
                                          )}
                                          {!!userInfo?.Username && (
                                            <SubTableHeader className="max-line1 mt-2">
                                              {userInfo?.Username}
                                            </SubTableHeader>
                                          )}
                                        </div>
                                        {/* </Tooltip> */}
                                        <div className="account-infor-avatar">
                                          <Avatar
                                            src={userInfo?.Avatar}
                                            size={40}
                                            className="style-avt mr-8"
                                            style={{ border: "1px solid #ddd" }}
                                            icon={
                                              <UserOutlined
                                                style={{ fontSize: "24px" }}
                                              />
                                            }
                                          />
                                          <div
                                            className="account-infor-sumary"
                                            style={{ height: "100%" }}
                                          ></div>
                                        </div>
                                      </div>
                                    </Col>
                                  </Row>
                                </Dropdown>
                                {/* )} */}
                              </div>
                            ) : (
                              <div className="d-flex align-items-center ">
                                <Row
                                  onClick={() => setOpenRegisterModal(true)}
                                  className="align-items-center pointer hover-menu login-item"
                                >
                                  <SvgIcon
                                    name="register"
                                    className="register-icon"
                                  />
                                  <span className="login-item_text">
                                    Đăng ký
                                  </span>
                                </Row>
                                <Row
                                  onClick={() =>
                                    dispatch(setOpenLoginModal(true))
                                  }
                                  className="align-items-center pointer hover-menu login-item"
                                >
                                  <SvgIcon
                                    name="user_login"
                                    className="login-icon"
                                  />
                                  <span className="login-item_text">
                                    Đăng nhập
                                  </span>
                                </Row>
                              </div>
                            )}
                          </Row>
                        </Col>
                      )}
                    </Row>
                  ),
                },
              )}
            {!isAdmin && <Divider style={{ margin: 0 }} />}
            {!!isAdmin &&
              React.createElement(isAdmin ? LayoutAdminCommon : LayoutCommon, {
                children: (
                  <div
                    style={{
                      width: "100%",
                      margin: "auto",
                      alignItems: "flex-end",
                    }}
                  >
                    <Row
                      style={{
                        padding: `0 5px`,
                        height: "100%",
                        background: "#fff",
                      }}
                      className={`justify-content-space-between align-items-center nowrap`}
                    >
                      <div
                        className="align-items-center d-flex"
                        style={{ flex: 1, height: "60px" }}
                      >
                        {React.createElement(
                          isMobile ? MenuFoldOutlined : Col,
                          {
                            onClick: () => setOpen(true),
                            className: isMobile && "mr-10",
                          },
                        )}
                        <Row
                          onClick={() => {
                            if (!isAdmin) navigate(ROUTER.HOME)
                          }}
                          className={`align-items-center nowrap mr-20  ${"pointer"} `}
                          style={{
                            whiteSpace: "nowrap",
                            height: "40px",
                            paddingLeft: 0,
                          }}
                        >
                          <div
                            className={`name-branch h-100pe ${
                              isAdmin ? "" : "hover-menu"
                            }`}
                            onClick={() => {
                              navigate(ROUTER.HOME)
                            }}
                          >
                            <span
                              className={`fw-600 d-flex-center h-100pe ${
                                isMobile ? "fs-12" : "fs-20"
                              }`}
                            >
                              <img src={Logo} className="logo" />
                              <div className="h-100pe d-flex-center logo-text">
                                Hệ thống quản lý tên định danh quốc gia
                              </div>
                            </span>
                          </div>
                        </Row>
                      </div>
                      <>
                        {(!!isLogin ||
                          !!listTabs?.find(item => item?.CategoryID === 32)
                            ?.IsVistTab) && (
                          <div className="mr-16">
                            <div
                              className="d-flex-end manual-btn pointer"
                              onClick={() => {
                                if (!!isLogin) {
                                  navigate(ROUTER.USER_MANUAL)
                                } else {
                                  setRouterBeforeLogin(
                                    `${location.pathname}${location?.search}`,
                                  )
                                  Notice({
                                    isSuccess: false,
                                    msg: "Vui lòng đăng nhập",
                                  })
                                  dispatch(setOpenLoginModal(true))
                                }
                              }}
                            >
                              <SvgIcon name="answer" className="mr-6" />
                              <b>Hướng dẫn sử dụng</b>
                            </div>
                          </div>
                        )}
                        <div className="mr-16">
                          <Dropdown
                            overlay={
                              <NotifyForm
                                getList={() => getListNotify()}
                                paginationNof={paginationNof}
                                listNotify={listNotify}
                                setPaginationNof={setPaginationNof}
                                loading={loading}
                                onClose={() => setVisible(false)}
                              />
                            }
                            onOpenChange={setVisible}
                            open={visible}
                            trigger={["hover", "click"]}
                          >
                            <Col
                              className="pointer mr-16"
                              onClick={() => {
                                if (numberOfNewNotifies > 0) {
                                  setNumberOfNewNotifies(0)
                                  setLoading(true)
                                  NotifyApi.MarkAsSeen("")
                                    .then(res => {
                                      if (res.isOk) {
                                        // getListNotify("")
                                      }
                                    })
                                    .finally(() => setLoading(false))
                                }
                              }}
                            >
                              <Badge
                                count={listNotify?.TotalIsRead || 0}
                                overflowCount={99}
                                size="small"
                                className="notification_count"
                              >
                                <SvgIcon name="bell" />
                              </Badge>
                            </Col>
                          </Dropdown>
                        </div>
                        <Dropdown
                          overlay={menuAccount}
                          overlayStyle={{ minWidth: "300px" }}
                        >
                          <Row gutter={5} className="pointer ">
                            <Col>
                              {/* <Tooltip
                                title={
                                  <div className="sumary-infor-user">
                                    {!!userInfo?.FullName && (
                                      <div className="fullname ">
                                        {userInfo?.FullName}
                                      </div>
                                    )}
                                    {!!userInfo?.Username && (
                                      <SubTableHeader>
                                        {userInfo?.Username}
                                      </SubTableHeader>
                                    )}
                                  </div>
                                }
                              > */}

                              <div
                                className="d-flex-end"
                                style={{ maxWidth: "195px" }}
                              >
                                <div
                                  className="sumary-infor-user"
                                  style={{ minWidth: "100px" }}
                                >
                                  {!!userInfo?.FullName && (
                                    <div className="fullname max-line1 mt-3">
                                      {userInfo?.FullName}
                                    </div>
                                  )}
                                  {!!userInfo?.Username && (
                                    <SubTableHeader className="max-line1 mt-2">
                                      {userInfo?.Username}
                                    </SubTableHeader>
                                  )}
                                </div>
                                {/* </Tooltip> */}
                                <div className="account-infor-avatar">
                                  <Avatar
                                    src={userInfo?.Avatar}
                                    size={40}
                                    className="style-avt mr-8"
                                    style={{ border: "1px solid #ddd" }}
                                    icon={
                                      <UserOutlined
                                        style={{ fontSize: "24px" }}
                                      />
                                    }
                                  />
                                  <div
                                    className="account-infor-sumary"
                                    style={{ height: "100%" }}
                                  >
                                    {/* <span>
                                        {!!user?.FirstName && (
                                          <div className="fullname">
                                            {`${user?.FirstName} ${user?.LastName}`}
                                          </div>
                                        )}
                                      </span> */}
                                    {/* <SvgIcon name="white-down" /> */}
                                  </div>
                                </div>
                              </div>
                            </Col>
                          </Row>
                        </Dropdown>
                      </>
                    </Row>
                  </div>
                ),
              })}
          </div>
        </div>
      </Header>
      {/* {!!isLogin && !isAdmin && (
        <div>
          <MenuBarHome />
        </div>
      )} */}
      <BreadcrumbHome isAdmin={isAdmin} />
      <Layout>
        <Content className="site-layout-background">
          {isAdmin ? (
            <>
              <LayoutAdmin
                children={children}
                menuAdmin={menuAdmin}
                selectedKey={selectedKey}
              />
            </>
          ) : isManagerPage ? (
            <LayoutUser
              children={children}
              menuAdmin={menuAdmin}
              selectedKey={selectedKey}
              userInfo={userInfo}
              menuAccount={menuAccount}
            />
          ) : (
            <>
              <div className="w-100 body-cl">{children}</div>
            </>
          )}
          {!isAdmin && !isManagerPage && <Footer />}
        </Content>
      </Layout>
      <Drawer
        title=""
        placement="left"
        onClose={() => setOpen(false)}
        open={open}
        className="menu-custom"
      >
        <Menu
          onClick={key => onClickMenu(key)}
          selectedKeys={selectedKey}
          mode="inline"
          items={filterMenu(MenuItemBreadcrumb())}
        />
      </Drawer>
      {!!openLoginModal && (
        <LoginModal
          openLoginModal={openLoginModal}
          handleCancel={() => dispatch(setOpenLoginModal(false))}
          handleRegister={() => setOpenRegisterModal(true)}
          setOpenForgetPassModal={() => setOpenForgetPassModal(true)}
        />
      )}
      {!!openForgetPassModal && (
        <ForgetModal
          openForgetPassModal={openForgetPassModal}
          handleOk={() => {}}
          handleCancel={() => setOpenForgetPassModal(false)}
          handleLogin={() => dispatch(setOpenLoginModal(true))}
          setOpenVerifyModal={() => setOpenVerifyModal(true)}
          setEmail={setEmail}
        />
      )}
      {!!openVerifyModal && (
        <VerifyForgetModal
          openVerifyModal={openVerifyModal}
          handleOk={() => {}}
          handleCancel={() => setOpenVerifyModal(false)}
          handleLogin={() => dispatch(setOpenLoginModal(true))}
          setRePasswordModal={() => setRePasswordModal(true)}
          email={email}
          setCodeVerify={setCodeVerify}
        />
      )}
      {/* đổi mật khẩu */}
      {!!rePasswordModal && (
        <RePasswordModal
          rePasswordModal={rePasswordModal}
          handleOk={() => {}}
          handleCancel={() => setRePasswordModal(false)}
          handleLogin={() => dispatch(setOpenLoginModal(true))}
          email={email}
          codeVerify={codeVerify}
        />
      )}
      {!!openRegisterModal && (
        <RegisterModal
          open={openRegisterModal}
          handleCancel={() => setOpenRegisterModal(false)}
          handleLogin={() => dispatch(setOpenLoginModal(true))}
        />
      )}
      {/* {openChangManual && (
        <UpdateUserManual
          visible={openChangManual}
          onCancel={() => setOpenChangManual(false)}
        />
      )} */}
    </LayoutStyled>
  )
}

export default MainLayout
