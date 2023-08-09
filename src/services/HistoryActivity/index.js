// import QueryString from "qs"
import { apiGetList, apiExport, apiGetByUser } from "./urls"
import http from "../index"

const getList = body => http.post(apiGetList, body)
const getByUser = body => http.post(apiGetByUser, body)
const exportList = body =>
  http.post(apiExport, body, {
    responseType: "blob",
  })

const ActivityApi = {
  getByUser,
  getList,
  exportList,
}
export default ActivityApi
