import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import Prodcut from "../components/Product"
import Message from "../components/Message"
import Loader from "../components/Loader"
import ProductCarousel from "../components/ProductCarousel"
import Meta from "../components/Meta"
import Paginate from "../components/Paginate"
import { Row, Col } from "react-bootstrap"
import { listProducts } from "../actions/productActions"

const HomeScreen = () => {
  const dispatch = useDispatch()
  const params = useParams()
  const keyword = params.keyword
  const pageNumber = params.pageNumber || 1
  const productList = useSelector((state) => state.productList)
  const { loading, error, products, page, pages } = productList
  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber))
  }, [dispatch, keyword, pageNumber])

  return (
    <>
      <Meta />
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to='/' className='btn btn-dark'>
          Go Back
        </Link>
      )}
      <h1>Latest Products</h1>
      {!loading && products.length === 0 && (
        <Message variant='info'>No Product Found</Message>
      )}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Prodcut product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ""}
          />
        </>
      )}
    </>
  )
}

export default HomeScreen
