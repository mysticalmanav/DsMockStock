import React from 'react';
import Moment from 'react-moment'
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { getPortfolio } from '../../actions/userprofile';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
const TransactionHistory = ({ userprofile:{portfolio ,loading},getPortfolio}) => {
    
  useEffect(() => {
    getPortfolio();
    

  }, []);

  return loading || portfolio === null ? (
  <Spinner/>
  ) : (<div className="container mt-5 py-3 bg-trans">
      <h2 className='text-center'>Transaction History</h2>
      {portfolio.stocks.length===0&&<p className='text-center p-1'> Nothing to show here. Please <Link to='/stocks'>start transactions</Link>. </p>}
      <div className="table-responsive ">
        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th>Type</th>
              <th>Timestamp</th>
              <th>Your Cash Balance</th>
              <th>Stock Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total Transaction Amount</th>
            </tr>
          </thead>
         

          <tbody>
            {portfolio.stocks.map(transaction => (
              <tr key={transaction.id}>
                <td>{transaction.buy?'Bought':transaction.sell?'Sold':"Short Sold"}</td>
                <td><Moment format='MMMM Do YYYY, h:mm:ss a'>{transaction.date}</Moment></td>
                <td>₹{transaction.balance }</td>
                <td>{transaction.name}</td>
                <td>₹ {transaction.price }</td>
                <td>{transaction.amount}</td>
                <td>₹ {(transaction.sell)?(<span className='text-success'>{(transaction.amount)*(transaction.price)}</span>): transaction.buy?(<span className='text-danger'>-{(transaction.amount)*(transaction.price)}</span>):<span className='text-warning'>{(transaction.amount)*(transaction.price)}</span>}</td>
              </tr> 
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
TransactionHistory.propTypes  ={
    userprofile: PropTypes.object.isRequired,
    getPortfolio:PropTypes.func.isRequired
    
    
}
const mapStateToProps = state =>({
    userprofile : state.userprofile 

})

export default connect(mapStateToProps,{getPortfolio}) (TransactionHistory);
