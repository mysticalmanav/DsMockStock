const mongoose = require('mongoose');
const ProfileSchema = new mongoose.Schema({
    DmStockuser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DmStockuser'
    },
    stocks:[{
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
       amount:{
        type:Number,
        required:true
       },
       sell:{
        type:Boolean,
        required:true
       },
       buy:{
        type:Boolean,
        required:true
       },
       balance:{
        type:String,
        required:true
       }
    }],
    currentstock:[{
            stockid:{
                type:mongoose.Schema.Types.ObjectId,
                required:true
            },
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
           amount:{
            type:Number,
            required:true
           }
           ,  
           short:{
            type:Boolean,
             
           }
            
    }],
    round:[[{
        stockid:{
            type:mongoose.Schema.Types.ObjectId,
            required:true
        },
        
       
       date:{
        type:Date,
        default:Date.now
       },
       amount:{
        type:Number,
        required:true
       }
    }]]
, 
    date:{
        type:Date,
        default:Date.now
    }
});
module.exports = Portfolio=  mongoose.model('DmStockprofile',ProfileSchema);