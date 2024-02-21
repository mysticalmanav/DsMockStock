import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-2">
      <div className="container mt-3">
        <div className="row">
          <div className="col-md-6">
            <p>&copy; {new Date().getFullYear()} mysticalmanav. All rights reserved.</p>
            <p>Built and made with all the love in the world by <a  href='https://www.linkedin.com/in/manav-sharma-263092250' target="_blank">Manav</a> </p>
          </div>
          <div className="col-md-3">
            <h5>Quick Links</h5>
            <ul className="list-unstyled text-decoration-none">
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li>Contact Us at <a href="mailto:SRMS@gmail.com"> : SRMS@gmail.com</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
