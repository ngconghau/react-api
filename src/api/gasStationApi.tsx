import axios, { AxiosResponse } from 'axios'
import axiosConfig from '../../config/api.config'
import { gasStation } from '../utils/dashboard/interface'

const gasStationApi = {
  getAll(): Promise<AxiosResponse> {
    const url = 'routers/v1/station/getAllGasStations'
    return axios.create(axiosConfig).get(url)
  },
  getGasStationById(id: string): Promise<AxiosResponse<gasStation>> {
    const url = `routers/v1/station/getGasStationById/${id}`
    return axios.create(axiosConfig).get(url)
  },
  create(data: gasStation): Promise<AxiosResponse> {
    const url = 'routers/v1/station/createStation'
    return axios.create(axiosConfig).post(url, data)
  },
  update(id: string , data: gasStation): Promise<AxiosResponse> {
    const url = `routers/v1/station/updateGasStation/${id}`
    return axios.create(axiosConfig).put(url, data)
  },
  delete(id: string): Promise<AxiosResponse> {
    const url = `routers/v1/station/deleteGasStation/${id}​`
    return axios.create(axiosConfig).delete(url)
  },
}

export default gasStationApi
