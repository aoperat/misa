//ExpenseHistory.js
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col } from 'react-bootstrap';

import SearchCard from './SearchCard';
import AccountForm from './AccountForm';
import AccountTable from './AccountTable';
import { retrieveCardList } from '../../../_actions/card_action';
import './../../styles/style.css'

function ExpenseHistory() {
  const [accounts, setAccounts] = useState([]);
  const [searchContent, setSearchContent] = useState('');
  const [searchCategory, setSearchCategory] = useState('');
  const [searchPaymentMethod, setSearchPaymentMethod] = useState('');

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [cards, setCards] = useState([]);

  useEffect(() => {
      if (user.userData) {
          let body = { userId: user.userData._id };
          dispatch(retrieveCardList(body)).then((response) => {
              if (response.payload.success) {
                  setCards(response.payload.cards);
              } else {
                  alert("Error");
              }
          });
      }
  }, [dispatch, user.userData, setCards]);

  return (
    <div>
      <Row>
        <Col md={2}></Col>
        <Col md={8}>
          <Row className="m-2">
            <Col md={12}  ><SearchCard
              searchContent={searchContent}
              setSearchContent={setSearchContent}
              searchCategory={searchCategory}
              setSearchCategory={setSearchCategory}
              searchPaymentMethod={searchPaymentMethod}
              setSearchPaymentMethod={setSearchPaymentMethod}
              setAccounts={setAccounts}
              cards = {cards}
            /></Col>
          </Row>
          <Row className='m-2'>
            <Col md={8} >
              <AccountTable accounts={accounts} setAccounts={setAccounts} />
            </Col>
            <Col md={4} >
              <AccountForm setAccounts={setAccounts} cards={cards}/>
            </Col>

          </Row>
        </Col>
        <Col md={2}></Col>
      </Row>
    </div>
  );

}

export default ExpenseHistory