
import type { NextPage } from 'next'
import { Col, Row } from 'reactstrap'
import Head from 'next/head'
import TableShow from '../src/components/dashboard/TableShow'



const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Gas Statations</title>
        <meta
          name="description"
          content="Monster Free Next Js Dashboard Template"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <Row>
          <Col lg="12" sm="12">
            <TableShow />
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default Home