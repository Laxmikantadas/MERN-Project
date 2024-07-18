import React, { useState } from 'react';
import './App.css';
import TransactionsTable from './components/TransactionsTable';
import Statistics from './components/Statistics';
import PriceBarChart from './components/BarChart';
// import CategoryPieChart from './components/PieChart';

const App = () => {
    const [selectedMonth, setSelectedMonth] = useState(3); // Default to March

    const handleMonthChange = (e) => {
        setSelectedMonth(parseInt(e.target.value));
    };

    return (
        <div className="container">
            <h1>PRODUCT  TRANSACTION</h1>
            <div className="select-month">
                <label>Select Month: </label>
                <select value={selectedMonth} onChange={handleMonthChange}>
                    {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                        <option key={month} value={month}>
                            {new Date(2021, month - 1).toLocaleString('default', { month: 'long' })}
                        </option>
                    ))}
                </select>
            </div>
            <TransactionsTable selectedMonth={selectedMonth} />
            <Statistics selectedMonth={selectedMonth} />
            <h2>Price Range Bar Chart</h2>
            <div className="chart-container">
                <PriceBarChart selectedMonth={selectedMonth} />
            </div>
            {/* <h2>Category Pie Chart</h2> */}
            {/* <div className="chart-container">
                <CategoryPieChart selectedMonth={selectedMonth} />
            </div> */}
        </div>
    );
};

export default App;

