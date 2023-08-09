import {
  apiGetAccountEnterprise,
  apiUpdateByAccountID,
  apiInsertAccount,
  apiDeleteAccount,
  apiGetAccountFather,
  apiGetAccountOrganization,
  apiGetInforTeacher,
  apiUpdateInforTeacher,
  apiUpdateInforAccount,
  apiGetInforAccount,
} from "./urls"
import http from "../index"

// doanh nghệp
const getAccountEnterprise = body => http.post(apiGetAccountEnterprise, body)
const updateByAccountID = body => http.post(apiUpdateByAccountID, body)
const insertAccount = body => http.post(apiInsertAccount, body)
const deleteAccount = data => http.post(apiDeleteAccount, data)
const getAccountFather = body => http.post(apiGetAccountFather, body)
//cơ sở đào tạo
const getAccountOrganization = body =>
  http.post(apiGetAccountOrganization, body)
const getInforTeacher = params => http.get(apiGetInforTeacher, { params })
const updateInforTeacher = body => http.post(apiUpdateInforTeacher, body)
const updateInforAccount = body => http.post(apiUpdateInforAccount, body)
const getInforAccount = params => http.get(apiGetInforAccount, { params })

const AccountService = {
  getAccountEnterprise,
  updateByAccountID,
  insertAccount,
  deleteAccount,
  getAccountFather,
  getAccountOrganization,
  getInforTeacher,
  updateInforTeacher,
  updateInforAccount,
  getInforAccount,
}
export default AccountService
