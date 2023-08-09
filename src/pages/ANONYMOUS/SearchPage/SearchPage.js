import React, { useEffect } from "react"
import { StyleSearchPage } from "./styled"
import { Col, Form, Row, Input } from "antd"
import { SearchOutlined } from "@ant-design/icons"
import Button from "src/components/MyButton/Button"
import Head from "./Component/Head"
import Conten from "./Component/Conten"
import Bottom from "./Component/Bottom"
import { useLocation } from "react-router-dom"
import { useState } from "react"
import GuestServices from "src/services/GuestService"
import Notice from "src/components/Notice"
import SpinCustom from "src/components/Spin"

const SearchPage = () => {
  const [loading, setLoading] = useState(false)

  const location = useLocation()
  const [dataListBranName, setDataListBranName] = useState()
  const [pagination, setPagination] = useState()
  useEffect(() => {
    if (location?.state?.TextSearch)
      setPagination({
        TextSearch: location?.state?.TextSearch,
      })
  }, [location?.state])

  const [data, setData] = useState()

  const getListTags = async () => {
    setLoading(true)
    if (pagination?.TextSearch) {
      try {
        const res = await GuestServices.GetListBrandName({ ...pagination })
        if (res?.isError) return

        if (!!res?.Object?.IsAvailable) {
          // Xử lý khi tìm kiếm thành công
          setData(res?.Object)
          setDataListBranName(res?.Object?.lstBrandNameSuggestVM)
        } else {
          // Xử lý khi tìm kiếm thất bại
          setData(res?.Object)
          setDataListBranName(res?.Object?.lstBrandNameSuggestVM)
          Notice({
            isSuccess: false,
            msg: "Tên định danh đã tồn tại!",
          })
        }
      } finally {
        setLoading(false)
      }
    }
  }
  useEffect(() => {
    getListTags()
  }, [pagination])
  return (
    <StyleSearchPage>
      <SpinCustom spinning={loading}>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Head
              pagination={pagination}
              setPagination={setPagination}
              setData={setData}
              defaltvalue={location?.state?.TextSearch}
            />
          </Col>
          <Col span={24}>
            <Conten
              pagination={pagination}
              setPagination={setPagination}
              data={data}
            />
          </Col>
          <Col span={24}>
            <Row>
              <Col span={24} className="texHead">
                Gợi ý khác dành cho bạn
              </Col>
              {/* Map Bottom ở đây */}
              {!!dataListBranName ? (
                <Row>
                  {dataListBranName.map((item, index) => {
                    return (
                      <Col span={12}>
                        <Bottom item={item} />
                      </Col>
                    )
                  })}
                </Row>
              ) : (
                ""
              )}

              {/* <Col span={12}>
              <Bottom />
            </Col>
            <Col span={12}>
              <Bottom />
            </Col>
            <Col span={12}>
              <Bottom />
            </Col> */}
            </Row>
          </Col>
        </Row>
      </SpinCustom>
    </StyleSearchPage>
  )
}

export default SearchPage
