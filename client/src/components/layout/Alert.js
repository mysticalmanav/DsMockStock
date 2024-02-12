import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import PropTypes from 'prop-types';

const Alert_ = ({ alerts }) => {
  useEffect(() => {
    if (alerts === null || alerts.length === 0) return;

    alerts.forEach((alert) => {
      const toastType = alert.alertType.toLowerCase();

      if (toastType === 'success') {
        toast.success(alert.msg);
      } else if (toastType === 'error') {
        toast.error(alert.msg);
      } else {
        // Default to 'info' or use another suitable method
        toast(alert.msg);
      }
    });
  }, [alerts]); // empty dependency array for one-time rendering

  return <Toaster position="top-right" autoClose={5000}
  hideProgressBar={false}
  newestOnTop={false}
  closeOnClick
  rtl={false}
  pauseOnFocusLoss
  draggable
  pauseOnHover
  // style={{ backgroundColor: '#333', color: '#fff', borderRadius: '8px', padding: '100px' }}
  theme="dark" />;
  
};

Alert_.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(Alert_);
