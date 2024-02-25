import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { getPortfolio } from "../../actions/userprofile";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import Moment from "react-moment";
import { getStocks } from "../../actions/stocks";
import Spinner from "../layout/Spinner";
import img from "./Portfolio.png";
import { useState } from "react";
import Dialog from "./Prompt";
import setAuthToken from "../../utils/setAuthToken";
import axios from "axios";
import { setAlert } from "../../actions/alert";
const UserProfile = ({
  getPortfolio,
  userprofile,
  getStocks,
  stocks,
  setAlert,
}) => {
  const navigate = useNavigate();
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [confirm, setTrue] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [iden, setId] = useState(false);
  const [vajr, setVar] = useState(false);
  const handleResize = () => {
    setScreenWidth(window.innerWidth);
  };

  useEffect(() => {
    // Add a listener for the "resize" event
    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    getPortfolio();
    getStocks();
  }, [vajr]);

  useEffect(() => {
    if (confirm) {
      sendTo();
      setTrue(false);
    }
  }, [confirm]);
  const sendTosell = (id) => {
    localStorage.setItem("stockid", id);
    navigate("/stocks");
  };
  const sendTo = async () => {
    try {
      const res = await axios.put(
        `https://shrirammockstock.onrender.com/api/news/short-sell/${iden}`
      );
      setAlert("Position Closed", "success");
    } catch (error) {
      console.error(error);
      if (error) setAlert("Failed to close position", "error");
    }
    setVar(!vajr);
  };

  const sendToShort = async (id) => {
    setTrue(false);
    setIsOpen(true);
    setAuthToken(localStorage.token);
    setId(id);

    //   if(confirm){
    //   let f=0;

    //    try {

    //     const res = await axios.put(`http://localhost:4000/api/news/short-sell/${id}`);
    //     setAlert("Position Closed", 'success');

    // }
    // catch (error) {

    //     console.error(error);
    //    if(error) setAlert("Failed to close position", 'error');

    // }
    //  }
  };
  const calculateProfit = (currentPrice, purchasedPrice, quantity) => {
    return (currentPrice - purchasedPrice) * quantity;
  };
  const calculatePortfolio = () => {
    let total = 0;
    if (portfolio)
      portfolio.currentstock.map((stock) => {
        if (stock && !stock.short) {
          total += stock.amount * parseInt(getCurrentPrice(stock.stockid));
        }
        else if(stock){
          total -= stock.amount * parseInt(getCurrentPrice(stock.stockid));

        }
      });
    return total;
  };
  const getCurrentPrice = (id) => {
    if (stocks !== null) {
      const stock = stocks.find((stock) => stock._id === id);
      return stock ? stock.price : 0;
    }
    return 0;
  };

  const { loading, portfolio } = userprofile;

  return loading || portfolio === null ? (
    <Spinner />
  ) : (
    <div className=" py-3 p-1 mt-5">
      <Dialog setTrue={setTrue} isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="container mt-0 pt-3 font-heavy ">
        <p className="text-center font-heavy">
          Welcome to your stock market portfolio! Here, you can keep track of
          your stock holdings and monitor their performance over time.
        </p>
        <div className="row mb-4">
          <div className="my-auto col-md-8">
            <p className="my-0 email-label">Email:</p>
            <p className="email">{portfolio.DmStockuser.email}</p>
            <p className="my-0 email-label">Cash Balance:</p>
            <p className="balance"> ₹ {portfolio.DmStockuser.balance}</p>
            <p className="my-0 email-label">Net Worth : </p>
            <p className="balance">
              {" "}
              ₹{" "}
              {parseFloat(portfolio.DmStockuser.balance) + calculatePortfolio()}
            </p>
            <p>To Start a Transaction click on the button below.</p>
            <button
              className="btn btn-md btn-outline-primary my-2"
              onClick={() => navigate("/stocks")}
            >
              Buy and Sell Assets
            </button>
            <button
              className="btn btn-md btn-outline-primary my-2"
              onClick={() => navigate("/transactions")}
            >
              Check Past Transactions
            </button>
            <p className="stck-label mb-0 mt-2">
              Below is a list of stocks you currently own:
            </p>
            <p className="mb-0 text-warning mt-2 mx-2">
              
            </p>
          </div>
          {screenWidth > 777 && (
            <div className="col-md-4 d-flex justify-content-end align-items-start">
              <img src={img} alt="" className="portfolio-image me-5 mt-2" />
            </div>
          )}
        </div>

        <div className="mb-4">
          <h1 className="text-dark mt-3 mb-3 hold">Your Holdings : </h1>
          <div className="table-responsive rounded bg-transparent">
            <table className="table table-light border-light text-center">
              <thead className="color-nav">
                <tr>
                  <th>Name</th>
                  <th>Current Price</th>
                  <th>Purchased Price</th>
                  <th>Quantity</th>
                  <th>Purchase Date & Time</th>
                  <th>Profit</th>
                  <th>Sell</th>
                </tr>
              </thead>
              <tbody>
                {portfolio.currentstock.length > 0 &&
                portfolio.currentstock.filter((x) => x == null).length !==
                  portfolio.currentstock.length ? (
                  portfolio.currentstock.map(
                    (stock) =>
                      stock != null &&
                      stock.amount != 0 &&
                      !stock.short && (
                        <tr key={stock._id}>
                          <td>{stock.name}</td>
                          <td>₹ {getCurrentPrice(stock.stockid)}</td>
                          <td>₹ {stock.price} </td>
                          <td>{stock.amount}</td>
                          <td>
                            <Moment format="MMMM Do YYYY, h:mm:ss a">
                              {stock.date}
                            </Moment>
                          </td>
                          <td>
                            {calculateProfit(
                              getCurrentPrice(stock.stockid),
                              stock.price,
                              stock.amount
                            ) > 0 ? (
                              <p className="text-success">
                                ₹
                                {calculateProfit(
                                  getCurrentPrice(stock.stockid),
                                  stock.price,
                                  stock.amount
                                )}
                              </p>
                            ) : (
                              <p className="text-danger">
                                ₹{" "}
                                {calculateProfit(
                                  getCurrentPrice(stock.stockid),
                                  stock.price,
                                  stock.amount
                                )}
                              </p>
                            )}
                          </td>
                          <td className="">
                            {" "}
                            <button
                              className="btn btn-md btn-outline-primary my-auto  border border-light"
                              onClick={() => sendTosell(stock.stockid)}
                            >
                              Sell
                            </button>{" "}
                          </td>
                        </tr>
                      )
                  )
                ) : (
                  <tr>
                    <td colSpan="6">
                      No data, Please start trading by clicking on buy or sell
                      stocks.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="mb-4">
          <h1 className="text-dark mt-3 mb-3 hold">Short Sold Assets : </h1>
          <div className="table-responsive rounded bg-transparent">
            <table className="table table-light border-light text-center">
              <thead className="color-nav">
                <tr>
                  <th>Name</th>
                  <th>Current Price</th>
                  <th>Sold Price</th>
                  <th>Quantity</th>
                  <th>Purchase Date & Time</th>
                  <th>Profit</th>
                  <th>Position</th>
                </tr>
              </thead>
              <tbody>
                {portfolio.currentstock.length > 0 &&
                portfolio.currentstock.filter((x) => x == null).length !==
                  portfolio.currentstock.length ? (
                  portfolio.currentstock.map(
                    (stock) =>
                      stock != null &&
                      stock.amount != 0 &&
                      stock.short && (
                        <tr key={stock._id}>
                          <td>{stock.name}</td>
                          <td>₹ {getCurrentPrice(stock.stockid)}</td>
                          <td>₹ {stock.price} </td>
                          <td>{stock.amount}</td>
                          <td>
                            <Moment format="MMMM Do YYYY, h:mm:ss a">
                              {stock.date}
                            </Moment>
                          </td>
                          <td>
                            {calculateProfit(
                              stock.price,
                              getCurrentPrice(stock.stockid),
                              stock.amount
                            ) > 0 ? (
                              <p className="text-success">
                                ₹
                                {calculateProfit(
                                  stock.price,
                                  getCurrentPrice(stock.stockid),
                                  stock.amount
                                )}
                              </p>
                            ) : (
                              <p className="text-danger">
                                ₹{" "}
                                {calculateProfit(
                                  stock.price,
                                  getCurrentPrice(stock.stockid),
                                  stock.amount
                                )}
                              </p>
                            )}
                          </td>
                          <td>
                            {" "}
                            <button
                              className="btn btn-md btn-outline-primary border border-light"
                              onClick={() => sendToShort(stock._id)}
                            >
                              Close Position
                            </button>{" "}
                          </td>
                        </tr>
                      )
                  )
                ) : (
                  <tr>
                    <td colSpan="6">
                      No data, Please start trading by clicking on buy or sell
                      stocks.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="bottom-section mt-5">
        <h2>About Portfolio Management</h2>
        <p>
          Proper portfolio management is crucial for successful investing. It
          involves diversifying your investments across different assets to
          manage risk and optimize returns. Regularly monitoring your holdings
          and adjusting your portfolio based on market conditions is key to
          long-term financial growth.
        </p>
        <p>
          In this platform, you can easily track your stock holdings, monitor
          their performance, and make informed decisions for your investment
          strategy.
        </p>
      </div>
    </div>
  );
};

UserProfile.propTypes = {
  getPortfolio: PropTypes.func.isRequired,
  userprofile: PropTypes.object.isRequired,
  getStocks: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  stocks: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  userprofile: state.userprofile,
  stocks: state.stocks.stocks,
});

export default connect(mapStateToProps, { getPortfolio, getStocks, setAlert })(
  UserProfile
);
