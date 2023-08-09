import http from "../index"
import {
  apiUpdateGuest,
  apiInsertUser,
  apiDeleteUser,
  apiDetailUser,
  apiUpdateUser,
  apiGetListUser,
  apiGetListGuest,
  apiImportUser,
  apiExportUser,
  apiGetTemplateFileImportUser,
  apiGetAccount,
  apiUpdateAccount,
  apiImportGuest,
  apiExportGuest,
  apiGetTemplateFileImportGuest,
  apiReplacePassword,
  apiGetInforUser,
  apiChangeInfor,
  apiChangeImgUser,
  apiInsertRecruiter,
  apiGetListRecruterByUserID,
  apiInsertAvatarCandidate,
  apiDeleteAvatarCandidate,
  apiGetCandiateProfile,
  apiUpdateTitleProfile,
  apiGetHomeJobApplication,
  apiUpdateCareerGoals,
  apiGetComboBoxNation,
  apiGetComboBoxNationality,
  apiupdateInfoCandidate,
  apiUpdateJobInformation,
  apiNationOrther,
  apiEditWorkExperience,
  apiInsertWorkExperience,
  apiUpdatetWorkExperience,
  apiDeleteWorkExp,
  apiUpdateCurrentDegreeUser,
  apiInsertEducationUser,
  apiDeleteEducationUser,
  apiUpdatetEducationUser,
  apiInsertCertificate,
  apiUpdateCertificate,
  apiDeleteCertificate,
  apiInsertLanguage,
  apiUpdateLanguage,
  apiDeleteLanguage,
  apiInsertAdvanced,
  apiUpdateAdvanced,
  apiDeleteAdvanced,
  apiInserOrUpdateOutstandingAchievement,
  apiEXportCV,
  apiViewTemplate,
  apiGetAllAccountUser,
  apiInsertAccountUser,
  apiUpdateAccountUser,
  apiDeletaAccountUser,
  apiListOfPotentialPersonnel,
  apiDetailCompany,
  apiGetAllUserDirectory,
  apiInsertGuest,
  apiGetUserByIdentification,
  apiInsertCompany,
  apiUpdateCompany,
  apiResetPassword
} from "./urls"
import QueryString from "qs"

const updateAccount = body => http.post(apiUpdateAccount, body)

const getAccount = params => http.get(apiGetAccount, { params })
const insertUser = body => http.post(apiInsertUser, body)
const GetAllUserDirectory = body => http.post(apiGetAllUserDirectory, body)
const InsertGuest = body => http.post(apiInsertGuest, body)
const deleteUser = UserID => http.patch(`${apiDeleteUser}?UserID=${UserID}`)
const resetPassword = UserID => http.patch(`${apiResetPassword}?UserID=${UserID}`)
const detailUser = params => http.get(apiDetailUser, { params })
const updateUser = params => http.post(apiUpdateUser, params)
const importUser = body => http.post(apiImportUser, body)
const getTemplateFileImportUser = body =>
  http.get(apiGetTemplateFileImportUser, body)
const exportUser = params => {
  http.interceptors.request.use(
    async config => {
      config.responseType = "blob"
      return config
    },
    error => Promise.reject(error),
  )
  return http.get(apiExportUser, { params })
}

const importGuest = body => http.post(apiImportGuest, body)
const exportGuest = params => http.get(apiExportGuest, { params })
const templateImportGuest = () => {
  http.interceptors.request.use(
    async config => {
      config.responseType = "blob"
      return config
    },
    error => Promise.reject(error),
  )
  return http.get(apiGetTemplateFileImportGuest)
}

const getListUser = params => http.post(apiGetListUser, params)
const GetListGuest = params => http.post(apiGetListGuest, params)
const replacePassword = params => http.post(apiReplacePassword, params)
const getInforUser = () => http.get(apiGetInforUser)
const changeInfor = body => http.post(apiChangeInfor, body)
const changeAvatar = params =>
  http.patch(apiChangeImgUser + `?Avatar=${params}`)
const insertRecruiter = body => http.post(apiInsertRecruiter, body)
const getListRecruterByUserID = body =>
  http.post(apiGetListRecruterByUserID, body)

const getAllAccountUser = body => http.post(apiGetAllAccountUser, body)
const insertAccountUser = body => http.post(apiInsertAccountUser, body)
const updateAccountUser = body => http.post(apiUpdateAccountUser, body)
const deleteAccountUser = params =>
  http.patch(apiDeletaAccountUser + `?UserID=${params}`)

// Ứng Viên
const insertImgCandidate = params =>
  http.put(apiInsertAvatarCandidate + `?Avatar=${params}`)
const deleteAvatarCandiate = params =>
  http.patch(apiDeleteAvatarCandidate + `?Avatar=${params}`)
const getCandiateProfile = params =>
  http.post(apiGetCandiateProfile + `?UserID=${params}`)
