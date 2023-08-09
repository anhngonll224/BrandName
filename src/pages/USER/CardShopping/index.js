import { MinusOutlined, PlusOutlined } from "@ant-design/icons"
import { Checkbox, Col, Divider, Empty, Popover, Row, Spin, Tabs } from "antd"
import { useEffect, useMemo, useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import LayoutCommon from "src/components/Common/Layout"
import Delete from "src/components/Modal/Delete"
import Button from "src/components/MyButton/Button"
import Notice from "src/components/Notice"
import SvgIcon from "src/components/SvgIcon"
import { formatMoney } from "src/lib/utils"
import { setListProductInCart, setTotalProductInCart } from "src/redux/cart"
import ROUTER from "src/router"
import CartService from "src/services/CartService"
import { CardShoppingStyled } from "./styled"
import SpinCustom from "src/components/Spin"

const CardShopping = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [checkBox, setCheckBox] = useState([])
  const [loading, setLoading] = useState(false)
  const [listProducts, setListProduct] = useState([])
  const [productDelete, setProductDelete] = useState(false)

  useEffect(() => {
    getListCart()
  }, [])

  const getListCart = () => {
    setLoading(true)
    CartService.getAllProductInCart()
      .then(res => {
        if (res.isOk) {
          setListProduct(res.Object)
          dispatch(setListProductInCart(res.Object))
          dispatch(setTotalProductInCart(res.Object.length))
        }
      })
      .finally(() => setLoading(false))
  }

  const deleteProduct = listId => {
    try {
      setLoading(true)
      CartService.deleteProductInCart(listId).then(res => {
        if (res.isOk) {
          setProductDelete()
          setCheckBox(
            checkBox.filter(i => {
              return !listId.includes(i.BrandName)
            }),
          )
          Notice({
            msg: "Xóa thành công.",
            isSuccess: true,
          })
          getListCart()
        } else {
          setLoading(false)
        }
      })
    } catch (err) {
      setLoading(false)
    }
  }

  const onCheckAll = e => {
    const { checked } = e?.target
    if (checked) setCheckBox(listProducts.map(i => i?.BrandName))
    else setCheckBox([])
  }

  const onChangeCheckBox = (e, id) => {
    const { checked } = e?.target
    if (checked) setCheckBox(i => [...i, id])
    else setCheckBox(i => i?.filter(a => a !== id))
  }

  const sum = listProducts
    ?.filter(i => checkBox.includes(i?.BrandName))
    ?.reduce(
      (partialSum, a) =>
        partialSum +
        (a?.Quantity || 1) *
          (((a?.Price || 200000) * (100 - (a?.Discount || 0))) / 100),
      0,
    )
  return (
    <CardShoppingStyled>
      <SpinCustom spinning={loading}>
        <LayoutCommon>
          <Row
            gutter={15}
            style={{ margin: 0 }}
            className="align-items-center box-header"
          >
            <Col span={1} className="center">
              {listProducts.length > 0 && (
                <Checkbox
                  checked={checkBox.length === listProducts.length}
                  onChange={!!onCheckAll ? onCheckAll : () => {}}
                />
              )}
            </Col>
            <Col span={17}>Tên định danh</Col>
            {/* <Col span={3} className="center justify-content-center">
              Đơn giá
            </Col>
            <Col span={4} className="center justify-content-center">
              Giảm giá
            </Col> */}
            <Col span={4} className="center justify-content-center">
              Thành tiền
            </Col>
            <Col span={2}>Xóa</Col>
          </Row>

          <div className="box-item">
            {listProducts?.length ? (
              listProducts?.map((i, idx) => (
                <Row gutter={15} key={i?.BrandName} style={{ margin: 0 }}>
                  <Col span={1} className="center">
                    <Checkbox
                      checked={checkBox.includes(i?.BrandName)}
                      onChange={e => onChangeCheckBox(e, i?.BrandName)}
                    />
                  </Col>

                  <Col span={17}>
                    <Row
                      gutter={10}
                      style={{ flexWrap: "nowrap" }}
                      className="align-items-center"
                      onClick={() => {
                        // window?.scroll(0, 0)
                        // navigate(`/chi-tiet-dich-vu/${i.BrandName}`)
                      }}
                    >
                      {/* <Popover
                        key={`cour${idx}`}
                        placement="rightTop"
                        content={
                          // <DetailService
                          //   item={{ ...i, ListExamination: i?.lstExamination }}
                          // />
                          <></>
                        }
                        overlayClassName="detail-course-popover"
                      >
                        <Col>
                          <div className="box-image">
                            <img alt="san pham" src={i?.FileUrl} width="60px" />
                          </div>
                        </Col>
                      </Popover> */}
                      <Col className="fw-600 text-ellipsis-2 text-ellipsis">
                        {i?.BrandName}
                      </Col>
                    </Row>
                  </Col>

                  <Col
                    span={4}
                    style={{ color: "#ED1117" }}
                    className="center justify-content-center"
                  >
                    {formatMoney(
                      (
                        (i?.Quantity || 1) *
                        (((i?.Price || 200000) * (100 - (i?.Discount || 0))) /
                          100)
                      )?.toFixed(0),
                    )}
                    ₫
                  </Col>
                  <Col
                    span={2}
                    className="center pointer"
                    onClick={() => !!setProductDelete && setProductDelete(i)}
                  >
                    <SvgIcon name="bin" />
                  </Col>
                  {idx !== listProducts?.length - 1 && <Divider />}
                </Row>
              ))
            ) : (
              <Empty description="Chưa có tên định danh nào" />
            )}
          </div>
          <Row
            className="box-item mt-24 align-items-center"
            gutter={15}
            style={{ margin: 0 }}
          >
            {listProducts.length > 0 && (
              <>
                <Col span={1} className="center">
                  <Checkbox
                    checked={checkBox.length === listProducts.length}
                    onChange={onCheckAll}
                  />
                </Col>
                <Col>{`Chọn tất cả (${listProducts?.length})`}</Col>
                <Col>
                  {checkBox.length === listProducts.length ? (
                    <Row
                      gutter={10}
                      className="center pointer align-items-center"
                      onClick={() =>
                        !!setProductDelete && setProductDelete(checkBox)
                      }
                    >
                      <Col>
                        <SvgIcon name="bin" />
                      </Col>
                      <Col>Xóa</Col>
                    </Row>
                  ) : null}
                </Col>
              </>
            )}
            <Col flex="auto">
              <Row
                gutter={20}
                className="align-items-center justify-content-flex-end"
              >
                <Col>
                  <div className="text-center">Tổng thanh toán</div>
                  <div
                    className="text-center fs-20"
                    style={{ color: "#ED1117" }}
                  >
                    {sum?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}₫
                  </div>
                </Col>
                <Col>
                  <Button
                    disabled={!checkBox?.length}
                    btnType="linear"
                    style={{ padding: "20px 30px" }}
                    onClick={() => {
                      navigate(ROUTER.TAO_HO_SO, {
                        state: {
                          Insert: true,
                          listIdentifyName: listProducts
                            ?.filter(i => checkBox.includes(i?.BrandName))
                            ?.map(item => item?.BrandName),
                        },
                      })
                    }}
                  >
                    Đăng ký
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </LayoutCommon>
      </SpinCustom>
      {!!productDelete && (
        <Delete
          isOpen={!!productDelete}
          content={{
            title: (
              <div className="fw-600 text-center" style={{ fontSize: 16 }}>
                {productDelete.length > 0 ? (
                  "Bạn có chắc chắn muốn xóa tất cả tên định danh"
                ) : (
                  <div style={{ fontSize: 16 }}>
                    Bạn có chắc chắn muốn xóa tên định danh{" "}
                    <b>{productDelete?.PackageName}</b>
                  </div>
                )}{" "}
                khỏi giỏ hàng không?
              </div>
            ),
          }}
          onOk={() => {
            deleteProduct(
              productDelete.length > 0
                ? productDelete.map(i => i?.BrandName)
                : [productDelete.BrandName],
            )
          }}
          onCancel={() => setProductDelete(undefined)}
        />
      )}
    </CardShoppingStyled>
  )
}

export default CardShopping
