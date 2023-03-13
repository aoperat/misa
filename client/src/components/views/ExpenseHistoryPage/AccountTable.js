import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Table, Button, Row } from 'react-bootstrap';
import { retrieveAccountList, updateAccount, deleteAccount } from '../../../_actions/account_action';
import { FaEdit, FaTrash, FaSave, FaUndo } from 'react-icons/fa';


function AccountTable(props) {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const { accounts, setAccounts } = props; // 필요한 props를 비구조화 할당하여 가져옵니다.
  
    useEffect(() => {
      if (user.userData) { // user.userData가 존재하는 경우에만 실행
        let body = { userId: user.userData._id };
        dispatch(retrieveAccountList(body)).then(response => {
          if (response.payload.success) {
            setAccounts(response.payload.accounts);
          } else {
            alert('Error');
          }
        });
      }
    }, [dispatch, user.userData, setAccounts]);
  
  
    const handleAccountsEdit = (index) => {
      setAccounts((prevState) =>
        prevState.map((accounts, idx) =>
          idx === index ? { ...accounts, isEditing: true } : accounts
        )
      );
    };
  
    // Input 값 변경 시 호출되는 함수
    const handleAccountsInputChange = (event, index, field) => {
      const { value } = event.target;
  
      setAccounts((prevState) =>
        prevState.map((account, idx) =>
          idx === index ? { ...account, [field]: value } : account
        )
      );
    };
  
    // 수정 버튼 클릭 시 호출되는 함수
  const handleAccountsUpdate = (index) => {
    const updatedAccount = accounts[index];
    
    // 서버로 수정된 내역을 전송하여 데이터베이스에서 업데이트
    dispatch(updateAccount(updatedAccount)).then((response) => {
      if (response.payload.success) {
        setAccounts((prevState) =>
          prevState.map((account, idx) =>
            idx === index ? { ...account, isEditing: false } : account
          )
        );
      } else {
        alert("Error");
      }
    });
  };
  
  
    // 삭제 버튼 클릭 시 호출되는 함수
    const handleAccountsDelete = (accountToDelete) => {
      if (window.confirm('정말 삭제하시겠습니까?')) {
        dispatch(deleteAccount({ accountId: accountToDelete._id }))
          .then((response) => {
            if (response.payload.success) {
              setAccounts((prevState) =>
                prevState.filter((account) => account._id !== accountToDelete._id)
              );
            } else {
              alert('Error');
            }
          });
      }
    };
    
  
    // 취소 버튼 클릭 시 호출되는 함수
    const handleAccountsCancel = (index) => {
      setAccounts((prevState) =>
        prevState.map((account, idx) =>
          idx === index ? { ...account, isEditing: false } : account
        )
      );
    };
  
    return (
      <div className="card p-3" style={{ backgroundColor: "#f8f9fa" }}>
        <h2>지출내역</h2>
        <Row>
  
          <Table striped bordered hover size="sm" className='table'>
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
              {accounts.map((account, index) => (
                <tr key={account._id}>
                  <td>{account.date}</td>
                  <td>
                    {account.isEditing ? (
                      <Form.Control
                        type="text"
                        defaultValue={account.description}
                        onChange={(event) =>
                          handleAccountsInputChange(event, index, "description")
                        }
                      />
                    ) : (
                      <span>{account.description}</span>
                    )}
                  </td>
                  <td>
                    {account.isEditing ? (
                      <Form.Control
                        type="text"
                        defaultValue={account.amount}
                        onChange={(event) =>
                          handleAccountsInputChange(event, index, "amount")
                        }
                      />
                    ) : (
                      <span>{account.amount}</span>
                    )}
                  </td>
                  <td>{account.category}</td>
                  <td>{account.paymentMethod}</td>
                  <td>
                    <div className="d-flex">
                      {account.isEditing ? (
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => handleAccountsUpdate(index)}
                        >
                          <FaSave />
                        </Button>
                      ) : (
                        <>
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => handleAccountsEdit(index)}
                          >
                            <FaEdit />
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleAccountsDelete(account)}
                          >
                            <FaTrash />
                          </Button>
                        </>
                      )}
                      {account.isEditing && (
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => handleAccountsCancel(index)}
                        >
                          <FaUndo />
                        </Button>
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

export default AccountTable