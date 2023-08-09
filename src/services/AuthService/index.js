import axios from "axios"
import http from "../index"
import {
  apiSchooleEnterpriseRegister,
  apiTeacherRegister,
  apiBusinessRegister,
  apiChangePassword,
  apiForgotPassword,
  apiLogin,
  apiLogout,
  apiRegister,
  apiVerifyCode,
  apiLoginGoole,
  apiCallBackLoginGoole,
  apiLoginFB,
  apiCheckExistEmail,
  apiGetLinkedinLoginUrl,
  apiEmailRegister,
  apiConvertAddress,
} from "./urls"
import QueryString from "qs"

const login = body => http.post(apiLogin, body)
const register = body => http.post(apiRegister, body)
const forgotPass = body => http.post(apiForgotPassword, body)
const verifyCode = body => http.post(apiVerifyCode, body)
const changePassword = body => http.post(apiChangePassword, body)

const TeacherRegister = body => http.post(apiTeacherRegister, body)
const SchooleEnterpriseRegister = body =>
  http.post(apiSchooleEnterpriseRegister, body)

const logout = () => http.get(apiLogout)
const loginGG = () => http.get(apiLoginGoole)
const loginFB = () => http.get(apiLoginFB)
const loginLinked = () => http.get(apiGetLinkedinLoginUrl)

const callbackGG = params => http.get(apiCallBackLoginGoole, { params })

const businessRegister = body => http.post(apiBusinessRegister, body)
const checkExistEmail = body => {
  const params = QueryString.stringify(body)
  return http.get(`${apiCheckExistEmail}?${params}`)
}
const emailRegister = body => {
  const params = QueryString.stringify(body)
  return http.get(`${apiEmailRegister}?${params}`)
}
const convertAddress = body => {
  const params = QueryString.stringify(body)
  return http.patch(`${apiConvertAddress}?${params}`)
}

//Lấy thông tin mã số thuế
const getInfoByTaxCode = code =>
  axios({
    method: "get",
    url: `https://api.vietqr.io/v2/business/${code}`,
    // data: { user }
  })

const AuthService = {
  loginGG,
  callbackGG,
  login,
  logout,
  register,
  TeacherRegister,
  SchooleEnterpriseRegister,
  forgotPass,
  verifyCode,
  businessRegister,
  changePassword,
  loginFB,
  checkExistEmail,
  loginLinked,
  emailRegister,
  convertAddress,
  getInfoByTaxCode,
}
export default AuthService
