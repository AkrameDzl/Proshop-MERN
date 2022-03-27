import React from "react"
import products from "../products"
import Prodcut from "../components/Product"
import { Row, Col } from "react-bootstrap"

const HomeScreen = () => {
  return (
    <>
      <h1>Latest PRoducts</h1>

      <Row>
        {products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Prodcut product={product} />
          </Col>
        ))}
      </Row>
    </>
  )
}

export default HomeScreen
