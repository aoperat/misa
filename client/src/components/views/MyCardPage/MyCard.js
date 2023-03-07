import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Table, Row, Col, ToggleButton, Form, Button, ToggleButtonGroup } from 'react-bootstrap';

import { insertCard, retrieveCardList,updateCard,deleteCard } from '../../../_actions/card_action';
import './../../styles/style.css'
import { FaEdit, FaTrash, FaUndo, FaSave } from 'react-icons/fa';


function MyCard() {
    const [cards, setCards] = useState([]);

    return (
        <Row>
            <Col md={2}></Col>
            <Col md={8}>
                <Row className='m-2'>
                    <Col md={8}>
                        <CardTable cards={cards} setCards={setCards} ></CardTable>
                    </Col>
                    <Col md={4}>
                        <CardInsertForm setCards={setCards}></CardInsertForm>
                    </Col>
                </Row>
            </Col>
            <Col md={2}></Col>
        </Row>
    )
}

// function CardTable(props) {
//     const dispatch = useDispatch();
//     const user = useSelector(state => state.user);
//     const { cards, setCards } = props; // 필요한 props를 비구조화 할당하여 가져옵니다.

//     useEffect(() => {
//         if (user.userData) { // user.userData가 존재하는 경우에만 실행
//             let body = { userId: user.userData._id };
//             dispatch(retrieveCardList(body)).then(response => {
//                 if (response.payload.success) {
//                     console.log("----")
//                     setCards(response.payload.cards);
//                 } else {
//                     alert('Error');
//                 }
//             });
//         }
//     }, [dispatch, user.userData, setCards]);

//     return (
//         <div className="card p-3" style={{ backgroundColor: "#f8f9fa" }}>
//             <h2>등록 카드</h2>
//             <Row>

//                 <Table striped bordered hover size="sm" className='table'>
//                     <thead>
//                         <tr>
//                             <th>구분</th>
//                             <th>이름</th>
//                             <th>시작일</th>
//                             <th>종료일</th>
//                             <th>카드결재일</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {cards.map(card => (
//                             <tr key={card._id}>
//                                 <td>{card.cardType}</td>
//                                 <td>{card.name}</td>
//                                 <td>{card.startDate}</td>
//                                 <td>{card.endDate}</td>
//                                 <td>{card.paymentDate}</td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </Table>
//             </Row>
//         </div>
//     )
// }

