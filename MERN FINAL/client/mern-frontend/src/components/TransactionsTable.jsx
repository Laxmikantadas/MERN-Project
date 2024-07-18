import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TransactionsTable.css'; // Create this file and add custom styles if needed
// import Api from "./Api"

const TransactionsTable = ({ selectedMonth }) => {
    const [transactions, setTransactions] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                // console.log("hii")
                const response = await axios.get('http://localhost:5000/api/transactions'
                    , {
                    params: { month: selectedMonth, page, search }
                });
                setTransactions(response.data.transactions);
                setTotalPages(response.data.totalPages);
            } catch (error) {
                console.error(error);
            }
        };

        fetchTransactions();
    }, [selectedMonth, page, search]);

    // const handleSearchChange = (e) => {
    //     setSearch(e.target.value);
    //     console.log(e.target.value)
    //     setPage(1); // Reset to the first page when search changes
    // };

    const handlePreviousPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    const handleNextPage = () => {
        if (page < totalPages) {
            setPage(page + 1);
        }
    };

    return (
        <div>
            
            <table className="transactions-table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Date of Sale</th>
                        <th>Category</th>
                        <th>Sold</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction) => (
                        <tr key={transaction._id}>
                            <td>{transaction.title}</td>
                            <td>{transaction.description}</td>
                            <td>{transaction.price}</td>
                            <td>{new Date(transaction.dateOfSale).toLocaleDateString()}</td>
                            <td>{transaction.category}</td>
                            <td>{transaction.sold ? 'Yes' : 'No'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="pagination">
                <button onClick={handlePreviousPage} disabled={page === 1}>
                    Previous
                </button>
                <button onClick={handleNextPage} disabled={page === totalPages}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default TransactionsTable;
