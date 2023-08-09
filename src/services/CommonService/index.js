import http from "../index"
import { apiGetSystemKey } from "./urls"

const getSystemKey = key => http.get(apiGetSystemKey, { params: { key } })

const CommonService = { getSystemKey }
export default CommonService
