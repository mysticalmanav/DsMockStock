import React, { Fragment,useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar_  from "./components/layout/Navbar";

  
 
 
import Alert_ from "./components/layout/Alert";
//redux
import Login from "./components/auth/Auth";
import { loadUser } from "./actions/auth";
import { Provider } from "react-redux";
import PrivateRoute from "./components/routing/PrivateRoute";
import store from "./store";
import setAuthToken from "./utils/setAuthToken";
import UserProfile from "./components/Portfolio/Portfolio";
import StockList from "./components/Stocks/Stocks";
import AddStockForm from "./components/Stocks/AddStock";
import StockMarketNews from "./components/Stocks/StocksNews";
import Transactions from "./components/Portfolio/Transactions";
import Footer from "./components/layout/Footer";
import PrivacyPolicy from "./components/layout/Privacypolicy";
import AboutUs from "./components/layout/About";
import NotFoundPage from "./components/layout/Notfound";
import PortfolioTable from "./components/Portfolio/Result";
if(localStorage.token){
   setAuthToken(localStorage.token); 
}
const App = ( ) => {
   useEffect(()=>{
      store.dispatch(loadUser());
  
   

   },[localStorage.getItem('token')])
  return (
    <Provider store={store}>
      <Router>
        <Fragment> 
          <Navbar_  />
       
          
        
            <Routes>
             

            </Routes>
            <div className="">
          <Alert_/>

            <Routes>
              <Route path="/" element={<Login />} />
              <Route path= "/dashboard" element={<PrivateRoute><UserProfile/></PrivateRoute>}/>
              <Route path="/stocks" element={<StockList />} />
              <Route path="/result" element={<PortfolioTable />} />
              <Route path="/transactions" element={<PrivateRoute><Transactions/></PrivateRoute>} />
              <Route path="/add/stock" element={<AddStockForm />} />
              <Route path="/news" element={<StockMarketNews />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/*" element={<NotFoundPage/>} />
              </Routes>
          </div>
            
        <Footer/>    
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
