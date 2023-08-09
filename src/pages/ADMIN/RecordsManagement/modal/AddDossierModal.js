import { Form } from "antd"
import dayjs from "dayjs"
import moment from "moment"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router"
import CustomModal from "src/components/Modal/CustomModal"
import Button from "src/components/MyButton/Button"
import Notice from "src/components/Notice"
import { SYSTEM_KEY } from "src/constants/constants"
import STORAGE from "src/lib/storage"
import { getListComboByKey } from "src/lib/utils"
import { setListProductInCart, setTotalProductInCart } from "src/redux/cart"
import CartService from "src/services/CartService"
import Dossier from "src/services/Dossier"
import FileService from "src/services/FileService"
import GuestServices from "src/services/GuestService"
import MyCV from "../Components/MyCV"

const AddDossierModal = ({ open, onCancel, handleOk, isAdmin, loading }) => {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const userInfo = JSON.parse(localStorage.getItem(STORAGE.USER_INFO))

  const { listSystemKey } = useSelector(state => state.appGlobal)
  const [type, setType] = useState(2)
  const [loading2, setLoading2] = useState(false)
  const [fileDossier, setFileDossier] = useState({})
  const [fileDelete, setFileDelete] = useState([])
  const [dossier, setDossier] = useState({})
  const dispatch = useDispatch()
  const location = useLocation()

  const [startSign, setStartSign] = useState(
    `Hà Nội, ngày ${moment().format("DD")} tháng ${moment().format(
      "MM",
    )} năm ${moment().format("YYYY")}`,
  )

  useEffect(() => {
    if (isAdmin) setType(2)
    else setType(userInfo?.AccountType === 3 ? 3 : 2)
  }, [isAdmin, userInfo?.AccountType])

  const getDossier = id => {
    setLoading2(true)
    Dossier.getDetail(id)
      .then(res => {
        if (res.isOk) {
          // ltField
          const value = res?.Object?.Data
          setDossier(value)
          form.setFieldsValue({
            ...value,
            ManagerBirthDay: !!value?.ManagerBirthDay
              ? dayjs(value?.ManagerBirthDay)
              : undefined,
            RepresentativeBirthDay: !!value?.RepresentativeBirthDay
              ? dayjs(value?.RepresentativeBirthDay)
              : undefined,
            AnticipatedNetwork: value?.ltAnticipatedNetwork,
            ltField: value?.ltField?.map(item => item?.FieldID),
          })

          let listFile
          getListComboByKey(SYSTEM_KEY?.DOSSIER_FILE_TYPE, listSystemKey)?.map(
            i =>
              (listFile = {
                ...listFile,
                [`InsertFileList${i?.CodeValue}`]: value?.ltFile?.filter(
                  item => item?.FileType === i?.CodeValue,
                ),
              }),
          )
          setFileDossier(listFile)
          console.log(value?.PlaceSign)
          setStartSign(pre => value?.PlaceSign)
        }
      })
      .finally(() => {
        setLoading2(false)
      })
  }
  useEffect(() => {
    if (!!open?.DossierID) getDossier(open?.DossierID)
  }, [open?.DossierID])
  const changeInfor = async () => {
    try {
      setLoading2(true)
      const values = await form.validateFields()
      const body = {
        DossierID: !!open?.IsReIssue ? undefined : open?.DossierID,
        DossierOld: !!open?.IsReIssue ? open?.DossierID : undefined,
        ltFile: [],
        PlaceSign: startSign,
        ltUserReference: [],
        ...values,
        Procedure: 1,
        ltIdentifyName: location?.state?.listIdentifyName?.length
          ? location?.state?.listIdentifyName
          : !!values?.IdentifyName
          ? [values?.IdentifyName]
          : [],
        Type: type,
        ltField: !!values?.ltField ? values?.ltField : [],
        AnticipatedNetwork: values?.AnticipatedNetwork?.join(),
        ManagerBirthDay: !!values?.ManagerBirthDay
          ? values?.ManagerBirthDay.format()
          : undefined,
        RepresentativeBirthDay: !!values?.RepresentativeBirthDay
          ? values?.RepresentativeBirthDay.format()
          : undefined,
      }
      let res = {}
      if (open?.IsChangeInfor) res = await Dossier.changInforDossier(body)
      else if (open?.IsReIssue) res = await Dossier.reIssueDossier(body)

      if (res?.isError) return

      // dossier
      let resUpload
      if (
        fileDossier?.InsertFileList1?.filter(img => img?.originFileObj)
          ?.length ||
        fileDossier?.InsertFileList2?.filter(img => img?.originFileObj)
          ?.length ||
        fileDossier?.InsertFileList3?.filter(img => img?.originFileObj)
          ?.length ||
        fileDelete?.length
      ) {
        const formData = new FormData()
        if (!!location?.state?.DossierID)
          formData.append("DossierID", location?.state?.DossierID)
        else if (res?.Object?.length)
          res?.Object?.map(item => formData.append("DossierID", item))

        if (fileDelete?.length)
          fileDelete?.map(item => {
            formData.append("DeleteFileList", item)
          })

        if (
          fileDossier?.InsertFileList1?.filter(img => img?.originFileObj)
            ?.length
        )
          fileDossier?.InsertFileList1?.map(img => {
            formData.append("InsertFileList1", img?.originFileObj)
          })
        if (fileDossier?.InsertFileList2?.length)
          fileDossier?.InsertFileList2?.filter(img => img?.originFileObj)?.map(
            img => {
              formData.append("InsertFileList2", img?.originFileObj)
            },
          )
        if (
          fileDossier?.InsertFileList3?.filter(img => img?.originFileObj)
            ?.length
        )
          fileDossier?.InsertFileList3?.map(img => {
            formData.append("InsertFileList3", img?.originFileObj)
          })
        resUpload = await FileService.uploadListFileDossierSeaWeed(formData)
      }

      if (resUpload?.isError) return
      Notice({
        msg: "Gửi yêu cầu thành công ! Chúng tôi sẽ liên hệ sớm với bạn.",
      })
      !!getListCart && getListCart()
      !!handleOk && handleOk()
      !!onCancel && onCancel()
    } finally {
      setLoading2(false)
    }
  }

  const createCV = async status => {
    try {
      setLoading2(true)
      const values = await form.validateFields()
      const body = {
        status: status,
        PlaceSign: startSign,
        DossierID: location?.state?.DossierID
          ? location.state.DossierID
          : open?.DossierID,
        ltFile: [],
        ltUserReference: [],
        ...values,
        Procedure: 1,
        ltIdentifyName: location?.state?.listIdentifyName?.length
          ? location.state.listIdentifyName
          : values?.IdentifyName
          ? [values.IdentifyName]
          : [],
        Type: type,
        ltField: values?.ltField || [],
        AnticipatedNetwork: values?.AnticipatedNetwork?.join(),
        ManagerBirthDay: values?.ManagerBirthDay
          ? values.ManagerBirthDay.format()
          : undefined,
        RepresentativeBirthDay: values?.RepresentativeBirthDay
          ? values.RepresentativeBirthDay.format()
          : undefined,
      }
      let res = {}
      if (!open?.IsAdditional) {
        res = !open?.DossierID
          ? await Dossier.insert(body)
          : await Dossier.update(body)

        if (res?.isError) return
      }

      // dossier
      let resUpload
      if (
        fileDossier?.InsertFileList1?.filter(img => img?.originFileObj)
          .length ||
        fileDossier?.InsertFileList2?.filter(img => img?.originFileObj)
          .length ||
        fileDossier?.InsertFileList3?.filter(img => img?.originFileObj)
          .length ||
        fileDelete?.length
      ) {
        const formData = new FormData()
        formData.append(
          "DossierID",
          location?.state?.DossierID || res.Object || open?.DossierID,
        )
        if (fileDelete?.length)
          fileDelete?.map(item => {
            formData.append("DeleteFileList", item)
          })

        if (
          fileDossier?.InsertFileList1?.filter(img => img?.originFileObj).length
        )
          fileDossier.InsertFileList1?.map(img => {
            formData.append("InsertFileList1", img?.originFileObj)
          })
        if (fileDossier?.InsertFileList2?.length)
          fileDossier.InsertFileList2.filter(img => img?.originFileObj).map(
            img => {
              formData.append("InsertFileList2", img?.originFileObj)
            },
          )
        if (
          fileDossier?.InsertFileList3?.filter(img => img?.originFileObj).length
        )
          fileDossier.InsertFileList3?.map(img => {
            formData.append("InsertFileList3", img?.originFileObj)
          })
        resUpload = await FileService.uploadListFileDossierSeaWeed(formData)
      }

      if (resUpload?.isError) return
      if (!!open?.IsAdditional) {
        const resAdditionalDossier = await Dossier.additionalDossier({
          DossierID: open?.DossierID,
        })
        if (resAdditionalDossier?.isError) return
      }
      Notice({
        msg: "Gửi yêu cầu thành công ! Chúng tôi sẽ liên hệ sớm với bạn.",
      })

      !!getListCart && getListCart()
      !!handleOk && handleOk()
      !!onCancel && onCancel()
    } finally {
      // Thêm hành động nếu cần thiết sau khi hoàn thành
      setLoading2(false)
    }
  }

  const getListTags = async (isOne, status) => {
    if (location?.state?.listIdentifyName?.length) {
      createCV(status)
    } else {
      if (!!isOne) {
        try {
          const values = await form.validateFields(["IdentifyName"])
          const res = await GuestServices.GetListBrandName({
            TextSearch: values?.IdentifyName,
          })

          if (res?.Object?.IsAvailable) {
            // Xử lý khi tìm kiếm thành công

            Notice({
              isSuccess: true,
              msg: "Tên định danh đăng ký hợp lệ",
            })
          } else {
            // Xử lý khi tìm kiếm thất bại
            Notice({
              isSuccess: false,
              msg: "Tên định danh đăng ký không hợp lệ hoặc đã tồn tại",
            })
          }
        } finally {
        }
      } else createCV(status)
    }
  }

  const getListCart = () => {
    CartService.getAllProductInCart()
      .then(res => {
        if (res.isOk) {
          dispatch(setListProductInCart(res.Object))
          dispatch(setTotalProductInCart(res.Object.length))
        }
      })
      .finally(() => {})
  }
  return (
    <CustomModal
      title={
        !!open?.DossierID
          ? !!open?.IsReIssue
            ? "Cấp lại giấy chứng nhận"
            : !!open?.IsChangeInfor
            ? "Thay đổi thông tin hồ sơ"
            : !!open?.IsAdditional
            ? "Bổ xung thông tin hồ sơ"
            : "Cập nhật hồ sơ tên định danh"
          : "Thêm hồ sơ"
      }
      width="90vw"
      footer={
        <div className="d-flex-end ">
          {!!open?.IsChangeInfor ? (
            <Button
              loading={loading || loading2}
              btnType="primary"
              className="ml-24 pl-24 pr-24"
              onClick={() => changeInfor()}
            >
              Thay đổi thông
            </Button>
          ) : !!open?.IsReIssue ? (
            <Button
              loading={loading || loading2}
              btnType="primary"
              className="ml-24 pl-24 pr-24"
              onClick={() => changeInfor()}
            >
              Cấp lại giấy chứng nhận
            </Button>
          ) : (
            <>
              <Button
                loading={loading || loading2}
                btnType="third"
                className="ml-24 pl-24 pr-24"
                form="myFormDosser"
                key="submit1"
                htmlType="submit"
                onClick={() => getListTags(false, 1)}
              >
                Lưu đơn
              </Button>
              {!open?.DossierID ? (
                <Button
                  loading={loading || loading2}
                  btnType="danger"
                  className="ml-24 pl-24 pr-24"
                  form="myFormDosser"
                  key="submit2"
                  htmlType="submit"
                  onClick={() => getListTags(false, 2)}
                >
                  Gửi đơn
                </Button>
              ) : (
                <></>
              )}
            </>
          )}
          {/* <Button
          loading={loading}
            btnType="third"
            className="ml-24 pl-24 pr-24"
            onClick={() => {
              // setViewFile(true)
            }}
          >
            Xem đơn
          </Button> */}
        </div>
      }
      open={open}
      onOk={handleOk}
      onCancel={onCancel}
    >
      {/* <SpinCustom spinning={loading || loading2 }> */}
      <MyCV
        open={open}
        isAdmin={isAdmin}
        onCancel={onCancel}
        checkDossier={() => getListTags(true, 0)}
        type={type}
        setType={setType}
        setFileDossier={setFileDossier}
        fileDossier={fileDossier}
        dossier={dossier}
        fileDelete={fileDelete}
        setFileDelete={setFileDelete}
        form={form}
        loading2={loading || loading2}
        startSign={startSign}
        setStartSign={setStartSign}
      />
      {/* </SpinCustom> */}
    </CustomModal>
  )
}

export default AddDossierModal
