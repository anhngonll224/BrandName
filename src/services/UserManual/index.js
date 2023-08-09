import http from "../index"
import { apiGetUserGuide, apiUpdateUserGuide } from "./urls"

const getUserGuide = params => http.get(apiGetUserGuide, { params })
const updateUserGuide = body => http.post(apiUpdateUserGuide, body)

const UserManualService = {
  getUserGuide,
  updateUserGuide,
}
export default UserManualService
