import { areas } from '../area/interface';
export interface gasPrices {
    gasType: string
    gasTypeName?: string
    price: number
}
export interface gasStation {
    id?: string, 
    stationName: string
    area: string | areas
    lng: number | string
    lat: number | string
    gasPrices: gasPrices[]
}




