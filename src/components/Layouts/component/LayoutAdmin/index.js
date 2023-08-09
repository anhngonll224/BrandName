import { Row, Col, Menu } from "antd"
import { AdminMenuStyled } from "./styled"
import { useNavigate } from "react-router-dom"
import { UserMenuStyled } from "../LayoutUser/styled"
import { useState } from "react"
import { DoubleLeftOutlined } from "@ant-design/icons"

const LayoutAdmin = ({ children, selectedKey, menuAdmin }) => {
  const navigate = useNavigate()
  const [collapseMenu, setCollapseMenu] = useState(false)
  const [themeDark, setThemeDark] = useState(false)
  const onChange = menu => {
    !menu?.key?.includes("subkey") &&
      navigate(menu?.key?.replace("submenu", ""))
  }
  return (
    <Row gutter={20} style={{ flexWrap: "nowrap" }}>
      <Col style={{ marginLeft: -20 }}>
        <UserMenuStyled
          themeDark={themeDark}
          collapseMenu={collapseMenu}
          style={{ top: 60, height: "calc(100vh - 60px)" }}
        >
          <div
            className={`side-bar-wrapper d-flex flex-column justify-content-space-between`}
          >
            <Menu
              onClick={onChange}
              selectedKeys={selectedKey}
              mode="inline"
              defaultOpenKeys={[
                "subkey1",
                "subkey2",
                "subkey3",
                "subkey4",
                "subkey5",
              ]}
              items={menuAdmin}
              // className="menu-antd-admin"
              className="menu-antd-user pt-5"
              theme={themeDark ? "dark" : "light"}
              inlineCollapsed={collapseMenu}
            />
            <div
              className="collapsed-item"
              onClick={() => setCollapseMenu(!collapseMenu)}
            >
              <div className="collapsed-icon">
                <DoubleLeftOutlined rotate={collapseMenu ? 180 : 0} />
              </div>
              <div className="collapsed-title">Thu gọn</div>
            </div>
          </div>
        </UserMenuStyled>
      </Col>
      <Col
        flex="auto"
        className="pt-12 pr-24"
        style={{
          width: 0,
          height: "100vh",
          overflowY: "auto",
        }}
        id="body-admin-scroll"
      >
        {children}
      </Col>
    </Row>
  )
}

export default LayoutAdmin
