// components/StockDashboard.js
import 'chartjs-adapter-date-fns';
import React, { useEffect, useState, useRef } from 'react';
import StockList from './StockList';
import fetchAllStocksData from '../services/stockService';
import Chart from 'chart.js/auto';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const StockDashboard = () => {
  const [stockData, setStockData] = useState([]);
  const [filteredStocks, setFilteredStocks] = useState([]);
  const [selectedStock, setSelectedStock] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc'); // Initial sorting order
  const chartRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAllStocksData();
        console.log('Received data:', data);
        setStockData(data);
        setFilteredStocks(data);
      } catch (error) {
        console.error('Error fetching stock data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Filter stocks based on the search term
    const filteredStocks = stockData
      .filter((stock) =>
        stock.symbol.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => {
        // Sort stocks based on the selected order (asc or desc)
        const comparison = a.symbol.localeCompare(b.symbol);
        return sortOrder === 'asc' ? comparison : -comparison;
      });

    setFilteredStocks(filteredStocks);
  }, [searchTerm, stockData, sortOrder]);

  useEffect(() => {
    const canvas = document.getElementById('stockChart');

    // Destroy existing chart if it exists
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    if (selectedStock && selectedStock.history) {
      const ctx = canvas.getContext('2d');
      const newChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: selectedStock.history.map((entry) => entry.date),
          datasets: [
            {
              label: `Daily Change for ${selectedStock.symbol}`,
              data: selectedStock.history.map((entry) => entry.change),
              backgroundColor: selectedStock.history.map((entry) =>
                entry.change >= 0 ? 'green' : 'red'
              ),
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
      const response = await fetch(
        `https://api.iex.cloud/v1/stock/${stock.symbol}/chart/7d?token=pk_567452d72552488fb303423ae6581307`
      );
      const historyData = await response.json();

      // Ensure that the response contains an array of historical data
      if (Array.isArray(historyData)) {
        // Update the stock object with the fetched historical data
        const stockWithHistory = {
          ...stock,
          history: historyData.map((entry) => ({
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

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  const handleSortChange = () => {
    // Toggle between 'asc' and 'desc' order
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-4">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search stocks"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={handleClearSearch}
            >
              Clear
            </button>
          </div>
          <div className="mb-3">
            <button
              className="btn btn-primary"
              type="button"
              onClick={handleSortChange}
            >
              Sort {sortOrder === 'asc' ? 'A-Z' : 'Z-A'}
            </button>
          </div>
          <StockList data={filteredStocks} onStockClick={handleStockClick} />
        </div>
        <div className="col-md-8">
          {selectedStock ? (
            <div>
              <canvas id="stockChart" width="400" height="300"></canvas>
            </div>
          ) : (
            <p style={{ textAlign: 'center' }}>
              Please select a stock to view the chart.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StockDashboard;
