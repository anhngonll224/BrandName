import { Tabs } from "antd"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useLocation } from "react-router-dom/dist"
import { SYSTEM_KEY } from "src/constants/constants"
import { DEFAULT_PAGE_SIZE } from "src/constants/pageSizeOptions"
import { getListComboByKey } from "src/lib/utils"
import Dossier from "src/services/Dossier"
import styled from "styled-components"
import RecordsManagementContent from "./Components/RecordsManagementContent"
const Styles = styled.div`
  .ant-tabs-nav {
    margin-bottom: 0;
  }
`
const RecordsManagement = ({ type, isAdmin }) => {
  const location = useLocation()
  const { listSystemKey } = useSelector(state => state.appGlobal)
  const [data, setData] = useState()
  const [loading, setLoading] = useState(false)
  const [listPagi, setListPagi] = useState()
  const [total, setTotal] = useState({})
  const [pagination, setPagination] = useState({
    CurrentPage: 1,
    PageSize: DEFAULT_PAGE_SIZE,
    Procedure: 0,
    TextSearch: "",
    // TopicMain: "",
    type: type,
  })

  useEffect(() => {
    if (location?.state?.Procedure)
      setPagination(pre => ({
        ...pre,
        CurrentPage: 1,
        Procedure: location?.state?.Procedure,
      }))
  }, [location?.state?.Procedure])

  const getList = async () => {
    try {
      setLoading(true)
      let res = {}
      if (type === 1) {
        res = await Dossier.GetAll({
          ...pagination,
        })
      } else if (type === 2) {
        res = await Dossier.getAllTrackingByRole({
          ...pagination,
        })
      }

      if (res.isOk) {
        setData(res?.Object)
        setListPagi(res?.Object)
      }
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    getList()
  }, [pagination, type])

  return (
    <Styles>
      <Tabs
        type="card"
        defaultActiveKey="1"
        // defaultActiveKey="1"
        activeKey={pagination?.Procedure}
        onChange={i => {
          setPagination({
            ...pagination,
            CurrentPage: 1,
            Procedure: i,
          })
        }}
        items={[
          {
            label: `Tất cả(${
              data?.Count?.find(item => item?.CodeValue === 0)?.NumberDossier ||
              0
            })`,
            key: 0,
          },
          ...getListComboByKey(
            SYSTEM_KEY?.DOSSIER_PROCEDURE_TYPE,
            listSystemKey,
          )?.map(i => ({
            label: `${i.Description} (${
              data?.Count?.find(item => item?.CodeValue === i?.CodeValue)
                ?.NumberDossier || 0
            })`,
            key: i.CodeValue,
          })),
        ]}
      />
      <RecordsManagementContent
        getList={getList}
        type={type}
        data={data?.Data}
        btnGeneral={data?.ButtonShow}
        isAdmin={isAdmin}
        pagination={pagination}
        loading={loading}
        setLoading={setLoading}
        setPagination={setPagination}
        handleChangePage={data =>
          setPagination({
            ...pagination,
            ...data,
          })
        }
        listPagi={listPagi}
      />
    </Styles>
  )
}

export default RecordsManagement
