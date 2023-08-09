import { DoubleLeftOutlined, UserOutlined } from "@ant-design/icons"
import { Avatar, Col, Menu, Row, Tooltip } from "antd"
import { useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { hasPermission } from "src/lib/utils"
import { MenuItemUser } from "../../MenuItems"
import { UserMenuStyled } from "./styled"
import "./styled.scss"
const LayoutUser = ({ children, selectedKey, menuAccount, userInfo }) => {
  const navigate = useNavigate()
  const [collapseMenu, setCollapseMenu] = useState(false)
  const [themeDark, setThemeDark] = useState(false)
  const { listTabs } = useSelector(state => state?.appGlobal)

  const { dossierTotal } = useSelector(state => state.dossier)
  const onChange = menu => {
    !menu?.key?.includes("subkey") &&
      navigate(menu?.key?.replace("submenu", ""))
  }

  return (
    <Row gutter={20} style={{ flexWrap: "nowrap" }}>
      <Col style={{ marginLeft: -20 }}>
        <UserMenuStyled themeDark={themeDark} collapseMenu={collapseMenu}>
          <div
            className={`side-bar-wrapper d-flex flex-column justify-content-space-between`}
          >
            <div>
              <div
                className={`sub-menu ${
                  collapseMenu ? "" : "background-menu-box ml-8"
                }`}
              >
                <div
                  className={`my-account d-flex align-items-center ${
                    collapseMenu ? "justify-content-center" : ""
                  }`}
                >
                  <Avatar
                    size={collapseMenu ? 50 : 42}
                    icon={<UserOutlined />}
                    src={userInfo?.Avatar}
                  />
                  {!collapseMenu && (
                    <Tooltip
                      mouseEnterDelay={1}
                      title={
                        <div className="fs-24 fw-600 ml-8 ">
                          {userInfo?.FullName}
                        </div>
                      }
                    >
                      <div
                        className="fs-24 fw-600 ml-8 max-line1"
                        style={{ maxWidth: "188px" }}
                      >
                        {userInfo?.FullName}
                      </div>
                    </Tooltip>
                  )}
                </div>
                {/* {collapseMenu ? (
                  <div className="mt-20">
                    <SvgIcon
                      name="home"
                      className="icon-option"
                      onClick={() => navigate(ROUTER.HOME)}
                    />
                  </div>
                ) : (
                  <div className="quick-option d-flex align-items-center justify-content-flex-start">
                    <SvgIcon
                      name="home"
                      className="icon-option mr-16"
                      onClick={() => navigate(ROUTER.HOME)}
                    />
                    <SvgIcon
                      name="user-outline"
                      className="icon-option"
                      onClick={() => navigate(ROUTER.QUAN_LY_HO_SO)}
                    />
                    <Switch
                      checkedChildren={<BsFillMoonStarsFill />}
                      unCheckedChildren={<BsSunFill />}
                      checked={themeDark}
                      onChange={checked => setThemeDark(checked)}
                      className="mr-16 ml-16"
                    />
                    <SvgIcon name="logoutIcon" className="icon-option" />
                  </div>
                )} */}
              </div>
              <Menu
                onClick={onChange}
                selectedKeys={selectedKey}
                mode="inline"
                defaultOpenKeys={["subkey1", "subkey2"]}
                items={MenuItemUser(dossierTotal)
                  ?.filter(x => hasPermission(x?.TabID, [...listTabs]))
                  ?.map(i => ({
                    ...i,
                    children: i?.children?.filter(x =>
                      hasPermission(x?.TabID, [...listTabs]),
                    ),
                  }))}
                className="menu-antd-user"
                theme={themeDark ? "dark" : "light"}
                inlineCollapsed={collapseMenu}
              />
            </div>
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
        id="layout-user-scroll"
      >
        {children}
      </Col>
    </Row>
  )
}

export default LayoutUser
