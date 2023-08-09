import { Col, Form, Row, Select, Space, Tooltip } from "antd"
import { saveAs } from "file-saver"
import moment from "moment"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import { FloatActionWrapper } from "src/components/FloatAction/styles"
import FlDatePicker from "src/components/FloatingLabel/DatePicker"
import FlInput from "src/components/FloatingLabel/Input"
import FlSelect from "src/components/FloatingLabel/Select"
import CB1 from "src/components/Modal/CB1"
import CB2 from "src/components/Modal/CB2"
import ModalViewPDF from "src/components/Modal/ModalViewPDF"
import Button from "src/components/MyButton/Button"
import ButtonCircle from "src/components/MyButton/ButtonCircle"
import Notice from "src/components/Notice"
import SpinCustom from "src/components/Spin"
import TableCustom, { SELECTION_COLUMN } from "src/components/Table/CustomTable"
import {
  MainTableData,
  MainTableHeader,
  SubTableData,
  SubTableHeader,
} from "src/components/Table/CustomTable/styled"
import { SYSTEM_KEY } from "src/constants/constants"
import { getListComboByKey, getRowSpans } from "src/lib/utils"
import { DossierID } from "src/redux/ProfileList"
import ROUTER from "src/router"
import Dossier from "src/services/Dossier"
import AddDossierModal from "../modal/AddDossierModal"
import BrowseRequest from "../modal/BrowseRequest"
import ModalComplain from "../modal/ModalComplain"
import ModalPayment from "../modal/ModalPayment"
import ModalPaymentReport from "../modal/ModalPaymentReport"
import ModelRessonDossier from "../modal/ModelRessonDossier"
import { StylesTableManagement } from "../styled"
import ModelDetailManagement from "./ModelDetailManagement"
import ModelDetailManagementNotButton from "./ModelDetailManagementNoButton"
import { StatusDossierColor } from "./color"

