const mongoose  = require('mongoose');
const UserSchema = mongoose.Schema({
    email:{
    type:String,
    required:true
    },
    code:{
        type: String,
        require:true
    },
    avatar:{
        type:String
    },
    date:{
        type:Date,
        default:Date.now
    },
    balance:{
        type:String,
        required:true
    }


});
module.exports = User =mongoose.model('DmStockuser',UserSchema);
