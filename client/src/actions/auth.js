import axios from 'axios';
import {VERIFICATION_FAIL, VERIFICATION_SUCCESS,USER_LOADED,AUTH_ERROR, CLEAR_PROFILE  } from './types';
import { setAlert } from "./alert";
import setAuthToken from '../utils/setAuthToken';
//load a user
export const loadUser =  ()=>async dispatch =>{
   
    
        setAuthToken(localStorage.token);
    
    try{
        const res = await axios.get('https://shrirammockstock.onrender.com/api/auth');
        dispatch({
            type:USER_LOADED,
            payload:res.data
        });
    }
    catch(err){
        dispatch({
            type: AUTH_ERROR
        })
    }
}
//Verify a User
export const verify = ({ email, code }) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({email ,code });
    try {
        const res = await axios.post('https://shrirammockstock.onrender.com/api/auth', body, config);
        dispatch({
            type:VERIFICATION_SUCCESS ,
            payload: res.data
        });

    }
    catch (error) {
        let errors;
        if(error.response)  errors = error.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'error')));
        }
        dispatch({
            type: VERIFICATION_FAIL
        })
    }
}
//LOGOUT
export const logout =()=>dispatch=>{
    dispatch({
        type:CLEAR_PROFILE
    
    })
     
   
}
  