function CardTable(props) {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const { cards, setCards } = props;

    useEffect(() => {
        if (user.userData) {
            let body = { userId: user.userData._id };
            dispatch(retrieveCardList(body)).then((response) => {
                if (response.payload.success) {
                    console.log("----");
                    setCards(response.payload.cards);
                } else {
                    alert("Error");
                }
            });
        }
    }, [dispatch, user.userData, setCards]);

    const handleCardInputChange = (event, index, field) => {
        const { value } = event.target;

        setCards((prevState) =>
            prevState.map((card, idx) =>
                idx === index ? { ...card, [field]: value } : card
            )
        );
    };

    const handleCardUpdate = (index) => {
      const updatedCard = cards[index];

    console.log("updatedCard",updatedCard)

      dispatch(updateCard(updatedCard)).then((response) => {
        if (response.payload.success) {
          setCards((prevState) =>
            prevState.map((card, idx) =>
              idx === index ? { ...card, isEditing: false } : card
            )
          );
        } else {
          alert("Error");
        }
      });
    };

    const handleCardEdit = (index) => {
        setCards((prevState) =>
            prevState.map((card, idx) =>
                idx === index ? { ...card, isEditing: true } : card
            )
        );
    };

    const handleCardCancel = (index) => {
        setCards((prevState) =>
            prevState.map((card, idx) =>
                idx === index ? { ...card, isEditing: false } : card
            )
        );
    };

    const handleCardDelete = (card) => {
        if (window.confirm('정말 삭제하시겠습니까?')) {
            dispatch(deleteCard({ cardId: card._id })).then((response) => {
                if (response.payload.success) {
                    setCards(cards.filter(c => c._id !== card._id));
                } else {
                    alert('Error');
                }
            });
        }
    };

    return (
        <div className="card p-3" style={{ backgroundColor: "#f8f9fa" }}>
            <h2>등록 카드</h2>
            <Row>
                <Table striped bordered hover size="sm" className="table">
                    <thead>
                        <tr>
                            <th>구분</th>
                            <th>이름</th>
                            <th>시작일</th>
                            <th>종료일</th>
                            <th>카드결재일</th>
                            <th>관리</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cards.map((card, index) => (
                            <tr key={card._id}>
                                <td style={{ width: "10%" }}>
                                    {card.isEditing ? (
                                        <Form.Control type="text" defaultValue={card.cardType} onChange={(e) => handleCardInputChange(e, index, "cardType")} />
                                    ) : (
                                        <span>{card.cardType}</span>
                                    )}
                                </td>
                                <td style={{ width: "20%" }}>
                                    {card.isEditing ? (
                                        <Form.Control type="text" defaultValue={card.name} onChange={(e) => handleCardInputChange(e, index, "name")} />
                                    ) : (
                                        <span>{card.name}</span>
                                    )}
                                </td>
                                <td style={{ width: "20%" }}>
                                    {card.isEditing ? (
                                        <Form.Control type="text" defaultValue={card.startDate} onChange={(e) => handleCardInputChange(e, index, "startDate")} />
                                    ) : (
                                        <span>{card.startDate}</span>
                                    )}
                                </td>
                                <td style={{ width: "20%" }}>
                                    {card.isEditing ? (
                                        <Form.Control type="text" defaultValue={card.endDate} onChange={(e) => handleCardInputChange(e, index, "endDate")} />
                                    ) : (
                                        <span>{card.endDate}</span>
                                    )}
                                </td>
                                <td style={{ width: "20%" }}>
                                    {card.isEditing ? (
                                        <Form.Control type="text" defaultValue={card.paymentDate} onChange={(e) => handleCardInputChange(e, index, "paymentDate")} />
                                    ) : (
                                        <span>{card.paymentDate}</span>
                                    )}
                                </td>
                                <td>
                                    <div className="d-flex">
                                        {card.isEditing ? (
                                            <Button variant="primary" size="sm" onClick={() => handleCardUpdate(index)}><FaSave /></Button>
                                        ) : (
                                            <>
                                                <Button variant="primary" size="sm" onClick={() => handleCardEdit(index)}><FaEdit /></Button>
                                                <Button variant="danger" size="sm" onClick={() => handleCardDelete(card)}><FaTrash /></Button>
                                            </>
                                        )}
                                        {card.isEditing && (
                                            <Button variant="secondary" size="sm" onClick={() => handleCardCancel(index)}><FaUndo /></Button>
                                        )}
                                    </div>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Row>
        </div>
    );

}

function CardInsertForm({ setCards }) {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const [cardType, setCardType] = useState("credit");
    const [cardName, setCardName] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [paymentDate, setPaymentDate] = useState("");

    const radios = [
        { name: '신용카드', value: 'credit' },
        { name: '체크카드', value: 'debit' },
    ];

    const radioValue = '1';

    const onSubmitHandler = (event) => {
        event.preventDefault();

        console.log(event);

        const body = {
            userId: user.userData._id,
            cardType: cardType,
            name: cardName,
            startDate: cardType === 'credit' ? startDate : null,
            endDate: cardType === 'credit' ? endDate : null,
            paymentDate: cardType === 'credit' ? paymentDate : null,
        };

        dispatch(insertCard(body)).then((response) => {
            if (response.payload.success) {
                dispatch(retrieveCardList({ userId: user.userData._id })).then((response) => {
                    if (response.payload.success) {
                        setCards(response.payload.cards);
                    } else {
                        alert('Error');
                    }
                });
            } else {
                alert('Error');
            }
        });
    };

    const [showDateInputs, setShowDateInputs] = useState(cardType === 'credit');

    const onRadioChange = (event) => {

        setCardType(event);
        setShowDateInputs(event === 'credit');
    };

    return (
        <div className="card p-3" style={{ backgroundColor: "#f8f9fa" }}>
            <h2>카드 등록</h2>
            <Form onSubmit={onSubmitHandler}>
                <Form.Group controlId="formBasicCardType">
                    <Form.Label>카드 종류 선택</Form.Label>
                    <br />
                    <ToggleButtonGroup
                        type="radio"
                        name="cardType"
                        value={cardType}
                        onChange={onRadioChange}
                    >
                        {radios.map((radio, idx) => (
                            <ToggleButton
                                key={idx}
                                id={`radio-${idx}`}
                                type="radio"
                                variant={radioValue === radio.value ? "primary" : "outline-primary"}
                                name="radio"
                                value={radio.value}
                                checked={cardType === radio.value}
                                onChange={(e) => setCardType(e.currentTarget.value)}
                            >
                                {radio.name}
                            </ToggleButton>
                        ))}
                    </ToggleButtonGroup>
                </Form.Group>
                <Form.Group controlId="formBasicCardName">
                    <Form.Label>카드명</Form.Label>
                    <Form.Control type="text" placeholder="카드명을 입력하세요." value={cardName} onChange={(e) => setCardName(e.target.value)} />
                </Form.Group>
                {showDateInputs &&
                    <>
                        <Form.Group as={Col} controlId="formBasicStartDate">
                            <Form.Label>시작일</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="시작일을 입력하세요."
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formBasicEndDate">
                            <Form.Label>종료일</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="종료일을 입력하세요."
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicPaymentDate">
                            <Form.Label>결제일</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="결제일을 입력하세요."
                                value={paymentDate}
                                onChange={(event) => setPaymentDate(event.target.value)}
                            />
                        </Form.Group>
                    </>
                }
                <div className="d-flex justify-content-end mt-2">
                    <Button variant="primary" type="submit">
                        입력
                    </Button>
                </div>
            </Form>
        </div>
    );
}

export default MyCard