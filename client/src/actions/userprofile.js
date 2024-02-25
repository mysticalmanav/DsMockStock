import axios from 'axios'
import {setAlert} from './alert'
import {
    AUTH_ERROR,
    GET_PORTFOLIO,PORTFOLIO_ERROR} from './types'
import setAuthToken from '../utils/setAuthToken'
import { useEffect } from 'react'


export const getPortfolio = ()=> async dispatch =>{
    
 
    if(localStorage.token){
       setAuthToken(localStorage.token);
   } 
   
    try {
        const res = await axios.get('https://shrirammockstock.onrender.com/api/portfolio/me');
        dispatch({
         type:GET_PORTFOLIO,
         payload:res.data
        })
    } catch (err) {  
        dispatch({
            type:PORTFOLIO_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        })
    }
}
  
 