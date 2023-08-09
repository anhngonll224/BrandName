import { Col, Form, Row, Select, Space, Tabs, Tooltip } from "antd"
import moment from "moment"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import FlDatePicker from "src/components/FloatingLabel/DatePicker"
import FlInput from "src/components/FloatingLabel/Input"
import Button from "src/components/MyButton/Button"
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
import Dossier from "src/services/Dossier"
import ImportFile from "./components/ImportFile"
import { ListBrandNameStyle } from "./styled"
import FlSelect from "src/components/FloatingLabel/Select"
import ModelDetailManagementNotButton from "../RecordsManagement/Components/ModelDetailManagementNoButton"
import { FloatActionWrapper } from "src/components/FloatAction/styles"
import ButtonCircle from "src/components/MyButton/ButtonCircle"
import Notice from "src/components/Notice"
import ModalViewPDF from "src/components/Modal/ModalViewPDF"
import AddDossierModal from "../RecordsManagement/modal/AddDossierModal"
import CB2 from "src/components/Modal/CB2"
import { saveAs } from "file-saver"
import { useLocation, useNavigate } from "react-router-dom"

export const statusColor = ["#FF720D", "#00AEAC", "#FF4648"]
const colorText = ["", "#32eb53", "#ff9800", "#f44336"]
const ListBrandName = ({ IsAdmin = false, type, customerInfo }) => {
  const { listSystemKey } = useSelector(state => state.appGlobal)
  const [listData, setListData] = useState([])
  const [viewFile, setViewFile] = useState(false)
  const [total, setTotal] = useState(0)
  const [openDetail, setOpenDetail] = useState(false)
  const [loading, setLoading] = useState(false)
  const [openImport, setOpenImport] = useState(false)
  const [data, setData] = useState()
  const [openUpdate, setOpenUpdate] = useState(false)
  const [form2] = Form.useForm()
  const location = useLocation()
  const navigate = useNavigate()

  const [count, setCount] = useState([])

  const [pagination, setPagination] = useState({
    CurrentPage: 1,
    PageSize: 20,
    TextSearch: "",
    status: 1,
  })
  const columns = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      width: 60,
      align: "center",
      render: (value, record, idx) =>
        idx + 1 + pagination.PageSize * (pagination.CurrentPage - 1),
    },
    {
      title: "Tên định danh",
      dataIndex: "BrandName",
      key: "BrandName",
      align: "center",
      render: (value, record) => (
        <a
          onClick={() => setOpenDetail({ ...record, IsViewCertificate: true })}
        >
          {value}
        </a>
      ),
    },
    {
      title: "Số giấy chứng nhận",
      dataIndex: "GCNCode",
      key: "GCNCode",
      align: "center",
      width: 200,
    },
    {
      title: (
        <div style={{ textAlign: "center" }}>
          <MainTableHeader>Đơn vị/cá nhân sở hữu</MainTableHeader>
          <SubTableHeader>Số điện thoại</SubTableHeader>
        </div>
      ),
      align: "center",
      dataIndex: "Owning",
      key: "Owning",
      render: (value, record) => (
        <Tooltip
          title={
            <>
              <div>Tên đơn vị/cá nhân : {record?.Owning}</div>
              {/* <div>SĐT : {record?.PhoneNumber}</div> */}
              {/* <div>Email : {record?.Email}</div> */}
              <div>Địa chỉ : {record?.Address}</div>
            </>
          }
        >
          <MainTableData className="max-line2">{record?.Owning}</MainTableData>
          <SubTableData>{record?.PhoneNumber}</SubTableData>
        </Tooltip>
      ),
    },
    {
      title: "ĐKKD/CMND/CCCD/Hộ chiếu",
      dataIndex: "Identication",
      key: "Identication",
      align: "center",
      width: 220,
    },
    {
      title: (
        <div style={{ textAlign: "center" }}>
          <MainTableHeader>Ngày đăng ký</MainTableHeader>
          <SubTableHeader>Ngày hết hạn</SubTableHeader>
        </div>
      ),
      key: "DatePromulgate",
      width: 150,
      render: (_, record) => (
        <div className="text-center">
          <MainTableData>
            {record?.DatePromulgate &&
              moment(record?.DatePromulgate).format("DD/MM/YYYY HH:mm")}
          </MainTableData>
          <SubTableData>
            {record?.Deadline
              ? moment(record?.Deadline).format("DD/MM/YYYY HH:mm")
              : "Chưa có"}
          </SubTableData>
        </div>
      ),
    },

    {
      title: "Trạng thái",
      key: "Status",
      dataIndex: "Status",
      align: "center",
      render: (value, record) => (
        <>
          <span
            style={{ color: `${statusColor[value - 1]}`, fontWeight: "600" }}
          >
            {
              getListComboByKey(
                SYSTEM_KEY?.BRANDNAME_STATUS,
                listSystemKey,
              )?.find(i => i.CodeValue === +value)?.Description
            }
          </span>

          <FloatActionWrapper size="small" className="float-action__wrapper">
            <Space>
              {!!customerInfo?.UserID ? (
                <>
                  {!!record?.ButtonShow?.IsViewCertificate && (
                    <ButtonCircle
                      title="Xem giấy chứng nhậnss"
                      iconName="check-special"
                      onClick={() => {
                        viewCertificate(record, 6, "Giấy chứng nhận")
                      }}
                    />
                  )}
                </>
              ) : (
                <>
                  {!!record?.ButtonShow?.IsRenew && (
                    <ButtonCircle
                      title="Gia hạn GCN"
                      onClick={() => {
                        // renewDossier(record?.DossierID)
                        setOpenDetail({ ...record, IsRenew: true })
                      }}
                      iconName="history"
                    />
                  )}
                  {!!record?.ButtonShow?.IsReIssue && (
                    <ButtonCircle
                      title="Cấp lại GCN"
                      iconName="undo"
                      onClick={() => {
                        // reIssueDossier(record?.DossierID)

                        setOpenUpdate({ ...record, IsReIssue: true })
                      }}
                    />
                  )}
                  {!!record?.ButtonShow?.IsChangeInfor && (
                    <ButtonCircle
                      title="Thay đổi thông tin"
                      iconName="word-update-green"
                      onClick={() => {
                        // window.scrollTo(0, 0)
                        // navigate(ROUTER.TAO_HO_SO, {
                        //   state: { ...record, IsChangeInfor: true },
                        // })

                        setOpenUpdate({ ...record, IsChangeInfor: true })
                      }}
                    />
                  )}
                  {!!record?.ButtonShow?.IsRecallRefuse && (
                    <ButtonCircle
                      title="Thu hồi từ chối hồ sơ"
                      onClick={() => {
                        recallRefuseDossier(record?.DossierID)
                      }}
                      iconName="restore"
                    />
                  )}
                  {!!record?.ButtonShow?.IsViewOld && (
                    <ButtonCircle
                      title="Xem hồ sơ gốc"
                      onClick={() => {
                        setOpenDetail({ ...record, IsViewOld: true })
                      }}
                      iconName="eye"
                    />
                  )}
                  {!!record?.ButtonShow?.IsViewCertificate && (
                    <ButtonCircle
                      title="Xem giấy chứng nhận"
                      iconName="check-special"
                      onClick={() => {
                        viewCertificate(record, 6, "Giấy chứng nhận")
                      }}
                    />
                  )}
                  {!!record?.ButtonShow?.IsViewRevocation && (
                    <ButtonCircle
                      title="Xem giấy thu hồi tên định danh"
                      iconName="library-books"
                      onClick={() => {
                        viewCertificate(record, 5, "Giấy thu hồi tên định danh")
                      }}
                    />
                  )}

                  {!!record?.ButtonShow?.IsRecall && (
                    <ButtonCircle
                      title="Thu hồi tên định danh"
                      onClick={e => {
                        // recallDossier(record?.DossierID)
                        e?.stopPropagation()
                        setOpenDetail({ ...record, IsRecall: true })
                      }}
                      iconName="re-post"
                    />
                  )}
                </>
              )}
            </Space>
          </FloatActionWrapper>
        </>
      ),
    },
  ]
  const columns2 = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      width: 60,
      align: "center",
      render: (value, record, idx) =>
        idx + 1 + pagination.PageSize * (pagination.CurrentPage - 1),
    },
    {
      title: "Tên định danh",
      dataIndex: "BrandName",
      key: "BrandName",
      align: "center",
    },

    {
      title: "Số giấy chứng nhận",
      dataIndex: "GCNCode",
      key: "GCNCode",
      align: "center",
      width: 200,
    },
    {
      title: "Ngày đăng ký",
      dataIndex: "DatePromulgate",
      key: "DatePromulgate",
      render: (value, record) => (
        <div className="text-center">
          {!!record?.DatePromulgate &&
            moment(record?.DatePromulgate).format("DD/MM/YYYY HH:mm")}
        </div>
      ),
    },
    {
      title: "Ngày hết hạn",
      dataIndex: "Deadline",
      key: "Deadline",
      render: (value, record) => (
        <div className="text-center">
          {!!record?.Deadline &&
            moment(record?.Deadline).format("DD/MM/YYYY HH:mm")}
        </div>
      ),
    },

    {
      title: "Trạng thái",
      key: "Status",
      dataIndex: "Status",
      with: 120,
      render: (value, record) => (
        <>
          <div
            className="fw-600 text-center"
            style={{ color: colorText[value] }}
          >
            {
              getListComboByKey(
                SYSTEM_KEY?.BRANDNAME_STATUS,
                listSystemKey,
              )?.find(i => i.CodeValue === +value)?.Description
            }
          </div>

          <FloatActionWrapper size="small" className="float-action__wrapper">
            <Space>
              {/* {!!record?.IsViewCertificate && ( */}
              {/* <ButtonCircle
                title="Xem giấy chứng nhận"
                iconName="check-special"
                onClick={() => {
                  viewCertificate(record, 6, "Giấy chứng nhận")
                }}
              /> */}
              {/* )} */}
              {!!record?.ButtonShow?.IsRenew && (
                <ButtonCircle
                  title="Gia hạn GCN"
                  onClick={() => {
                    // renewDossier(record?.DossierID)
                    setOpenDetail({ ...record, IsRenew: true })
                  }}
                  iconName="history"
                />
              )}
              {!!record?.ButtonShow?.IsReIssue && (
                <ButtonCircle
                  title="Cấp lại GCN"
                  iconName="undo"
                  onClick={() => {
                    // reIssueDossier(record?.DossierID)

                    setOpenUpdate({ ...record, IsReIssue: true })
                  }}
                />
              )}
              {!!record?.ButtonShow?.IsChangeInfor && (
                <ButtonCircle
                  title="Thay đổi thông tin"
                  iconName="word-update-green"
                  onClick={() => {
                    // window.scrollTo(0, 0)
                    // navigate(ROUTER.TAO_HO_SO, {
                    //   state: { ...record, IsChangeInfor: true },
                    // })

                    setOpenUpdate({ ...record, IsChangeInfor: true })
                  }}
                />
              )}
              {!!record?.ButtonShow?.IsViewOld && (
                <ButtonCircle
                  title="Xem hồ sơ gốc"
                  onClick={() => {
                    setOpenDetail({ ...record, IsViewOld: true })
                  }}
                  iconName="eye"
                />
              )}
              {!!record?.ButtonShow?.IsViewCertificate && (
                <ButtonCircle
                  title="Xem giấy chứng nhận"
                  iconName="check-special"
                  onClick={() => {
                    viewCertificate(record, 6, "Giấy chứng nhận")
                  }}
                />
              )}
              {!!record?.ButtonShow?.IsViewRevocation && (
                <ButtonCircle
                  title="Xem giấy thu hồi tên định danh"
                  iconName="library-books"
                  onClick={() => {
                    viewCertificate(record, 5, "Giấy thu hồi tên định danh")
                  }}
                />
              )}

              {!!record?.ButtonShow?.IsRecall && (
                <ButtonCircle
                  title="Thu hồi tên định danh"
                  onClick={e => {
                    // recallDossier(record?.DossierID)
                    e?.stopPropagation()
                    setOpenDetail({ ...record, IsRecall: true })
                  }}
                  iconName="re-post"
                />
              )}
            </Space>
          </FloatActionWrapper>
        </>
      ),
    },
  ]

  const viewCertificate = async (record, DocumentType, Name) => {
    try {
      setLoading(true)
      const res = await Dossier.viewCertificate({
        DossierID: record?.DossierID,
        DocumentType: DocumentType,
      })
      if (res?.isError) return
      if (res?.Object?.FileUrl) setViewFile({ ...res?.Object, Name: Name })
      else Notice({ isSuccess: false, msg: `Chưa thể xem ${Name}` })
    } finally {
      setLoading(false)
    }
  }
  const getList = () => {
    setLoading(true)
    Dossier.getAllBrandName({
      ...pagination,
      UserID: !!customerInfo?.UserID ? customerInfo?.UserID : undefined,
    })

      .then(res => {
        if (res.isOk) {
          setData(res?.Object)
          setListData(res?.Object?.Data)
          setTotal(res?.Object?.Total)
        }
      })
      .finally(() => setLoading(false))
  }
  useEffect(() => {
    getList()
  }, [pagination])

  const recallRefuseDossier = async DossierID => {
    try {
      setLoading(true)
      const res = await Dossier.recallRefuseDossier({
        DossierID,
      })
      if (res?.isError) return
      Notice({ msg: "Thu hồi thành công!" })
      setPagination(pre => ({ ...pre }))
      setOpenDetail(false)
    } finally {
      setLoading(false)
    }
  }
  const transPage = () => {
    if (location?.pathname === "/quan-ly-tai-khoan/ten-dinh-danh") {
      navigate("/quan-ly-tai-khoan/ho-so-cho-xu-ly")
    } else if (location?.pathname === "/quan-ly-ho-so/kho-du-lieu") {
      navigate("/quan-ly-ho-so/cho-xu-ly")
    }
  }

  const renewDossier = async DossierID => {
    try {
      setLoading(true)
      const res = await Dossier.renewDossier({ DossierID: DossierID })
      if (res?.isError) return
      Notice({ msg: "Yêu cầu gia hạn thành công!" })
      setPagination(pre => ({ ...pre }))
      setOpenDetail(false)
      transPage()
    } finally {
      setLoading(false)
    }
  }

  const recallDossier = async DossierID => {
    CB2({
      title: `Thu hồi tên định danh`,
      icon: "warning-usb2",
      okText: "Thu hồi",
      titleFormItem: "Vui lòng nhập lý do thu hồi tên định danh ",
      formCB2: form2,
      onOk: async close => {
        try {
          setLoading(true)
          const value = await form2.validateFields()
          const res = await Dossier.recallDossier({
            DossierID: DossierID,
            Reason: value?.Reason,
          })
          if (res?.isError) return
          Notice({ msg: "Yêu cầu thu hồi thành công!" })
          setPagination(pre => ({ ...pre }))
          setOpenDetail(false)
          transPage()
        } finally {
          setLoading(false)
        }
        close()
      },
      onCancel() {
        form2.setFieldsValue({ Reason: undefined })
      },
    })
  }

  const rowSelection = {
    selectedRowKeys: count?.map(i => i?.DossierID),
    onChange: (selectedRowKeys, selectedRows) => {
      setCount(selectedRows)
    },
    getCheckboxProps: record => ({
      disabled: record.name === "Disabled User",
      // Column configuration not to be checked
      name: record.name,
    }),
  }
  const exportUser = () => {
    setLoading(true)
    Dossier.ExportBrandNameData({
      DateFrom: "",
    })
      .then(res => {
        if (res?.isError) return
        saveAs(res.Object, "danh sách Tên định danh.xlsx")
      })
      .finally(() => setLoading(false))
  }
  return (
    <ListBrandNameStyle>
      <SpinCustom spinning={loading}>
        <Row gutter={[16, 16]}>
          {!!customerInfo ? (
            ""
          ) : (
            <>
              <Col span={14}>
                <FlInput
                  label="Nhập tên định danh"
                  search
                  allowClear
                  onSearch={event => {
                    setPagination({
                      ...pagination,
                      TextSearch: event,
                    })
                  }}
                />
              </Col>
              <Col span={3}>
                {/* <Tabs
              type="card"
              defaultActiveKey="1"
              onChange={i => {
                setPagination({
                  ...pagination,
                  CurrentPage: 1,
                  status: i,
                })
              }}
              items={[
                {
                  label: `Tất cả(${
                    data?.Count?.find(item => item?.CodeValue === 0)
                      ?.NumberBrandName || 0
                  })`,
                  key: 0,
                },
                ...getListComboByKey(
                  SYSTEM_KEY?.BRANDNAME_STATUS,
                  listSystemKey,
                )?.map(i => ({
                  label: `${i.Description} (${
                    data?.Count?.find(item => item?.CodeValue === i?.CodeValue)
                      ?.NumberBrandName || 0
                  })`,
                  key: i.CodeValue,
                })),
              ]}
            /> */}
                <FlSelect
                  label="Trạng thái"
                  // value={pagination?.Procedure}
                  defaultValue={1}
                  // onChange={event => {
                  //   setPagination(pre => ({
                  //     ...pre,
                  //     CurrentPage: 1,
                  //     Procedure: event || 0,
                  //     Status: event ? pagination?.Status : 0,
                  //   }))
                  // }}
                  onChange={i => {
                    setPagination({
                      ...pagination,
                      CurrentPage: 1,
                      status: i,
                      Procedure: i || 0,
                    })
                  }}
                  allowClear
                >
                  <Select.Option key={0} value={0}>
                    Tất cả
                  </Select.Option>

                  {getListComboByKey(
                    SYSTEM_KEY?.BRANDNAME_STATUS,
                    listSystemKey,
                  )?.map(i => (
                    <Select.Option key={+i.CodeValue} value={+i.CodeValue}>
                      {i?.Description}
                    </Select.Option>
                  ))}
                </FlSelect>
              </Col>
              <Col span={7} style={{ paddingRight: "8px" }}>
                <FlDatePicker
                  allowClear
                  ranger
                  label={["Từ ngày", "Đến ngày"]}
                  onChange={date =>
                    setPagination({
                      ...pagination,
                      DateFrom: date ? date[0].format() : null,
                      DateTo: date ? date[1].format() : null,
                    })
                  }
                />
              </Col>
              <Col
                span={24}
                className="title-type-1 d-flex align-items-center justify-content-space-between mb-0 pb-8 pt-0"
              >
                <div>Danh sách tên định danh ({total || 0})</div>
                <div
                  span={12}
                  style={{ textAlign: "right" }}
                  className={"d-flex-end"}
                >
                  <Button
                    btnType="primary"
                    ghost
                    style={{ height: "37px", marginRight: "10px" }}
                    onClick={() => setOpenImport(true)}
                  >
                    <span>Import Excel</span>
                  </Button>
                  <Button
                    onClick={exportUser}
                    btnType="primary"
                    ghost
                    style={{ height: "37px", marginRight: "10px" }}
                  >
                    <span>Xuất Excel</span>
                  </Button>
                </div>
              </Col>
            </>
          )}
          <Col span={24}>
            <TableCustom
              isPrimary
              onRow={record => {
                return {
                  onClick: () => {
                    //   handleChangeDetail(record)
                    setOpenDetail({ ...record, IsViewCertificate: true })
                  },
                }
              }}
              rowSelection={!!customerInfo ? false : { ...rowSelection }}
              columns={IsAdmin ? columns : columns2}
              dataSource={listData}
              rowKey="DossierID"
              sticky={{ offsetHeader: -10 }}
              pagination={{
                hideOnSinglePage: total <= 10,
                current: pagination?.CurrentPage,
                pageSize: pagination?.PageSize,
                responsive: true,
                total: total,
                locale: { items_per_page: "" },
                showSizeChanger: total > 10,
                onChange: (CurrentPage, PageSize) =>
                  setPagination({
                    ...pagination,
                    CurrentPage,
                    PageSize,
                  }),
              }}
            />
          </Col>
        </Row>
      </SpinCustom>
      {!!openDetail && (
        <ModelDetailManagementNotButton
          viewCertificate={viewCertificate}
          open={openDetail}
          dataDetail={openDetail}
          onCancel={() => {
            setOpenDetail(false)
          }}
          setOpenDetail={setOpenDetail}
          renewDossier={renewDossier}
          setOpenUpdate={setOpenUpdate}
          recallDossier={recallDossier}
          loading={loading}
        />
      )}
      {!!openImport && (
        <ImportFile
          open={openImport}
          onCancel={() => {
            setOpenImport(false)
          }}
          onOk={() => {
            setPagination(pre => ({ ...pre }))
          }}
        />
      )}

      {viewFile && (
        <ModalViewPDF
          open={viewFile}
          onCancel={() => setViewFile(false)}
          fileUrl={viewFile?.FileUrl}
          Title={viewFile?.Name}
        />
      )}

      {!!openUpdate && (
        <AddDossierModal
          open={openUpdate}
          handleOk={() => {
            setPagination(pre => ({ ...pre }))
            transPage()
          }}
          onCancel={() => {
            setOpenUpdate(false)
          }}
          loading={loading}
        />
      )}
    </ListBrandNameStyle>
  )
}

export default ListBrandName
