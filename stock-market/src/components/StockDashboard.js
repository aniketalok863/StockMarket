// components/StockDashboard.js
import React, { useEffect, useState } from 'react';
import StockList from './StockList';
import fetchAllStocksData from '../services/stockService';

const StockDashboard = () => {
  const [stockData, setStockData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAllStocksData();
        console.log('Received data:', data); 
        setStockData(data);
      } catch (error) {
        console.error('Error fetching stock data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Stock Dashboard</h2>
      <StockList data={stockData} />
      {/* Add other stock dashboard components here */}
    </div>
  );
};

export default StockDashboard;
