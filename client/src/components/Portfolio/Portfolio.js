import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getPortfolio } from '../../actions/userprofile';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Moment from 'react-moment';
import { getStocks } from '../../actions/stocks';
import Spinner from '../layout/Spinner';

const UserProfile = ({ getPortfolio, userprofile, getStocks, stocks }) => {
  const navigate = useNavigate();

  useEffect(() => {
    getPortfolio();
    getStocks();

  }, []);

  const calculateProfit = (currentPrice, purchasedPrice, quantity) => {
    return (currentPrice - purchasedPrice) * quantity;
  };

  const getCurrentPrice = (id) => {
    if (stocks !== null) {
      const stock = stocks.find(stock => stock._id === id);
      return stock ? stock.price : 0;
    }
    return 0; 
  }

  const { loading, portfolio } = userprofile;

  return (loading || portfolio === null) ? (
   <Spinner/>
  ) : (
    <div className='portfolio-bg py-3 p-1'>
      <div className="container mt-0 pt-3 text-light font-heavy Data_frosty__3tA4I rounded">

        <div className="mb-4">
          <h1 className='text-dark  mx-3 rounded text-center'>Portfolio</h1>
          <hr/>
          <p className='text-center'>Welcome to your stock market portfolio! Here, you can keep track of your stock holdings and monitor their performance over time.</p>
          <h4>Email: {portfolio.DmStockuser.email}</h4>
          <h3>Cash Balance: ${portfolio.DmStockuser.balance}</h3>
        </div>
         To Start a Transaction click on the button below.

        <div className="mb-4">
          <button
            className="btn btn-md btn-outline-primary my-2"
            onClick={() => navigate('/stocks')}
          >
            Buy and Sell Stocks
          </button>
          <button
            className="btn btn-md btn-outline-primary my-2"
            onClick={() => navigate('/stocks')}
          >
           Check Past Transaction
          </button>
  <p>Below is a list of stocks you currently own:</p>

          <h1 className='text-center text-dark border-bottom mt-3 mb-1'>Assets</h1>
          <div className="table-responsive rounded">
            <table className="table table-striped text-center rounded">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Current Price</th>
                  <th>Purchased Price</th>
                  <th>Quantity</th>
                  <th>Purchase Date & Time</th> 
                  <th>Profit</th>
                </tr>
              </thead>
              <tbody>
                {portfolio.currentstock.length >0&&portfolio.currentstock.filter(x => x==null).length!==portfolio.currentstock.length? portfolio.currentstock.map((stock) => (
                    stock!=null&&<tr key={stock._id}>
                    <td>{stock.name}</td>
                    <td>${getCurrentPrice(stock.stockid)}</td>
                    <td>${stock.price} </td>
                    <td>{stock.amount}</td>
                    <td><Moment format='MMMM Do YYYY, h:mm:ss a'>{stock.date}</Moment></td>
                    <td>{calculateProfit(getCurrentPrice(stock.stockid), stock.price, stock.amount)>0?<p className='text-success'>${calculateProfit(getCurrentPrice(stock.stockid), stock.price, stock.amount)}</p>:<p className='text-danger'>${calculateProfit(getCurrentPrice(stock.stockid), stock.price, stock.amount)}</p>}</td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="6">No data, Please start trading by clicking on buy or sell stocks.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

UserProfile.propTypes = {
  getPortfolio: PropTypes.func.isRequired,
  userprofile: PropTypes.object.isRequired,
  getStocks: PropTypes.func.isRequired,
  stocks: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
  userprofile: state.userprofile,
  stocks: state.stocks.stocks
});

export default connect(mapStateToProps, { getPortfolio, getStocks })(UserProfile);
