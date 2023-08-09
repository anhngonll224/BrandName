import {
  EyeInvisibleOutlined,
  EyeOutlined,
  UserOutlined,
} from "@ant-design/icons"
import { Col, Form, Row, Upload } from "antd"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import LayoutCommon from "src/components/Common/Layout"
import Button from "src/components/MyButton/Button"
import SpinCustom from "src/components/Spin"
import SvgIcon from "src/components/SvgIcon"
import { ACCOUNT_TYPE_ID, SYSTEM_KEY } from "src/constants/constants"
import STORAGE, { setStorage } from "src/lib/storage"
import { formatMoney, getListComboByKey, normFile } from "src/lib/utils"
import { setUserInfo } from "src/redux/appGlobal"
import FileService from "src/services/FileService"
import UserService from "src/services/UserService"
import ModalChangeInfo from "./components/ModalChangeInfo"
import { StyleMyAccount } from "./styled"
import moment from "moment"
const MyAccount = () => {
  const dispatch = useDispatch()
  const { listSystemKey } = useSelector(state => state.appGlobal)
  const { userInfo } = useSelector(state => state?.appGlobal)
  const isFreeTeacher = !!(
    userInfo?.AccountType === ACCOUNT_TYPE_ID.GiaoVienTuDo
  )
  const [form] = Form.useForm()
  const [userDetail, setUserDetail] = useState({})
  const [loading, setLoading] = useState(false)
  const [showChangeInfo, setShowChangeInfo] = useState(false)
  const [avatarUpload, setAvatarUpload] = useState("")
  const [hidenAccBalance, setHidenAccBalance] = useState(true)

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
    getInfo()
  }, [])

  const uploadImg = async file => {
    try {
      setLoading(true)
      const formData = new FormData()
      formData.append("file", file)
      const res = await FileService.uploadFile(formData)
      if (res.isError) return
      setAvatarUpload(res.Object)
    } finally {
      setLoading(false)
    }
  }

  const changeAvatar = () => {
    setLoading(true)
    UserService.changeAvatar(avatarUpload)
      .then(res => {
        if (res.isError) return
        getInfo()
        setStorage(STORAGE.USER_INFO, {
          ...userInfo,
          Avatar: avatarUpload,
        })
        dispatch(
          setUserInfo({
            ...userInfo,
            Avatar: avatarUpload,
          }),
        )
        setAvatarUpload("")
      })
      .finally(() => setLoading(false))
  }

  const handleHiden = () => {
    setHidenAccBalance(!hidenAccBalance)
  }

  return (
    <StyleMyAccount>
      <LayoutCommon style={{ padding: "0px 10px 0px 10px" }}>
        <SpinCustom spinning={loading}>
          <Form form={form} layout="vertical" style={{ width: "100%" }}>
            <Row gutter={[16, 24]}>
              <Col span={24} className="my-account-title">
                <span className="title-info mr-16">Tài khoản</span>{" "}
                <Button btnType="third" onClick={() => setShowChangeInfo(true)}>
                  Chỉnh sửa
                </Button>
              </Col>
              <Col span={24} style={{ color: "#666666" }}>
                Quản lý thông tin hồ sơ để bảo mật tài khoản
              </Col>
              <Col xs={24} md={12}>
                <Row gutter={[16, 24]}>
                  <Col span={8} className="field-title">
                    Họ và tên:
                  </Col>
                  <Col span={16}>{userDetail?.FullName}</Col>
                  <Col span={8} className="field-title">
                    CMND/CCCD hoặc ĐKKD:
                  </Col>
                  <Col span={16}>{userDetail?.Identification}</Col>
                  <Col span={8} className="field-title">
                    Số điện thoại:
                  </Col>

                  <Col span={16}>{userDetail?.PhoneNumber}</Col>
                  <Col span={8} className="field-title">
                    Ngày sinh :
                  </Col>

                  <Col span={16}>
                    {userDetail?.Birthday
                      ? moment(userDetail?.Birthday)?.format("DD/MM/YYYY")
                      : ""}
                  </Col>
                  <Col span={8} className="field-title">
                    Giới tính:
                  </Col>
                  <Col span={16}>
                    {
                      getListComboByKey(
                        SYSTEM_KEY?.SEX_TYPE,
                        listSystemKey,
                      )?.find(item => item?.CodeValue === userDetail?.Sex)
                        ?.Description
                    }
                  </Col>

                  <Col span={8} className="field-title">
                    Email:
                  </Col>
                  <Col span={16}>{userDetail?.Email}</Col>
                  <Col span={8} className="field-title">
                    Địa chỉ:
                  </Col>
                  <Col span={16}>{userDetail?.FullAddress}</Col>

                  <Col span={8} className="field-title">
                    Chức vụ:
                  </Col>
                  <Col span={16}>{userDetail?.Position}</Col>
                </Row>
              </Col>

              <Col xs={24} md={8}>
                <div className="div-avatar">
                  <div className="wrap-avatar">
                    {!!avatarUpload || !!userDetail?.Avatar ? (
                      <img
                        className="user-avatar"
                        src={avatarUpload || userDetail?.Avatar}
                        alt="avatar"
                      />
                    ) : (
                      <div
                        className="d-flex align-items-center justify-content-center user-avatar"
                        style={{ backgroundColor: "#ddd" }}
                      >
                        <UserOutlined
                          style={{ fontSize: "40px", color: "#fff" }}
                        />
                      </div>
                    )}
                  </div>
                  <Col className="sign-img" span={24}>
                    <Form.Item
                      valuePropName="fileList"
                      getValueFromEvent={normFile}
                      name="Avatar"
                      rules={[
                        () => ({
                          validator(_, value) {
                            if (!!value?.find(i => i?.size > 5 * 1024 * 1024)) {
                              return Promise.reject(
                                new Error("Dung lượng file tối đa 5MB"),
                              )
                            }
                            return Promise.resolve()
                          },
                        }),
                      ]}
                    >
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
                        <div className="upload-avatar">
                          <div className="d-flex justify-content-center">
                            <Button className="sign-button-upload ">
                              <div className="sign-background-upload d-flex align-items-center">
                                <SvgIcon name="small-image-red" />
                                <div className="sign-text-upload ml-16">
                                  Chọn ảnh
                                </div>
                              </div>
                            </Button>
                            {avatarUpload && (
                              <Button
                                btnType="primary"
                                className="ml-16"
                                style={{ width: 120 }}
                                onClick={e => {
                                  e.stopPropagation()
                                  changeAvatar()
                                }}
                              >
                                Lưu ảnh
                              </Button>
                            )}
                          </div>
                        </div>
                        <div
                          className="sign-text"
                          onClick={e => {
                            e.stopPropagation()
                          }}
                        >
                          <div>Dung lượng file tối đa 5MB</div>
                          <div>Định dạng:.JPG, .JPEG, .PNG, .SVG</div>
                        </div>
                      </Upload>
                    </Form.Item>
                  </Col>
                </div>
              </Col>

              {/* <Col span={24} className="my-account-title">
                <span className="title-info mr-16">Thông tin mô tả</span>{" "}
              </Col>
              <Col md={24}>
                <div
                  dangerouslySetInnerHTML={{
                    __html: userDetail?.Description,
                  }}
                />
              </Col> */}
            </Row>
          </Form>
        </SpinCustom>
        {showChangeInfo && (
          <ModalChangeInfo
            open={showChangeInfo}
            userInfo={userDetail}
            onCancel={() => setShowChangeInfo(false)}
            onOk={() => {
              setShowChangeInfo(false)
              getInfo()
            }}
          />
        )}
      </LayoutCommon>
    </StyleMyAccount>
  )
}

export default MyAccount
