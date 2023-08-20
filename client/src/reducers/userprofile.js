import { GET_PORTFOLIO, PORTFOLIO_ERROR } from "../actions/types";

const initialState = {
    portfolio:null,
     
     
    loading:true,
    error:{}

}
export default function (state=initialState,action){
const {type,payload} = action;

switch(type){ 
    
   case GET_PORTFOLIO:
    return{
        ...state,
        portfolio:payload,
        loading:false
    }
   case PORTFOLIO_ERROR:
    return {
        ...state,
        error:payload,
        loading:false
        
    }
     
    default:
        return state;
}
}