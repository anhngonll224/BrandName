import {
  apiAcceptPaymentDossier,
  apiGetDetailPaymentDossier,
  apiGetPaymentDossier,
  apiPaymentDossier,
  apiRefusePaymentDossier,
  apiReportPaymentDossier,
} from "./urls"
import http from "../index"
const paymentDossier = DossierID =>
  http.patch(apiPaymentDossier + `?DossierID=${DossierID}`)
const acceptPaymentDossier = DossierID =>
  http.patch(apiAcceptPaymentDossier + `?DossierID=${DossierID}`)
const reportPaymentDossier = data => http.patch(apiReportPaymentDossier, data)
const refusePaymentDossier = DossierID =>
  http.patch(apiRefusePaymentDossier + `?DossierID=${DossierID}`)
const getDetailPaymentDossier = DossierID =>
  http.patch(apiGetDetailPaymentDossier + `?DossierID=${DossierID}`)
const getPaymentDossier = DossierID =>
  http.get(apiGetPaymentDossier + `?DossierID=${DossierID}`)

const PaymentService = {
  paymentDossier,
  acceptPaymentDossier,
  reportPaymentDossier,
  refusePaymentDossier,
  getDetailPaymentDossier,
  getPaymentDossier,
}
export default PaymentService
