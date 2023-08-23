import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import { logout } from "../../actions/auth";
const Navbar_ = ({ auth: { isAuthenticated, loading },logout }) => {
  const log_out  = ()=>{
    logout();
  }
  const authLinks = (
    
  
    <ul className="navbar-nav ml-auto px-1">
      <li className="nav-item">
        <Link to="/stocks" className="nav-link">
          <i class="fa-solid fa-money-bill-trend-up"></i>
        {' '}  Trade
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/news" className="nav-link">
        <i class="fa-regular fa-newspaper" />

        {' '}  News
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/transactions" className="nav-link">
        <i class="fa-solid fa-clock-rotate-left"></i>

        {' '}  Transactions
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/dashboard" className="nav-link">
          <i className="fas fa-user" />
          <span className="ml-1"> Portfolio</span>
        </Link>
      </li>
      <li className="nav-item me-auto">
      <a onClick={log_out} className="nav-link" href="#!">
      <i className="fa-solid fa-right-from-bracket"> </i>
        <span className="ml-1"> Logout</span>
      </a>
      </li>
    </ul>
  );
 
       
   
     
  ;

  const guestLinks = (
    <ul className="navbar-nav ml-auto px-1">
    <li className="nav-item">
      <Link to="/stocks" className="nav-link">
      <i class="fa-solid fa-money-bill-trend-up"></i>
      {' '}  Stocks
      </Link>
    </li>
       <li className="nav-item">
        <Link to="/news" className="nav-link">
        <i class="fa-regular fa-newspaper" /> 
        {' '} News
        </Link>
      </li>
    <li className="nav-item">
      <Link to="/" className="nav-link">
        Login
      </Link>
    </li>
  </ul>
    
  );

  return (
    <Navbar expand="sm" className="bg-nav navbar-dark">

      
      <Navbar.Brand   href="/"> {'  '}<i class="fa-brands fa-square-lastfm ms-2"></i>{'    '} FreshersMockStock</Navbar.Brand>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />
       
      <Navbar.Collapse id="basic-navbar-nav">
        {!loading && (
          <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
        )}
       </Navbar.Collapse>
      
    </Navbar> 
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps,{logout})(Navbar_);

          
      
     