import React, { useState } from "react"
import { TableBottomStyle } from "../styled"
import TableCustom from "src/components/Table/CustomTable"
import ROUTER from "src/router"
import { useNavigate } from "react-router-dom"

const TableBottom = ({ data, type, overView }) => {
  const navigate = useNavigate()

  const columns = [
    // {
    //   title: "Mã ngành",
    //   dataIndex: "Procedure",
    //   key: "Procedure",
    //   width: 70,
    //   align: "center",
    // },
    {
      title: "STT",
      dataIndex: "FieldCode",
      key: "FieldCode",
      width: 70,
      align: "center",
      render: (value, record, idx) => idx + 1,
    },
    {
      title: "Mã hồ sơ",
      dataIndex: "DossierCodeDisplay",
      key: "DossierCodeDisplay",
      width: "12%",
      align: "center",
    },
    {
      title: "Tên định danh",
      dataIndex: "IdentifyName",
      key: "IdentifyName",
      width: "18%",
      align: "center",
    },
    {
      title: "Tên đơn vị đăng ký",
      dataIndex: "RegisterName",
      key: "RegisterName",
      width: "50%",
      align: "center",
    },
    {
      title: "Ngày gửi",
      dataIndex: "DateSend",
      key: "DateSend",
      width: "20%",
      align: "center",
    },
  ]
  const [displayedDataCount, setDisplayedDataCount] = useState(4)

  const handleLoadMore = () => {
    // setDisplayedDataCount(prevCount => prevCount + 4)
    // window.location.href = Roting
    navigate(`${ROUTER.QUAN_LY_TAI_KHOAN_HO_SO_CHO_XU_LY}`, {
      state: stateTable,
    })
  }

  // const displayedData = data.DossierNew
  //   ? data.DossierNew.slice(0, displayedDataCount)
  //   : []

  const displayedDataKey = {
    1: "DossierNew",
    2: "DossierRecall",
    3: "DossierReIssue",
    4: "DossierRenew",
    5: "DossierChangInfor",
  }[type]
  const displayedDataKey1 = {
    1: () => overView?.NumberDossierNew,
    2: () => overView?.NumberDossierRecall,
    3: () => overView?.NumberDossierReIssue,
    4: () => overView?.NumberDossierRenew,
    5: () => overView?.NumberDossierChangeInfor,
  }[type]

  const stateTable = {
    1: "1",
    2: "4",
    3: "2",
    4: "3",
    5: "5",
    // 6: "6",
  }[type]

  const displayedData = data?.[displayedDataKey]
    ? data?.[displayedDataKey].slice(0, displayedDataCount)
    : []

  const title = {
    1: "Cấp mới hồ sơ",
    2: "Thu hồi hồ sơ",
    3: "Cấp lại hồ sơ",
    4: "Gia hạn hồ sơ",
    5: "Hồ sơ thay đổ",
  }[type]

  return (
    <TableBottomStyle>
      {displayedData.length > 0 && (
        <div className="title-type-none d-flex justify-content-space-between pt-2 pb-12 mb-16">
          <div className="w-100pe">
            {title} ({displayedDataKey1 ? displayedDataKey1() : "N/A"})
          </div>
        </div>
      )}

      {displayedData.length > 0 && (
        <TableCustom
          dataSource={displayedData}
          isPrimary
          columns={columns}
          rowKey="DossierCodeDisplay"
          onRow={(record, rowIndex) => {
            return {
              onClick: event => {
                // setDataEdit(record)
                // form.setFieldsValue({ ...record })
              },
            }
          }}
          pagination={false}
        />
      )}
      {displayedData.length > 0 && (
        <div className="text-center mt-16">
          <a
            href
            className="btn btn-primary"
            onClick={handleLoadMore}
            style={{
              padding: "8px 16px",
              borderRadius: "4px",
              fontSize: "14px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Xem thêm
          </a>
        </div>
      )}
    </TableBottomStyle>
  )
}

export default TableBottom