const RecordsManagementContent = ({
  data,
  type,
  btnGeneral,
  pagination,
  handleChangePage,
  listPagi,
  loading,
  setLoading,
  setPagination,
  isAdmin,
  getList,
}) => {
  // const [data, setData] = useState()
  // const inputValue = useSelector((state) => state.app.inputValue);
  const dispatch = useDispatch()
  // const [dataEdit, setDataEdit] = useState()
  const [btnChose, setBtnChose] = useState({
    IsSubmission: true,
    IsPass: true,
    IsAccept: true,
    IsAprove: true,
    IsExpertise: true,
    IsPromulgate: true,
    IsPromulgateReissue: true,
    IsPromulgateRecall: true,
    IsPromulgateRenew: true,
  })
  const location = useLocation()
  const [count, setCount] = useState([])
  const [openUpdate, setOpenUpdate] = useState(false)
  // const [openRefuse, setOpenRefuse] = useState(false)
  const [openBrowseRequest, setOpenBrowseRequest] = useState(false)
  const [openDetail, setOpenDetail] = useState(false)

  const [openAddDossierModal, setOpenAddDossierModal] = useState(false)
  const [openModelRessonDossier, setOpenModelRessonDossier] = useState(false)
  const [openModalPayment, setOpenModalPayment] = useState(false)
  const [openComplain, setOpenComplain] = useState(false)
  const [openModalPaymentReport, setOpenModalPaymentReport] = useState(false)
  const [viewFile, setViewFile] = useState(false)
  const navigate = useNavigate()

  const { listSystemKey } = useSelector(state => state?.appGlobal)

  const [rowSelected, setRowSelected] = useState([])
  const [form2] = Form.useForm()
  useEffect(() => {
    setBtnChose(pre => {
      let obj = {
        IsSubmission: true,
        IsPass: true,
        IsAccept: true,
        IsAprove: true,
        IsExpertise: true,
        IsPromulgate: true,
        IsPromulgateReissue: true,
        IsAcceptChangeInfor: true,
        IsPromulgateRecall: true,
        IsPromulgateRenew: true,
      }
      if (
        !!count?.filter(i => !i?.ButtonShow?.IsSubmission)?.length &&
        type === 2
      ) {
        Notice({
          isSuccess: false,
          msg: `Hồ sơ ${count
            ?.filter(i => !i?.ButtonShow?.IsSubmission)
            ?.map(item => item?.DossierCodeDisplay)
            ?.join(", ")} không được phép trình phê duyệt!`,
        })
      }
      if (count?.length)
        count?.map(item => {
          if (!item?.ButtonShow?.IsSubmission && !!obj?.IsSubmission) {
            obj = { ...obj, IsSubmission: false }
          }

          if (!item?.ButtonShow?.IsPass && !!obj?.IsPass) {
            obj = { ...obj, IsPass: false }
          }
          if (!item?.ButtonShow?.IsAccept && !!obj?.IsAccept) {
            obj = { ...obj, IsAccept: false }
          }
          if (!item?.ButtonShow?.IsAprove && !!obj?.IsAprove) {
            obj = { ...obj, IsAprove: false }
          }
          if (!item?.ButtonShow?.IsExpertise && !!obj?.IsExpertise) {
            obj = { ...obj, IsExpertise: false }
          }
          if (!item?.ButtonShow?.IsPromulgate && !!obj?.IsPromulgate) {
            obj = { ...obj, IsPromulgate: false }
          }
          if (
            !item?.ButtonShow?.IsPromulgateReissue &&
            !!obj?.IsPromulgateReissue
          ) {
            obj = { ...obj, IsPromulgateReissue: false }
          }
          if (
            !item?.ButtonShow?.IsAcceptChangeInfor &&
            !!obj?.IsAcceptChangeInfor
          ) {
            obj = { ...obj, IsAcceptChangeInfor: false }
          }

          if (
            !item?.ButtonShow?.IsPromulgateRecall &&
            !!obj?.IsPromulgateRecall
          ) {
            obj = { ...obj, IsPromulgateRecall: false }
          }
          if (
            !item?.ButtonShow?.IsPromulgateRenew &&
            !!obj?.IsPromulgateRenew
          ) {
            obj = { ...obj, IsPromulgateRenew: false }
          }
        })
      return {
        ...pre,
        ...obj,
      }
    })
  }, [count])

  useEffect(() => {
    if (location?.state?.DossierID) {
      setOpenDetail({ DossierID: location?.state?.DossierID })
    }
  }, [location?.state])

  const rowSelection = {
    selectedRowKeys: count?.map(i => i?.DossierID),
    onChange: (selectedRowKeys, selectedRows) => {
      setCount(selectedRows)
    },
    getCheckboxProps: record => ({
      disabled: record?.name === "Disabled User",
      // Column configuration not to be checked
      name: record?.name,
    }),
  }
  // const [pagination, setPagination] = useState({
  //   PageSize: DEFAULT_PAGE_SIZE,
  //   CurrentPage: 1,
  // })

  let UserCodeRowSpans = getRowSpans(data, "UserCode")

  const Handle = record => {
    setOpenDetail(record)
    dispatch(
      DossierID({
        DossierID: record?.DossierID,
      }),
    )
  }

  const columnsDossierNotAdmin = [
    {
      title: "Mã hồ sơ",
      dataIndex: "DossierCodeDisplay",
      key: "DossierCodeDisplay",
      render: (value, record) => (
        // <a onClick={() => setOpenDetail(record) }>{value}</a>
        <a onClick={() => Handle(record)}>{value}</a>
      ),
    },
    {
      title: "Tên định danh",
      dataIndex: "IdentifyName",
      key: "IdentifyName",
      render: value => (
        <Tooltip title={value}>
          <div className="max-line2">{value}</div>
        </Tooltip>
      ),
    },
    {
      title: "Tình trạng",
      dataIndex: "State",
      key: "State",
      align: "center",
      render: value =>
        value ? (
          <div style={{ color: "#1cc675", fontWeight: "600" }}>Đã đạt</div>
        ) : (
          <div style={{ color: "#ff4d4f", fontWeight: "600" }}>Không đạt</div>
        ),
    },
    {
      title: "Thanh toán",
      dataIndex: "IsPaid",
      key: "IsPaid",
      align: "center",
      render: value =>
        // DOSSIER_PAYMENT

        value ? (
          <div
            style={{
              color: ["#1cc675", "#ff4d4f", "#faad14", "#1cc675"][value - 1],
              fontWeight: "600",
            }}
          >
            {
              getListComboByKey(
                SYSTEM_KEY?.DOSSIER_PAYMENT,
                listSystemKey,
              )?.find(item => item?.CodeValue === value)?.Description
            }
          </div>
        ) : (
          <></>
        ),
    },
    {
      title: (
        <div style={{ textAlign: "center" }}>
          <MainTableHeader>Ngày gửi</MainTableHeader>
          <SubTableHeader>Ngày trả kết quả</SubTableHeader>
        </div>
      ),
      key: "DateSend",
      render: (_, record) => (
        <div className="text-center">
          <MainTableData>
            {record?.DateSend &&
              moment(record?.DateSend).format("DD/MM/YYYY HH:mm")}
          </MainTableData>
          <SubTableData>
            {record?.Datedecision
              ? moment(record?.Datedecision).format("DD/MM/YYYY HH:mm")
              : "Chưa có"}
          </SubTableData>
        </div>
      ),
    },
  ]
  const columnsDossierAdmin = [
    {
      title: "Mã khách hàng",
      dataIndex: "UserCode",
      key: "name",
      render: (value, _, index) => {
        const obj = {
          children: value,
          props: {
            rowSpan: 1,
          },
        }
        if (UserCodeRowSpans?.length)
          obj.props.rowSpan = UserCodeRowSpans[index]
        return obj
      },
    },
    SELECTION_COLUMN,
    {
      title: "Mã hồ sơ",
      dataIndex: "DossierCodeDisplay",
      key: "DossierCodeDisplay",
      render: (value, record) => (
        <a
          onClick={() => {
            // Handle(record)
          }}
        >
          {value}
        </a>
      ),
    },
    {
      title: "Tên định danh",
      dataIndex: "IdentifyName",
      key: "IdentifyName",
      render: value => (
        <Tooltip title={value}>
          <div className="max-line2">{value}</div>
        </Tooltip>
      ),
    },
    {
      title: "Tên đơn vị đăng ký",
      dataIndex: "FullName",
      key: "FullName",
      render: value => (
        <Tooltip title={value}>
          <div className="max-line2">{value}</div>
        </Tooltip>
      ),
    },
    {
      title: "Tình trạng",
      dataIndex: "State",
      key: "State",
      align: "center",
      render: value =>
        !!value ? (
          <div style={{ color: "#1cc675", fontWeight: "600" }}>Đã đạt</div>
        ) : (
          <div style={{ color: "#ff4d4f", fontWeight: "600" }}>Không đạt</div>
        ),
    },
    {
      title: "Thanh toán",
      dataIndex: "IsPaid",
      key: "IsPaid",
      align: "center",
      render: value =>
        value ? (
          <div
            style={{
              color: ["#1cc675", "#ff4d4f", "#faad14", "#1cc675"][value - 1],
              fontWeight: "600",
            }}
          >
            {
              getListComboByKey(
                SYSTEM_KEY?.DOSSIER_PAYMENT,
                listSystemKey,
              )?.find(item => item?.CodeValue === value)?.Description
            }
          </div>
        ) : (
          <></>
        ),
    },
    {
      title: (
        <div style={{ textAlign: "center" }}>
          <MainTableHeader>Ngày gửi</MainTableHeader>
          <SubTableHeader>Ngày trả kết quả</SubTableHeader>
        </div>
      ),

      key: "age",
      render: (_, record) => (
        <div className="text-center">
          <MainTableData>
            {record?.DateSend &&
              moment(record?.DateSend).format("DD/MM/YYYY HH:mm")}
          </MainTableData>
          <SubTableData>
            {record?.Datedecision
              ? moment(record?.Datedecision).format("DD/MM/YYYY HH:mm")
              : "Chưa có"}
          </SubTableData>
        </div>
      ),
    },
  ]
  const columnsAction = [
    {
      title: "Sự kiện",
      dataIndex: "Procedure",
      key: "Procedure",
      align: "center",
      render: (value, _, index) =>
        getListComboByKey(
          SYSTEM_KEY?.DOSSIER_PROCEDURE_TYPE,
          listSystemKey,
        )?.find(item => item?.CodeValue === value)?.Description,
    },
  ]
  const columsStatus = [
    {
      title: (
        <div style={{ textAlign: "center", width: "120px" }}>Trạng thái</div>
      ),
      key: "address",
      align: "center",
      render: (_, record) => (
        <div>
          <div
            style={{
              textAlign: "center",
              width: "100%",
              fontWeight: "bold",
              color:
                StatusDossierColor?.[record?.Procedure - 1 || 0]?.[
                  record?.StatusID || 0
                ],
            }}
          >
            {record?.StatusName}
          </div>
          <FloatActionWrapper size="small" className="float-action__wrapper">
            <Space>
              {!!record?.ButtonShow?.IsViewAffidavit && (
                <ButtonCircle
                  title="Xem bản khai hồ sơ"
                  iconName="process_group"
                  onClick={() => {
                    viewCertificate(record, 4, "Bản khai hồ sơ")
                  }}
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
              {!!record?.ButtonShow?.IsViewChangInfo && (
                <ButtonCircle
                  title="Xem giấy thay đổi thông tin"
                  iconName="cheque"
                  onClick={() => {
                    viewCertificate(record, 7, "Giấy thay đổi thông tin")
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

              {/* cá nhân */}
              {!!record?.ButtonShow?.IsUpdate && (
                <ButtonCircle
                  title="Chỉnh sửa"
                  iconName="edit-green"
                  onClick={() => {
                    setOpenUpdate({ ...record })
                  }}
                />
              )}
              {!!record?.ButtonShow?.IsDelete && (
                <ButtonCircle
                  title="Xóa"
                  iconName="delete-red-row"
                  onClick={() => {
                    CB1({
                      record,
                      title: `Bạn có chắc chắn muốn xoá
                                      <strong> ${record?.IdentifyName}</strong> không?`,
                      icon: "warning-usb",
                      okText: "Đồng ý",
                      onOk: async close => {
                        onDeleteUser(record?.DossierID)
                        close()
                      },
                    })
                  }}
                />
              )}

              {!!record?.ButtonShow?.IsSend && (
                <ButtonCircle
                  title="Gửi hồ sơ"
                  iconName="send-mess-primary"
                  onClick={() => {
                    sendDossier(record?.DossierID)
                  }}
                />
              )}

              {!!record?.ButtonShow?.IsSendPropose && (
                <ButtonCircle
                  title="Gửi đề xuất"
                  iconName="send-message"
                  onClick={() => {
                    sendPropose(record?.DossierID)
                  }}
                />
              )}
              {!!record?.ButtonShow?.IsRecallSend && (
                <ButtonCircle
                  title="Thu hồi hồ sơ"
                  onClick={() => {
                    recallSendDossier(record?.DossierID)
                  }}
                  iconName="restore"
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

              {/* chuyên viên */}
              {!!record?.ButtonShow?.IsAccept && (
                <ButtonCircle
                  title="Tiếp nhận hồ sơ"
                  onClick={() => {
                    acceptDossier(record?.DossierID)
                  }}
                  iconName="checks"
                />
              )}

              {!!record?.ButtonShow?.IsAcceptChangeInfor && (
                <ButtonCircle
                  title="Chấp nhận thay đổi thông tin"
                  onClick={() => {
                    acceptChangInforDossier({ DossierID: [record?.DossierID] })
                  }}
                  iconName="checks"
                />
              )}
              {!!record?.ButtonShow?.IsRefuse && (
                <ButtonCircle
                  title="Từ chối tiếp nhận hồ sơ"
                  onClick={() => {
                    // setOpenModalRefuseDossier({
                    //   DossierID: record?.DossierID,
                    // })
                    setOpenModelRessonDossier({
                      DossierID: record?.DossierID,
                      title: "Từ chối tiếp nhận hồ sơ",
                      titleItem: "Lý do từ chối",
                      nameItem: "Reason",
                      requestHandle: Dossier.refuseDossier,
                    })
                  }}
                  iconName="cancel"
                />
              )}

              {!!record?.ButtonShow?.IsRequestAdditional && (
                <ButtonCircle
                  title="Yêu cầu bổ sung"
                  onClick={() => {
                    // setOpenModalAdditionalDossier({
                    //   DossierID: record?.DossierID,
                    // })

                    setOpenModelRessonDossier({
                      DossierID: record?.DossierID,
                      title: "Yêu cầu bổ sung hồ sơ",
                      titleItem: "Các yêu cầu bổ sung",
                      nameItem: "Content",
                      requestHandle: Dossier.requestAdditionalDossier,
                    })
                  }}
                  iconName="notepad"
                />
              )}
              {!!record?.ButtonShow?.IsAdditional && (
                <ButtonCircle
                  title="Bổ sung thông tin"
                  onClick={() => {
                    setOpenUpdate({ IsAdditional: true, ...record })
                  }}
                  iconName="notepad"
                />
              )}
              {!!record?.ButtonShow?.IsPass && (
                <ButtonCircle
                  title="Hồ sơ đạt"
                  onClick={() => {
                    passDossier([record?.DossierID])
                  }}
                  iconName="liked"
                />
              )}
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

              {/* {!!record?.ButtonShow?.IsReturn && (
                <ButtonCircle
                  title="Nhận GCN"
                  onClick={() => {}}
                  iconName="handout-2"
                />
              )} */}

              {!!record?.ButtonShow?.IsPayment && (
                <ButtonCircle
                  title="Nộp lệ phí"
                  onClick={() => {
                    setCount([record])
                    setOpenModalPayment(record)
                  }}
                  iconName="credit-card"
                />
              )}
              {!!record?.ButtonShow?.IsViewReport && (
                <ButtonCircle
                  title="Xem khiếu nại"
                  onClick={() => {
                    setOpenComplain(record)
                  }}
                  iconName="eye_orange"
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
              {!!record?.ButtonShow?.IsReport && (
                <ButtonCircle
                  title="Báo cáo lỗi thanh toán"
                  onClick={() => {
                    setOpenModalPaymentReport(record)
                  }}
                  iconName="warningCKS"
                />
              )}
              {!!record?.ButtonShow?.IsReturn && (
                <ButtonCircle
                  title="Rút hồ sơ"
                  onClick={() => {
                    setOpenModelRessonDossier({
                      DossierID: record?.DossierID,
                      title: "Rút hồ sơ",
                      titleItem: "Lý do rút hồ sơ",
                      nameItem: "Reason",
                      requestHandle: Dossier.returnFromUserDossier,
                    })
                  }}
                  iconName="box-confirm"
                />
              )}
              {/* chuyên viên */}

              {!!record?.ButtonShow?.IsSubmission && (
                <ButtonCircle
                  title="Trình phê duyệt"
                  onClick={() => {
                    setOpenBrowseRequest(true)
                    setCount([record])
                  }}
                  iconName="transfer"
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

              {!!record?.ButtonShow?.IsAcceptReturn && (
                <ButtonCircle
                  title="Trả hồ sơ"
                  onClick={() => {
                    returnDossier(record)
                  }}
                  iconName="iconSigned"
                />
              )}
              {!!record?.ButtonShow?.IsRefuseReturn && (
                <ButtonCircle
                  title="Từ chối rút hồ sơ"
                  onClick={() => {
                    // refuseReturn(record)

                    setOpenModelRessonDossier({
                      DossierID: record?.DossierID,
                      title: "Từ chối rút hồ sơ",
                      titleItem: "Lý do từ chối",
                      nameItem: "Reason",
                      requestHandle: Dossier.refuseReturnDossier,
                    })
                  }}
                  iconName="cancel-video"
                />
              )}
              {/* lãnh đạo trung tâm ,Lãnh đạo cục*/}

              {!!record?.ButtonShow?.IsAprove && (
                <ButtonCircle
                  title="Duyệt hồ sơ"
                  onClick={() => {
                    approveDossier([record?.DossierID])
                  }}
                  iconName="elect"
                />
              )}

              {!!record?.ButtonShow?.IsRefuseAprove && (
                <ButtonCircle
                  title="Không duyệt hồ sơ"
                  onClick={() => {
                    setOpenModelRessonDossier({
                      DossierID: record?.DossierID,
                      title: "Từ chối duyệt hồ sơ",
                      titleItem: "Lý do từ chối",
                      nameItem: "Reason",
                      requestHandle: Dossier.refuseApproveDossier,
                    })
                  }}
                  iconName="fall"
                />
              )}
              {!!record?.ButtonShow?.IsRecallAprove && (
                <ButtonCircle
                  title="Thu hồi duyệt hồ sơ"
                  onClick={() => {
                    recallAproveDossier(record?.DossierID)
                  }}
                  iconName="restore"
                />
              )}

              {!!record?.ButtonShow?.IsRecallAceept && (
                <ButtonCircle
                  title="Thu hồi tiếp nhận"
                  onClick={() => {
                    recallPassDossier(record?.DossierID)
                  }}
                  iconName="restore"
                />
              )}
              {!!record?.ButtonShow?.IsExpertise && (
                <ButtonCircle
                  title="Ký duyệt GCN"
                  onClick={() => {
                    expertiseDossier([record?.DossierID])
                  }}
                  iconName="file-sign"
                />
              )}

              {!!record?.ButtonShow?.IsRefuseExpertise && (
                <ButtonCircle
                  title="Không duyệt GCN"
                  onClick={() => {
                    setOpenModelRessonDossier({
                      DossierID: record?.DossierID,
                      title: "Từ chối duyệt giấy chứng nhận",
                      titleItem: "Lý do từ chối",
                      nameItem: "Reason",
                      requestHandle: Dossier.refuseExpertiseDossier,
                    })
                  }}
                  iconName="fall"
                />
              )}
              {!!record?.ButtonShow?.IsRecallExpertise && (
                <ButtonCircle
                  title="Thu hồi ký duyệt"
                  onClick={() => {
                    recallExpertiseDossier(record?.DossierID)
                  }}
                  iconName="restore"
                />
              )}

              {/* Văn thư cục */}

              {!!record?.ButtonShow?.IsRecallPromulgate && (
                <ButtonCircle
                  title="Thu hồi ban hành GCN"
                  onClick={() => {
                    recallPromulgateDossier(record?.DossierID)
                  }}
                  iconName="restore"
                />
              )}
              {!!record?.ButtonShow?.IsPromulgate && (
                <ButtonCircle
                  title="Ban hành GCN"
                  onClick={() => {
                    promulgateDossier({
                      LtDossier: [record?.DossierID],
                    })
                  }}
                  iconName="media-solid"
                />
              )}
              {!!record?.ButtonShow?.IsPromulgateReissue && (
                <ButtonCircle
                  title="Ban hành GCN cấp lại"
                  onClick={() => {
                    promulgateReIssiueDossier({
                      LtDossier: [record?.DossierID],
                    })
                  }}
                  iconName="media-solid"
                />
              )}

              {!!record?.ButtonShow?.IsPromulgateRecall && (
                <ButtonCircle
                  title="Ban hành thông báo thu hồi"
                  onClick={() => {
                    promulgateRecallDossier([record?.DossierID])
                  }}
                  iconName="vbm"
                />
              )}
              {!!record?.ButtonShow?.IsPromulgateRenew && (
                <ButtonCircle
                  title="Ban hành thông báo gia hạn"
                  onClick={() => {
                    promulgateRenewDossier([record?.DossierID])
                  }}
                  iconName="menu-log-work"
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
        </div>
      ),
    },
  ]
  const columns = isAdmin
    ? pagination?.Procedure === 0
      ? [...columnsDossierAdmin, ...columnsAction, ...columsStatus]
      : [...columnsDossierAdmin, ...columsStatus]
    : pagination?.Procedure === 0
    ? [...columnsDossierNotAdmin, ...columnsAction, ...columsStatus]
    : [...columnsDossierNotAdmin, ...columsStatus]
  const onDeleteUser = async DossierID => {
    try {
      setLoading(true)
      // const keyArray = Object.values(DossierID)
      // const result = keyArray.join("")
      const res = await Dossier.deleteDossier({ DossierID })
      if (res?.isError) return
      Notice({ msg: "Xóa hồ sơ thành công !" })
      handleChangePage(pagination)
      setOpenDetail(false)
    } finally {
      setLoading(false)
    }
  }

  const sendDossier = async DossierID => {
    try {
      setLoading(true)
      const res = await Dossier.sendDossier({ DossierID: DossierID })
      if (res?.isError) return
      Notice({ msg: "Gửi hồ sơ thành công!" })
      handleChangePage(pagination)
      setOpenDetail(false)
    } finally {
      setLoading(false)
    }
  }
  const sendPropose = async DossierID => {
    try {
      setLoading(true)
      const res = await Dossier.sendPropose({ DossierID: DossierID })
      if (res?.isError) return
      Notice({ msg: "Gửi đề xuất thành công!" })
      handleChangePage(pagination)
      setOpenDetail(false)
    } finally {
      setLoading(false)
    }
  }

  const recallSendDossier = async DossierID => {
    try {
      setLoading(true)
      const res = await Dossier.recallSendDossier({ DossierID: DossierID })
      if (res?.isError) return
      Notice({ msg: "Thu hồi hồ sơ thành công!" })
      handleChangePage(pagination)
      setOpenDetail(false)
    } finally {
      setLoading(false)
    }
  }

  const acceptDossier = async DossierID => {
    try {
      setLoading(true)
      const res = await Dossier.acceptDossier({ DossierID: DossierID })
      if (res?.isError) return
      Notice({ msg: "Tiếp nhận thành công!" })
      handleChangePage(pagination)
      setOpenDetail(false)
    } finally {
      setLoading(false)
    }
  }
  const passDossier = async listDossierID => {
    try {
      setLoading(true)
      const res = await Dossier.passDossier({ DossierID: listDossierID })
      if (res?.isError) return
      Notice({ msg: "Hồ sơ đạt!" })
      handleChangePage(pagination)
      setOpenDetail(false)
    } finally {
      setLoading(false)
    }
  }
  const returnDossier = async record => {
    try {
      setLoading(true)
      const res = await Dossier.returnDossier({ DossierID: record?.DossierID })
      if (res?.isError) return
      Notice({ msg: "Trả hồ sơ thành công!" })
      handleChangePage(pagination)
      setOpenDetail(false)
    } finally {
      setLoading(false)
    }
  }
  const approveDossier = async listDossierID => {
    try {
      setLoading(true)
      const res = await Dossier.approveDossier({
        DossierID: listDossierID,
      })
      if (res?.isError) return
      Notice({ msg: "Duyệt hồ sơ thành công!" })
      handleChangePage(pagination)
      setOpenDetail(false)
    } finally {
      setLoading(false)
    }
  }

  const expertiseDossier = async listDossierID => {
    try {
      setLoading(true)
      const res = await Dossier.expertiseDossier({
        DossierID: listDossierID,
      })
      if (res?.isError) return
      Notice({ msg: "Ký duyệt giấy chứng nhận thành công!" })
      handleChangePage(pagination)
      setOpenDetail(false)
    } finally {
      setLoading(false)
    }
  }

  const promulgateDossier = async listDossierID => {
    try {
      setLoading(true)
      const res = await Dossier.promulgateDossier(listDossierID)
      if (res?.isError) return
      Notice({ msg: "Ban hành giấy chứng nhận thành công!" })
      handleChangePage(pagination)
      setOpenDetail(false)
    } finally {
      setLoading(false)
    }
  }
  const promulgateReIssiueDossier = async listDossierID => {
    try {
      setLoading(true)
      const res = await Dossier.promulgateReIssiueDossier(listDossierID)
      if (res?.isError) return
      Notice({ msg: "Ban hành giấy chứng nhận cấp lại thành công!" })
      handleChangePage(pagination)
      setOpenDetail(false)
    } finally {
      setLoading(false)
    }
  }

  const acceptChangInforDossier = async listDossierID => {
    try {
      setLoading(true)
      const res = await Dossier.acceptChangInforDossier(listDossierID)
      if (res?.isError) return
      Notice({ msg: "Chấp nhận thay đổi thông tin thành công!" })
      handleChangePage(pagination)
      setOpenDetail(false)
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
          handleChangePage(pagination)
          setOpenDetail(false)
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

  const renewDossier = async DossierID => {
    try {
      setLoading(true)
      const res = await Dossier.renewDossier({ DossierID: DossierID })
      if (res?.isError) return
      Notice({ msg: "Yêu cầu gia hạn thành công!" })
      handleChangePage(pagination)
      setOpenDetail(false)
    } finally {
      setLoading(false)
    }
  }

  const promulgateRecallDossier = async listDossierID => {
    try {
      setLoading(true)
      const res = await Dossier.promulgateRecallDossier({
        LtDossier: listDossierID,
      })
      if (res?.isError) return
      Notice({ msg: "Ban hành thu hồi thành công!" })
      handleChangePage(pagination)
      setOpenDetail(false)
    } finally {
      setLoading(false)
    }
  }
  const promulgateRenewDossier = async listDossierID => {
    try {
      setLoading(true)
      const res = await Dossier.promulgateRenewDossier({
        LtDossier: listDossierID,
      })
      if (res?.isError) return
      Notice({ msg: "Ban hành gia hạn thành công!" })
      handleChangePage(pagination)
      setOpenDetail(false)
    } finally {
      setLoading(false)
    }
  }
  const recallAproveDossier = async DossierID => {
    try {
      setLoading(true)
      const res = await Dossier.recallAproveDossier({
        DossierID: DossierID,
      })
      if (res?.isError) return
      Notice({ msg: "Thu hồi thành công!" })
      handleChangePage(pagination)
      setOpenDetail(false)
    } finally {
      setLoading(false)
    }
  }
  const recallPassDossier = async DossierID => {
    try {
      setLoading(true)
      const res = await Dossier.recallPassDossier({
        DossierID: DossierID,
      })
      if (res?.isError) return
      Notice({ msg: "Thu hồi thành công!" })
      handleChangePage(pagination)
      setOpenDetail(false)
    } finally {
      setLoading(false)
    }
  }

  const recallExpertiseDossier = async DossierID => {
    try {
      setLoading(true)
      const res = await Dossier.recallExpertiseDossier({
        DossierID: DossierID,
      })
      if (res?.isError) return
      Notice({ msg: "Thu hồi ký duyệt thành công!" })
      handleChangePage(pagination)
      setOpenDetail(false)
    } finally {
      setLoading(false)
    }
  }
  const recallPromulgateDossier = async DossierID => {
    try {
      setLoading(true)
      const res = await Dossier.recallPromulgateDossier({
        DossierID: DossierID,
      })
      if (res?.isError) return
      Notice({ msg: "Thu hồi ban hành thành công!" })
      handleChangePage(pagination)
      setOpenDetail(false)
    } finally {
      setLoading(false)
    }
  }
  const recallRefuseDossier = async DossierID => {
    try {
      setLoading(true)
      const res = await Dossier.recallRefuseDossier({
        DossierID,
      })
      if (res?.isError) return
      Notice({ msg: "Thu hồi thành công!" })
      handleChangePage(pagination)
      setOpenDetail(false)
    } finally {
      setLoading(false)
    }
  }
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

  const exportUser = () => {
    setLoading(true)
    Dossier.ExportData({
      DateFrom: "",
    })
      .then(res => {
        if (res?.isError) return
        saveAs(res.Object, "danh sách hồ sơ.xlsx")
      })
      .finally(() => setLoading(false))
  }
  return (
    <SpinCustom spinning={loading}>
      <Row style={{ marginTop: "15px" }} gutter={16}>
        {!!isAdmin && (
          <>
            <Col span={11}>
              <Form.Item name="TextSearch">
                <FlInput
                  label="Tìm kiếm Mã hồ sơ, Tên định danh, Tên đăng ký"
                  search
                  allowClear
                  onSearch={value => {
                    handleChangePage({
                      ...pagination,
                      TextSearch: value,
                    })
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={5} style={{ paddingRight: "8px" }}>
              <FlDatePicker
                allowClear
                ranger
                label={["Từ ngày", "Đến ngày"]}
                onChange={date =>
                  handleChangePage({
                    ...pagination,
                    DateFrom: date ? date[0].format() : undefined,
                    DateTo: date ? date[1].format() : undefined,
                  })
                }
              />
            </Col>

            <Col span={4} style={{ paddingRight: "8px" }}>
              <FlSelect
                label="Sự kiện"
                value={pagination?.Procedure}
                defaultValue={0}
                onChange={value => {
                  setPagination(pre => ({
                    ...pre,
                    CurrentPage: 1,
                    Procedure: value || 0,
                    Status: value ? pagination?.Status : 0,
                  }))
                }}
                allowClear
              >
                <Select.Option key={0} value={0}>
                  Tất cả
                </Select.Option>
                {getListComboByKey(
                  SYSTEM_KEY?.DOSSIER_PROCEDURE_TYPE,
                  listSystemKey,
                )?.map(i => (
                  <Select.Option key={+i?.CodeValue} value={+i?.CodeValue}>
                    {i?.Description}
                  </Select.Option>
                ))}
              </FlSelect>
            </Col>
            <Col span={4} style={{ paddingRight: "8px" }}>
              <FlSelect
                disabled={!pagination?.Procedure}
                defaultValue={0}
                value={pagination?.Status}
                label="Trạng thái"
                onChange={Status => {
                  setPagination(pre => ({ ...pre, Status, CurrentPage: 1 }))
                }}
                allowClear
              >
                <Select.Option key={0} value={0}>
                  Tất cả
                </Select.Option>
                {getListComboByKey(
                  !!(pagination?.Procedure === 1 || pagination?.Procedure === 2)
                    ? SYSTEM_KEY?.DOSSIER_STATUS_CAP_MOI_CAP_LAI
                    : pagination?.Procedure === 3
                    ? SYSTEM_KEY?.DOSSIER_STATUS_GIA_HAN
                    : pagination?.Procedure === 4
                    ? SYSTEM_KEY?.DOSSIER_STATUS_THU_HOI
                    : pagination?.Procedure === 5
                    ? SYSTEM_KEY?.DOSSIER_STATUS_THAY_DOI_THONG_TIN
                    : "",
                  listSystemKey,
                )?.map(i => (
                  <Select.Option key={+i?.CodeValue} value={+i?.CodeValue}>
                    {i?.Description}
                  </Select.Option>
                ))}
              </FlSelect>
            </Col>
          </>
        )}

        <Col
          span={24}
          className="title-type-1 d-flex align-items-center justify-content-space-between mb-0 pb-8 pt-0"
        >
          <div>Danh sách hồ sơ </div>
          <div className="d-flex" span={12} style={{ textAlign: "right" }}>
            <Space>
              {!!btnGeneral?.IsSubmission && !!btnChose?.IsSubmission && (
                <Button
                  loading={loading}
                  // disabled={!count?.length}
                  btnType="third"
                  className="btn-login"
                  style={{ height: "37px" }}
                  onClick={() => {
                    setOpenBrowseRequest(true)
                    // if (count?.length)
                    // else {
                    //   CB1({
                    //     title: `Bạn có chưa chọn hồ sơ. Bạn muốn trình phê duyệt các hồ sơ trong ngày không?`,
                    //     icon: "warning-usb",
                    //     okText: "Đồng ý",
                    //     onOk: async close => {
                    //       getOnDay()
                    //       close()
                    //     },
                    //   })
                    // }
                  }}
                >
                  Trình phê duyệt
                </Button>
              )}

              {!!btnGeneral?.IsInsert && (
                <Button
                  disabled={!!count?.length}
                  btnType="third"
                  className="btn-login"
                  style={{ height: "37px" }}
                  onClick={() => {
                    if (!!isAdmin) setOpenAddDossierModal(true)
                    else {
                      window.scrollTo(0, 0)

                      navigate(ROUTER.TAO_HO_SO, { state: { Insert: true } })
                    }
                  }}
                >
                  <span>Thêm mới</span>
                </Button>
              )}
              {!!btnGeneral?.IsPayment && !!btnChose?.IsPayment && (
                <Button
                  loading={loading}
                  disabled={!count?.length}
                  btnType="third"
                  className="btn-login"
                  style={{ height: "37px" }}
                  onClick={() => {
                    setOpenModalPayment(count)
                  }}
                >
                  Nộp lệ phí
                </Button>
              )}
              {!!btnGeneral?.IsPass && !!btnChose?.IsPass && (
                <Button
                  loading={loading}
                  disabled={!count?.length}
                  btnType="third"
                  className="btn-login"
                  style={{ height: "37px" }}
                  onClick={() => {
                    passDossier(
                      count
                        ?.filter(i => i?.DossierID)
                        ?.map(item => item?.DossierID),
                    )
                  }}
                >
                  Hồ sơ đạt
                </Button>
              )}
              {!!btnGeneral?.IsAprove && !!btnChose?.IsAprove && (
                <Button
                  loading={loading}
                  disabled={!count?.length}
                  btnType="third"
                  className="btn-login"
                  style={{ height: "37px" }}
                  onClick={() => {
                    approveDossier(
                      count
                        ?.filter(i => i?.DossierID)
                        ?.map(item => item?.DossierID),
                    )
                  }}
                >
                  Duyệt hồ sơ
                </Button>
              )}
              {!!btnGeneral?.IsExpertise && !!btnChose?.IsExpertise && (
                <Button
                  loading={loading}
                  disabled={!count?.length}
                  btnType="third"
                  className="btn-login"
                  style={{ height: "37px" }}
                  onClick={() => {
                    expertiseDossier(
                      count
                        ?.filter(i => i?.DossierID)
                        ?.map(item => item?.DossierID),
                    )
                  }}
                >
                  Ký duyệt GCN
                </Button>
              )}
              {!!btnGeneral?.IsPromulgate && !!btnChose?.IsPromulgate && (
                <Button
                  loading={loading}
                  disabled={!count?.length}
                  btnType="third"
                  className="btn-login"
                  style={{ height: "37px" }}
                  onClick={() => {
                    promulgateDossier({
                      LtDossier: count
                        ?.filter(i => i?.DossierID)
                        ?.map(item => item?.DossierID),
                    })
                  }}
                >
                  Ban hành GCN
                </Button>
              )}
              {/* {!!btnGeneral?.IsAcceptChangeInfor &&
                !!btnChose?.IsAcceptChangeInfor && (
                  <Button
                  
                loading={loading}
                  disabled={!count?.length}
                    btnType="third"
                    className="btn-login"
                    style={{ height: "37px" }}
                    onClick={() => {
                      acceptChangInforDossier({
                        DossierID: count
                          ?.filter(i => i?.DossierID)
                          ?.map(item => item?.DossierID),
                      })
                    }}
                  >
                    Chấp nhận thay đổi thông tin
                  </Button>
                )} */}
              {!!btnGeneral?.IsPromulgateReissue &&
                !!btnChose?.IsPromulgateReissue && (
                  <Button
                    loading={loading}
                    disabled={!count?.length}
                    btnType="third"
                    className="btn-login"
                    style={{ height: "37px" }}
                    onClick={() => {
                      promulgateReIssiueDossier({
                        LtDossier: count
                          ?.filter(i => i?.DossierID)
                          ?.map(item => item?.DossierID),
                      })
                    }}
                  >
                    Ban hành GCN cấp lại
                  </Button>
                )}
              {/* {!!btnGeneral?.IsSubmission && ( */}
              <Button
                onClick={exportUser}
                // disabled={!count?.length}
                loading={loading}
                btnType="third"
                className="btn-login"
                style={{ height: "37px", marginRight: "10px" }}
              >
                <span>Xuất Excel</span>
              </Button>
              {/* )} */}
            </Space>
          </div>
        </Col>
        <Col span={24} style={{ marginTop: "20px" }}>
          <StylesTableManagement>
            <TableCustom
              isPrimary
              onRow={(record, rowIndex) => {
                return {
                  onClick: event => {
                    // setDataEdit(record)
                    Handle(record)
                  },
                }
              }}
              rowKey="DossierID"
              sticky={{ offsetHeader: -10 }}
              pagination={{
                hideOnSinglePage: listPagi?.Total <= 10,
                current: pagination?.CurrentPage,
                pageSize: pagination?.PageSize,
                responsive: true,
                total: listPagi?.Total,
                locale: { items_per_page: "" },
                showSizeChanger: listPagi?.Total > 10,
                onChange: (CurrentPage, PageSize) =>
                  handleChangePage({
                    ...pagination,
                    CurrentPage,
                    PageSize,
                  }),
              }}
              rowSelection={{ ...rowSelection }}
              columns={columns}
              dataSource={data}
              scroll={{ x: "1000px" }}
            />
          </StylesTableManagement>
        </Col>
      </Row>
      {!!openUpdate && (
        <AddDossierModal
          open={openUpdate}
          handleOk={() => setPagination(pre => ({ ...pre }))}
          onCancel={() => {
            setOpenUpdate(false)
          }}
        />
      )}
      {!!openAddDossierModal && (
        <AddDossierModal
          open={openAddDossierModal}
          onCancel={() => {
            setOpenAddDossierModal(false)
          }}
          handleOk={() => setPagination(pre => ({ ...pre, CurrentPage: 1 }))}
          isAdmin={true}
        />
      )}
      {/* {!!openRefuse && (
        <ModelRefuse
          open={openRefuse}
          onOk={recallRefuseDossier(dataEdit?.DossierID)}
          onCancel={() => {
            setOpenRefuse(false)
          }}
        />
      )} */}

      {!!openBrowseRequest && (
        <BrowseRequest
          setCount={setCount}
          count={count}
          open={openBrowseRequest}
          //   onOk={getAllUser}
          pagination={pagination}
          onCancel={() => {
            setOpenBrowseRequest(false)
          }}
        />
      )}
      {!!openDetail?.IsViewOld && (
        <ModelDetailManagementNotButton
          open={openDetail}
          dataDetail={openDetail}
          onCancel={() => {
            setOpenDetail(false)
          }}
          loading={loading}
        />
      )}
      {!!(!!openDetail && !openDetail?.IsViewOld) && (
        <ModelDetailManagement
          open={openDetail}
          dataDetail={openDetail}
          onCancel={() => {
            setOpenDetail(false)
          }}
          loading={loading}
          recallExpertiseDossier={recallExpertiseDossier}
          viewCertificate={viewCertificate}
          setOpenUpdate={setOpenUpdate}
          onDeleteUser={onDeleteUser}
          sendDossier={sendDossier}
          sendPropose={sendPropose}
          recallSendDossier={recallSendDossier}
          acceptDossier={acceptDossier}
          acceptChangInforDossier={acceptChangInforDossier}
          setOpenModelRessonDossier={setOpenModelRessonDossier}
          passDossier={passDossier}
          renewDossier={renewDossier}
          setCount={setCount}
          setOpenModalPayment={setOpenModalPayment}
          setOpenComplain={setOpenComplain}
          setOpenDetail={setOpenDetail}
          setOpenModalPaymentReport={setOpenModalPaymentReport}
          setOpenBrowseRequest={setOpenBrowseRequest}
          recallRefuseDossier={recallRefuseDossier}
          returnDossier={returnDossier}
          approveDossier={approveDossier}
          recallPassDossier={recallPassDossier}
          recallAproveDossier={recallAproveDossier}
          expertiseDossier={expertiseDossier}
          recallPromulgateDossier={recallPromulgateDossier}
          promulgateDossier={promulgateDossier}
          promulgateReIssiueDossier={promulgateReIssiueDossier}
          promulgateRecallDossier={promulgateRecallDossier}
          promulgateRenewDossier={promulgateRenewDossier}
          recallDossier={recallDossier}
        />
      )}

      {!!openModelRessonDossier && (
        <ModelRessonDossier
          open={openModelRessonDossier}
          onCancel={() => {
            setOpenModelRessonDossier(false)
          }}
          onOk={() => {
            handleChangePage(pagination)
          }}
        />
      )}
      {!!openModalPayment && (
        <ModalPayment
          open={openModalPayment}
          onCancel={() => {
            setOpenModalPayment(false)
          }}
          onOk={() => {
            handleChangePage(pagination)
          }}
          data={count}
          columns={columns}
        />
      )}
      {!!openComplain && (
        <ModalComplain
          open={openComplain}
          onCancel={() => {
            setOpenComplain(false)
          }}
          onOk={() => {
            handleChangePage(pagination)
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
      {!!openModalPaymentReport && (
        <ModalPaymentReport
          open={openModalPaymentReport}
          onCancel={() => {
            setOpenModalPaymentReport(false)
          }}
          onOk={() => {
            // handleChangePage(pagination)
          }}
        />
      )}
    </SpinCustom>
  )
}

export default RecordsManagementContent
