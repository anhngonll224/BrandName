import { SearchOutlined } from "@ant-design/icons"
import { Col, Form, Input, Row } from "antd"
import { useDispatch } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import Button from "src/components/MyButton/Button"
import Notice from "src/components/Notice"
import STORAGE, { getStorage } from "src/lib/storage"
import { setOpenLoginModal } from "src/redux/loginModal"
import ROUTER from "src/router"
import { HeadStyle } from "../styled"
import { useContext } from "react"
import { StoreContext } from "src/lib/store"

const Head = ({ pagination, setPagination, setData, defaltvalue }) => {
  const navigate = useNavigate()
  const isLogin = getStorage(STORAGE.TOKEN)
  const dispatch = useDispatch()
  const [form] = Form.useForm()
  const location = useLocation()
  const { routerStore } = useContext(StoreContext)
  const [, setRouterBeforeLogin] = routerStore
  const { Search } = Input

  return (
    <HeadStyle>
      <Row gutter={[16, 16]} className="box">
        <Col span={20}>
          <Form form={form}>
            <Form.Item
              name="TextSearch"
              rules={[
                {
                  // pattern: getRegexBrandName(),
                  message:
                    "Tên định danh không quá 11 ký tự viết liền nhau sử dụng chữ cái Latin, chữ số (từ 0 đến 9) hoặc các ký tự (-), (_), (.), khoảng trắng!",
                },

                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!!value) {
                      let myRegex = /[^A-Za-z0-9\-_.\s]/g
                      let isBrand = myRegex.exec(value)
                      if (isBrand || value?.length > 11)
                        return Promise.reject(
                          new Error(
                            "Tên định danh không quá 11 ký tự viết liền nhau sử dụng chữ cái Latin, chữ số (từ 0 đến 9) hoặc các ký tự (-), (_), (.), khoảng trắng; không phân biệt chữ hoa, chữ thường; không là một tập hợp chỉ gồm các chữ số và được sử dụng để hiển thị hoặc xác định thông tin về nguồn gửi!",
                          ),
                        )
                      else return Promise.resolve()
                    } else return Promise.resolve()
                  },
                }),
              ]}
            >
              <Search
                placeholder="Nhập tên định danh bạn muốn tra cứu"
                enterButton={
                  <div className="d-flex">
                    <SearchOutlined twoToneColor="#EEF5FF" />
                    <span>Tra cứu</span>
                  </div>
                }
                onSearch={value => {
                  setPagination(prevPagination => ({
                    ...prevPagination,
                    TextSearch: value,
                  }))
                }}
                size="large"
                defaultValue={defaltvalue}
                // onChange={e => {
                //   const searchText = e.target.value
                //   formatter(searchText)
                // }}
              />
            </Form.Item>
          </Form>
        </Col>
        <Col
          span={4}
          className="d-flex"
          style={{ justifyContent: "flex-end", alignItems: "flex-start" }}
        >
          <Button
            btnType="primary"
            onClick={() => {
              if (!!isLogin) {
                navigate(ROUTER.TAO_HO_SO, { state: { Insert: true } })
              } else {
                if (!isLogin)
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
        </Col>
      </Row>
    </HeadStyle>
  )
}

export default Head
