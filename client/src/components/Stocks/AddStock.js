import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { addStock } from "../../actions/stocks";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addNews, endRound, endContest } from "../../actions/news";
import { getStocks } from "../../actions/stocks";
import { shortSold } from "../../actions/news";
import {Link} from "react-router-dom";
import axios from "axios"
const AddStockForm = ({
  addStock,
  addNews,
  stocks,
  getStocks,
  endContest,
  endRound,shortSold
}) => {
  useEffect(() => {
    getStocks();
  }, []);

  const [name, setStockName] = useState("");
  const [topic, setTitle] = useState("");
  const [stockPrice, setStockPrice] = useState("");
  const [text, setText] = useState("");
  const [code, setCode] = useState("");
  const [code2, setCode2] = useState("");
  const [code3, setCode3] = useState("");

  const [updatedPrices, setUpdatedPrices] = useState({});
  const handlenewsSubmit = (event) => {
    event.preventDefault();
    addNews({ topic, text, code2 });
  };
  const sendendContest =async  () => {
   await endContest();
  };
  const sendshortsold = async  () => {
   await  shortSold();
  };
  const sendendRound = async () => {
    await endRound();
  };
  const handleContentChange = (event) => {
    setText(event.target.value);
  };
  const handleCodeChange = (event) => {
    setCode2(event.target.value);
  };
  const handleStockNameChange = (event) => {
    setStockName(event.target.value);
  };
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  const handleStockPriceChange = (event, stockId) => {
    const { value } = event.target;
    setUpdatedPrices((prevPrices) => ({
      ...prevPrices,
      [stockId]: parseFloat(value),
    }));
  };

  const handleStockPriceChange2 = (event) => {
    setStockPrice(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const price = stockPrice;

    addStock({ name, price, code });
    setStockName("");
    setStockPrice("");
    setCode("");
  };

  const handleCode = (event) => {
    setCode(event.target.value);
  };
  const handleCode3 = (event) => {
    setCode3(event.target.value);
  };

  const handleSubmit2 = async (event) => {
    event.preventDefault();

    if (Object.keys(updatedPrices).length > 0) {
      // Loop through updated prices and update stocks
      for (const stockId in updatedPrices) {
        const price = updatedPrices[stockId];
        const stock = stocks.find((stock) => stock._id === stockId);
        const name = stock ? stock.name : "";

        addStock({ name, price, code });

        // Call a Redux action to update stock price
        // For example: ;
      }
      // Clear updatedPrices state
      setUpdatedPrices({});
    }
  };

  return (
    <div>
      <div className="container" style={{marginTop:"100px"}}>
        <h2>Add New Stock or Update Stock price</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="stockName">Stock Name:</label>
            <input
              type="text"
              className="form-control"
              id="stockName"
              value={name}
              onChange={handleStockNameChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="stockPrice">Stock Price:</label>
            <input
              type="text"
              className="form-control"
              id="stockPrice"
              value={stockPrice}
              onChange={handleStockPriceChange2}
              required
            />
          </div>
          <div className="form-group mb-4">
            <label htmlFor="code">Code:</label>
            <input
              type="password"
              className="form-control"
              id="stockPrice"
              value={code}
              onChange={handleCode}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Add / Update Stock
          </button>
        </form>
      </div>
      <div className="container mt-4">
        <h2>Update Stock Prices</h2>
        <form onSubmit={handleSubmit2}>
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Current Price</th>
                <th>New Price</th>
              </tr>
            </thead>
            <tbody>
              {stocks.map((stock) => (
                <tr key={stock.id}>
                  <td>{stock.name}</td>
                  <td>{stock.price}</td>
                  <td>
                    <input
                      type="number"
                      className="form-control"
                      id={stock._id}
                      value={updatedPrices[stock._id] || ""}
                      onChange={(e) => handleStockPriceChange(e, stock._id)}
                      required
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="form-group mb-4">
            <label htmlFor="code">Code:</label>
            <input
              type="password"
              className="form-control"
              id="stockPrice"
              value={code}
              onChange={handleCode}
              required
            />
          </div>
          <a href="#top">
            {" "}
            <button type="submit" className="btn btn-primary">
              Update Prices
            </button>
          </a>
        </form>
      </div>
      <div className="container mt-4">
        <h2 className="mb-3">Update News Details</h2>
        <form onSubmit={handlenewsSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title:
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              value={topic}
              onChange={handleTitleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="content" className="form-label">
              Content:
            </label>
            <textarea
              className="form-control"
              id="content"
              value={text}
              onChange={handleContentChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="code" className="form-label">
              Code:
            </label>
            <input
              type="password"
              className="form-control"
              id="code"
              value={code2}
              onChange={handleCodeChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Update News
          </button>
        </form>
      </div>
      <div className="container">
        <a href="#top">
          {" "}
          <button className="btn btn-primary" onClick={sendendRound}>
            End Round
          </button>
        </a>
        <a href="#top">
          {" "}
          <button className="btn btn-primary" onClick={sendendContest}>
            End Contest
          </button>
        </a>
       
          {" "}
       <Link to="/result">  <button className="btn btn-primary"  >
           Result
          </button></Link>  
      
        <a href="#top">
          {" "}
          <button className="btn btn-primary" onClick={sendshortsold}>
           Short Evaluate
          </button>
        </a>
      </div>
    </div>
  );
};

AddStockForm.propTypes = {
  addStock: PropTypes.func.isRequired,
  addNews: PropTypes.func.isRequired,
  stocks: PropTypes.array.isRequired,
  getStocks: PropTypes.func.isRequired,
  endRound: PropTypes.func.isRequired,
  shortSold: PropTypes.func.isRequired,
  endContest: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  stocks: state.stocks.stocks,
});

export default connect(mapStateToProps, {
  addStock,
  addNews,
  getStocks,
  endRound,
  endContest,shortSold
})(AddStockForm);
