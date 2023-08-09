import { Form, Tabs } from "antd"
import moment from "moment"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useLocation, useNavigate } from "react-router"
import Notice from "src/components/Notice"
import SpinCustom from "src/components/Spin"
import STORAGE from "src/lib/storage"
import { TabsNewsStyled } from "src/pages/ANONYMOUS/Home/styled"
import { setListProductInCart, setTotalProductInCart } from "src/redux/cart"
import ROUTER from "src/router"
import CartService from "src/services/CartService"
import Dossier from "src/services/Dossier"
import FileService from "src/services/FileService"
import GuestServices from "src/services/GuestService"
import CVitem from "./components/CVitem"
import { TabCVStyle } from "./styled"

const MyCV = ({ isAdmin, singlePage, getList, IsAdditional }) => {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const userInfo = JSON.parse(localStorage.getItem(STORAGE.USER_INFO))

  // const { listSystemKey } = useSelector(state => state.appGlobal)
  const [type, setType] = useState(2)
  const [loading, setLoading] = useState(false)
  const [listIdentifyName, setListIdentifyName] = useState([])
  const [fileDossier, setFileDossier] = useState({})
  const [fileDelete, setFileDelete] = useState([])
  // const [dossier, setDossier] = useState({})
  // const [doID, setDoID] = useState()
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

  useEffect(() => {
    if (!!location?.state?.TextSearch)
      form.setFieldsValue({
        IdentifyName: location?.state?.TextSearch,
      })

    if (!!location?.state?.listIdentifyName?.length)
      setListIdentifyName(location?.state?.listIdentifyName)

    // if (!!location?.state?.DossierID) setDoID(location?.state?.DossierID)
  }, [location?.state])

  useEffect(() => {
    form.setFieldsValue({
      RegisterEmail: userInfo?.Email,
      RegisterPhone: userInfo?.PhoneNumber,
      RegisterAddress: userInfo?.FullAddress,
      RegisterIdentify: userInfo?.Identification,
      RegisterName: userInfo?.FullName,
    })
  }, [])

  const createCV = async status => {
    try {
      setLoading(true)
      const values = await form.validateFields()
      const body = {
        status: status,
        PlaceSign: startSign,
        DossierID: location?.state?.DossierID
          ? location.state.DossierID
          : undefined,
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
      if (!IsAdditional) {
        res = await Dossier.insert(body)

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
        formData.append("DossierID", location?.state?.DossierID || res.Object)
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
      Notice({
        msg: "Gửi yêu cầu thành công ! Chúng tôi sẽ liên hệ sớm với bạn.",
      })

      // if (location?.state?.Insert)
      navigate(ROUTER.QUAN_LY_TAI_KHOAN_HO_SO_CHO_XU_LY)
      !!getListCart && getListCart()
    } finally {
      // Thêm hành động nếu cần thiết sau khi hoàn thành
      setLoading(false)
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

  const items = [
    {
      label: "Cá nhân",
      key: 2,
      children: <></>,
    },
    {
      label: "Tổ chức/ Doanh nghiệp",
      key: 3,
      children: <></>,
    },
  ]
  return (
    <TabCVStyle isAdmin={isAdmin} singlePage={singlePage}>
      {!!isAdmin ? (
        <TabsNewsStyled>
          <Tabs items={items} onChange={value => setType(pre => value)} />
        </TabsNewsStyled>
      ) : (
        <div className="title-type-1 mb-0">Tạo Hồ Sơ</div>
      )}
      <CVitem
        startSign={startSign}
        setStartSign={setStartSign}
        type={type}
        form={form}
        createCV={status => getListTags(false, status)}
        // changeInfor={() => {
        //   changeInfor()
        // }}
        fileDossier={fileDossier}
        setFileDossier={setFileDossier}
        listIdentifyName={listIdentifyName}
        checkDossier={() => getListTags(true, 0)}
        // dossier={dossier}
        fileDelete={fileDelete}
        setFileDelete={setFileDelete}
        IsAdditional={IsAdditional}
        loading2={loading}
      />
    </TabCVStyle>
  )
}

export default MyCV
