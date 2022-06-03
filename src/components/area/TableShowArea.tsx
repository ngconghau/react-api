import React from 'react'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Swal from 'sweetalert2'
import { startLoading, finishLoading } from '../../redux/actions/loadingCreator'
import { areas } from '../../utils/area/interface'
import {
  Card,
  CardBody,
  Button,
  Table,
  Input,
  Row,
  Col,
  FormGroup,
  Label,
} from 'reactstrap'
import TableHeader from '../elements/TableHeader'
import areaApi from '../../api/areaApi'
import { useDispatch } from 'react-redux'
type Props = {}

const TableShowArea = (props: Props) => {
  const [data, setData] = useState([])
  const [show, setShow] = useState(false)
  const [area, setArea] = useState<areas>({
    id: '',
    district: '',
    street: '',
  })
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(startLoading())
    const ShowAllArea = async () => {
      areaApi.getAll().then((res) => {
        setData(res.data)
        dispatch(finishLoading())
      })
    }
    ShowAllArea()
  }, [area])

  const handleCreate = () => {
    if (!area.district || !area.street) {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        },
      })

      Toast.fire({
        icon: 'warning',
        title: 'Fill infomation before submit',
      })
    } else if (area.district && area.street) {
      if (area.district.match(/[^\w\s]/gi) || area.street.match(/[^\w\s]/gi)) {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 1000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          },
        })
        Toast.fire({
          icon: 'warning',
          title: 'Data invalid',
        })
      } else {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          },
        })
        Toast.fire({
          icon: 'success',
          title: 'Data adding ......',
        })
        areaApi
          .createArea({
            id: area.id,
            district: area.district,
            street: area.street,
          })
          .then((res) => {
            if (res && res.data) {
              setArea(res.data)
              setTimeout(() => setShow(!show), 500)
            }
            if (res.status === 200) {
              Swal.fire('Add area success')
            }
          })
      }
    }
  }
  const handleCancel = () => {
    setShow(false)
    setArea({
      id: '',
      district: '',
      street: '',
    })
  }
  const handleDelete = (id: string) => {
    Swal.fire({
      title: 'Are you sure Delete?',
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
          timer: 2000,
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
        areaApi.delete(id).then((res) => {
          if (res && res.data) {
            areaApi.getAll().then((res) => {
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
    <Card>
      <CardBody>
        {show && (
          <>
            <Row style={{ padding: '30px' }}>
              <Col md={6}>
                <FormGroup>
                  <Label for="exampleEmail">District</Label>
                  <Input
                    required
                    value={area.district}
                    id="exampleEmail"
                    name="District"
                    placeholder="San Ramon"
                    type="email"
                    onChange={(e) =>
                      setArea({ ...area, district: e.target.value })
                    }
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="examplePassword">Street</Label>
                  <Input
                    value={area.street}
                    id="examplePassword"
                    name="Street"
                    placeholder="3141 Crow Canyon Place"
                    type="text"
                    onChange={(e) =>
                      setArea({ ...area, street: e.target.value })
                    }
                  />
                </FormGroup>
              </Col>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  margin: '10px',
                }}
              >
                <Button
                  style={{ width: '100px' }}
                  color="primary"
                  onClick={() => handleCreate()}
                >
                  Submit
                </Button>
                <Button
                  style={{ width: '100px', marginLeft: '10px' }}
                  color="primary"
                  onClick={() => handleCancel()}
                >
                  Cancel
                </Button>
              </div>
            </Row>
          </>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {!show && (
            <>
              <h2 style={{ textAlign: 'center', fontWeight: '600' }}>
                All Area
              </h2>
              <div
                style={{
                  border: '2px solid #3498db',
                  padding: '10px 25px',
                  display: 'inline',
                  borderRadius: '3px',
                  cursor: 'pointer',
                  color: '#0686D5',
                }}
                onClick={() => setTimeout(() => setShow(!show), 2000)}
              >
                <span
                  className="bi bi-plus-square"
                  style={{ margin: '20px' }}
                ></span>
                Add
              </div>
            </>
          )}
        </div>

        {!show && (
          <>
            {data.length && (
              <>
                <div className="table-responsive">
                  <Table className="text-nowrap mt-3 align-middle">
                    <TableHeader theader={data[0]} />
                    <tbody>
                      {data.map((item: areas) => (
                        <tr className="border-top" key={item.id}>
                          <td>{item.id}</td>
                          <td>{item.district}</td>
                          <td>{item.street}</td>
                          <td>
                            <div className="button-group">
                              <Link href={`area/${item.id}`}>
                                <Button className="btn" color="primary">
                                  Update
                                </Button>
                              </Link>
                              <Button
                                className="btn"
                                color="danger"
                                onClick={() => handleDelete(item.id)}
                              >
                                Delete
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </>
            )}
          </>
        )}
      </CardBody>
    </Card>
  )
}

export default TableShowArea
