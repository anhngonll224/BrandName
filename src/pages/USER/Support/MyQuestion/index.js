import LayoutCommon from "src/components/Common/Layout"
import { MyQuestionStyle } from "./styled"
import { Row, Col, Select, DatePicker, Tooltip } from "antd"
import moment from "moment"
import Button from "src/components/MyButton/Button"
import TableCustom from "src/components/Table/CustomTable"
import Search from "antd/es/transfer/search"
import FlSelect from "src/components/FloatingLabel/Select"
import AddQuestionModal from "./AddQuestionModal"
import FlDatePicker from "src/components/FloatingLabel/DatePicker"
import { useState, useEffect } from "react"
import FlInput from "src/components/FloatingLabel/Input"
import ContactSer from "src/services/ContactSer"
import { useSelector } from "react-redux"
import {
  MainTableData,
  MainTableHeader,
  SubTableData,
  SubTableHeader,
} from "src/components/Table/CustomTable/styled"
import { getListComboByKey } from "src/lib/utils"
import ModalDetailRequest from "./Model/ModalDetailRequest"
import { StyleRecruitment } from "src/pages/ADMIN/RequestSupport/styled"
export const statusColor = ["#FF720D", "#00AEAC", "#FF4648"]
const { RangePicker } = DatePicker
const { Option } = Select
const MyQuestion = () => {
  const [openAddQuestionModal, setOpenAddQuestionModal] = useState(false)
  const [data, setData] = useState()
  const [textSearch, setTextSearch] = useState("")
  const [pagination, setPagination] = useState({
    PageSize: 20,
    CurrentPage: 1,
    TextSearch: "",
    FromDate: "",
    ToDate: "",
    Status: 0,
  })
  const { listSystemKey } = useSelector(state => state.appGlobal)
  const [loading, setLoading] = useState(false)
  const [ModelDetail, setModelDetail] = useState(false)
  const [total, setTotal] = useState()
  // đây là hỗ trợ người dùng
  const getList = async () => {
    try {
      setLoading(true)
      const res = await ContactSer.getContactUser({
        ...pagination,
      })
      if (res?.isError) return
      setData(res?.Object?.GetAll)
      setTotal(res?.Object?.Total)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    getList()
  }, [pagination])
  // const columns = [
  //   {
  //     title: "Mã yêu cầu",
  //     dataIndex: "RequestCode",
  //     key: "RequestCode",
  //     width: "8%",
  //     align: "center",
  //   },
  //   {
  //     title: "Tiêu đề hỗ trợ",
  //     dataIndex: "Content",
  //     key: "Content",
  //     width: "30%",
  //     align: "center",
  //     render: (text, record) => (
  //       <Tooltip
  //         title={
  //           <div style={{ overflow: "auto", maxHeight: "200px" }}>
  //             <div>{text}</div>
  //           </div>
  //         }
  //       >
  //         <div className="max-line3" style={{ width: '300px' }}>{text}</div>
  //       </Tooltip>
  //     ),
  //   },
  //   {
  //     title: "Nội dung đã hỗ trợ/Từ chối",
  //     dataIndex: "SupportContent",
  //     key: "SupportContent",
  //     with: 100,

  //     render: (text, record) => (
  //       <Tooltip
  //         title={
  //           <div style={{ overflow: "auto", maxHeight: "200px" }}>
  //             <div>{text}</div>
  //           </div>
  //         }
  //       >
  //         <div className="max-line3" style={{ width: '300px' }}>{text}</div>
  //       </Tooltip>
  //     ),
  //   },
  //   {
  //     title: (
  //       <div className="text-center">
  //         <MainTableHeader>Thời gian yêu cầu</MainTableHeader>
  //         <SubTableHeader>Thời gian hỗ trợ</SubTableHeader>
  //       </div>
  //     ),
  //     dataIndex: "CreateDate",
  //     key: "CreateDate",
  //     render: (text, record) => (
  //       <div className="text-center">
  //         <MainTableData>
  //           {moment(text).format("DD-MM-YYYY HH:mm")}
  //         </MainTableData>
  //         <SubTableData>
  //           {!!record.LastUpdate
  //             ? moment(record.LastUpdate).format("DD-MM-YYYY HH:mm")
  //             : "Chưa hỗ trợ"}
  //         </SubTableData>
  //       </div>
  //     ),
  //   },
  //   {
  //     title: "trang thái",
  //     dataIndex: "Status",
  //     key: "Status",
  //     render: (value, record) => (
  //       <div className="text-center">
  //         <div
  //           style={{ color: `${statusColor[value - 1]}`, fontWeight: "600" }}
  //         >
  //           {
  //             getListComboByKey(
  //               "SUBMIT_SUPPORT_REQUEST_STATUS",
  //               listSystemKey,
  //             )?.find(item => item?.CodeValue === value)?.Description
  //           }
  //         </div>
  //       </div>
  //     ),
  //   },
  // ]
  const columns = [
    {
      title: "STT",
      dataIndex: "id",
      width: 60,
      align: "center",
      render: (text, row, idx) => (
        <div className="text-center">
          {idx + 1 + pagination.PageSize * (pagination.CurrentPage - 1)}
        </div>
      ),
    },
    {
      title: (
        <div className="text-center">
          <MainTableHeader>Mã yêu cầu</MainTableHeader>
        </div>
      ),
      dataIndex: "RequestCode",
      width: 150,
      render: (text, record) => (
        <Tooltip
          title={
            <div>
              <div>{text}</div>
            </div>
          }
        >
          <div className="text-center">
            <MainTableData className="max-line1">{text}</MainTableData>
          </div>
        </Tooltip>
      ),
    },
    {
      title: (
        <div className="text-center">
          <MainTableHeader>Họ và tên</MainTableHeader>
          <SubTableHeader>Số điện thoại</SubTableHeader>
        </div>
      ),
      dataIndex: "FullName",
      width: 150,
      render: (text, record) => (
        <Tooltip
          title={
            <div>
              <div>Họ và tên: {text}</div>
              <div>Số điện thoại: {record.PhoneNumber}</div>
              <div>Địa chỉ: {record.Address}</div>
            </div>
          }
        >
          <div className="text-center">
            <MainTableData className="max-line1">{text}</MainTableData>
            <SubTableData className="max-line1">
              {record.PhoneNumber}
            </SubTableData>
          </div>
        </Tooltip>
      ),
    },
    {
      title: (
        <div className="text-center">
          <MainTableHeader>Thời gian yêu cầu</MainTableHeader>
          <SubTableHeader>Thời gian hỗ trợ</SubTableHeader>
        </div>
      ),
      dataIndex: "CreateDate",
      width: 180,
      render: (text, record) => (
        <div className="text-center">
          <MainTableData>
            {moment(text).format("DD-MM-YYYY HH:mm")}
          </MainTableData>
          <SubTableData>
            {!!record.LastUpdate
              ? moment(record.LastUpdate).format("DD-MM-YYYY HH:mm")
              : "Chưa hỗ trợ"}
          </SubTableData>
        </div>
      ),
    },

    {
      title: "Vấn đề cần hỗ trợ",
      dataIndex: "Content",
      align: "center",
      render: (text, record) => (
        <Tooltip
          title={
            <div style={{ overflow: "auto", maxHeight: "200px" }}>
              <div>{text}</div>
            </div>
          }
        >
          <div className="max-line3">{text}</div>
        </Tooltip>
      ),
    },
    {
      title: "Nội dung đã hỗ trợ/Từ chối",
      dataIndex: "SupportContent",
      align: "center",
      render: (text, record) => (
        <Tooltip
          title={
            <div style={{ overflow: "auto", maxHeight: "200px" }}>
              <div>{text}</div>
            </div>
          }
        >
          <div className="max-line3">{text}</div>
        </Tooltip>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "Status",
      align: "center",
      width: 150,
      render: (value, record) => (
        <div className="text-center">
          <div
            style={{ color: `${statusColor[value - 1]}`, fontWeight: "600" }}
          >
            {
              getListComboByKey(
                "SUBMIT_SUPPORT_REQUEST_STATUS",
                listSystemKey,
              )?.find(item => item?.CodeValue === value)?.Description
            }
          </div>
        </div>
      ),
    },
  ]
  return (
    <StyleRecruitment>
      <MyQuestionStyle>
        <Row justify="space-between">
          <Col
            span={24}
            className="title-type-1 d-flex align-items-center justify-content-space-between mb-0 pb-8 pt-0"
          >
            <div>Danh sách yêu cầu đã gửi</div>
          </Col>
          <Col span={24}>
            <Row>
              <Col
                span={7}
                style={{ display: "grid" }}
                className="seach-text "
                sty
              >
                <FlInput
                  style={{ width: "100%" }}
                  label="Tìm kiếm mã yêu cầu, họ và tên"
                  search
                  allowClear
                  onSearch={val => {
                    setPagination({
                      ...pagination,
                      CurrentPage: 1,
                      TextSearch: val,
                    })
                  }}
                />
              </Col>
              <Col
                span={5}
                style={{
                  alignItems: "center",
                  display: "grid",
                }}
              >
                <FlSelect
                  allowClear
                  label="Trạng thái"
                  onChange={Status => {
                    setPagination(pre => ({ ...pre, Status, CurrentPage: 1 }))
                  }}
                >
                  <Option key={"allStatusTopicmain"} value={0}>
                    Tất cả
                  </Option>
                  {getListComboByKey(
                    "SUBMIT_SUPPORT_REQUEST_STATUS",
                    listSystemKey,
                  )?.map(i => (
                    <Option key={i.CodeValue} value={i.CodeValue}>
                      {i?.Description}
                    </Option>
                  ))}
                </FlSelect>
              </Col>
              <Col span={9} style={{ display: "grid" }} className="seach-text ">
                <FlDatePicker
                  allowClear
                  ranger
                  label={["Từ ngày", "Đến ngày"]}
                  onChange={value => {
                    setPagination(pre => ({
                      ...pre,
                      CurrentPage: 1,
                      FromDate: value ? value[0]?.format() : "",
                      ToDate: value ? value[1]?.format() : "",
                    }))
                  }}
                />
              </Col>
              <Col span={3} className="d-flex-center">
                <Button
                  btnType="primary"
                  className="button"
                  onClick={() => setOpenAddQuestionModal(true)}
                >
                  Yêu cầu hỗ trợ +
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
        <StyleRecruitment>
          <TableCustom
            loading={loading}
            sticky={{ offsetHeader: -9 }}
            scroll={{ x: 1000 }}
            onRow={(record, rowIndex) => {
              return {
                onClick: event => {
                  setModelDetail(record)
                },
              }
            }}
            pagination={{
              hideOnSinglePage: total <= 10,
              current: pagination.CurrentPage,
              pageSize: pagination.PageSize,
              responsive: true,
              total: total,
              locale: { items_per_page: "" },
              showSizeChanger: total > 10,
              onChange: (CurrentPage, PageSize) => {
                setPagination({
                  ...pagination,
                  CurrentPage,
                  PageSize,
                })
              },
            }}
            columns={columns}
            dataSource={data}
          ></TableCustom>
        </StyleRecruitment>
        <AddQuestionModal
          getList={getList}
          open={openAddQuestionModal}
          onCancel={() => {
            setOpenAddQuestionModal(false)
          }}
        />
        {!!ModelDetail && (
          <ModalDetailRequest
            open={ModelDetail}
            onCancel={() => {
              setModelDetail(false)
            }}
          />
        )}
      </MyQuestionStyle>
    </StyleRecruitment>
  )
}
export default MyQuestion
