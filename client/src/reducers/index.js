import { combineReducers } from "redux";
import alert from "./alert"
import auth from './auth'
import userprofile from "./userprofile";
import stocks from "./stocks";
import news from './news'
export default combineReducers({
alert,auth,userprofile,stocks,news

}) 