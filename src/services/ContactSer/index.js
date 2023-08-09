import QueryString from "qs"
import {
  apiSearchGetSupportListRequet,
  apiStatusSupport,
  apiGetDetailContact,
  apiSendContact,
  apiUpdateContact,
  apiGetContactUser,
} from "./urls"
import http from "../index"

const getList = body => http.post(apiSearchGetSupportListRequet, body)
const confirmSupport = body => http.post(apiStatusSupport, body)
const getDetailContact = body =>
  http.patch(`${apiGetDetailContact}?${QueryString.stringify(body)}`)
const sendContact = body => http.post(apiSendContact, body)
const UpdateContact = body => http.post(apiUpdateContact, body)
const getContactUser = body => http.post(apiGetContactUser, body)
const ContactSer = {
  getContactUser,
  UpdateContact,
  getList,
  confirmSupport,
  getDetailContact,
  sendContact,
}
export default ContactSer
