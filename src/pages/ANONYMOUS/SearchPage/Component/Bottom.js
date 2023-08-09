import React from "react"
import { BottomStyle } from "../styled"
import { Col, Row } from "antd"
import Button from "src/components/MyButton/Button"
import { useLocation, useNavigate } from "react-router"
import ROUTER from "src/router"
import STORAGE, { getStorage } from "src/lib/storage"
import { useDispatch } from "react-redux"
import { useContext } from "react"
import { StoreContext } from "src/lib/store"
import Notice from "src/components/Notice"
import { setOpenLoginModal } from "src/redux/loginModal"
const Bottom = ({ item }) => {
  const navigate = useNavigate()
  const isLogin = getStorage(STORAGE.TOKEN)
  const dispatch = useDispatch()
  const location = useLocation()
  const { routerStore } = useContext(StoreContext)
  const [, setRouterBeforeLogin] = routerStore
  return (
    <BottomStyle>
      <Row gutter={[16, 16]} className="main">
        <Col span={24} className="box">
          <Row className="boxItem">
            <Col className="tex">{item.BrandName}</Col>
            <Col>
              <Button
                btnType="primary"
                onClick={() => {
                  if (!!isLogin) {
                    navigate(ROUTER.TAO_HO_SO, {
                      state: { Insert: true, TextSearch: item?.BrandName },
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
                Tạo hồ sơ với tên định danh này
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </BottomStyle>
  )
}

export default Bottom
