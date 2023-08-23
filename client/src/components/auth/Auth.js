import React,{Fragment,useEffect,useState} from 'react';
import axios from 'axios';
import {connect} from 'react-redux'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import {Link,useNavigate} from 'react-router-dom'
 
import PropTypes from 'prop-types'
import { verify } from '../../actions/auth';
const Login = ({verify,isAuthenticated}) => {
  const navigate = useNavigate();
    const [formData,setFormData] = useState({
        email:'',code:'',                                                                                                 
    });
    const {email,code} = formData;
    const onChange = (e)=>setFormData({...formData,[e.target.name]:e.target.value});
    const onSubmit= async (e)=>{
        e.preventDefault();  
         verify({email,code});
 
        }
        if(isAuthenticated){
        
           navigate("/dashboard");
      
        }

        
  
  return (
    <Fragment >
       <div className='container'>
      <h1 className="large color-nav">Verify</h1>
      <p className="lead"><i className="fas fa-user"></i> Verify To Get In</p>
      <form className="form" onSubmit={e=>onSubmit(e)}>
        <div className="form-group">
          <input 
            type="email"
            placeholder="Email"
            name="email"
            value= {email}
            onChange= {e=>onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Code"
            name="code"
            value= {code}
            onChange= {e=>onChange(e)}
          /> 
        </div>
        <input type="submit" className="btn btn-primary" value="Verify" />
      </form>
      <div className="bottom-section mt-5">
        <h2>Ready to Start Trading?</h2>
        <p>
          Whether you're a beginner or an experienced trader, our platform provides the tools and resources you need to make informed investment decisions.
        </p>
        <p>
          Join us today and explore the world of trading with confidence.
        </p>
        <h4 className=" color-nav">Sign Up and Start Trading</h4>
      </div>
       </div>
  </Fragment>
  )


};
Login.propTypes={
  verify:PropTypes.func.isRequired,
 
  
  isAuthenticated:PropTypes.bool
}
const mapStateToProps=state=>({
  isAuthenticated:state.auth.isAuthenticated

})
export default connect(mapStateToProps,{verify}) (Login);
