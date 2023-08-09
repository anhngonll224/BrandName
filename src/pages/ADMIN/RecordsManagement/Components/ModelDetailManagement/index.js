import CB1 from "src/components/Modal/CB1"
import CustomModal from "src/components/Modal/CustomModal"
import Button from "src/components/MyButton/Button"
import Dossier from "src/services/Dossier"
import MyDetail from "./MyDetail"
const ModelDetailManagement = ({
  open,
  onCancel,
  dataDetail,
  loading,
  viewCertificate,
  recallExpertiseDossier,
  setOpenUpdate,
  onDeleteUser,
  sendDossier,
  sendPropose,
  recallSendDossier,
  acceptDossier,
  acceptChangInforDossier,
  setOpenModelRessonDossier,
  passDossier,
  renewDossier,
  setCount,
  setOpenModalPayment,
  setOpenComplain,
  setOpenDetail,
  setOpenModalPaymentReport,
  setOpenBrowseRequest,
  recallRefuseDossier,
  returnDossier,
  approveDossier,
  recallAproveDossier,
  recallPassDossier,
  expertiseDossier,
  recallPromulgateDossier,
  promulgateDossier,
  promulgateReIssiueDossier,
  promulgateRecallDossier,
  promulgateRenewDossier,
  recallDossier,
}) => {
  return (
    <CustomModal
      title={
        !!open?.IsRecall
          ? "Thu hồi tên định danh"
          : !!open?.IsRenew
          ? "Gia hạn giấy chứng nhận"
          : "Chi tiết hồ sơ"
      }
      open={!!open}
      onCancel={onCancel}
      width={"90vw"}
      footer={
        !!open?.IsRecall ? (
          <div className="d-flex-end">
            <Button
              loading={loading}
              btnType="primary"
              onClick={() => {
                recallDossier(open?.DossierID)
              }}
            >
              Thu hồi tên định danh
            </Button>
          </div>
        ) : !!open?.IsRenew ? (
          <div className="d-flex-end">
            {!!open?.ButtonShow?.IsRenew && (
              <Button
                loading={loading}
                btnType="primary"
                onClick={() => {
                  renewDossier(open?.DossierID)
                }}
              >
                Gia hạn GCN
              </Button>
            )}
          </div>
        ) : (
          <div className="d-flex-end">
            {/* cá nhân */}
            {!!open?.ButtonShow?.IsUpdate && (
              <Button
                loading={loading}
                btnType="primary"
                onClick={() => {
                  setOpenUpdate({ ...open })
                }}
              >
                Chỉnh sửa
              </Button>
            )}
            {!!open?.ButtonShow?.IsDelete && (
              <Button
                loading={loading}
                btnType="primary"
                onClick={() => {
                  CB1({
                    open,
                    title: `Bạn có chắc chắn muốn xoá
                                      <strong> ${open?.IdentifyName}</strong> không?`,
                    icon: "warning-usb",
                    okText: "Đồng ý",
                    onOk: async close => {
                      onDeleteUser(open?.DossierID)
                      close()
                    },
                  })
                }}
              >
                Xóa
              </Button>
            )}
            {!!open?.ButtonShow?.IsViewAffidavit && (
              <Button
                loading={loading}
                btnType="primary"
                onClick={() => {
                  viewCertificate(open, 4, "Bản khai hồ sơ")
                }}
              >
                {" "}
                Xem bản khai hồ sơ
              </Button>
            )}
            {!!open?.ButtonShow?.IsViewCertificate && (
              <Button
                loading={loading}
                btnType="primary"
                onClick={() => {
                  viewCertificate(open, 6, "Giấy chứng nhận")
                }}
              >
                {" "}
                Xem giấy chứng nhận
              </Button>
            )}
            {!!open?.ButtonShow?.IsViewChangInfo && (
              <Button
                loading={loading}
                btnType="primary"
                onClick={() => {
                  viewCertificate(open, 7, "Giấy thay đổi thông tin")
                }}
              >
                {" "}
                Xem giấy thay đổi thông tin
              </Button>
            )}
            {!!open?.ButtonShow?.IsViewRevocation && (
              <Button
                loading={loading}
                btnType="primary"
                onClick={() => {
                  viewCertificate(open, 5, "Giấy thu hồi tên định danh")
                }}
              >
                {" "}
                Xem giấy thu hồi tên định danh
              </Button>
            )}
            {!!open?.ButtonShow?.IsSend && (
              <Button
                loading={loading}
                btnType="primary"
                onClick={() => {
                  sendDossier(open?.DossierID)
                }}
              >
                Gửi hồ sơ
              </Button>
            )}

            {!!open?.ButtonShow?.IsSendPropose && (
              <Button
                loading={loading}
                btnType="primary"
                onClick={() => {
                  sendPropose(open?.DossierID)
                }}
              >
                Gửi đề xuất
              </Button>
            )}
            {!!open?.ButtonShow?.IsRecallSend && (
              <Button
                loading={loading}
                btnType="primary"
                onClick={() => {
                  recallSendDossier(open?.DossierID)
                }}
              >
                Thu hồi hồ sơ
              </Button>
            )}

            {!!open?.ButtonShow?.IsChangeInfor && (
              <Button
                loading={loading}
                btnType="primary"
                onClick={() => {
                  // window.scrollTo(0, 0)
                  // navigate(ROUTER.TAO_HO_SO, {
                  //   state: { ...open, IsChangeInfor: true },
                  // })

                  setOpenUpdate({ ...open, IsChangeInfor: true })
                }}
              >
                Thay đổi thông tin
              </Button>
            )}

            {/* chuyên viên */}
            {!!open?.ButtonShow?.IsAccept && (
              <Button
                loading={loading}
                btnType="primary"
                onClick={() => {
                  acceptDossier(open?.DossierID)
                }}
              >
                Tiếp nhận hồ sơ
              </Button>
            )}

            {!!open?.ButtonShow?.IsAcceptChangeInfor && (
              <Button
                loading={loading}
                btnType="primary"
                onClick={() => {
                  acceptChangInforDossier({ DossierID: [open?.DossierID] })
                }}
              >
                Chấp nhận thay đổi thông tin
              </Button>
            )}
            {!!open?.ButtonShow?.IsRefuse && (
              <Button
                loading={loading}
                btnType="primary"
                onClick={() => {
                  // setOpenModalRefuseDossier({
                  //   DossierID: open?.DossierID,
                  // })
                  setOpenModelRessonDossier({
                    DossierID: open?.DossierID,
                    title: "Từ chối tiếp nhận hồ sơ",
                    titleItem: "Lý do từ chối",
                    nameItem: "Reason",
                    requestHandle: Dossier.refuseDossier,
                  })
                }}
              >
                Từ chối tiếp nhận hồ sơ
              </Button>
            )}

            {!!open?.ButtonShow?.IsRequestAdditional && (
              <Button
                loading={loading}
                btnType="primary"
                onClick={() => {
                  // setOpenModalAdditionalDossier({
                  //   DossierID: open?.DossierID,
                  // })

                  setOpenModelRessonDossier({
                    DossierID: open?.DossierID,
                    title: "Yêu cầu bổ sung hồ sơ",
                    titleItem: "Các yêu cầu bổ sung",
                    nameItem: "Content",
                    requestHandle: Dossier.requestAdditionalDossier,
                  })
                }}
              >
                Yêu cầu bổ sung
              </Button>
            )}
            {!!open?.ButtonShow?.IsAdditional && (
              <Button
                loading={loading}
                btnType="primary"
                onClick={() => {
                  setOpenUpdate({ IsAdditional: true, ...open })
                }}
              >
                Bổ sung thông tin
              </Button>
            )}
            {!!open?.ButtonShow?.IsPass && (
              <Button
                loading={loading}
                btnType="primary"
                onClick={() => {
                  passDossier([open?.DossierID])
                }}
              >
                Hồ sơ đạt
              </Button>
            )}
            {!!open?.ButtonShow?.IsRenew && (
              <Button
                loading={loading}
                btnType="primary"
                onClick={() => {
                  renewDossier(open?.DossierID)
                }}
              >
                Gia hạn GCN
              </Button>
            )}
            {!!open?.ButtonShow?.IsReIssue && (
              <Button
                loading={loading}
                btnType="primary"
                onClick={() => {
                  // reIssueDossier(open?.DossierID)

                  setOpenUpdate({ ...open, IsReIssue: true })
                }}
              >
                Cấp lại GCN
              </Button>
            )}

            {/* {!!open?.ButtonShow?.IsReturn && (
                <Button
              
                  loading={loading}
                btnType="primary"
                  onClick={() => {
                  }}
                >Nhận GCN</Button>
              )} */}

            {!!open?.ButtonShow?.IsPayment && (
              <Button
                loading={loading}
                btnType="primary"
                onClick={() => {
                  setCount([open])
                  setOpenModalPayment(open)
                }}
              >
                Nộp lệ phí
              </Button>
            )}
            {!!open?.ButtonShow?.IsViewReport && (
              <Button
                loading={loading}
                btnType="primary"
                onClick={() => {
                  setOpenComplain(open)
                }}
              >
                Xem khiếu nại
              </Button>
            )}

            {!!open?.ButtonShow?.IsViewOld && !open?.IsViewOld && (
              <Button
                loading={loading}
                btnType="primary"
                onClick={() => {
                  setOpenDetail({ ...open, IsViewOld: true })
                }}
              >
                Xem hồ sơ gốc
              </Button>
            )}
            {!!open?.ButtonShow?.IsReport && (
              <Button
                loading={loading}
                btnType="primary"
                onClick={() => {
                  setOpenModalPaymentReport(open)
                }}
              >
                Báo cáo lỗi thanh toán
              </Button>
            )}
            {!!open?.ButtonShow?.IsReturn && (
              <Button
                loading={loading}
                btnType="primary"
                onClick={() => {
                  setOpenModelRessonDossier({
                    DossierID: open?.DossierID,
                    title: "Rút hồ sơ",
                    titleItem: "Lý do rút hồ sơ",
                    nameItem: "Reason",
                    requestHandle: Dossier.returnFromUserDossier,
                  })
                }}
              >
                Rút hồ sơ
              </Button>
            )}
            {/* chuyên viên */}

            {!!open?.ButtonShow?.IsSubmission && (
              <Button
                loading={loading}
                btnType="primary"
                onClick={() => {
                  setOpenBrowseRequest(true)
                  setCount([open])
                }}
              >
                Trình phê duyệt
              </Button>
            )}

            {!!open?.ButtonShow?.IsRecallRefuse && (
              <Button
                loading={loading}
                btnType="primary"
                onClick={() => {
                  recallRefuseDossier(open?.DossierID)
                }}
              >
                Thu hồi từ chối hồ sơ
              </Button>
            )}

            {!!open?.ButtonShow?.IsAcceptReturn && (
              <Button
                loading={loading}
                btnType="primary"
                onClick={() => {
                  returnDossier(open)
                }}
              >
                Trả hồ sơ
              </Button>
            )}
            {!!open?.ButtonShow?.IsRefuseReturn && (
              <Button
                loading={loading}
                btnType="primary"
                onClick={() => {
                  // refuseReturn(open)

                  setOpenModelRessonDossier({
                    DossierID: open?.DossierID,
                    title: "Từ chối rút hồ sơ",
                    titleItem: "Lý do từ chối",
                    nameItem: "Reason",
                    requestHandle: Dossier.refuseReturnDossier,
                  })
                }}
              >
                Từ chối rút hồ sơ
              </Button>
            )}
            {/* lãnh đạo trung tâm ,Lãnh đạo cục*/}

            {!!open?.ButtonShow?.IsAprove && (
              <Button
                loading={loading}
                btnType="primary"
                onClick={() => {
                  approveDossier([open?.DossierID])
                }}
              >
                Duyệt hồ sơ
              </Button>
            )}

            {!!open?.ButtonShow?.IsRefuseAprove && (
              <Button
                loading={loading}
                btnType="primary"
                onClick={() => {
                  setOpenModelRessonDossier({
                    DossierID: open?.DossierID,
                    title: "Từ chối duyệt hồ sơ",
                    titleItem: "Lý do từ chối",
                    nameItem: "Reason",
                    requestHandle: Dossier.refuseApproveDossier,
                  })
                }}
              >
                Không duyệt hồ sơ
              </Button>
            )}
            {!!open?.ButtonShow?.IsRecallAprove && (
              <Button
                loading={loading}
                btnType="primary"
                onClick={() => {
                  recallAproveDossier(open?.DossierID)
                }}
              >
                Thu hồi duyệt hồ sơ
              </Button>
            )}
            {!!open?.ButtonShow?.IsRecallAceept && (
              <Button
                loading={loading}
                btnType="primary"
                onClick={() => {
                  recallPassDossier(open?.DossierID)
                }}
              >
                Thu hồi tiếp nhận
              </Button>
            )}

            {!!open?.ButtonShow?.IsExpertise && (
              <Button
                loading={loading}
                btnType="primary"
                onClick={() => {
                  expertiseDossier([open?.DossierID])
                }}
              >
                Ký duyệt GCN
              </Button>
            )}

            {!!open?.ButtonShow?.IsRefuseExpertise && (
              <Button
                loading={loading}
                btnType="primary"
                onClick={() => {
                  setOpenModelRessonDossier({
                    DossierID: open?.DossierID,
                    title: "Từ chối duyệt giấy chứng nhận",
                    titleItem: "Lý do từ chối",
                    nameItem: "Reason",
                    requestHandle: Dossier.refuseExpertiseDossier,
                  })
                }}
              >
                Không duyệt GCN
              </Button>
            )}
            {!!open?.ButtonShow?.IsRecallExpertise && (
              <Button
                loading={loading}
                btnType="primary"
                onClick={() => {
                  recallExpertiseDossier(open?.DossierID)
                }}
              >
                Thu hồi ký duyệt
              </Button>
            )}

            {/* Văn thư cục */}

            {!!open?.ButtonShow?.IsRecallPromulga && (
              <Button
                loading={loading}
                btnType="primary"
                onClick={() => {
                  recallPromulgateDossier(open?.DossierID)
                }}
              >
                Thu hồi ban hành GCN
              </Button>
            )}
            {!!open?.ButtonShow?.IsPromulgate && (
              <Button
                loading={loading}
                btnType="primary"
                onClick={() => {
                  promulgateDossier({
                    LtDossier: [open?.DossierID],
                  })
                }}
              >
                Ban hành GCN
              </Button>
            )}
            {!!open?.ButtonShow?.IsPromulgateReissue && (
              <Button
                loading={loading}
                btnType="primary"
                onClick={() => {
                  promulgateReIssiueDossier({
                    LtDossier: [open?.DossierID],
                  })
                }}
              >
                Ban hành GCN cấp lại
              </Button>
            )}

            {!!open?.ButtonShow?.IsPromulgateRecall && (
              <Button
                loading={loading}
                btnType="primary"
                onClick={() => {
                  promulgateRecallDossier([open?.DossierID])
                }}
              >
                Ban hành thông báo thu hồi
              </Button>
            )}
            {!!open?.ButtonShow?.IsPromulgateRenew && (
              <Button
                loading={loading}
                btnType="primary"
                onClick={() => {
                  promulgateRenewDossier([open?.DossierID])
                }}
              >
                Ban hành thông báo gia hạn
              </Button>
            )}

            {!!open?.ButtonShow?.IsRecall && (
              <Button
                loading={loading}
                btnType="primary"
                onClick={() => {
                  recallDossier(open?.DossierID)
                }}
              >
                Thu hồi tên định danh
              </Button>
            )}
          </div>
        )
      }
    >
      <MyDetail dataDetail={dataDetail} open={open} />
    </CustomModal>
  )
}

export default ModelDetailManagement
