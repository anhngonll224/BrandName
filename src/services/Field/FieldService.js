import {
  apiGetAll,
  apiInsert,
  apiUpdate,
  apiDelete,
  apiGetCombobox,
  apiImportField,
} from "./urls"
import http from "../index"

const getAll = params => http.post(apiGetAll, params)
const importField = params => http.post(apiImportField, params)
const insert = params => http.post(apiInsert, params)
const update = params => http.put(apiUpdate, params)
const deleteField = FieldID => http.patch(`${apiDelete}?FieldID=${FieldID}`)
// const getAllTags = () => http.get(apiGetAllTags)
const getCombobox = params => http.get(`${apiGetCombobox}?Search=${params}`)

const FieldService = {
  importField,
  getAll,
  insert,
  update,
  deleteField,
  getCombobox,
}
export default FieldService
