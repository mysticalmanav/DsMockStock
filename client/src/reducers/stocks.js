import {GET_STOCK, STOCK_ERROR } from '../actions/types';

const initialState=  {
    
    stocks:[],
    loading:true,
    error:null

   
}

export default function(state=initialState,action){
    const {type,payload}  = action;
    switch(type){
         
         

        case GET_STOCK:
            return {
                ...state,
                stocks:payload,
                loading:false
            }
        
         
      
        case STOCK_ERROR:
            
        
        return {
            ...state,
            error:payload,
            loading:false
        }
        
        default:
            return state;
                
    }
}