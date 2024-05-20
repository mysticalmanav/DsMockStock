import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getStocks,buyStock, sellStock ,shortStock} from '../../actions/stocks';
import {  useNavigate } from "react-router-dom";
import { setAlert } from '../../actions/alert';
import { getPortfolio } from '../../actions/userprofile';
import Spinner from '../layout/Spinner';
import encrypt from '../bgimg/encrypt.jpg'
import { LineChart } from '@mui/x-charts/LineChart';

const StockList = ({ auth:{isAuthenticated},userprofile:{portfolio},stocks: { stocks, loading }, getStocks ,buyStock,sellStock,getPortfolio,shortStock}) => {
  const [selectedStock, setSelectedStock] = useState(null);
 
  useEffect(() => {
    
    getStocks();
   getPortfolio();
   if(localStorage.stockid&&stocks.length>0){
    window.scrollTo(0, 0);
    const sto = stocks.find((stock)=>stock&& stock._id===localStorage.stockid);
     setSelectedStock(sto); 
     localStorage.removeItem('stockid');
  }

  }, []);
  const navigate = useNavigate();
  
  const [selectedQuantity, setSelectedQuantity] = useState(0);
  const [transactionType, setTransactionType] = useState('buy');
  const [isClicked, setisClicked] = useState(false);
  
  const handleStockSelect = (stock) => {
    setSelectedStock(stock);
    setSelectedQuantity(0);
  };

  const handleQuantityChange = (event) => {
    setSelectedQuantity(parseInt(event.target.value));
  };
  const calculateProfit = (currentPrice, purchasedPrice, quantity) => {
    return (currentPrice - purchasedPrice) * quantity;
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
     setisClicked(true);
    
    
   
    if(!isAuthenticated){ 
        navigate('/');
    }
    let balance = portfolio.DmStockuser.balance;
    balance = balance - calculateTransactionPrice();
    const amount  = selectedQuantity;
     
    const stock = selectedStock;
     await buyStock({stock,balance,amount}); 
    setSelectedQuantity(0); 
     setisClicked(false);

     
  }
  const findCurrentHolds = ( stock)=>{
    if(!isAuthenticated){
      return "You have to login to see your holdings."
  }
  

    if(!portfolio)  getPortfolio(); 
    let total = 0;
     
    if(portfolio!=null){ portfolio.currentstock.map((st)=>{
          if(st!=null&&stock&&st.stockid===stock._id&&(!st.short)){
            total += parseInt(st.amount);
          }
    }); }
    return total;
   }
  const sendsellStock =async ()=>{
    setisClicked(true);
    let balance;
    if(!isAuthenticated){
      navigate('/');
  }
  
   if(portfolio!=null)  balance = portfolio.DmStockuser.balance;
 
   
    balance = parseInt(balance )+ calculateTransactionPrice();
    const amount  = selectedQuantity;
    const stock = selectedStock;
    const currentstock = portfolio.currentstock;
    await sellStock({stock,currentstock,balance,amount}); 
    setSelectedQuantity(0);
     
    setisClicked(false);
  }
  const reverseData = (data) => {
    const reversedData = data.slice().reverse();
    const prices = reversedData.map((ele) => ele.price);
     
    return prices;
  };
  const shortsStock =async ()=>{
    setisClicked(true);
    let balance;
    if(!isAuthenticated){
      navigate('/');
  }
  
  
   if(portfolio!=null)  balance = portfolio.DmStockuser.balance;
 
   
   balance = parseInt(balance )+ calculateTransactionPrice();
    const amount  = selectedQuantity;
     
    const stock = selectedStock;
    
    await shortStock({stock,balance,amount}); 
    setSelectedQuantity(0);
     
    setisClicked(false);
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
    
    <div className='py-3 p-1 text-heavy mt-5'>
    <div className="mb-2 container rounded p-1 mt-2" id= 'selcted'>
      <form>
      {selectedStock && (
  <div className="transaction-section">
    <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
      <div className="col p-4 d-flex flex-column position-static">
        <span className="email-label my-0">Selected Stock:</span>
        <h3>{selectedStock.name}</h3>
        <div className="mb-1 email-label">Currently Held:</div>
        <h5>{findCurrentHolds(selectedStock)}</h5>

        <p className="email-label my-0">Price Change:</p>
        <p className="card-text mb-auto">
          {calculatePriceChange(selectedStock) >= 0 ? (
            <p className="text-success">₹ {calculatePriceChange(selectedStock)}</p>
          ) : (
            <p className="text-danger">₹ {calculatePriceChange(selectedStock)}</p>
          )}
        </p>

        <p className="email-label my-0">Price:</p>
        <h2>₹ {selectedStock.price}</h2>

        <div className="radio-container">
          <div className="form-check form-check-inline">
            <input
              type="radio"
              className="form-check-input"
              name="transactionType"
              id="buyRadio"
              value="buy"
              checked={transactionType === 'buy'}
              onChange={handleTransactionTypeChange}
            />
            <label className="form-check-label" htmlFor="buyRadio">Buy</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              type="radio"
              className="form-check-input"
              name="transactionType"
              id="shortRadio"
              value="short"
              checked={transactionType === 'short'}
              onChange={handleTransactionTypeChange}
            />
            <label className="form-check-label" htmlFor="shortRadio">Short Sell</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              type="radio"
              className="form-check-input"
              name="transactionType"
              id="sellRadio"
              value="sell"
              checked={transactionType === 'sell'}
              onChange={handleTransactionTypeChange}
            />
            <label className="form-check-label" htmlFor="sellRadio">Sell</label>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="quantity" className="email-label mt-1">Select Quantity:</label>
          <input
            type="number"
            className="form-control w-25"
            id="quantity"
            value={selectedQuantity}
            onChange={handleQuantityChange}
            min={0}
            max={selectedStock.quantity}
            required
          />
        </div>

        <h5 className="my-2">Transaction Amount: ₹ {calculateTransactionPrice()}</h5>

        {isClicked === false ? (
          <button 
            type="submit"
            className="btn btn-success"

            onClick={
              transactionType === 'buy' ? sendbuyStock :
              transactionType === 'sell' ? sendsellStock : shortsStock
            }
          >
            {transactionType === 'buy' ? 'Buy' : 'Sell'}
          </button>
        ) : (
          <button className="btn btn-success" type="button" disabled>
            <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
            <span className="sr-only">Loading...</span>
          </button>
        )}
      </div>

      <div className="text-center card-img-right d-none d-md-block email-label mx-auto" style={{ width: "50%",alignSelf:"center" }}>
      <LineChart
   
  series={[
    {
      data: reverseData(selectedStock.past),
      color: '#7771ed',label:"₹"
    },
  ]}
  xAxis={[{   data: selectedStock.past.map((ele,index) => index+1),lable:"Round" }]}
  leftAxis={null}
  bottomAxis={null}

  
  height={300}
/>
       
      </div>
    </div>
    <hr />
  </div>
)}

       </form>
      <h2 className="text-center text-bold my-2">Available Stocks</h2>
      <hr></hr>
      <p className="color-nav font-heavy"> Select a Stock and Start Transaction</p>
      
      <div class="row mb-2">
        {stocks.map((stock) => (
          
            <div class="col-md-6">
      <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
        <div class="col p-4 d-flex flex-column position-static">
          
          <h3 >{stock.name}</h3>
          <div class="mb-1 text-muted">Currently Held: {findCurrentHolds(stock)}</div>
          <p className='email-label my-0'>Price Change:</p>

          <p class="card-text mb-auto"> {calculatePriceChange(stock)>=0? <p className='text-success'>₹ {calculatePriceChange(stock)}</p>:<p className='text-danger'>₹ {calculatePriceChange(stock)}</p>}</p>
          <p className='email-label my-0'>Price:</p>
          <h2>₹ {stock.price}</h2>
          <a href='#top'> <button
              className="btn btn-outline-primary"
              onClick={() => handleStockSelect(stock)}
              
            >
              Select
            </button></a>

        </div>
         <div class="col-auto d-none d-lg-block w-50">
         <LineChart
   
   series={[
     {
       data: reverseData(stock.past),
       color: '#7771ed',label:"₹"
     },
   ]}
   leftAxis={null}
   bottomAxis={null}
 
   
   height={300}
 />
          </div>
      </div>
      
    </div>
          
        ))}
      </div>
     
    </div>
    <div className="bottom-section mt-5">
        <h2>Happy Trading....</h2>
         
         
      </div>

    </div>
  );
};

StockList.propTypes = {
  stocks: PropTypes.object.isRequired,
  getStocks: PropTypes.func.isRequired,
  buyStock:PropTypes.func.isRequired,
  auth:PropTypes.object.isRequired,
  userprofile:PropTypes.object.isRequired,
  sellStock:PropTypes.func.isRequired,
  shortStock:PropTypes.func.isRequired,
  getPortfolio:PropTypes.func.isRequired
  
  
};

const mapStateToProps = (state) => ({
  stocks: state.stocks,
  auth :state.auth,
  userprofile:state.userprofile
});

export default connect(mapStateToProps, { getStocks,buyStock,sellStock,getPortfolio,shortStock })(StockList);
