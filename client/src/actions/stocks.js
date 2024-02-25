import axios from 'axios';
import {GET_STOCK, STOCK_ERROR ,USER_LOADED,AUTH_ERROR, BUY_ERROR,SELL_ERROR } from './types';
import { setAlert } from "./alert";
import setAuthToken from '../utils/setAuthToken';
import { getPortfolio } from './userprofile';
//load a user
export const getStocks =  ()=>async dispatch =>{
   
    
         
    
    try{
        const res = await axios.get('https://shrirammockstock.onrender.com/api/stocks');
        dispatch({
            type:GET_STOCK,
            payload:res.data
        });
    }
    catch(err){
        dispatch({
            type: STOCK_ERROR
        })
    }
}
//Verify a User
export const addStock = ({ name, price,code }) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ name,price,code });
    try {
          
        const res = await axios.post('https://shrirammockstock.onrender.com/api/stocks', body, config);
        dispatch({
            type:GET_STOCK ,
            payload: res.data 
        });
        dispatch(setAlert("Stock Updated", 'success'));

    }
    catch (error) {
      
        const errors = error.response.data.errors;
        console.error(error);
        if(error) {dispatch(setAlert('Invalid Credentials', 'error'))
        dispatch({

            type: STOCK_ERROR,
            payload:error.message
        })}
    }
} 
export const buyStock =  ({stock,balance,amount})=>async dispatch =>{
    setAuthToken(localStorage.token);
    const config = {
        headers: {
            'Content-Type': 'application/json'
        } 
    }
    const body = JSON.stringify({ stock,balance,amount });
    try{
        
        if((balance)<0){
            dispatch(setAlert('Insufficient balance', 'default'));

        }
        else if(amount===0||amount==null){
            dispatch(setAlert('Insufficient amount of stock for purachasing.', 'default'));
        }
        else{const res = await axios.put('https://shrirammockstock.onrender.com/api/stocks/buy',body,config);
        
        dispatch({
            type:USER_LOADED,
            payload:res.data
        });
        dispatch(setAlert('Stocks purchased successfully', 'success'));
        dispatch(getPortfolio());
    }
    }
    catch(err){
        dispatch({ 
            type: BUY_ERROR
        })
    }
}


export const sellStock =  ({stock,currentstock,balance,amount})=>async dispatch =>{
    
    setAuthToken(localStorage.token);
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const stockid = stock._id;
    const body = JSON.stringify({ stock,balance,amount });
    let totalamount  = 0;
   if(currentstock!=null&&currentstock.length>0) { currentstock.map((stock)=>{
        if(stock!=null&&stock.stockid===stockid&&(!stock.short)){
            totalamount += stock.amount;
        }
    })}
    try{

        if(totalamount<amount){
            dispatch(setAlert('Insufficient stocks to sell', 'default'));
        }
        else if(amount===0||amount===null){
            dispatch(setAlert('Insufficient amount of stock for selling.', 'default'));
        }
        else{const res = await axios.put('https://shrirammockstock.onrender.com/api/stocks/sell',body,config);
        
        dispatch({
            type:USER_LOADED,
            payload:res.data
        });
        dispatch(setAlert('Stocks sold successfully', 'success'));
        dispatch(getPortfolio());

    }
    }
    catch(err){
        dispatch({ 
            type: SELL_ERROR
        })
    }
}

export const shortStock =  ({stock,balance,amount})=>async dispatch =>{
    setAuthToken(localStorage.token);
    const config = {
        headers: {
            'Content-Type': 'application/json'
        } 
    }
    const body = JSON.stringify({ stock,balance,amount });
    try{
        
        
         if(amount===0||amount==null){
            dispatch(setAlert('Insufficient amount of stocks for purachasing.', 'default'));
        }
        else{const res = await axios.put('https://shrirammockstock.onrender.com/api/stocks/shortsell',body,config);
        
        dispatch({
            type:USER_LOADED,
            payload:res.data
        });
        dispatch(setAlert('Transaction successfull', 'success'));
        dispatch(getPortfolio());
    }
    }
    catch(err){
        dispatch({ 
            type: BUY_ERROR
        })
    }
}

