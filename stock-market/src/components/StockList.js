// components/StockList.js
import React from 'react';

const StockList = ({ data, onStockClick }) => {
  console.log('Received data in StockList:', data);

  return (
    <div>
    <h1>Stocks</h1>
    <ul className="list-group">
      {Array.isArray(data) &&
        data.map((stock) => (
          <li
            key={stock.symbol}
            className="list-group-item"
            onClick={() => onStockClick(stock)}
          >
            {stock.symbol} - {stock.companyName}
          </li>
        ))}
    </ul>
    </div>
  );
};

export default StockList;
