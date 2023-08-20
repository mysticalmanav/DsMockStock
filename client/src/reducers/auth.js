 
import {VERIFICATION_FAIL, VERIFICATION_SUCCESS,USER_LOADED,AUTH_ERROR, BUY_ERROR ,SELL_ERROR, CLEAR_PROFILE } from '../actions/types';

const initialState=  {
    token:localStorage.getItem('token'),
    isAuthenticated:null,
    loading:true,
    user:null
}

export default function(state=initialState,action){
    const {type,payload}  = action;
    switch(type){
         
        case VERIFICATION_SUCCESS:
            localStorage.setItem('token',payload.token)
            return {
                ...state,
                ...payload,
                isAuthenticated:true,
                loading:false
            }

        case USER_LOADED:
            return {
                ...state,
                ...payload,
                isAuthenticated:true,
                loading:false
            }
        
        case CLEAR_PROFILE:
        case VERIFICATION_FAIL:
        case AUTH_ERROR:
            
        localStorage.removeItem('token');
        return {
            ...state,
            token:null,
            isAuthenticated:false,
            loading:false
        }
        case SELL_ERROR:
        case BUY_ERROR:
            return {
                ...state,
                loading:false
               
            }
        
        default:
            return state;
                
    }
}