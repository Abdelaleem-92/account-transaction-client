import React, { useState, useEffect } from 'react'
import { format } from 'date-fns'
import AddAccountComponent from './AddAccountComponent';

const UsersComponent = ({ users, title, reloadUsers }) => {

    const [selectedUser, setSelectedUser] = useState("");
    const [showAddAccount, setShowAddAccount] = useState(false);

    const handleShowAddAccount = () => {
        setShowAddAccount(!showAddAccount);
    }

    const handleSelectedUser = (e, user) => {
        console.log('handleSelectedUser' + user)
        setSelectedUser(user);
        localStorage.setItem("username", user.username);
    }

    const showUsersDetails = () => {
        if (selectedUser) {
            return (
                <div >
                    <div className="formGroup">
                        <button className="formButton" onClick={handleShowAddAccount} type="button">
                            add account
            </button>
                    </div>
                    <h4>Customer Details</h4>
                    <label className="custom-label mt-1 userColumn" >
                        customer id: {selectedUser.id}  </label>

                    <label className="custom-label mt-1 userColumn"  >
                        name: {selectedUser.name}  </label>

                    <label className="custom-label mt-1 userColumn" >
                        total balance: {selectedUser.totalBalance}  </label>

                    {
                        selectedUser.userAccounts.length > 0 ?
                            selectedUser.userAccounts
                                .sort((a, b) => a.id > b.id ? 1 : -1)
                                .map(account => {
                                    return (
                                        <div key={account.id}>
                                            <h4>account id  {account.id} </h4>

                                            <label className="custom-label mt-1 userColumn" >
                                                account created Date: {format(new Date(account.createdDate), 'dd/MM/yyyy HH:mm')}
                                            </label>
                                            <label className="custom-label mt-1 userColumn" >
                                                account balance: {account.balance}  </label>
                                            <br /> <br />
                                            <h6>Account Transactions</h6>
                                            {
                                                account.accountTransactions.map(transaction => {
                                                    return (
                                                        <div key={transaction.id}>
                                                            <label className="custom-label mt-1 userColumn" >
                                                                transaction type: {transaction.transactionType}  </label>
                                                            <label className="custom-label mt-1 userColumn" >
                                                                transaction amount: {transaction.transactionAmount}  </label>
                                                            <label className="custom-label mt-1 userColumn" >
                                                                transaction time: {format(new Date(transaction.transactionDatetime), 'dd/MM/yyyy HH:mm')} </label>
                                                        </div>
                                                    )
                                                }

                                                )
                                            }
                                            <br /> <br />

                                        </div>


                                    )
                                })
                            : <h4>No Accounts. </h4>
                    }

                    <AddAccountComponent show={showAddAccount} handleClose={handleShowAddAccount} selectUser={selectedUser}
                        reloadUsers={reloadUsers} setSelectedUser={setSelectedUser} />
                </div>
            )
        }

    }

    return (
        <div className="mainContainer">
            <h1>{title}</h1>
            <div className="usersContainer">
                <div className="usersList">

                    {
                        users.map(user => {
                            return (
                                <div key={user.id}>
                                    <input
                                        type='radio'
                                        name='users'
                                        value={user.id}
                                        checked={selectedUser.id === user.id}
                                        id={user.id}
                                        onChange={
                                            (event) => handleSelectedUser(event, user)
                                        }
                                    />
                                    <label htmlFor={user.id} >{user.id}  {user.username}</label>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="userDetails">
                    {
                        showUsersDetails()
                    }
                </div>
            </div>




        </div>
    )
}

export default UsersComponent
