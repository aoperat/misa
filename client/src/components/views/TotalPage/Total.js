import React, { useState, useEffect } from 'react';
import { Table, Row, Col } from 'react-bootstrap'
import { retrieveAccountList } from '../../../_actions/account_action';
import { useSelector, useDispatch } from 'react-redux';
import './Total.css'

function Total() {

    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const [expensesByMonth, setExpensesByMonth] = useState({});

    useEffect(() => {
        if (user.userData) {
            let body = { userId: user.userData._id };
            dispatch(retrieveAccountList(body)).then(response => {
                if (response.payload.success) {
                    const monthlyTotal = response.payload.monthlyTotal;
                    const months = Object.keys(monthlyTotal).sort();
                    const resultsByMonth = {};

                    for (let i = 1; i <= 12; i++) {
                        const month = `2023-${i.toString().padStart(2, '0')}`;
                        resultsByMonth[month] = {
                            expenses: months.includes(month) ? monthlyTotal[month].expenses : 0,
                            incomes: months.includes(month) ? monthlyTotal[month].incomes : 0,
                        };
                    }
                    setExpensesByMonth(resultsByMonth);
                } else {
                    alert('Error');
                }
            });
        }
    }, [dispatch, user.userData]);


    return (
        <div>
            <Row>
                <Col md={2}></Col>
                <Col md={8}>
                    <Row className="m-2">
                        <div className="card p-3 table-wrapper-scroll-y" style={{ backgroundColor: "#f8f9fa" }}>
                            <h2>연 평가</h2>
                            <Table striped bordered hover className='table-font-size'>

                                <thead>
                                    <tr>
                                        <th colSpan="2">2023년</th>
                                        <th>1월</th>
                                        <th>2월</th>
                                        <th>3월</th>
                                        <th>4월</th>
                                        <th>5월</th>
                                        <th>6월</th>
                                        <th>7월</th>
                                        <th>8월</th>
                                        <th>9월</th>
                                        <th>10월</th>
                                        <th>11월</th>
                                        <th>12월</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td colSpan="2">Revenue</td>
                                        {Object.values(expensesByMonth).map(({ incomes }, index) => (
                                            <td key={`income-${index}`}>{`₩${incomes.toLocaleString()}`}</td>
                                        ))}
                                    </tr>
                                    <tr>
                                        <td colSpan="2">Spend</td>
                                        {Object.values(expensesByMonth).map(({ expenses }, index) => (
                                            <td key={`expense-${index}`}>{`₩${expenses.toLocaleString()}`}</td>
                                        ))}
                                    </tr>

                                </tbody>
                            </Table>
                        </div>
                    </Row>
                </Col>
                <Col md={2}></Col>
            </Row>


        </div>
    )
}

export default Total


