import axios from 'axios';
import {GET_NEWS, NEWS_ERROR ,ADD_NEWS } from './types';
import { setAlert } from "./alert";
import setAuthToken from '../utils/setAuthToken';
//load a user
export const getNews =  ()=>async dispatch =>{
   
    
         
    
    try{
        const res = await axios.get('api/news');
        dispatch({
            type:GET_NEWS,
            payload:res.data
        });
        dispatch(setAlert("News section update , Check it now, Stay informed with the latest twists and turns of the market - where news and investments intersect.", 'primary'));

    }
    catch(err){
        dispatch({
            type: NEWS_ERROR
        })
    }
}
//Verify a User
export const addNews = ({ topic,text,code2  }) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const detail = text;
    const body = JSON.stringify({topic, detail,code2 });
    try {
          
        const res = await axios.post('/api/news', body, config);
        dispatch({
            type: ADD_NEWS,
            payload: res.data 
        });
        dispatch(setAlert("News Added", 'success'));

    }
    catch (error) {
       
        const errors = error.response.data.errors;
        console.error(error);
        if(error) {dispatch(setAlert('Invalid Credentials', 'danger'))
        dispatch({

            type: NEWS_ERROR,
            payload:error.message
        })}
    }
}  

