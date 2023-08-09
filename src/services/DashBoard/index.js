import QueryString from "qs"
import { apiGetList } from "./urls"
import http from "../index"

const getList = body => http.post(apiGetList, body)

const DashBoard = {
  getList,
}
export default DashBoard
