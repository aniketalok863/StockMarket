// components/StockDashboard.js
import 'chartjs-adapter-date-fns';
import React, { useEffect, useState, useRef } from 'react';
import StockList from './StockList';
import fetchAllStocksData from '../services/stockService';
import Chart from 'chart.js/auto';

const StockDashboard = () => {
  const [stockData, setStockData] = useState([]);
  const [selectedStock, setSelectedStock] = useState(null);
  const chartRef = useRef(null);

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

  useEffect(() => {
    const canvas = document.getElementById('stockChart');
  
    // Destroy existing chart if it exists
    if (chartRef.current) {
      chartRef.current.destroy();
    }
  
    if (selectedStock && selectedStock.history) {
      console.log('History Data:', selectedStock.history);
      const ctx = canvas.getContext('2d');
      const newChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: selectedStock.history.map((entry) => entry.date),
          datasets: [
            {
              label: `Daily Change for ${selectedStock.symbol}`,
              data: selectedStock.history.map((entry) => entry.change),
              backgroundColor: selectedStock.history.map((entry) => (entry.change >= 0 ? 'green' : 'red')),
            },
          ],
        },
        options: {
          scales: {
            x: {
              type: 'time',
              time: {
                unit: 'day',
              },
            },
            y: {
              title: {
                display: true,
                text: 'Change',
              },
            },
          },
        },
      });
      // Save the new chart instance in the ref
      chartRef.current = newChart;
    }
  }, [selectedStock]);
  
  const handleStockClick = async (stock) => {
    try {
      // Fetch historical data for the selected stock for the last seven days
      const response = await fetch(`https://api.iex.cloud/v1/stock/${stock.symbol}/chart/7d?token=pk_567452d72552488fb303423ae6581307`);
      const historyData = await response.json();
    
      // Ensure that the response contains an array of historical data
      if (Array.isArray(historyData)) {
        // Update the stock object with the fetched historical data
        const stockWithHistory = {
          ...stock,
          history: historyData.map(entry => ({
            date: entry.date,
            change: entry.change, // Assuming your API response has a 'change' property
          })),
        };
    
        // Update the state with the stock containing historical data
        setSelectedStock(stockWithHistory);
      } else {
        console.error('Invalid historical data format:', historyData);
      }
    } catch (error) {
      console.error('Error fetching historical data:', error);
    }
  };
  

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <StockList data={stockData} onStockClick={handleStockClick} />
        </div>
        <div className="col-md-6">
          {selectedStock ? (
            <div>
              <canvas id="stockChart" width="400" height="300"></canvas>
            </div>
          ) : (
            <p text-align='center'>Please select a stock to view the chart.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StockDashboard;
