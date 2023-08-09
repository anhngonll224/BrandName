import { Col, Divider, Form, Row, Select, Tooltip } from "antd"
import moment from "moment"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { FloatActionWrapper } from "src/components/FloatAction/styles"
import FlDatePicker from "src/components/FloatingLabel/DatePicker"
import FlInput from "src/components/FloatingLabel/Input"
import FlSelect from "src/components/FloatingLabel/Select"
// import Button from "src/components/MyButton/Button"
import ButtonCircle from "src/components/MyButton/ButtonCircle"
import SpinCustom from "src/components/Spin"
import TableCustom from "src/components/Table/CustomTable"
import {
  MainTableData,
  MainTableHeader,
  SubTableData,
  SubTableHeader,
} from "src/components/Table/CustomTable/styled"
import { DEFAULT_PAGE_SIZE } from "src/constants/pageSizeOptions"
import { getListComboByKey } from "src/lib/utils"
import ContactSer from "src/services/ContactSer"
import ModalConfirm from "./Modal/ModalConfirm"
import ModalDetailRequest from "./Modal/ModalDetailRequest"
import { StyleRecruitment, StyleButton } from "./styled"
import Button from "src/components/MyButton/Button"
export const statusColor = ["#FF720D", "#00AEAC", "#FF4648"]
const RequestSupport = () => {
  const [form] = Form.useForm()
  const { Option } = Select
  const [loading, setLoading] = useState(false)
  const [pagination, setPagination] = useState({
    CurrentPage: 1,
    PageSize: DEFAULT_PAGE_SIZE,
    TextSearch: "",
    // TopicMain: "",
  })
  const [dataSource, setDataSource] = useState()
  const [rowSelected, setRowSelected] = useState([])
  const [isConfirm, setIsConfirm] = useState(false)
  const [openModalDetailRequest, setOpenModalDetailRequest] = useState(false)
  const { listSystemKey } = useSelector(state => state.appGlobal)

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
          {/* <SubTableHeader>Chủ đề chính</SubTableHeader> */}
        </div>
      ),
      dataIndex: "RequestCode",
      width: 150,
      render: (text, record) => (
        <Tooltip
          title={
            <div>
              <div>{text}</div>
              {/* <div>{record?.TopicMain}</div> */}
            </div>
          }
        >
          <div className="text-center">
            <MainTableData className="max-line1">{text}</MainTableData>
            {/* <SubTableData className="max-line1">
              {
                // listTopic?.find(item => item?.ID === record?.TopicMain)
                //   ?.Description || "Khác"
                !!(record?.TopicMain === "-1") ? "Khác" : record?.TopicMain
              }
            </SubTableData> */}
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
          {" "}
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
          <FloatActionWrapper size="small" className="float-action__wrapper">
            {!!record?.IsAccept && (
              <ButtonCircle
                title="Xác nhận"
                iconName="check-circle"
                style={{
                  background: "#EDF6FC",
                  boxShadow: "0px 2px 4px rgba(208, 206, 187, 0.5)",
                }}
                onClick={() => {
                  setIsConfirm({ type: 2 })
                  setRowSelected([record])
                }}
              />
            )}
            {!!record?.IsRefuse && (
              <ButtonCircle
                title="Từ chối"
                iconName="cancel"
                style={{
                  background: "#FFE9EC",
                  boxShadow: "0px 2px 4px rgba(208, 206, 187, 0.5)",
                }}
                onClick={() => {
                  setIsConfirm({ type: 3 })
                  setRowSelected([record])
                }}
              />
            )}
            {!!record?.IsRecall && (
              <ButtonCircle
                title="Thu hồi"
                iconName="reply"
                style={{
                  background: "#FFFDE7",
                  boxShadow: "0px 2px 4px rgba(208, 206, 187, 0.5)",
                }}
                onClick={() => {
                  setOpenModalDetailRequest({
                    record: record,
                    ContactID: record?.ContactID,
                  })
                }}
              />
            )}
          </FloatActionWrapper>
        </div>
      ),
    },
  ]
  // data table
  const getListSuggest = () => {
    setLoading(true)
    const values = form.getFieldsValue()
    ContactSer.getList({
      ...pagination,
      ...values,
    })
      .then(res => {
        if (res.isOk) {
          setDataSource(res.Object)
        }
      })
      .finally(() => setLoading(false))
  }
  useEffect(() => {
    form.setFieldsValue({ Status: 0 })
  }, [])
  useEffect(() => {
    getListSuggest()
  }, [pagination])

  const handleChangePage = (page, pageSize) => {
    let currentPage = page
    if (pageSize !== pagination.PageSize) {
      currentPage = 1
    }
    setPagination({
      ...pagination,
      CurrentPage: currentPage,
      PageSize: pageSize,
    })
  }

  const rowSelection = {
    preserveSelectedRowKeys: true,
    selectedRowKeys: rowSelected?.map(i => i?.ContactID),
    onChange: (selectedRowKeys, selectedRows) => {
      setRowSelected(selectedRows)
    },
    getCheckboxProps: record => ({
      disabled: record.Status !== 1,
    }),
  }

  const onClickRow = record => {
    if (record.Status !== 1) setRowSelected([])
    else setRowSelected([record])

    setOpenModalDetailRequest({ record: record, ContactID: record?.ContactID })
  }
  return (
    <StyleRecruitment>
      <SpinCustom spinning={loading}>
        <Form form={form} className="rq-support">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="TextSearch">
                <FlInput
                  search
                  allowClear
                  label="Nhập mã yêu cầu, tên, số điện thoại khách hàng"
                  onSearch={val => {
                    setPagination({
                      ...pagination,
                      CurrentPage: 1,
                      TextSearch: val,
                    })
                  }}
                />
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item>
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
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="Status">
                <FlSelect
                  allowClear
                  label="Trạng thái"
                  onChange={() =>
                    setPagination({
                      ...pagination,
                      CurrentPage: 1,
                    })
                  }
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
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <Divider />
        <div
          className="title-type-1 d-flex justify-content-space-between align-items-center pdt0"
          style={{ padding: "16px 0px", marginBottom: "16px" }}
        >
          Danh sách yêu cầu hỗ trợ
          <div style={{ display: "flex" }}>
            <StyleButton>
              <Button
                type="primary"
                className="btn-hover-shadow"
                style={
                  rowSelected.length
                    ? { marginRight: "10px", backgroundColor: "#2160bd" }
                    : { marginRight: "10px" }
                }
                onClick={() => setIsConfirm({ type: 2 })}
                disabled={!rowSelected.length}
              >
                Xác nhận hỗ trợ
              </Button>
            </StyleButton>
            <Button
              ghost
              style={{ marginRight: "8px" }}
              className="btn-hover-shadow"
              type="primary"
              disabled={!rowSelected.length}
              onClick={() => setIsConfirm({ type: 3 })}
            >
              Từ chối
            </Button>
          </div>
        </div>

        <TableCustom
          isPrimary
          sticky={{ offsetHeader: -12 }}
          scroll={{ x: 1000 }}
          onRow={(record, rowIndex) => {
            return {
              onClick: event => {
                onClickRow(record)
              },
            }
          }}
          columns={columns}
          rowSelection={{
            type: "checkbox",
            ...rowSelection,
          }}
          dataSource={dataSource?.GetAll}
          pagination={{
            current: pagination.CurrentPage,
            pageSize: pagination.PageSize,
            responsive: true,
            total: dataSource?.Total,
            locale: { items_per_page: "" },
            showSizeChanger: true,
            onChange: (page, pageSize) => handleChangePage(page, pageSize),
          }}
          rowKey="ContactID"
        />

        {!!isConfirm && (
          <ModalConfirm
            selectedRow={rowSelected}
            open={isConfirm}
            onCancel={() => setIsConfirm(false)}
            onOk={() => {
              setRowSelected([])
              getListSuggest()
            }}
          />
        )}

        {!!openModalDetailRequest && (
          <ModalDetailRequest
            open={openModalDetailRequest}
            onCancel={() => {
              setOpenModalDetailRequest(false)
            }}
            onOk={() => {
              setRowSelected([])
              getListSuggest()
            }}
          />
        )}
      </SpinCustom>
    </StyleRecruitment>
  )
}

export default RequestSupport
