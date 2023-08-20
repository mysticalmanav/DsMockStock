const mongoose = require('mongoose');
 
const PostSchema = new mongoose.Schema({
     

    name:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
     
    date:{
        type:Date,
        default:Date.now
    },
    past:[{
        price: {
           type:String,
            required:true
        },
        date:{
            type:Date,
            default:Date.now
        }
        
    }]


})
module.exports = Stock=  mongoose.model('DmStocks',PostSchema);