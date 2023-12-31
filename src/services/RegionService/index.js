import {
  apiGetAllChidrenByRegionId,
  apiInsertRegion,
  apiUpdateRegion,
  apiDeleteRegion,
  apiGetLocationVN,
  apiGetByRegionId,
} from "./urls"
import http from "../index"

const getAllChidrenByRegionId = params =>
  http.get(apiGetAllChidrenByRegionId, { params })
const getLocationVN = params => http.get(apiGetLocationVN, { params })
const insertRegion = body => http.post(apiInsertRegion, body)
const updateRegion = body => http.put(apiUpdateRegion, body)
const deleteRegion = params => http.patch(apiDeleteRegion + params)
const getByRegionId = params => http.get(apiGetByRegionId, { params })

const RegionService = {
  getAllChidrenByRegionId,
  insertRegion,
  updateRegion,
  deleteRegion,
  getLocationVN,
  getByRegionId,
}
export default RegionService
