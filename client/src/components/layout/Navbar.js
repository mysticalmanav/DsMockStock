import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import img from './shriRam.png'
import { logout } from "../../actions/auth";

const Navbar_ = ({ auth: { isAuthenticated, loading }, logout }) => {
  const [navbarOpen, setNavbarOpen] = useState(false);

  const toggleNavbar = () => {
    setNavbarOpen(!navbarOpen);
  };

  const closeNavbar = () => {
    setNavbarOpen(false);
  };

  const log_out = () => {
    logout();
    closeNavbar();
  };

  const authLinks = (
    <Nav className="ml-auto px-1">
      <Nav.Link as={Link} eventKey="1" to="/stocks">
        <i className="fa-solid fa-money-bill-trend-up"></i>
        {' '} Trade
      </Nav.Link>
      <Nav.Link as={Link} eventKey="2" to="/news">
        <i className="fa-regular fa-newspaper" />
        {' '} News
      </Nav.Link>
      <Nav.Link as={Link} eventKey="3" to="/transactions">
        <i className="fa-solid fa-clock-rotate-left"></i>
        {' '} Transactions
      </Nav.Link>
      <Nav.Link as={Link} eventKey="4" to="/dashboard">
        <i className="fas fa-user" />
        <span className="ml-1"> Portfolio</span>
      </Nav.Link>
      <Nav.Link as="a" eventKey="5"onClick={log_out} href="#!">
        <i className="fa-solid fa-right-from-bracket"></i>
        <span className="ml-1"> Logout</span>
      </Nav.Link>
    </Nav>
  );

  const guestLinks = (
    <Nav className="ml-auto px-1">
      <Nav.Link as={Link} eventKey="6" to="/stocks">
        <i className="fa-solid fa-money-bill-trend-up"></i>
        {' '} Stocks
      </Nav.Link>
      <Nav.Link as={Link} eventKey="7" to="/news">
        <i className="fa-regular fa-newspaper" />
        {' '} News
      </Nav.Link>
      <Nav.Link as={Link} eventKey="8" to="/">
        Login
      </Nav.Link>
    </Nav>
  );

  return (
    <Fragment>
      <div onClick={closeNavbar} className={`overlay ${navbarOpen ? 'active' : ''}`} />
      <Navbar expand="lg" collapseOnSelect className="bg-nav fixed-top navbar-dark navbar-fixed" style={{ boxShadow: "rgb(0 0 0 / 71%) 0px 2px 4px 0px" }}>
        <Navbar.Brand className="me-5 ms-2" href="/dashboard">
          {'  '} <img src={img} style={{width:"42px"}}></img>{'    '} ShriRamMockStock
        </Navbar.Brand>

        <Navbar.Toggle onClick={toggleNavbar} aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          {!loading && (
            <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
          )}
        </Navbar.Collapse>
      </Navbar>
    </Fragment>
  );
};

Navbar_.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar_);
