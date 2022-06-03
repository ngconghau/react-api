import axios from 'axios'
import axiosConfig from '../../config/api.config'
import {gasType} from "../utils/gasType/interface";


const gasTypeApi = {
  getAll() {
    const url = 'routers/v1/gasType/getAllGasTypes'
    return axios.create(axiosConfig).get(url)
  },
  deleteGasType(id: string) {
    const url = `routers/v1/gasType/deleteGasType/${id}`
    return axios.create(axiosConfig).delete(url)
  },
  updateGasType(id: string, data: { gasTypeName: gasType }) {
    const url = `routers/v1/gasType/updateGasType/${id}`
    return axios.create(axiosConfig).put(url, data)
  },
  createGasType(data: { gasTypeName: gasType }) {
    const url = `/routers/v1/gasType/createGasType`
    return axios.create(axiosConfig).post(url, data)
  },
}

export default gasTypeApi
