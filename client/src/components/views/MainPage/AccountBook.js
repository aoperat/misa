import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
//import { DatePicker } from 'antd';
import moment from 'moment';

import { Table, Row, Col } from 'react-bootstrap';
import { Form, Button } from 'react-bootstrap';
import { retrieveAccountList, insertAccount } from '../../../_actions/account_action';

function AccountBook() {
  const [accounts, setAccounts] = useState([]);
  const [searchContent, setSearchContent] = useState('');
  const [searchCategory, setSearchCategory] = useState('');
  const [searchPaymentMethod, setSearchPaymentMethod] = useState('');

  return (
    <div>
    
    <Row>
      <Col md={4} className="pr-3 border-right">
        <AccountForm setAccounts={setAccounts} />
        <SearchCard
            searchContent={searchContent}
            setSearchContent={setSearchContent}
            searchCategory={searchCategory}
            setSearchCategory={setSearchCategory}
            searchPaymentMethod={searchPaymentMethod}
            setSearchPaymentMethod={setSearchPaymentMethod}
            setAccounts={setAccounts}
          />
      </Col>
      <Col md={8} className="pl-3">

        <AccountTable accounts={accounts} setAccounts={setAccounts} />
      </Col>
    </Row>
    </div>
  );

}

function AccountForm({ setAccounts }) {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');

  const descriptionRef = useRef(null);
  const amountRef = useRef(null);
  const categoryRef = useRef(null);
  const paymentMethodRef = useRef(null);

  const handleDateChange = (event) => {

    setDate(event.target.value);
  };

  const handleInputChange = (event) => {
    switch (event.target.name) {
      case 'description':
        setDescription(event.target.value);
        break;
      case 'amount':
        setAmount(event.target.value);
        break;
      case 'category':
        setCategory(event.target.value);
        break;
      case 'paymentMethod':
        setPaymentMethod(event.target.value);
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

    const body = {
      date,
      description,
      amount,
      category,
      paymentMethod,
      userId: user.userData._id,
    };

    dispatch(insertAccount(body)).then((response) => {
      if (response.payload.success) {
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

  
  return (
    <div className="card p-3" style={{ backgroundColor: "#f8f9fa" }}>
      <h2>지출내역 입력</h2>
      <Form onSubmit={onSubmitHandler}>
        <Form.Group controlId="formBasicDate">
          <Form.Label>날짜</Form.Label>
          <br />
          <Form.Control type="date" value={moment(date).format('YYYY-MM-DD')} onChange={handleDateChange} />
        </Form.Group>
        <Form.Group controlId="formBasicDescription">
          <Form.Label>내용</Form.Label>
          <Form.Control type="text" placeholder="내용" name="description" value={description} onChange={handleInputChange} />
        </Form.Group>
        <Form.Group controlId="formBasicAmount">
          <Form.Label>금액</Form.Label>
          <Form.Control type="text" placeholder="금액" name="amount" value={amount} onChange={handleInputChange} />
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
        <Form.Group controlId="formBasicPaymentMethod">
          <Form.Label>결재구분</Form.Label>
          <Form.Control as="select" name="paymentMethod" value={paymentMethod} onChange={handleInputChange}>
            <option value="">사용구분</option>
            <option value="현금">현금</option>
            <option value="신용카드">신용카드</option>
          </Form.Control>
        </Form.Group>
        <div className='d-flex justify-content-end mt-2'>
          <Button variant="primary" type="submit">
            입력
          </Button>
        </div>
      </Form>
    </div>
  );

}


function AccountTable(props) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  useEffect(() => {
    if (user.userData) { // user.userData가 존재하는 경우에만 실행
      let body = { userId: user.userData._id };
      dispatch(retrieveAccountList(body)).then(response => {
        if (response.payload.success) {
          props.setAccounts(response.payload.accounts);
        } else {
          alert('Error');
        }
      });
    }
  }, [dispatch, user.userData]);


  return (
    <div className='container'>
      <div className='row'>
        <div className='col-12'>
          <Table striped hover size="sm" className='table'>
            <thead>
              <tr>
                <th>날짜</th>
                <th>내용</th>
                <th>금액</th>
                <th>카테고리</th>
                <th>결재구분</th>
              </tr>
            </thead>
            <tbody>
              {props.accounts.map(account => (
                <tr key={account._id}>
                  <td>{account.date}</td>
                  <td>{account.description}</td>
                  <td>{account.amount}</td>
                  <td>{account.category}</td>
                  <td>{account.paymentMethod}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}

function SearchCard({
  searchContent,
  setSearchContent,
  searchCategory,
  setSearchCategory,
  searchPaymentMethod,
  setSearchPaymentMethod,
  setAccounts,
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
      case 'searchPaymentMethod':
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
        <Form.Group controlId="formBasicSearchContent">
          <Form.Label>내용</Form.Label>
          <Form.Control type="text" placeholder="내용" name="searchContent" value={searchContent} onChange={handleInputChange} />
        </Form.Group>
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
        <Form.Group controlId="formBasicSearchPaymentMethod">
          <Form.Label>결재구분</Form.Label>
          <Form.Control as="select" name="searchPaymentMethod" value={searchPaymentMethod} onChange={handleInputChange}>
            <option value="">사용구분</option>
            <option value="현금">현금</option>
            <option value="신용카드">신용카드</option>
          </Form.Control>
        </Form.Group>
        <div className='d-flex justify-content-end mt-2'>
          <Button variant="primary" type="submit">
            검색
          </Button>
        </div>
      </Form>
    </div>
  );
}



export default AccountBook