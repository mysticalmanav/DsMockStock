import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getStocks,buyStock, sellStock } from '../../actions/stocks';
import {  useNavigate } from "react-router-dom";
import { setAlert } from '../../actions/alert';
import { getPortfolio } from '../../actions/userprofile';
import Spinner from '../layout/Spinner';
 

const StockList = ({ auth:{isAuthenticated},userprofile:{portfolio},stocks: { stocks, loading }, getStocks ,buyStock,sellStock,getPortfolio}) => {
  useEffect(() => {
    getStocks();
   getPortfolio();
  }, []);
  const navigate = useNavigate();
  
  const [selectedStock, setSelectedStock] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(0);
  const [transactionType, setTransactionType] = useState('buy');

  const handleStockSelect = (stock) => {
    setSelectedStock(stock);
    setSelectedQuantity(0);
  };

  const handleQuantityChange = (event) => {
    setSelectedQuantity(parseInt(event.target.value));
  };

  const handleTransactionTypeChange = (event) => {
    setTransactionType(event.target.value);
    setSelectedQuantity(0);
  };

  const calculateTransactionPrice = () => {
    const selectedStockPrice = selectedStock ? selectedStock.price : 0;
    const totalPrice = selectedStockPrice * selectedQuantity;
    return totalPrice;
  };
  const sendbuyStock = async  ()=>{
    if(!isAuthenticated){ 
        navigate('/');
    }
    let balance = portfolio.DmStockuser.balance;
    balance = balance - calculateTransactionPrice();
    const amount  = selectedQuantity;
     
    const stock = selectedStock;
    await buyStock({stock,balance,amount}); 
    setSelectedQuantity('');
     
  }
  const sendsellStock =async ()=>{
    let balance ;
    if(!isAuthenticated){
      navigate('/');
  }
   if(portfolio!=null)  balance = portfolio.DmStockuser.balance;


    console.log('function called');
   
    balance = parseInt(balance )+ calculateTransactionPrice();
    const amount  = selectedQuantity;
     
    const stock = selectedStock;
    const currentstock = portfolio.currentstock;
    await sellStock({stock,currentstock,balance,amount}); 
    setSelectedQuantity('');
     
     
  }

  const calculatePriceChange = (stck) => {
    if (stck && stck.past ) {
      const past = stck.past;
      const latestPrice = stck.price;
      if(past.length>1){
        const oldestPrice = past[1].price;
        const priceChange = latestPrice - oldestPrice;
        return priceChange;
      }
      return 'No Change in Price Still.';
    }
    return 'No Change in Price Still.';

  };

  return loading || stocks === null ? (
    <Spinner/>
  ) : (
    <div className='stocks-bg  py-3 p-1'>
    <div className="mb-2 container Data_frosty__3tA4J rounded p-1 mt-2" id= 'selcted'>
       {selectedStock && (
        <div className="transaction-section" >
          <h3>Selected Stock: {selectedStock.name}</h3>
          <p>Price: ${selectedStock.price}</p>
          <p>Price Change: ${calculatePriceChange(selectedStock) }</p>
          <div className="form-group">
            <label htmlFor="transactionType">Select Transaction Type:</label>
            <select
              className="form-control"
              id="transactionType"
              value={transactionType}
              onChange={handleTransactionTypeChange}
            >
              <option value="buy">Buy</option>
              <option value="sell">Sell</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="quantity">Select Quantity:</label>
            <input
              type="number"
              className="form-control"
              id="quantity"
              value={selectedQuantity}
              onChange={handleQuantityChange}
              min={0}
              max={selectedStock.quantity}
            />
          </div>
          <p>Total Price: ${calculateTransactionPrice()}</p>
          <button className="btn btn-success" onClick={transactionType === 'buy' ? ()=>{sendbuyStock()} : ()=>{sendsellStock()} }> 
            {transactionType === 'buy' ? 'Buy' : 'Sell'}
          </button>
        </div>
      )}
      <h2 className="text-center text-bold my-2">Stock List</h2>
      <hr></hr>
      <p className="text-center text-primary"> Select a Stock and Start Transaction</p>
      
      <ul className="list-group">
        {stocks.map((stock) => (
          <li key={stock._id} className="list-group-item bg-transparent">
            <h4>{stock.name}</h4>
            <p>Price: ${stock.price}</p>
            <p>Price Change: ${calculatePriceChange(stock) }</p>
           <a href='#top'> <button
              className="btn btn-outline-primary"
              onClick={() => handleStockSelect(stock)}
              
            >
              Select Stock
            </button></a>
          </li>
        ))}
      </ul>
     
    </div></div>
  );
};

StockList.propTypes = {
  stocks: PropTypes.object.isRequired,
  getStocks: PropTypes.func.isRequired,
  buyStock:PropTypes.func.isRequired,
  auth:PropTypes.object.isRequired,
  userprofile:PropTypes.object.isRequired,
  sellStock:PropTypes.func.isRequired,
  getPortfolio:PropTypes.func.isRequired
  
  
};

const mapStateToProps = (state) => ({
  stocks: state.stocks,
  auth :state.auth,
  userprofile:state.userprofile
});

export default connect(mapStateToProps, { getStocks,buyStock,sellStock,getPortfolio })(StockList);
