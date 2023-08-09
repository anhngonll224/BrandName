import QueryString from "qs"
import {
  apiGetAllTopicGuest,
  apiGetByRegionId,
  apiGetAllCourse,
  apiGetAllTopicByCourse,
  apiGetDetailCourse,
  apiGetListBannerFooterEvent,
  apiGetListEvent,
  apiGetAllCourseHome,
  apiGetTeacherHome,
  apiGetPostHome,
  apiGetListBrandName,
  apiInsertCompany,
  apiSendContact,

} from "./urls"
import http from "../index"
const getAllTopic = () => http.post(apiGetAllTopicGuest)
const getByRegionId = params => http.get(apiGetByRegionId, { params })
const getAllCourse = body => http.post(apiGetAllCourse, body)
const sendContact = body => http.post(apiSendContact, body)
const getAllCourseHome = body => http.post(apiGetAllCourseHome, body)
const getDetailCourse = body => http.post(apiGetDetailCourse, body)
const insertCompany = body => http.post(apiInsertCompany, body)
const GetListBrandName = body => http.post(apiGetListBrandName, body)
const getListBanner = () => http.get(apiGetListBannerFooterEvent)
const getListEvent = () => http.get(apiGetListEvent)
const getTeacherHome = () => http.get(apiGetTeacherHome)
const GetPostHome = () => http.get(apiGetPostHome)
const getAllTopicByCourse = body =>
  http.patch(apiGetAllTopicByCourse + `?${QueryString.stringify(body)}`)

const GuestServices = {
  sendContact,
  insertCompany,
  GetListBrandName,
  getAllTopic,
  getByRegionId,
  getAllCourse,
  getAllCourseHome,
  getAllTopicByCourse,
  getDetailCourse,
  getListBanner,
  getListEvent,
  getTeacherHome,
  GetPostHome,
}
export default GuestServices
