import React from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { retrieveAccountList } from '../../../_actions/account_action';
import PaymentMethodForm from './PaymentMethodForm';


function SearchCard({
    searchContent,
    setSearchContent,
    searchCategory,
    setSearchCategory,
    searchPaymentMethod,
    setSearchPaymentMethod,
    setAccounts,
    cards,
  }) {
  
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
  
  
    const handleInputChange = (event) => {
      switch (event.target.name) {
        case 'searchContent':
          setSearchContent(event.target.value);
          break;
        case 'searchCategory':
          setSearchCategory(event.target.value);
          break;
        case 'paymentMethod':
          setSearchPaymentMethod(event.target.value);
          break;
        default:
          break;
      }
    };
  
    const onSubmitHandler = (event) => {
      event.preventDefault();
  
      const body = {
        searchContent,
        searchCategory,
        searchPaymentMethod,
      };
  
      dispatch(retrieveAccountList({ userId: user.userData._id, ...body })).then((response) => {
        if (response.payload.success) {
          setAccounts(response.payload.accounts);
        } else {
          alert('Error');
        }
      });
    };
  
    return (
  
      <div className="card p-3" style={{ backgroundColor: "#f8f9fa" }}>
        <h2>검색</h2>
        <Form onSubmit={onSubmitHandler}>
          <Row>
            <Col md={3}>
              <Form.Group controlId="formBasicSearchContent">
                <Form.Label>내용</Form.Label>
                <Form.Control type="text" placeholder="내용" name="searchContent" value={searchContent} onChange={handleInputChange} />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group controlId="formBasicSearchCategory">
                <Form.Label>카테고리</Form.Label>
                <Form.Control as="select" name="searchCategory" value={searchCategory} onChange={handleInputChange}>
                  <option value="">카테고리</option>
                  <option value="식료품">식료품</option>
                  <option value="교통">교통</option>
                  <option value="문화">문화</option>
                  <option value="기타">기타</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col md={3}>
              <PaymentMethodForm searchPaymentMethod={searchPaymentMethod} handleInputChange={handleInputChange} cards = {cards} />
            </Col>
            <Col md={3} className="d-flex align-items-end">
              <Button variant="primary" type="submit">
                검색
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
  
    );
  }
  

export default SearchCard