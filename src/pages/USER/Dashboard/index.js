import { CameraOutlined, UserOutlined } from "@ant-design/icons"
import { Avatar, Button, Menu, Upload } from "antd"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import defaultBackground from "src/assets/images/background/bg-db.jpg"
import LayoutCommon from "src/components/Common/Layout"
import Notice from "src/components/Notice"
import STORAGE, { setStorage } from "src/lib/storage"
import FileService from "src/services/FileService"
import UserService from "src/services/UserService"
import MyAccount from "../MyAccount"
import { StyleDashboard } from "./styled"
// import ProfilePage from "src/pages/ADMIN/Curriculumvitae"
// import BusinessHour from "src/pages/ADMIN/BusinessHour"
// import ListUser from "src/pages/ADMIN/ListUser/index.js"
// import PayCheck from "../PayCheck.js"
import { ACCOUNT_TYPE_ID } from "src/constants/constants"
// import Infrastructure from "src/pages/ADMIN/Infrastructure"
import useWindowSize from "src/lib/useWindowSize"

const Dashboard = () => {
  const userInfo = JSON.parse(localStorage.getItem(STORAGE.USER_INFO))
  const [current, setCurrent] = useState("1")
  const { id } = useParams()
  const [userDetail, setUserDetail] = useState({})
  const [loading, setLoading] = useState(false)
  const [backgroundUpload, setBackgroundUpload] = useState("")

  const items = !(userInfo?.AccountType === ACCOUNT_TYPE_ID?.KHACH_HANG_CA_NHAN)
    ? [
        {
          label: "Tài khoản của tôi",
          key: "1",
          icon: <UserOutlined style={{ fontSize: 17 }} />,
          Node: (
            <LayoutCommon>
              <MyAccount />
            </LayoutCommon>
          ),
        },
        // {
        //   label: "Sơ yếu lý lịch",
        //   key: "8",
        //   icon: <SnippetsOutlined style={{ fontSize: 17 }} />,
        //   Node: (
        //     <LayoutCommon>
        //       <ProfilePage heightForm={"100vh"} />
        //     </LayoutCommon>
        //   ),
        // },
        // {
        //   label: "Lịch làm việc",
        //   key: "1",
        //   icon: <CalendarOutlined style={{ fontSize: 17 }} />,
        //   Node: (
        //     <LayoutCommon>
        //       <BusinessHour />
        //     </LayoutCommon>
        //   ),
        // },
        // {
        //   label: "Danh bạ",
        //   key: "3",
        //   icon: <IdcardOutlined style={{ fontSize: 17 }} />,
        //   Node: (
        //     <LayoutCommon>
        //       <ListUser />
        //     </LayoutCommon>
        //   ),
        // },
        // {
        //   label: "Phiếu Lương",
        //   key: "4",
        //   icon: <DollarCircleOutlined style={{ fontSize: 17 }} />,
        //   Node: (
        //     <LayoutCommon>
        //       <PayCheck />
        //     </LayoutCommon>
        //   ),
        // },
        // {
        //   label: "Trang thiết bị",
        //   key: "5",
        //   icon: <DatabaseOutlined style={{ fontSize: 17 }} />,
        //   Node: (
        //     <LayoutCommon>
        //       <Infrastructure />
        //     </LayoutCommon>
        //   ),
        // },
      ]
    : [
        {
          label: "Tài khoản của tôi",
          key: "1",
          icon: <UserOutlined style={{ fontSize: 17 }} />,
          Node: (
            <LayoutCommon>
              <MyAccount />
            </LayoutCommon>
          ),
        },
      ]
  const uploadImg = async file => {
    try {
      setLoading(true)
      const formData = new FormData()
      formData.append("file", file)
      const res = await FileService.uploadFile(formData)
      if (res.isError) return
      setBackgroundUpload(res.Object)
    } finally {
      setLoading(false)
    }
  }

  const changeBackground = async () => {
    try {
      setLoading(true)
      const res = await UserService.changeInfor({
        ...userInfo,
        Background: backgroundUpload,
      })
      if (res?.isError) return
      let obj = {
        ...userInfo,
        Background: backgroundUpload,
      }
      setStorage(STORAGE.USER_INFO, obj)
      // dispatch(setUserInfo(obj))
      getInfo()
      setBackgroundUpload("")

      Notice({
        msg: "Cập nhật ảnh bìa thành công.",
      })
    } finally {
      setLoading(false)
    }
  }

  const getInfo = () => {
    setLoading(true)
    UserService.getInforUser()
      .then(res => {
        if (res.isError) return
        setUserDetail(res.Object)
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    getInfo()
    if (!!id) setCurrent(pre => id)
    else setCurrent(pre => "1")
  }, [id])

  const onClick = e => {
    setCurrent(e.key)
  }
  return (
    <StyleDashboard>
      <div
        className="header-dashboard"
        style={{
          backgroundImage: `url("${
            backgroundUpload || userDetail?.Background || defaultBackground
          }")`,
          backgroundSize: "cover",
        }}
      >
        <LayoutCommon>
          <div className="fw-600 fs-30 mt-25">
            <div className="wrap-avatar justify-content-space-between d-flex div-coating">
              <div
                className="d-flex align-items-center justify-content-center user-avatar"
                // style={{ padding: "0px 300px 0px 300px" }}
              >
                <Avatar
                  icon={
                    <UserOutlined style={{ fontSize: "80px", color: "#fff" }} />
                  }
                  size={useWindowSize.isMobile() ? 80 : 160}
                  src={userDetail?.Avatar}
                  className={`${useWindowSize.isMobile() ? "mt-65" : ""}`}
                />
                <div className="ml-20 pt-80 d-flex flex-column">
                  <div
                    style={useWindowSize.isMobile() ? { fontSize: "16px" } : {}}
                  >
                    {userInfo?.FullName}
                  </div>
                  <div className="fs-16">{userInfo?.Username}</div>
                </div>
              </div>
              <div>
                <Upload
                  beforeUpload={file => {
                    uploadImg(file)
                    return false
                  }}
                  accept="image/*"
                  multiple={false}
                  maxCount={1}
                  fileList={[]}
                >
                  <div className="d-flex">
                    {!backgroundUpload && (
                      <Button className="btn-background btn-hide fw-600 d-flex-center">
                        <CameraOutlined /> Đổi ảnh bìa
                      </Button>
                    )}

                    {backgroundUpload && (
                      <Button
                        className="ml-16 btn-background"
                        style={{ width: 120 }}
                        onClick={e => {
                          e.stopPropagation()
                          changeBackground()
                        }}
                      >
                        <div className="text-center fw-600 w-100">Lưu ảnh</div>
                      </Button>
                    )}
                    {backgroundUpload && (
                      <Button
                        className="ml-16 btn-background "
                        style={{ width: 120 }}
                        onClick={e => {
                          e.stopPropagation()
                          setBackgroundUpload("")
                        }}
                      >
                        <div className="text-center fw-600 w-100">Hủy</div>
                      </Button>
                    )}
                  </div>
                </Upload>
              </div>
            </div>
          </div>
          <div className="menu-dash">
            <Menu
              onClick={onClick}
              selectedKeys={[current]}
              mode="horizontal"
              items={items}
            />
          </div>
        </LayoutCommon>
      </div>
      <div className="my-user-style" style={{ marginTop: "40px" }}>
        {items?.find(item => item?.key === current)?.Node}
      </div>
    </StyleDashboard>
  )
}

export default Dashboard
