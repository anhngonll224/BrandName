import { Breadcrumb } from "antd"
import BreadcrumbItem from "antd/es/breadcrumb/BreadcrumbItem"
import React from "react"
import { useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router"
import LayoutCommon from "src/components/Common/Layout"
import LayoutAdminCommon from "src/components/Common/LayoutAdmin"
import { findParent, treeToList } from "src/lib/utils"
import ROUTER from "src/router"
import MenuItemBreadcrumb from "../MenuItems"

const BreadcrumbHome = ({ isAdmin }) => {
  const location = useLocation()
  const navigate = useNavigate()

  const treeLabel = tree =>
    tree?.map(i => ({
      ...i,
      title: i?.label,
      children: treeLabel(i?.children),
    }))
  const { listCount } = useSelector(state => state?.appGlobal)
  const pathSpecial = ["/chi-tiet-khoa-hoc", ROUTER.VAO_HOC]?.find(i =>
    location?.pathname?.includes(i),
  )

  const locationPathName = pathSpecial ? pathSpecial : location?.pathname

  const items = treeLabel(MenuItemBreadcrumb(navigate, listCount))
  const parents =
    findParent({ children: items }, `${locationPathName}${location?.search}`) ||
    findParent({ children: items }, `${locationPathName}`)
  const listParent = treeToList([parents], "key")
    .reverse()
    ?.filter(i => i?.label)

  const hideBread =
    listParent?.[0]?.key?.includes("submenu") ||
    [ROUTER.TAI_LIEU]?.includes(listParent?.[0]?.key)
  return (
    <>
      {!isAdmin && !!listParent?.length && !hideBread && (
        <div
          className="box-breadcrumb-header"
          style={isAdmin ? { position: "sticky", top: 0, zIndex: 100 } : {}}
        >
          <div className="breadcrumb-header">
            {React.createElement(isAdmin ? LayoutAdminCommon : LayoutCommon, {
              children: (
                <Breadcrumb separator=">">
                  <BreadcrumbItem
                    style={{
                      cursor: "pointer",
                    }}
                    href={ROUTER?.HOME}
                  >
                    Trang chủ
                  </BreadcrumbItem>
                  {listParent?.map((i, idx) => (
                    <BreadcrumbItem
                      style={{
                        cursor:
                          !i?.key?.includes("subkey") &&
                          idx !== listParent?.length - 1
                            ? "pointer"
                            : "unset",
                      }}
                      href={
                        i?.key?.includes("subkey") ||
                        idx === listParent?.length - 1
                          ? undefined
                          : i?.key
                      }
                      key={i?.key}
                    >
                      {i?.label}
                    </BreadcrumbItem>
                  ))}
                </Breadcrumb>
              ),
            })}
          </div>
        </div>
      )}
    </>
  )
}

export default BreadcrumbHome
