import QueryString from "qs"
import {
  apiDeleteUserDirectory,
  apiGetAllUserDirectory,
  apiInsertUserDirectory,
  apiResetPasswordByUserID,
  apiUpdateUserDirectory,
  apiResetPassword,
} from "./urls"
import http from "../index"

const getAll = body => http.post(apiGetAllUserDirectory, body)
const insert = body => http.post(apiInsertUserDirectory, body)
const update = body => http.post(apiUpdateUserDirectory, body)
const del = body =>
  http.patch(apiDeleteUserDirectory + `?${QueryString.stringify(body)}`)
const resetPass = body => http.patch(apiResetPasswordByUserID, body)
const resetPassword = body => http.patch(apiResetPassword + `?${QueryString.stringify(body)}`)
const DirectoryService = {
  resetPassword,
  getAll,
  insert,
  update,
  del,
  resetPass,
}
export default DirectoryService
