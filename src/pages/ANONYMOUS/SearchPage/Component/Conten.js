import React from "react"
import { ContenStyle } from "../styled"
import { Col, Row } from "antd"

import imgHumen from "src/assets/images/SearchPage/Group 8896.png"
import Button from "src/components/MyButton/Button"
import { useNavigate } from "react-router"
import ROUTER from "src/router"
import CartService from "src/services/CartService"
import { useDispatch } from "react-redux"
import { setListProductInCart, setTotalProductInCart } from "src/redux/cart"
import Notice from "src/components/Notice"
import { setOpenLoginModal } from "src/redux/loginModal"
import STORAGE, { getStorage } from "src/lib/storage"
import { useContext } from "react"
import { StoreContext } from "src/lib/store"
import { useLocation } from "react-router-dom"

const Conten = ({ data, pagination, setPagination, setDataListBranName }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  const { routerStore } = useContext(StoreContext)
  const [, setRouterBeforeLogin] = routerStore
  const isLogin = getStorage(STORAGE.TOKEN)
  const addCart = async () => {
    try {
      const res = await CartService?.addProductToCart({
        BrandName: data?.BrandName,
      })
      if (res?.isError) return
      CartService.getAllProductInCart()
        .then(res => {
          if (res.isOk) {
            dispatch(setListProductInCart(res?.Object))
            dispatch(setTotalProductInCart(res?.Object.length))
            // setDataListBranName(res?.Object?.lstBrandNameSuggestVM)
            Notice({
              isSuccess: true,
              msg: "Thêm vào giỏ hàng thành công!",
            })
            setPagination(pre => ({ ...pre }))
          }
        })
        .finally(() => { })
    } finally {
    }
  }
  return (
    <ContenStyle>
      <Row className="mid ">
        <Col span={6} className="maineImg box p-10">
          <img src={imgHumen} alt="Hình ảnh người" className="" />
        </Col>
        <Col span={18}>
          <div>
            {/* {!IsAvailable } */}
            <div className="texHead1">
              {!!pagination?.TextSearch ? (
                !!data ? (
                  !!data.IsAvailable ? (
                    <span>Tên định danh này đang khả dụng. Tạo hồ sơ ngay để đăng ký tên định danh</span>
                  ) : (
                    <span className="texHead2">Tên định danh này không khả dụng</span>
                  )
                ) : null
              ) : (
                <span>Hãy nhập tên định danh</span>
              )}
            </div>
            <div className="tex2">{data?.BrandName}</div>
            {!!data?.IsAvailable ? (
              <div className="d-flex-start">
                <Button
                  btnType="third"
                  className="btn"
                  onClick={() => {
                    if (!!isLogin) {
                      navigate(ROUTER.TAO_HO_SO, {
                        state: { Insert: true, TextSearch: data?.BrandName },
                      })
                    } else {
                      setRouterBeforeLogin(
                        `${location.pathname}${location?.search}`,
                      )
                      Notice({ isSuccess: false, msg: "Vui lòng đăng nhập" })
                      dispatch(setOpenLoginModal(true))
                    }
                  }}
                >
                  Tạo hồ sơ ngay
                </Button>
                {!!data?.IsAddCart && (
                  <Button
                    btnType="primary"
                    className="btn ml-8"
                    onClick={() => addCart()}
                  >
                    Thêm giỏ hàng
                  </Button>
                )}
              </div>
            ) : (
              <></>
            )}
          </div>
        </Col>
      </Row>
    </ContenStyle>
  )
}

export default Conten
