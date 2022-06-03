import React, { useEffect, useState } from 'react'
import { Col, Button, FormGroup, Label, Form, Input } from 'reactstrap'
import { gasTypeApi, areaApi } from '../../src/api'
import Swal from 'sweetalert2'
import { gasPrices, gasStation } from '../../src/utils/dashboard/interface'
import { gasType } from '../../src/utils/gasType/interface'
import { areas } from '../../src/utils/area/interface'
import gasStationApi from '../../src/api/gasStationApi'
import { useRouter } from 'next/router'
import { formatGasStation, setInputFilter } from '../../src/utils'
import {
  startLoading,
  finishLoading,
} from '../../src/redux/actions/loadingCreator'
import { AxiosError } from 'axios'
import { useDispatch } from 'react-redux'

type Props = {}

const add = (props: Props) => {
  const router = useRouter()
  const [gasStation, setGasStation] = useState<gasStation>({
    stationName: '',
    area: '',
    lng: '',
    lat: '',
    gasPrices: [],
  })
  const [area, setArea] = useState<areas[]>([])
  const [gasType, setGastype] = useState<gasType[]>([])
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(startLoading())
    const fetchdata = async () => {
      await gasTypeApi.getAll().then((res) => setGastype(res.data))
      await areaApi.getAll().then((res) => setArea(res.data))
      dispatch(finishLoading())
    }
    fetchdata()
  }, [])

  const onChangle = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    let name = e.target.name
    switch (name) {
      case 'stationName':
        return setGasStation({
          ...(gasStation as gasStation),
          stationName: e.target.value,
        })
      case 'lng':
      case 'lat':
        if (e.target.value.length) {
          setInputFilter(
            e.target,
            (value) => {
              return /^-?\d*[.]?\d*$/.test(value)
            },
            'This field only accept the number of value'
          )
          return setGasStation({
            ...(gasStation as gasStation),
            [e.target.name]: e.target.value,
          })
        }
        return setGasStation({
          ...(gasStation as gasStation),
          [e.target.name]: '',
        })
      case 'price':
        setInputFilter(
          e.target,
          (value) => {
            return /^-?\d*[.]?\d*$/.test(value)
          },
          'This field only accept the number of value and no character . end line'
        )
        let idInput: string = e.target.id
        idInput = idInput.slice(e.target.type.length + 1, e.target.id.length)
        const newState = gasStation.gasPrices.map((item: gasPrices) => {
          if (item.gasType === idInput) {
            return {
              ...item,
              price: Number.parseFloat(e.target.value),
            } as gasPrices
          }
          return item
        })
        const newGastation: gasStation = {
          ...gasStation,
          gasPrices: newState,
        }
        setGasStation(newGastation)
        break
    }
  }

  const isChecked = (id: string) => {
    return gasStation.gasPrices
      .map((item: gasPrices) => {
        return item.gasType
      })
      .includes(id)
  }

  const selectArea = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGasStation({
      ...gasStation,
      area: e.target.value,
    })
  }

  const handChecked = (id: string) => {
    const input = document.querySelector<HTMLInputElement>(`#input${id}`)!
    if (isChecked(id)) {
      const newState: gasPrices[] = gasStation.gasPrices.filter(
        (item: gasPrices) => item.gasType !== id
      )
      input.value = ''
      setGasStation({
        ...gasStation,
        gasPrices: newState,
      })
    } else {
      setGasStation({
        ...gasStation,
        gasPrices: [
          ...gasStation.gasPrices,
          { gasType: id, price: Number.parseFloat(`${input.value}`) },
        ],
      })
    }
  }

  const handleAdd = (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault()
    Swal.fire({
      title: 'Please Wait!',
      text: 'Processing...',
      position: 'center',
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      didOpen: () => {
        Swal.showLoading()
        gasStationApi
          .create(formatGasStation(gasStation))
          .then((res) => {
            if (res.status === 200) {
              Swal.hideLoading()
              return Swal.fire({
                position: 'center',
                icon: 'success',
                title: `${res.data}`,
                allowOutsideClick: false,
                allowEscapeKey: false,
                allowEnterKey: false,
              }).then(() => router.back())
            }
          })
          .catch((error: AxiosError<{ error: ''; msg: string }>) => {
            console.log(error.response?.data.msg)
            Swal.hideLoading()
            Swal.fire('Opps!', `${error.response?.data.msg}`, 'error')
          })
      },
    })
  }

  return (
    <Form onSubmit={handleAdd}>
      <FormGroup row>
        <Label sm={2}>Station Name</Label>
        <Col sm={10}>
          <Input
            id="stationName"
            name="stationName"
            placeholder="Stations name"
            type="text"
            required
            value={gasStation.stationName}
            onChange={onChangle}
          />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label sm={2}>Longitude</Label>
        <Col sm={10}>
          <Input
            id="lng"
            name="lng"
            placeholder="Longitude"
            type="text"
            required
            value={`${gasStation.lng}`}
            onChange={onChangle}
          />
          <span></span>
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label sm={2}>Latitude</Label>
        <Col sm={10}>
          <Input
            id="lat"
            name="lat"
            placeholder="Latitude"
            value={`${gasStation.lat}`}
            type="text"
            onChange={onChangle}
          />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="exampleSelect" sm={2}>
          Area
        </Label>
        <Col sm={10}>
          <Input
            id="exampleSelect"
            name="area"
            type="select"
            required={`${gasStation.area}` === ''}
            value={`${gasStation.area}`}
            onChange={selectArea}
          >
            <option value={''}>Choose Area</option>
            {area.map((item: areas) => (
              <option key={item.id} value={item.id}>
                {item.street} , {item.district}
              </option>
            ))}
          </Input>
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="checkbox2" sm={2}>
          Gas Type
        </Label>
        <Col sm={10}>
          {gasType.length > 0 &&
            gasType.map((type: gasType) => (
              <FormGroup row key={type.id}>
                <Col sm={{ size: 3 }}>
                  <FormGroup check inline>
                    <Input
                      id={`checkbox${type.id}`}
                      name="checktype"
                      type="checkbox"
                      required={!gasStation.gasPrices.length}
                      checked={isChecked(type.id)}
                      onChange={() => handChecked(type.id)}
                    />
                    {type.gasTypeName}
                  </FormGroup>
                </Col>
                <Col sm={{ size: 3 }}>
                  <FormGroup inline>
                    <Input
                      id={`input${type.id}`}
                      name="price"
                      type="text"
                      size={4}
                      bsSize="sm"
                      placeholder="Price"
                      disabled={!isChecked(type.id)}
                      required={isChecked(type.id)}
                      onChange={onChangle}
                    />
                  </FormGroup>
                </Col>
              </FormGroup>
            ))}
        </Col>
      </FormGroup>
      <FormGroup check row>
        <Col
          sm={{
            offset: 2,
            size: 10,
          }}
        >
          <div className="button-group">
            <Button type="submit" className="btn" color="primary" size="lg">
              Add
            </Button>
            <Button
              className="btn"
              color="danger"
              size="lg"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
          </div>
        </Col>
      </FormGroup>
    </Form>
  )
}

export default add
