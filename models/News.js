const mongoose = require('mongoose');
 
const NewsSchema = new mongoose.Schema({
     

    topic:{
        type:String,
        required:true
    },
    detail:{
        type:String,
        required:true
    },
    
     
    date:{
        type:Date,
        default:Date.now
    } 
    


})
module.exports = News=  mongoose.model('DmNews',NewsSchema);