import React, { useState, useEffect } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios"

const PortfolioTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://shrirammockstock.onrender.com/api/result');
      const jsonData = await response.data;
      const sortedData = jsonData.sort((a, b) => b.Net_worth - a.Net_worth); // Sort data by Net worth in decreasing order
      setData(sortedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false); // Set loading to false after data fetching is completed
    }
  };

  return (
    <div className="container mt-5">
      {loading ? (
        <div className='mt-5'>Loading...</div>
      ) : (
        <div className='mt-5 table-responsive'>
          <h1>Portfolio Data</h1>
        <div className='table-responsive'>

          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>Email</th>
                <th>Balance</th>
                <th>Portfolio Value</th>
                <th>Net Worth</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{item.email}</td>
                  <td>{item.balance}</td>
                  <td>{item.portfolio_value}</td>
                  <td>{item.Net_worth}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </div>
      )}
    </div>
  );
};

export default PortfolioTable;
