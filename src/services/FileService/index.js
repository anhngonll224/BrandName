import {
  apiUploadFile,
  apiUploadFileList,
  apiUploadListFileDossierSeaWeed,
} from "./urls"
import http from "../index"

const uploadFile = body => http.post(apiUploadFile, body)
const uploadFileList = body => http.post(apiUploadFileList, body)
const uploadListFileDossierSeaWeed = body =>
  http.post(apiUploadListFileDossierSeaWeed, body)

const FileService = { uploadFileList, uploadFile, uploadListFileDossierSeaWeed }
export default FileService
