import { useLocation, useNavigate } from "react-router-dom"
import ROUTER from "src/router"
import SvgIcon from "../../../SvgIcon/index"
import { MenuHeaderStyle } from "./styled"
import STORAGE, { getStorage } from "src/lib/storage"
import { useDispatch, useSelector } from "react-redux"
import { useContext } from "react"
import { StoreContext } from "src/lib/store"
import Notice from "src/components/Notice"
import { setOpenLoginModal } from "src/redux/loginModal"
import useWindowSize from "src/lib/useWindowSize"
const MenuHeader = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { listTabs } = useSelector(state => state?.appGlobal)
  const isLogin = getStorage(STORAGE.TOKEN)
  const dispatch = useDispatch()
  const { routerStore } = useContext(StoreContext)
  const [, setRouterBeforeLogin] = routerStore
  const listMenu = [
    // {
    //   Key: ROUTER.TIM_VIEC,
    //   title: "Tìm việc",
    //   icon: <SvgIcon name="briefcase-header" />,
    //   onClick: () => {
    //     navigate(ROUTER.TIM_VIEC)
    //   },
    // },
    // {
    //   Key: ROUTER.TIN_TUC,
    //   title: "Tin tức",
    //   icon: <SvgIcon name="note-header" />,
    //   onClick: () => {
    //     navigate(ROUTER.TIN_TUC)
    //   },
    // },

    {
      Key: ROUTER.LIEN_HE,
      title: "Liên hệ",
      icon: <SvgIcon name="whatsapp-header" />,
      onClick: () => {
        navigate(ROUTER.LIEN_HE)
      },
    },
    {
      Key: ROUTER.USER_MANUAL,
      title: "Hướng dẫn sử dụng",
      icon: <SvgIcon name="answer" />,
      hide:
        !isLogin || !listTabs?.find(item => item?.CategoryID === 32)?.IsVistTab,
      onClick: () => {
        if (!!isLogin) {
          navigate(ROUTER.USER_MANUAL)
        } else {
          setRouterBeforeLogin(`${location.pathname}${location?.search}`)
          Notice({ isSuccess: false, msg: "Vui lòng đăng nhập" })
          dispatch(setOpenLoginModal(true))
        }
      },
    },
    // {
    //   Key: ROUTER.TAO_HO_SO,
    //   title: "Tạo hồ sơ",
    //   // icon: <SvgIcon name="whatsapp-header" />,
    //   onClick: () => {
    //     navigate(ROUTER.TAO_HO_SO)
    //   },
    // },
  ]
  const activeStyle = { color: "#ff3333" }

  return (
    <MenuHeaderStyle>
      {!useWindowSize.isMobile() && (
        <div className="menu-header-wrap">
          {listMenu.map((i, idx) =>
            !i?.hide ? (
              <div
                className={`menu-item ${
                  location.pathname === i.Key ? "active" : ""
                }`}
                key={`menuheader${idx}`}
                onClick={i.onClick}
              >
                <div className="menu-item_icon">{i.icon}</div>
                <div
                  style={i.key === idx ? activeStyle : {}}
                  className="menu-item_title"
                >
                  {i.title}
                </div>
              </div>
            ) : (
              <></>
            ),
          )}
        </div>
      )}
    </MenuHeaderStyle>
  )
}

export default MenuHeader
