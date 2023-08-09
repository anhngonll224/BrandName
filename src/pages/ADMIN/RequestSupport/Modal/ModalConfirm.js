import { Col, Form, Input, Row, Tooltip } from "antd"
import moment from "moment"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import CustomModal from "src/components/Modal/CustomModal"
import Button from "src/components/MyButton/Button"
import Notice from "src/components/Notice"
import SpinCustom from "src/components/Spin"
import TableCustom from "src/components/Table/CustomTable"
import {
  MainTableData,
  MainTableHeader,
  SubTableData,
  SubTableHeader,
} from "src/components/Table/CustomTable/styled"
import { SYSTEM_KEY } from "src/constants/constants"
import { getListComboByKey } from "src/lib/utils"
import ContactSer from "src/services/ContactSer"
import { FooterModal } from "../../Role/styled"
import { StyleModalConfirm } from "../styled"

const ModalConfirm = ({ open, onCancel, onOk, selectedRow }) => {
  const { listSystemKey } = useSelector(state => state.appGlobal)
  const listStatus = getListComboByKey(
    SYSTEM_KEY?.SUBMIT_SUPPORT_REQUEST_STATUS,
    listSystemKey,
  )?.map(i => ({ ...i, label: i?.Description, value: i?.CodeValue }))

  const [form] = Form.useForm()
  const [pagination, setPagination] = useState({
    CurrentPage: 1,
    PageSize: 5,
    TextSearch: "",
  })
  const [loading, setLoading] = useState(false)
  const [detailContact, setDetailContact] = useState()
  const getDetailContact = async () => {
    try {
      setLoading(true)
      const res = await ContactSer.getDetailContact({
        ContactID: selectedRow?.length === 1 ? selectedRow[0]?.ContactID : "",
      })
      if (res?.isError) return
      setDetailContact(res?.Object)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    if (selectedRow?.length === 1) getDetailContact()
  }, [])
  const handleSubmit = async Status => {
    const value = await form.validateFields()
    setLoading(true)
    let object = {
      lstContactID: selectedRow?.map(i => i?.ContactID),
      Status: Status,
      ...value,
    }
    ContactSer.confirmSupport(object)
      .then(res => {
        if (res.isOk) {
          Notice({ msg: "Cập nhật thành công" })
          onCancel()
          onOk()
        }
      })
      .finally(() => setLoading(false))
  }

  const renderFooter = () => (
    <FooterModal>
      <Button
        loading={loading}
        btnType="primary"
        onClick={() => handleSubmit(open?.type)}
      >
        {open?.type === 3 ? "Từ chối" : "Xác nhận hỗ trợ"}
      </Button>
    </FooterModal>
  )
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
      title: "Mã yêu cầu",
      dataIndex: "RequestCode",
      align: "center",
      width: 120,
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
        <div className="text-center">
          <MainTableData>{text}</MainTableData>
          <SubTableData>{record.PhoneNumber}</SubTableData>
        </div>
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
            {text ? moment(text).format("DD-MM-YYYY HH:mm") : ""}
          </MainTableData>
          <SubTableData>
            {!!record.UpdateTime
              ? moment(record?.UpdateTime).format("DD-MM-YYYY HH:mm")
              : ""}
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
  ]

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
  return (
    <CustomModal
      title={open?.type === 3 ? "Từ chối" : "Xác nhận hỗ trợ"}
      open={!!open}
      width="1200px"
      onCancel={onCancel}
      footer={renderFooter()}
    >
      <SpinCustom spinning={loading}>
        <StyleModalConfirm>
          <Form form={form} layout="vertical">
            {selectedRow.length === 1 ? (
              <Row gutter={16}>
                <Col span={24}>
                  {/* <InforRequest detailContact={detailContact} /> */}
                </Col>
              </Row>
            ) : (
              <div style={{ marginBottom: "16px" }}>
                <div style={{ marginBottom: "8px" }}>
                  <b>
                    {open?.type === 2
                      ? "Danh sách hỗ trợ:"
                      : "Danh sách bị từ chối:"}{" "}
                    {selectedRow?.length}
                  </b>
                </div>
                <TableCustom
                  isPrimary
                  sticky={{ offsetHeader: 0 }}
                  scroll={{ x: 1000 }}
                  columns={columns}
                  dataSource={selectedRow}
                  pagination={{
                    current: pagination.CurrentPage,
                    pageSize: pagination.PageSize,
                    responsive: true,
                    total: selectedRow?.length,
                    locale: { items_per_page: "" },
                    showSizeChanger: true,
                    onChange: (page, pageSize) =>
                      handleChangePage(page, pageSize),
                    hideOnSinglePage: selectedRow?.length < 4,
                  }}
                  rowKey="ContactID"
                />
              </div>
            )}
            <Form.Item label={"Nhập lý do"} name={"SupportContent"}>
              <Input.TextArea placeholder="Nhập nội dung" rows={5} />
            </Form.Item>
          </Form>
        </StyleModalConfirm>
      </SpinCustom>
    </CustomModal>
  )
}

export default ModalConfirm
