import CustomModal from "src/components/Modal/CustomModal"
import Button from "src/components/MyButton/Button"
import SpinCustom from "src/components/Spin"
import MyDetail from "./MyDetail"
const ModelDetailManagementNotButton = ({
  open,
  onCancel,
  dataDetail,
  viewCertificate,

  setOpenDetail,
  renewDossier,
  setOpenUpdate,
  recallDossier,
  loading,
}) => {
  return (
    <CustomModal
      title={!!open?.IsRenew ? "Gia hạn giấy chứng nhận" : "Chi tiết hồ sơ"}
      open={!!open}
      onCancel={onCancel}
      width={"90vw"}
      footer={
        !!open?.IsRenew ? (
          <div className="d-flex-end">
            {!!open?.IsRenew && (
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
            {/* {!!open?.ButtonShow?.IsViewCertificate && (
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
            )} */}
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
          </div>
        )
      }
    >
      <SpinCustom spinning={loading}>
        <MyDetail dataDetail={dataDetail} />
      </SpinCustom>
    </CustomModal>
  )
}

export default ModelDetailManagementNotButton
