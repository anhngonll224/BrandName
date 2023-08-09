import {
  apiGetAllByRole,
  apiInsert,
  apiGetDetail,
  apiUpdate,
  apiDelete,
  apiGetListHistoryDossier,
  apiGetAllForUser,
  apiGetAll,
  apiGetAllBrandName,
  apiSendDossier,
  apiRecallSendDossier,
  apiApproveDossier,
  apiRefuseApproveDossier,
  apiRecallAproveDossier,
  apiExpertiseDossier,
  apiRefuseExpertiseDossier,
  apiRecallExpertiseDossier,
  apiRecallPromulgateDossier,
  apiPromulgateDossier,
  apiRecallDossier,
  apiRenewDossier,
  apiRecallRefuseDossier,
  apiAcceptDossier,
  apiRefuseDossier,
  apiPassDossier,
  apiRequestAdditionalDossier,
  apiReturnFromUserDossier,
  apiReturnDossier,
  apiRefuseReturnDossier,
  apiCommentDossier,
  apiGetAllTrackingByRole,
  apiChangInforDossier,
  apiReIssueDossier,
  apiPromulgateRecallDossier,
  apiPromulgateRenewDossier,
  apiImportData,
  apiAdditionalDossier,
  apiSendProposeDossier,
  apiPromulgateReIssiueDossier,
  apiAcceptChangInforDossier,
  apiViewDossierOld,
  apiViewCertificate,
  apiExportData,
  apiExportBrandNameData,
  apiRecallPassDossier,
  apiImportDataForNerwork,
  apiGetCountDossier,
} from "./urls"
import http from "../index"
import QueryString from "qs"

const GetAll = body => http.post(apiGetAllByRole, body)
const insert = body => http.post(apiInsert, body)
const getDetail = DossierID =>
  http.get(`${apiGetDetail}?DossierID=${DossierID}`)
const update = body => http.put(apiUpdate, body)
// const deleteDossier = data => http.patch(apiDelete, data)
const deleteDossier = body => {
  const params = QueryString.stringify(body)
  return http.patch(`${apiDelete}?${params}`)
}
const getAllForUser = body => http.post(apiGetAllForUser, body)
const ExportData = body => http.post(apiExportData, body)
const ExportBrandNameData = body => http.post(apiExportBrandNameData, body)

const GetListHistoryDossier = data => http.post(apiGetListHistoryDossier, data)

const getAllDossier = body => http.post(apiGetAll, body)
const getAllBrandName = body => http.post(apiGetAllBrandName, body)
const sendDossier = data => http.patch(apiSendDossier, data)
const sendPropose = data => http.patch(apiSendProposeDossier, data)

const recallSendDossier = data => http.patch(apiRecallSendDossier, data)
const approveDossier = data => http.patch(apiApproveDossier, data)
const refuseApproveDossier = data => http.patch(apiRefuseApproveDossier, data)
const recallAproveDossier = data => http.patch(apiRecallAproveDossier, data)
const expertiseDossier = data => http.patch(apiExpertiseDossier, data)
const refuseExpertiseDossier = data =>
  http.patch(apiRefuseExpertiseDossier, data)
const recallExpertiseDossier = data =>
  http.patch(apiRecallExpertiseDossier, data)
const recallPromulgateDossier = data =>
  http.patch(apiRecallPromulgateDossier, data)
const promulgateDossier = data => http.patch(apiPromulgateDossier, data)
const promulgateReIssiueDossier = data =>
  http.patch(apiPromulgateReIssiueDossier, data)
const acceptChangInforDossier = data =>
  http.patch(apiAcceptChangInforDossier, data)

const recallDossier = data => http.patch(apiRecallDossier, data)
const renewDossier = data => http.patch(apiRenewDossier, data)
const recallRefuseDossier = data => http.patch(apiRecallRefuseDossier, data)
const acceptDossier = data => http.patch(apiAcceptDossier, data)
const refuseDossier = data => http.patch(apiRefuseDossier, data)
const passDossier = data => http.patch(apiPassDossier, data)
const requestAdditionalDossier = data =>
  http.patch(apiRequestAdditionalDossier, data)
const returnFromUserDossier = data => http.patch(apiReturnFromUserDossier, data)
const returnDossier = data => http.patch(apiReturnDossier, data)
const refuseReturnDossier = data => http.patch(apiRefuseReturnDossier, data)
const commentDossier = body => http.post(apiCommentDossier, body)
const getAllTrackingByRole = body => http.post(apiGetAllTrackingByRole, body)

const changInforDossier = data => http.patch(apiChangInforDossier, data)
const reIssueDossier = data => http.patch(apiReIssueDossier, data)

const promulgateRecallDossier = data =>
  http.patch(apiPromulgateRecallDossier, data)
const promulgateRenewDossier = data =>
  http.patch(apiPromulgateRenewDossier, data)
const additionalDossier = data => http.patch(apiAdditionalDossier, data)

const viewCertificate = body =>
  http.get(`${apiViewCertificate}?${QueryString.stringify(body)}`)
const importData = body => http.post(apiImportData, body)
const importDataForNerwork = body => http.post(apiImportDataForNerwork, body)

const viewDossierOld = body =>
  http.get(`${apiViewDossierOld}?${QueryString.stringify(body)}`)
const recallPassDossier = body => http.post(apiRecallPassDossier, body)
const getCountDossier = () => http.get(apiGetCountDossier)

const Dossier = {
  ExportBrandNameData,
  getCountDossier,
  importDataForNerwork,
  GetAll,
  insert,
  update,
  deleteDossier,
  recallPassDossier,
  getDetail,
  getAllForUser,
  GetListHistoryDossier,
  getAllDossier,
  getAllBrandName,
  sendDossier,
  sendPropose,
  recallSendDossier,
  approveDossier,
  refuseApproveDossier,
  recallAproveDossier,
  expertiseDossier,
  refuseExpertiseDossier,
  recallExpertiseDossier,
  recallPromulgateDossier,
  promulgateDossier,
  recallDossier,
  renewDossier,
  recallRefuseDossier,
  acceptDossier,
  refuseDossier,
  passDossier,
  requestAdditionalDossier,
  returnFromUserDossier,
  returnDossier,
  refuseReturnDossier,
  commentDossier,
  getAllTrackingByRole,
  changInforDossier,
  reIssueDossier,
  promulgateRecallDossier,
  promulgateRenewDossier,
  importData,
  additionalDossier,
  promulgateReIssiueDossier,
  acceptChangInforDossier,
  viewDossierOld,
  viewCertificate,
  ExportData,
}
export default Dossier
