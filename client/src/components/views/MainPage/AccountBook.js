import axios from 'axios'
//import { response } from 'express';

import React, { useState } from 'react';
import { Table } from 'react-bootstrap'
import { useSelector, useDispatch } from "react-redux";
import { DatePicker } from 'antd';
import { Button } from 'react-bootstrap';
import { insertAccount } from '../../../_actions/account_action'
// import { useDispatch } from 'react-redux';
// import { loginUser } from '../../../_actions/user_action'
// import { useNavigate } from 'react-router-dom'



function AccountBook() {

  const user = useSelector(state => state.user);
  //"63df3bc7a056883aec1dea03"
  //"63df3bc7a056883aec1dea03"

  return (
    <div>
      <지출내역Table></지출내역Table>
      <지출내역입력Form></지출내역입력Form>
    </div>
  )
}

function 지출내역입력Form() {

  const dispatch = useDispatch();

  const [Date, setDate] = useState('');
  const [Description, setDescription] = useState('');
  const [Amount, setAmount] = useState('');
  const [Category, setCategory] = useState('');
  const [PaymentMethod, setPaymentMethod] = useState('');

  const handleDateChange = (date, dateString) => {
    setDate(dateString);
  };

  const handleInputChange = event => {
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
    //preventDefault 사용하면 리프레시가 되지 않는다.
    event.preventDefault();


    let body = {
      date: Date,
      description: Description,
      amount: Amount,
      category:Category,
      paymentMethod:PaymentMethod
    }

    console.log(body);
    // 리덕스 사용
    dispatch(insertAccount(body))
      .then(response => {
        if (response.payload.success) {
          // navigate('/login')
          //alert(response);
        } else {
          alert('Error')
        }
      })

  }

  return (
    <form style={{ display: 'flex', flexDirection: 'column' }}
      onSubmit={onSubmitHandler}
    >
      <DatePicker onChange={handleDateChange} />
      <input
        type="text"
        placeholder="Description"
        name="description"
        value={Description}
        onChange={handleInputChange}
      />
      <input
        type="text"
        placeholder="Amount"
        name="amount"
        value={Amount}
        onChange={handleInputChange}
      />
      <select
        name="category"
        value={Category}
        onChange={handleInputChange}
      >
        <option value="">Select a category</option>
        <option value="groceries">Groceries</option>
        <option value="transportation">Transportation</option>
        <option value="entertainment">Entertainment</option>
        <option value="other">Other</option>
      </select>
      <select
        name="paymentMethod"
        value={PaymentMethod}
        onChange={handleInputChange}
      >
        <option value="">Select a payment method</option>
        <option value="cash">Cash</option>
        <option value="credit">Credit</option>
        <option value="debit">Debit</option>
      </select>

      <button>입력</button>
    </form>
  );
};


function 지출내역Table() {

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-6'>
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

              <tr>
                <td>2023-01-30</td>
                <td>강의 결재</td>
                <td>50,000</td>
                <td>공부</td>
                <td>국민신용</td>
              </tr>
              <tr>
                <td>2023-01-30</td>
                <td>편의점 도시락</td>
                <td>4,700</td>
                <td>식비</td>
                <td>국민체크</td>
              </tr>

            </tbody>
          </Table>
        </div>
      </div>
    </div >
  )
}

export default AccountBook