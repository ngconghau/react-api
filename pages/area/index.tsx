import React from 'react'
import type { NextPage } from 'next'
import { Col, Row } from 'reactstrap'
import Head from 'next/head'
import TableShowArea from '../../src/components/area/TableShowArea'


type Props = {}

const index = (props: Props) => {
  return (
    <div>
      <Head>
        <title>Area</title>
        <meta
          name="description"
          content="Monster Free Next Js Dashboard Template"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <Row>
          <Col lg="12" sm="12">
            <TableShowArea/>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default index