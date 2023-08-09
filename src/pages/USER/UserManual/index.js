import { Empty, Spin } from "antd"
import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { useSelector } from "react-redux"
import UserManualService from "src/services/UserManual"
import SpinCustom from "src/components/Spin"
import Button from "src/components/MyButton/Button"
import UpdateUserManual from "src/components/Layouts/component/UpdateUserManual"

const UserManualStyle = styled.div`
  padding: 0 20px;
`

const UserManual = () => {
  const [openChangManual, setOpenChangManual] = useState(false)
  const { userInfo } = useSelector(state => state?.appGlobal)
  const [loading, setLoading] = useState(false)
  const [htmlContent, setHtmlContent] = useState("")
  const [btn, setBtn] = useState("")

  useEffect(() => {
    setLoading(true)
    UserManualService.getUserGuide({
      AccountType: userInfo?.AccountType,
    })
      .then(res => {
        if (res.isError) return
        if (!!res.Object) {
          setHtmlContent(res.Object?.Data)
          setBtn(res.Object?.ButtonShow)
        } else {
          setHtmlContent("")
        }
      })
      .finally(() => setLoading(false))
  }, [])
  return (
    <SpinCustom spinning={loading}>
      <UserManualStyle>
        <div className="title-type-1 mt-0 d-flex-sb">
          <div>Hướng dẫn sử dụng</div>
          {console.log(btn)}
          {!!btn?.IsUpdate && (
            <Button
              btnType="primary"
              iconName="refresh"
              onClick={() => setOpenChangManual(true)}
            >
              Cập nhật hướng dẫn sử dụng
            </Button>
          )}
        </div>
        {!!htmlContent ? (
          <div
            style={{ minHeight: "50vh" }}
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        ) : (
          <div style={{ height: "50vh" }} className="d-flex-center">
            <Empty
              description={
                <div className="fw-600"> Không có hướng dẫn sử dụng</div>
              }
            />
          </div>
        )}
      </UserManualStyle>

      {openChangManual && (
        <UpdateUserManual
          visible={openChangManual}
          onCancel={() => setOpenChangManual(false)}
        />
      )}
    </SpinCustom>
  )
}

export default UserManual
