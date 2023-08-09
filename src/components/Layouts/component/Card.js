import { Col, Menu, Row, Empty } from "antd"
import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import Button from "src/components/MyButton/Button"
import ROUTER from "src/router"
import { formatMoney } from "src/lib/utils"
import { CardStyled } from "../styled"

const Card = () => {
  const navigate = useNavigate()
  const [listItems, setListItems] = useState([])
  const { listProductInCart, totalProductInCart } = useSelector(
    state => state.cart,
  )

  useEffect(() => {
    setListItems(
      !!listProductInCart &&
        !!listProductInCart?.length &&
        listProductInCart?.map(item => ({
          key: item.ProductID,
          onClick: () => {
            // window?.scroll(0, 0)
            // navigate(`/chi-tiet-dich-vu/${item?.BrandName}`)
          },
          label: (
            <Row
              gutter={15}
              className="align-items-center"
              style={{ flexWrap: "nowrap" }}
            >
              <Col
                style={{ width: 0 }}
                flex="auto"
                className="fw-600 text-ellipsis-2 text-ellipsis product-name"
              >
                {item.BrandName}
              </Col>

              <Col style={{ color: "#ED1117" }} className="fw-600">
                {formatMoney((item.Price || 200000) * (item.Quantity || 1))}₫
              </Col>
            </Row>
          ),
        })),
    )
  }, [listProductInCart])

  return (
    <CardStyled>
      <div>Tên định danh mới thêm</div>
      {totalProductInCart > 0 ? (
        <Menu items={listItems?.slice(0, 5)} />
      ) : (
        <Empty description="Chưa có tên định danh nào" />
      )}
      <Row className="align-items-center justify-content-space-between box-footer">
        {totalProductInCart > 0 ? (
          <div>{totalProductInCart} tên mới thêm vào giỏ hàng</div>
        ) : (
          <div></div>
        )}
        <Button btnType="red" onClick={() => navigate(ROUTER.GIO_HANG)}>
          Xem giỏ hàng
        </Button>
      </Row>
    </CardStyled>
  )
}

export default Card
