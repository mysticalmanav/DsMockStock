 
import {ADD_NEWS, GET_NEWS,NEWS_ERROR , END_ERROR, ROUND_END } from '../actions/types';

const initialState=  {
     
    news:[],
    loading:true,
    error:null
}

export default function(state=initialState,action){
    const {type,payload}  = action;
    switch(type){
        case ADD_NEWS:
        case GET_NEWS:
           
            return {
                ...state,
                news:payload,
                 
                loading:false
            }

     
         
         
        case NEWS_ERROR:
        case END_ERROR:
        return {
            ...state,
            error:payload, 
            
            loading:false
        }
        
        case ROUND_END:
        return {
            ...state,
            error:payload, 
            
            loading:false
        }
       
        default:
            return state;
                
    }
}