import { apiPreviewPhieuTring } from "./urls"
import http from "../index"

const previewPhieuTring = params => http.post(apiPreviewPhieuTring, params)
const preViewBanKhaiTenDinhDanh = body => http.post(apiPreviewPhieuTring, body)

const Printf = {
  previewPhieuTring,
  preViewBanKhaiTenDinhDanh,
}
export default Printf
