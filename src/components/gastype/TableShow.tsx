import React, { useEffect, useState } from 'react'
import { Button, Card, CardBody, CardTitle, Table } from 'reactstrap'
import TableHeader from '../elements/TableHeader'
import swal from 'sweetalert'
import gasTypeApi from '../../api/gasTypeApi'
import { useDispatch } from 'react-redux'
import { finishLoading, startLoading } from '../../redux/actions/loadingCreator'

type Props = {}

interface Interface {
  id: string
  gasTypeName: string
}

const TableShow = (props: Props) => {
  const [showMe, setShowMe] = useState(false)
  const axios = require('axios')
  const [showTable, setShowTable] = useState([])
  const Swal = require('sweetalert2')
  const dispatch = useDispatch()
  function toggle() {
    setShowMe(!showMe)
  }

  useEffect(() => {
    dispatch(startLoading())
    gasTypeApi
      .getAll()
      .then((resp: { data: any }) => {
        setShowTable(resp.data)
        dispatch(finishLoading())
      })
      .catch((error: any) => {
        console.log(error)
      })
  }, [])

  const handDelete = (id: string) => {
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this imaginary file!',
      icon: 'warning',
      dangerMode: true,
    }).then((willDelete: { data: any }) => {
      if (willDelete) {
        gasTypeApi.deleteGasType(id)
        setShowTable(
          showTable.filter((task) => {
            swal('Poof! Your imaginary file has been deleted!', {
              icon: 'success',
            })
            // @ts-ignore
            return task.id !== id
          })
        )
      } else {
        swal('Your imaginary file is safe!')
      }
    })
  }

  const handCreate = async () => {
    Swal.fire({
      // title: 'Enter Your Create Gas Type Name',
      input: 'text',
      inputLabel: 'Enter The Name Gas Type To Create',
      showCancelButton: true,
      regex: /^[a-zA-Z]+$/,
      // @ts-ignore
      inputValidator: (value) => {
        if (!value) {
          return 'You need to write something!'
        }
        // Restrict users from entering special characters
        if (value.match(/[^\w\s]/gi)) {
          return 'Requires alphanumeric input'
        } else {
          gasTypeApi.createGasType({ gasTypeName: value })
          swal(`Gas Type has been entered  : ${value}`, {
            icon: 'success',
          })
        }
      },
    })
  }

  const handModifyData = async (id: string, gasTypeName: string) => {
    Swal.fire({
      // title: 'Enter adjustment gas type',
      input: 'text',
      inputValue: gasTypeName,
      inputLabel: 'Enter modify gas type',
      showCancelButton: true,
      // @ts-ignore
      inputValidator: (value) => {
        if (!value) {
          return 'You need to write something!'
        }
        // Restrict users from entering special characters
        else if (value.match(/[^\w\s]/gi)) {
          return 'Requires alphanumeric input'
        } else if (gasTypeName == value) {
          return false
        } else {
          gasTypeApi.updateGasType(id, { gasTypeName: value })
          swal(`You have successfully updated: ${value}`, {
            icon: 'success',
          })
        }
      },
    })
  }

  return (
    <>
      <Card>
        <CardBody>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <CardTitle style={{ marginBottom: '1.5rem' }} tag="h5">
                All Gas Type
              </CardTitle>
              <a>
                <Button
                  className="btn"
                  outline
                  color="primary"
                  style={{
                    right: '0px',
                    border: '1px solid black',
                  }}
                  onClick={handCreate}
                >
                  Add new
                </Button>
              </a>
            </div>
          </div>
        </CardBody>
      </Card>

      {!showTable ? (
        <div className="table-responsive">
          <Table className="text-nowrap mt-3 align-middle" borderless>
            <tbody>No Database</tbody>
          </Table>
        </div>
      ) : (
        <Card>
          {showTable.length && (
            <CardBody>
              <div className="table-responsive">
                <Table className="text-nowrap mt-3 align-middle" borderless>
                  {showTable.length > 0 && (
                    <TableHeader theader={showTable[0]} />
                  )}
                  <tbody>
                    {showTable.map((tdata: Interface, index) => (
                      <tr key={tdata.id}>
                        <td>{index}</td>
                        <td>
                          <b>{tdata.gasTypeName}</b>
                        </td>
                        <td>
                          <div className="button-group">
                            <tr>
                              <td>
                                <Button
                                  className="btn"
                                  color="primary"
                                  size="sm"
                                  onClick={() => {
                                    handModifyData(tdata.id, tdata.gasTypeName)
                                  }}
                                >
                                  <i className="bi bi-brush"></i>
                                </Button>
                              </td>
                              <td>
                                <Button
                                  className="btn"
                                  color="danger"
                                  size="sm"
                                  onClick={() => {
                                    handDelete(tdata.id)
                                  }}
                                >
                                  <i className="bi bi-trash"></i>
                                </Button>
                              </td>
                              <td></td>
                            </tr>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </CardBody>
          )}
        </Card>
      )}
    </>
  )
}

export default TableShow
