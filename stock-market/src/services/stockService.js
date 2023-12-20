// services/stockService.js
const API_KEY = 'pk_567452d72552488fb303423ae6581307';
const BASE_URL = 'https://api.iex.cloud/v1';

const fetchAllStocksData = async () => {
  try {
    const response = await fetch(`${BASE_URL}/stock/market/list/mostactive?token=${API_KEY}`);
    if (!response.ok) {
      throw new Error('Failed to fetch stock data');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching stock data:', error);
    throw error;
  }
};

export default fetchAllStocksData;
