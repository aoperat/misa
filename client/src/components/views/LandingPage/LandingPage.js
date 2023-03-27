import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './Dashboard.css';

function LandingPage() {

  const navigate = useNavigate();

  const config = {
    showProfileCard: true,
    showRecentTransactionsCard: true,
    showCalendarCard: true,
  };

  
  const onClickHandler = () => {
    axios.get('/api/users/logout')
      .then(response => {
        if (response.data.success) {
          navigate('/login')
        } else {
          alert('로그아웃 실패')
        }
      })
  }

  return (
    <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      width: '100%',
      height: '100vh',
    }}
  >
      <div className="dashboard-container">

        {config.showProfileCard && <ProfileCard className="card profile-card" />}
        {config.showRecentTransactionsCard && (
          <RecentTransactionsCard className="card recent-transactions-card" />
        )}
        {config.showCalendarCard && <CalendarCard className="card calendar-card" />}

        {/* ... */}
      </div>

    </div>
  )
}

export default LandingPage

function ProfileCard({ className }) {
  return (
    <div className={className}>
      <h3>Profile</h3>
      <p>Name: John Doe</p>
      <p>Email: john.doe@example.com</p>
    </div>
  );
}


function RecentTransactionsCard({ className }) {
  const transactions = [
    { date: '2023-03-18', description: 'Groceries', amount: -50 },
    { date: '2023-03-17', description: 'Salary', amount: 1000 },
    { date: '2023-03-15', description: 'Utilities', amount: -75 },
  ];

  return (
    <div className={className}>
      <h3>Recent Transactions</h3>
      <ul>
        {transactions.map((transaction, index) => (
          <li key={index}>
            {transaction.date} - {transaction.description}: ${transaction.amount}
          </li>
        ))}
      </ul>
    </div>
  );
}

function CalendarCard({ className }) {
  return (
    <div className={className}>
      <h3>Calendar</h3>
      <p>Upcoming events will be displayed here.</p>
    </div>
  );
}
