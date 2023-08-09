import { useContext, useEffect } from "react"
import { useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import SpinCustom from "src/components/Spin"
import STORAGE, { setStorage } from "src/lib/storage"
import { StoreContext } from "src/lib/store"
import ROUTER from "src/router"
import AuthService from "src/services/AuthService"

const LoginGG = () => {
  const location = useLocation()
  const ID = location?.search?.slice(4)
  const navigate = useNavigate()
  const { typeMenu } = useSelector(state => state?.appGlobal)
  const { routerStore } = useContext(StoreContext)
  const [routerBeforeLogin, setRouterBeforeLogin] = routerStore
  useEffect(() => {
    if (!!ID) getToken()
  }, [ID])

  const getToken = async () => {
    try {
      const res = await AuthService.callbackGG({ ID })
      if (res?.isError) return
      setStorage(STORAGE.TOKEN, res?.Object?.Token)
      setStorage(STORAGE.USER_INFO, res?.Object)
      navigate(
        !!routerBeforeLogin
          ? routerBeforeLogin
          : // : res?.Object?.AccountType !== typeMenu
            // ? ROUTER.THONG_KE_TONG_QUAN
            ROUTER.HOME,
      )
      setRouterBeforeLogin(undefined)
    } finally {
    }
  }
  return (
    <SpinCustom spinning>
      <div style={{ height: "100vh", width: "100vw" }}></div>
    </SpinCustom>
  )
}

export default LoginGG
