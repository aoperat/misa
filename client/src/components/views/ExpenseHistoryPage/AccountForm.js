import React from 'react'
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { retrieveAccountList } from '../../../_actions/account_action';
import PaymentMethodForm from './PaymentMethodForm';
import moment from 'moment';
import { insertAccount } from '../../../_actions/account_action';
import { useRef, useState } from 'react';
import { Row, Col } from 'react-bootstrap';

function AccountForm({ setAccounts, cards }) {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [date, setDate] = useState(moment().format('YYYY-MM-DD'));
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [amountType, setAmountType] = useState('expense');

  const descriptionRef = useRef(null);
  const amountRef = useRef(null);
  const categoryRef = useRef(null);
  const paymentMethodRef = useRef(null);

  const handleDateChange = (event) => {
    setDate(moment(event.target.value).format('YYYY-MM-DD'));
  };

  const handleInputChange = (event) => {

    let inputValue = event.target.value.replace(/[^0-9]/g, ''); // 숫자 이외의 문자를 제거

    switch (event.target.name) {
      case 'description':
        setDescription(event.target.value);
        break;
      case 'amount':
        setAmount(inputValue);
        break;
      case 'category':
        setCategory(event.target.value);
        break;
      case 'paymentMethod':
        setPaymentMethod(event.target.value);
        break;
      case 'amountType':
        setAmountType(event.target.value);
        break;

      default:
        break;
    }
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (!date) {
      alert('날짜를 입력해주세요.');
      return;
    }

    if (!description) {
      alert('내용을 입력해주세요.');
      descriptionRef.current?.focus();
      return;
    }

    if (!amount) {
      alert('금액을 입력해주세요.');
      amountRef.current?.focus();
      return;
    }

    if (!category) {
      alert('카테고리를 선택해주세요.');
      categoryRef.current?.focus();
      return;
    }

    if (!paymentMethod) {
      alert('결제 수단을 선택해주세요.');
      paymentMethodRef.current?.focus();
      return;
    }

    const adjustedAmount = amountType === 'expense' ? -Math.abs(amount) : Math.abs(amount);

    
    const body = {
      date,
      description,
      amount: adjustedAmount,
      category,
      paymentMethod,
      userId: user.userData._id,
    };

    dispatch(insertAccount(body)).then((response) => {
      if (response.payload.success) {

        setDescription('');
        setAmount('');
        setCategory('');
        setPaymentMethod('');
        descriptionRef.current?.focus();


        dispatch(retrieveAccountList({ userId: user.userData._id })).then((response) => {
          if (response.payload.success) {
            setAccounts(response.payload.accounts);
          } else {
            alert('Error');
          }
        });
      } else {
        alert('Error');
      }
    });
  };

  const handleYesterday = () => {
    const yesterday = moment().subtract(1, 'day').format('YYYY-MM-DD');
    setDate(yesterday);
  };

  const handleToday = () => {
    const today = moment().format('YYYY-MM-DD');
    setDate(today);
  };

  const handleAmountTypeChange = (type) => {
    setAmountType(type);
};

  return (
    <div className="card p-3" style={{ backgroundColor: "#f8f9fa" }}>
      <h2>지출내역 입력</h2>
      <Form onSubmit={onSubmitHandler}>
        <Form.Group controlId="formBasicDate">



        <Form.Group controlId="formBasicAmountType">
                <Form.Label>Amount Type</Form.Label>
                <div className="mt-2">
                    <Button
                        variant={amountType === 'expense' ? 'primary' : 'outline-primary'}
                        onClick={() => handleAmountTypeChange('expense')}
                        className="mr-2"
                    >
                        Expense
                    </Button>
                    <Button
                        variant={amountType === 'income' ? 'primary' : 'outline-primary'}
                        onClick={() => handleAmountTypeChange('income')}
                    >
                        Income
                    </Button>
                </div>
            </Form.Group>
            
          <Form.Label>날짜</Form.Label>
          <br />
          <Row>
            <Col md={12} >
              <div className='d-flex'>
                <Form.Control type="date" value={moment(date).format('YYYY-MM-DD')} onChange={handleDateChange} />
                <Button variant="outline-secondary" className='text-nowrap' onClick={handleYesterday}>어제</Button>
                <Button variant="outline-secondary" className='text-nowrap' onClick={handleToday}>오늘</Button>
              </div>
            </Col>
          </Row>
        </Form.Group>

        <Form.Group controlId="formBasicDescription">
          <Form.Label>내용</Form.Label>
          <Form.Control type="text" placeholder="내용" name="description" value={description} onChange={handleInputChange} />
        </Form.Group>


        <Form.Group controlId="formBasicAmount">
          <Form.Label>금액</Form.Label>
          <Form.Control type="number" placeholder="금액" name="amount" value={amount} onChange={handleInputChange} />
        </Form.Group>
        <Form.Group controlId="formBasicCategory">
          <Form.Label>카테고리</Form.Label>
          <Form.Control as="select" name="category" value={category} onChange={handleInputChange}>
            <option value="">카테고리</option>
            <option value="식료품">식료품</option>
            <option value="교통">교통</option>
            <option value="문화">문화</option>
            <option value="기타">기타</option>
          </Form.Control>
        </Form.Group>

        <PaymentMethodForm searchPaymentMethod={paymentMethod} handleInputChange={handleInputChange} cards={cards} />
        <div className='d-flex justify-content-end mt-2'>
          <Button variant="primary" type="submit">
            입력
          </Button>
        </div>
      </Form>
    </div>
  );

}
export default AccountForm