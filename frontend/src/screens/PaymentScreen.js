import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Form, Button, Row, Col } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import FormContainer from "../components/FormContainer"
import CheckoutSteps from "../components/CheckoutSteps"
import { savePaymentMethod } from "../actions/cartActions"
import Meta from "../components/Meta"

const PaymentScreen = () => {
  const navigate = useNavigate()
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const [paymentMethod, setPaymentMethod] = useState("PayPal")

  const dispatch = useDispatch()
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    navigate("/placeorder")
  }
  useEffect(() => {
    if (!userInfo) {
      navigate("/login")
    }
    if (!shippingAddress) {
      navigate("/shipping")
    }
  }, [navigate, userInfo, shippingAddress])

  return (
    <>
      <Meta title='Payment Methode' />
      <FormContainer>
        <CheckoutSteps step1 step2 step3 />
        <h1>Payment Method</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group>
            <Form.Label as='legend'>Select Method</Form.Label>

            <Col>
              <Form.Check
                type='radio'
                label='PayPal or Credit Card'
                id='PayPal'
                name='paymentMethod'
                value='PayPal'
                checked
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
            </Col>
          </Form.Group>
          <Row className='py-3'>
            <Button type='submit' variant='primary'>
              Continue
            </Button>
          </Row>
        </Form>
      </FormContainer>
    </>
  )
}

export default PaymentScreen
