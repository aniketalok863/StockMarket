// components/StockList.js
import React from 'react';

const StockList = ({ data }) => {
  return (
    <div>
      <h2>Stock List</h2>
      <ul>
        {data.map((stock) => (
          <li key={stock.symbol}>
            <strong>{stock.companyName}</strong> - Symbol: {stock.symbol}, Latest Price: {stock.latestPrice}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StockList;
