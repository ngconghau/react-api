import axios from 'axios'
import axiosConfig from '../../config/api.config'
import { gasType } from '../utils/gasType/interface'
import {Area} from '../components/area/TableShowArea'
import UpdateArea from '../components/area/UpdateArea'

const gasTypeApi = {
  getAll() {
    const url = 'routers/v1/area/getAllAreas'
    return axios.create(axiosConfig).get(url)
    
  },
  createArea(data:Area){
    const url = 'routers/v1/area/createArea'
    return axios.create(axiosConfig).post(url, data)
  },
  delete(id : string){
    const url = `routers/v1/area/deleteArea/${id}​`
    return axios.create(axiosConfig).delete(url)
  },
  update(id:string,area:Area){
    const url = `routers/v1/area/updateArea/${id}​`
    return axios.create(axiosConfig).put(url, area)
  },
  getAreaById(id:string){
    const url = `/routers/v1/area/getAreaById/${id}​`
    return axios.create(axiosConfig).get(url)
  }
}

export default gasTypeApi
