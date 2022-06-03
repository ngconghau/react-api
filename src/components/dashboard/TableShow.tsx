import React, { useEffect } from 'react'
import { useState } from 'react'
import Swal from 'sweetalert2'
import Link from 'next/link'
import { Card, CardBody, CardTitle, Table, Button } from 'reactstrap'
import { gasPrices, gasStation } from '../../utils/dashboard/interface'
import gasStationApi from '../../api/gasStationApi'
import TableHeader from '../elements/TableHeader'
import { areas } from '../../utils/area/interface'
import { startLoading , finishLoading} from '../../redux/actions/loadingCreator'
import { useDispatch } from 'react-redux'

type Props = {}

const TableShow = () => {
  const [data, setData] = useState<gasStation[]>([])
  const dispatch = useDispatch()

  useEffect(() => {
    if (data.length == 0) {
      dispatch(startLoading())
      gasStationApi.getAll().then((res) => {
        setData(res.data)
        dispatch(finishLoading())
      })
    }
  }, [])

  const handleDelete = (id: string) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 4000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          },
        })
        Toast.fire({
          icon: 'success',
          title: 'Cheking delete......',
        })

        gasStationApi.delete(id).then((res) => {
          if (res && res.data) {
            gasStationApi.getAll().then((res) => {
              setData(res.data)
              if (res.status === 200) {
                Swal.fire('Delete success')
              }
            })
          }
        })
      }
    })
  }

  return (
    <>
      <Card>
        <CardBody>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <CardTitle tag="h5">All Gas Stations</CardTitle>
            <Link href="/dashboard/add">
              <a>
                <Button className="btn" outline color="primary">
                  Add
                </Button>
              </a>
            </Link>
          </div>

          {data.length > 0 ? (
            <div className="table-responsive">
              <Table className="text-nowrap mt-3 align-middle" borderless>
                <TableHeader theader={data[0]} />
                <tbody>
                  {data.map((item: gasStation) => {
                    const a = item.area as areas
                    return (
                      <tr key={item.id} className="border-top">
                        <td>{item.id}</td>
                        <td scope="row">{item.stationName}</td>
                        <td>
                          {a.district} <br /> {a.street}
                        </td>
                        <td>{item.lng}</td>
                        <td>{item.lat}</td>
                        <td>
                          {item.gasPrices &&
                            item.gasPrices.map(
                              (gas: gasPrices, index: number) => (
                                <div key={index}>
                                  <span>
                                    {gas.gasTypeName} : {gas.price} vnđ
                                  </span>
                                  <br></br>
                                </div>
                              )
                            )}
                        </td>
                        <td>
                          <div className="button-group">
                            <Link href={`/dashboard/${item.id}`}>
                              <a>
                                <Button
                                  className="btn"
                                  color="primary"
                                  style={{ width: '80px' }}
                                >
                                  Edit
                                </Button>
                              </a>
                            </Link>
                            <Button
                              className="btn"
                              color="danger"
                              size="xl"
                              onClick={() => handleDelete(`${item.id}`)}
                            >
                              Delete
                            </Button>
                            <Link href={`/map/${item.id}`}>
                              <a>
                                <Button
                                  className="btn"
                                  color="success"
                                  style={{ width: '80px' }}
                                >
                                  <span className="bi bi-map"></span>
                                </Button>
                              </a>
                            </Link>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </Table>
            </div>
          ) : (
            <div style={{ color: 'red' }}>
              No data found!!! Please add new gas station
            </div>
          )}
        </CardBody>
      </Card>
    </>
  )
}

export default TableShow
