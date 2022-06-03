import React, {useEffect, useState} from 'react'
import {Card, CardBody, CardTitle, Col, Form, Row} from 'reactstrap'
import {useRouter} from 'next/router'
import {gasStation} from '../../src/utils/dashboard/interface'
import gasStationApi from '../../src/api/gasStationApi'
import {startLoading, finishLoading} from '../../src/redux/actions/loadingCreator';
import { useDispatch } from 'react-redux'


type Props = {
    id:string
}

const edit = (props: Props) => {
    const router = useRouter();
    let idMap:any = router.query.id;
    const gasStationID = `${router.query.id}`
    const [gasStation, setGasStation] = useState<gasStation>({
        id: '',
        stationName: '',
        area: 'Choose Option',
        lng: '',
        lat: '',
        gasPrices: [],
    })
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(startLoading())
        const fetchdata = async () => {
            await gasStationApi.getGasStationById(`${idMap}`).then((res) => {
                setGasStation({
                    lng: res.data.lng,
                    lat: res.data.lat,
                } as gasStation)
                dispatch(finishLoading())       
            })
        }
        fetchdata()    
    }, [gasStationID])





    return (
        <Row>
            <Col>
                <Card>
                    <CardTitle tag="h6" className="border-bottom p-3 mb-0">
                        <i className="bi bi-map" > Google Map</i>
                    </CardTitle>
                    <CardBody>
                        <Form>
                            <iframe
                                src={`http://maps.google.com/maps?q=${gasStation.lng},${gasStation.lat},&z=16&output=embed`}
                                width="100%" height="700" loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"></iframe>
                        </Form>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    )
}

export default edit
