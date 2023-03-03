import React, { useState, useEffect } from 'react';
import { Table, Row, Col } from 'react-bootstrap'
import { retrieveAccountList } from '../../../_actions/account_action';
import { useSelector, useDispatch } from 'react-redux';
import '../../../App.css'

function Total() {

    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const [expensesByMonth, setExpensesByMonth] = useState({});

    useEffect(() => {
        if (user.userData) { // user.userData가 존재하는 경우에만 실행
            let body = { userId: user.userData._id };
            dispatch(retrieveAccountList(body)).then(response => {
                if (response.payload.success) {
                    // 월별 지출내역 합계 계산
                    const monthlyTotal = response.payload.monthlyTotal;

                    const months = Object.keys(monthlyTotal).sort(); // 월별 합계가 존재하는 월 목록
                    const expensesByMonth = {};

                    for (let i = 1; i <= 12; i++) {
                        let total = 0;
                        const month = `2023-${i.toString().padStart(2, '0')}`;

                        console.log(months)
                        console.log(month)
                        if (months.includes(month)) {
                            total += monthlyTotal[month];
                        }
                        expensesByMonth[month] = total;
                    }
                    setExpensesByMonth(expensesByMonth);
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
                <div className="card p-3" style={{ backgroundColor: "#f8f9fa" }}>
                    <h2>연 평가</h2>
                    <Table striped bordered hover>
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
                                <td colSpan="2">수익</td>
                                <td>₩10,800,000</td>
                                <td>₩10,800,000</td>
                                <td>₩10,800,000</td>
                                <td>₩10,800,000</td>
                                <td>₩10,800,000</td>
                                <td>₩10,800,000</td>
                                <td>₩10,800,000</td>
                                <td>₩10,800,000</td>
                                <td>₩10,800,000</td>
                                <td>₩10,800,000</td>
                                <td>₩10,800,000</td>
                                <td>₩10,800,000</td>
                            </tr>
                            <tr>
                                <td colSpan="2">지출</td>
                                <td>₩{expensesByMonth['2023-01']?.toLocaleString() ?? '₩0'}</td>
                                <td>₩{expensesByMonth['2023-02']?.toLocaleString() ?? '₩0'}</td>
                                <td>₩{expensesByMonth['2023-03']?.toLocaleString() ?? '₩0'}</td>
                                <td>₩{expensesByMonth['2023-04']?.toLocaleString() ?? '₩0'}</td>
                                <td>₩{expensesByMonth['2023-05']?.toLocaleString() ?? '₩0'}</td>
                                <td>₩{expensesByMonth['2023-06']?.toLocaleString() ?? '₩0'}</td>
                                <td>₩{expensesByMonth['2023-07']?.toLocaleString() ?? '₩0'}</td>
                                <td>₩{expensesByMonth['2023-08']?.toLocaleString() ?? '₩0'}</td>
                                <td>₩{expensesByMonth['2023-09']?.toLocaleString() ?? '₩0'}</td>
                                <td>₩{expensesByMonth['2023-10']?.toLocaleString() ?? '₩0'}</td>
                                <td>₩{expensesByMonth['2023-11']?.toLocaleString() ?? '₩0'}</td>
                                <td>₩{expensesByMonth['2023-12']?.toLocaleString() ?? '₩0'}</td>
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


