import QueryString from "qs"
import http from "../index"
import {
  apiAccept,
  apiDelete,
  apiExport,
  apiGetDetail,
  apiGetList,
  apiGetOnDay,
  apiInsert,
  apiRecallSendSubmission,
  apiRecallSubmission,
  apiRefuse,
  apiSendSubmission,
  apiupdate,
} from "./urls"

const Insert = body => http.post(apiInsert, body)
const GetList = body => http.post(apiGetList, body)

const update = body => http.put(apiupdate, body)
const getOnDay = body => http.post(apiGetOnDay, body)
// const accept = body => http.patch(apiAccept + `?${QueryString.stringify(body)}`)
// const refuse = body => http.patch(apiRefuse + `?${QueryString.stringify(body)}`)
const accept = body => http.patch(apiAccept, body)
const refuse = body => http.patch(apiRefuse, body)
const getDetail = body =>
  http.get(apiGetDetail + `?${QueryString.stringify(body)}`)
const deleteSub = body =>
  http.patch(apiDelete + `?${QueryString.stringify(body)}`)
const recallSendSubmission = body => http.patch(apiRecallSendSubmission, body)
const recallSubmission = body => http.patch(apiRecallSubmission, body)
const sendSubmission = body => http.patch(apiSendSubmission, body)

const exportSub = body =>
  http.post(apiExport, body, {
    responseType: "blob",
  })
const Submisstion = {
  Insert,
  GetList,
  update,
  getOnDay,
  accept,
  refuse,
  getDetail,
  deleteSub,
  recallSendSubmission,
  recallSubmission,
  sendSubmission,
  exportSub,
}
export default Submisstion
