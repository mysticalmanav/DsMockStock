import Alert from 'react-bootstrap/Alert';
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
 const Alert_ = ({ alerts }) => alerts !== null && alerts.length > 0 && alerts.map(alert => (
    <Alert className='m-0 rounded-0' key={alert.id} variant={alert.alertType}>
    {alert.msg}
  </Alert>
));
Alert_.PropTypes = {
    alerts: PropTypes.array.isRequired
};
const mapStateToProps = state => ({
    alerts: state.alert
});
export default connect(mapStateToProps)(Alert_); 

 