const updateTitleProfile = params =>
  http.patch(apiUpdateTitleProfile + `?TitleProfile=${params}`)
const getHomeJobApplication = () => http.get(apiGetHomeJobApplication)
const updateCareerGoals = params =>
  http.patch(apiUpdateCareerGoals + `?CareerGoals=${params}`)
const getComboboxNation = () => http.get(apiGetComboBoxNation)
const getComboboxNationnality = () => http.get(apiGetComboBoxNationality)
const updateInfoCandidate = body => http.post(apiupdateInfoCandidate, body)
const updateJobInformation = body => http.post(apiUpdateJobInformation, body)
const getComboBoxNationOrther = () => http.get(apiNationOrther)
const editWorkExp = body => http.post(apiEditWorkExperience, body)
const insertWorkExp = body => http.post(apiInsertWorkExperience, body)
const updateWorkExp = body => http.post(apiUpdatetWorkExperience, body)
const deleteWorkExp = id => http.get(apiDeleteWorkExp + `?UserExpID=${id}`)
const updateCurrentDegreeUser = params =>
  http.put(apiUpdateCurrentDegreeUser + `?CurrentDegree=${params}`)
const insertEducationUser = body => http.post(apiInsertEducationUser, body)
const deleteEducationUser = params =>
  http.delete(apiDeleteEducationUser, { params })
const updatetEducationUser = body => http.post(apiUpdatetEducationUser, body)
const insertCertificate = body => http.put(apiInsertCertificate, body)
const updateCertificate = body => http.put(apiUpdateCertificate, body)
const deteleCertificate = params =>
  http.delete(apiDeleteCertificate, { params })
const insertLanguage = body => http.post(apiInsertLanguage, body)
const updateLanguage = body => http.post(apiUpdateLanguage, body)
const deleteLanguage = params => http.delete(apiDeleteLanguage, { params })
const insertAdvanced = body => http.post(apiInsertAdvanced, body)
const updateAdvanced = body => http.post(apiUpdateAdvanced, body)
const deleteAdvanced = params => http.delete(apiDeleteAdvanced, { params })
const insertorUpdateOutstandingAchievement = params =>
  http.put(
    apiInserOrUpdateOutstandingAchievement +
    `?OutstandingAchievement=${params}`,
  )
const exportCV = () =>
  http.get(apiEXportCV, {
    responseType: "blob",
  })
const viewTemplate = () => http.get(apiViewTemplate)

// Ứng viên tiềm năng
const getListOfPotentialPersonnel = body =>
  http.post(apiListOfPotentialPersonnel, body)

const getDetailPotentialPersonnel = (params, body) =>
  http.post(
    `${apiListOfPotentialPersonnel}?${QueryString.stringify(params)}`,
    body,
  )

//Chi tiết công ty
const getDetailCompany = params =>
  http.get(apiDetailCompany + `?AccountID=${params}`)

//Lấy thông tin tạo hồ sơ
const getUserByIdentification = params =>
  http.get(apiGetUserByIdentification + `?Identification=${params}`)
// khách hàng,tổ chức admin upadte
const updateGuest = body => http.post(apiUpdateGuest, body)
const insertCompany = body => http.post(apiInsertCompany, body)
const updateCompany = body => http.post(apiUpdateCompany, body)
const UserService = {
  updateCompany,
  insertCompany,
  updateGuest,
  GetAllUserDirectory,
  InsertGuest,
  updateAccount,
  insertUser,
  getAccount,
  deleteUser,
  detailUser,
  updateUser,
  getListUser,
  importUser,
  getTemplateFileImportUser,
  exportUser,
  importGuest,
  exportGuest,
  templateImportGuest,
  GetListGuest,
  replacePassword,
  getInforUser,
  changeInfor,
  changeAvatar,
  insertRecruiter,
  getListRecruterByUserID,
  insertImgCandidate,
  deleteAvatarCandiate,
  getCandiateProfile,
  updateTitleProfile,
  getHomeJobApplication,
  updateCareerGoals,
  getComboboxNation,
  getComboboxNationnality,
  updateInfoCandidate,
  updateJobInformation,
  getComboBoxNationOrther,
  editWorkExp,
  insertWorkExp,
  updateWorkExp,
  updateCurrentDegreeUser,
  insertEducationUser,
  deleteEducationUser,
  updatetEducationUser,
  insertCertificate,
  updateCertificate,
  deteleCertificate,
  insertLanguage,
  updateLanguage,
  deleteLanguage,
  insertAdvanced,
  updateAdvanced,
  deleteAdvanced,
  insertorUpdateOutstandingAchievement,
  deleteWorkExp,
  exportCV,
  viewTemplate,
  getAllAccountUser,
  insertAccountUser,
  updateAccountUser,
  deleteAccountUser,
  getListOfPotentialPersonnel,
  getDetailPotentialPersonnel,
  getDetailCompany,
  getUserByIdentification,
  resetPassword,
}
export default UserService
