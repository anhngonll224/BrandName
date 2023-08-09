import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import STORAGE, { getStorage } from "src/lib/storage"
import CommonService from "src/services/CommonService"
import "./App.css"
import ModalLoading from "./components/Modal/Loading"
import SpinCustom from "./components/Spin"
import { ACCOUNT_TYPE_ID } from "./constants/constants"
import { getListSystemKey, setListTabs, setUserInfo } from "./redux/appGlobal"
import { setListProductInCart, setTotalProductInCart } from "./redux/cart"
import AppRouter from "./router/AppRouter"
import CartService from "./services/CartService"
import RoleService from "./services/RoleService"
import { changeTotalDossier } from "./redux/dossier"
import Dossier from "./services/Dossier"

function App() {
  const isLogin = getStorage(STORAGE.TOKEN)
  const dispatch = useDispatch()
  const { modalLoading } = useSelector(state => state.common)
  const [loading, setLoading] = useState(false)

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
  useEffect(() => {
    if (!!isLogin) {
      getData()
      getListCart()
      getTotalDossier()
    }
  }, [isLogin])

  const getSystemKey = async () => {
    const res = await CommonService.getSystemKey("All")
    if (res.IsError) return
    dispatch(getListSystemKey(res.Object))
  }
  const getData = async () => {
    try {
      setLoading(true)
      dispatch(setUserInfo(getStorage(STORAGE.USER_INFO)))
      if (
        getStorage(STORAGE.USER_INFO)?.AccountType !== ACCOUNT_TYPE_ID.HocVien
      ) {
        const resp = await RoleService.getListTab()
        if (resp.isOk) {
          dispatch(setListTabs(resp.Object))
        }
      }
      getSystemKey()
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className="layout-center">
      <div className="layout-max-width">
        {loading ? (
          <div className="loading-center" style={{ height: "100vh" }}>
            <SpinCustom />
          </div>
        ) : (
          <AppRouter />
        )}
      </div>
      {!!modalLoading && <ModalLoading />}
    </div>
  )
}

export default App
