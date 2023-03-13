import React from 'react'
import { Form } from 'react-bootstrap';


function PaymentMethodForm({searchPaymentMethod, handleInputChange,cards}) {

    return (
      <Form.Group controlId="formBasicSearchPaymentMethod">
        <Form.Label>결재구분</Form.Label>
        <Form.Control as="select" name="paymentMethod" value={searchPaymentMethod} onChange={handleInputChange}>
          <option value="">사용구분</option>
          <option value="현금">현금</option>
          {cards.map((card, idx) =>
            (
            <option key={idx} value={card.name}>{card.name}</option>
            )
          )}
        </Form.Control>
      </Form.Group>
    );
  }

export default PaymentMethodForm