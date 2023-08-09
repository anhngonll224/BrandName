import { Result } from "antd"
import { useContext, useEffect } from "react"
import { useSelector } from "react-redux"
import { NavLink, Navigate, Outlet } from "react-router-dom"
import { useLocation } from "react-router-dom"
import MainLayout from "src/components/Layouts"
import Button from "src/components/MyButton/Button"
import STORAGE, { getStorage } from "src/lib/storage"
import { StoreContext } from "src/lib/store"
import ROUTER from "src/router"

function PrivateRoutes() {
  const { routerStore } = useContext(StoreContext)
  const [, setRouterBeforeLogin] = routerStore
  const isLogin = getStorage(STORAGE.TOKEN)
  const location = useLocation()

  const { listTabs } = useSelector(state => state?.appGlobal)
  const checktab = !listTabs?.find(item => item?.CategoryID === 32)?.IsVistTab
  // useEffect(() => {
  //   if (!isLogin)
  //     setRouterBeforeLogin(`${location.pathname}${location?.search}`)
  // }, [isLogin])
  return !!isLogin ? (
    // !checktab ? (
    <MainLayout>
      <Outlet />
    </MainLayout>
  ) : (
    // ) : (
    //   <Result
    //     status="403"
    //     title="403 Erorr Permission"
    //     subTitle="Xin lỗi, Bạn không có quyền truy cập trang web."
    //     extra={
    //       <NavLink to="/">
    //         <div style={{ display: "flex", justifyContent: "center" }}>
    //           <Button type="primary" className="btn-hover-shadow">
    //             Quay lại trang chủ
    //           </Button>
    //         </div>
    //       </NavLink>
    //     }
    //   />
    // )
    <Navigate to={ROUTER.HOME} />
  )
}

export default PrivateRoutes
