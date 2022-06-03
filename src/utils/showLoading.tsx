import Swal from 'sweetalert2'

export const showLoading = () => {
  Swal.fire({
    title: 'Please Wait!',
    text: 'Processing...',
    position: 'center',
    allowOutsideClick: false,
    allowEscapeKey: false,
    allowEnterKey: false,
    didOpen: () => {
      Swal.showLoading()
    },
  })
}
