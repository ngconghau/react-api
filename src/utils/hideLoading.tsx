import { AxiosResponse } from 'axios'
import Swal from 'sweetalert2'

export const hideLoading = (res?: AxiosResponse , message? :string) => {
  Swal.hideLoading()
  return Swal.fire({
    position: 'center',
    icon: 'success',
    title: message || 'Success' ||`${res!.data}`,
    showConfirmButton: false,
    timer: 1500,
  })
}
