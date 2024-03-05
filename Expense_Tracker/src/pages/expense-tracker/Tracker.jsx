import React, { useState } from 'react';
import useAddTransaction from '../../hooks/useAddTransaction';
import useGetTransactions from '../../hooks/useGetTransactions';
import useGetUserInfo from '../../hooks/useGetUserInfo';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from "../../config/firebase-config";
import useDeleteTransaction from '../../hooks/useDeleteTransaction';

const Tracker = () => {
  const { addTransaction } = useAddTransaction();
  const { transactions, transactionTotals, refetchTransactions } = useGetTransactions();
  const { profilePhoto, name } = useGetUserInfo();
  const { deleteTransaction } = useDeleteTransaction();

  const { balance, income, expenses } = transactionTotals;

  const [description, setDescription] = useState('');
  const [transactionAmount, setTransactionAmount] = useState(0);
  const [transactionType, setTransactionType] = useState('expense');

  const navigate = useNavigate();

  const signOutHandler = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      navigate("/");
    } catch (e) {
      console.error(e)
    }
  }

  const onSubmit = (e) => {
    e.preventDefault();
    addTransaction({ description, transactionAmount, transactionType });
    setDescription('');
    setTransactionAmount(0);
    setTransactionType('expense');
  };

  const handleDelete = async (id) => {
    try {
      await deleteTransaction(id);
      // Refetch transactions after deletion
      refetchTransactions();
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };

  let balanceText = "";
  let balanceColorClass = "";
  if (balance < 0) {
    balanceText = "Your Liability";
    balanceColorClass = "text-red-500";
  } else if (balance < 10) {
    balanceText = "Your Balance is low";
    balanceColorClass = "text-orange-500";
  } else {
    balanceText = "Your Balance";
    balanceColorClass = "text-green-500";
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-cyan-500 to-blue-500 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-lg">
        <h1 className="text-3xl font-semibold text-center text-blue-600 mb-8"><span className='uppercase'>{name}</span>'s Expense Tracker</h1>

        <div className="flex flex-col items-center mb-6">
          <div className="w-20 h-20 overflow-hidden rounded-full mb-4 transition-transform duration-300 transform hover:scale-125">
            {profilePhoto && (
              <img src={profilePhoto} alt="Profile" className="object-cover w-full h-full" />
            )}
          </div>
          <div className="flex flex-col items-center">
            <p className={`text-xl font-semibold ${balanceColorClass}`}>{balanceText}</p>
            <p className={`text-3xl ${balanceColorClass}`}>${Math.abs(balance)}</p>
          </div>
        </div>

        <div className="mb-6">
          <button onClick={signOutHandler} className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-md w-full">Sign Out</button>
        </div>

        <div className="mb-6">
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Income</h2>
            <p>${income}</p>
          </div>
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Expenses</h2>
            <p>${expenses}</p>
          </div>
        </div>

        <form className="mb-6" onSubmit={onSubmit}>
          <input
            className="border p-3 m-2 rounded-md w-full"
            type="text"
            placeholder="Description"
            value={description}
            required
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            className="border p-3 m-2 rounded-md w-full"
            type="number"
            placeholder="Amount"
            value={transactionAmount}
            required
            onChange={(e) => setTransactionAmount(e.target.value)}
          />
          <div className="flex items-center mb-4">
            <label className="mr-6">
              <input
                type="radio"
                value="expense"
                checked={transactionType === 'expense'}
                onChange={(e) => setTransactionType(e.target.value)}
              />
              Expense
            </label>
            <label>
              <input
                type="radio"
                value="income"
                checked={transactionType === 'income'}
                onChange={(e) => setTransactionType(e.target.value)}
              />
              Income
            </label>
          </div>
          <button className="border p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 w-full">
            Add Transaction
          </button>
        </form>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Transactions</h2>
          <ul>
            {transactions.map((transaction, index) => (
              <li key={index} className="mb-4 border-b pb-4">
                <h3 className="text-xl font-semibold">{transaction.description}</h3>
                <p className={`text-lg ${transaction.transactionType === 'expense' ? 'text-red-500' : 'text-green-500'}`}>
                  ${transaction.transactionAmount} - {transaction.transactionType}
                </p>
                <button
                  onClick={() => handleDelete(transaction.id)}
                  className="border p-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Tracker;
