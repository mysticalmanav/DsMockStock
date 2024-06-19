const mongoose  = require('mongoose');
const config = require('config');
const db= process.env.mongoUri;

const connectDB = async ()=>{
    try{
    
     await mongoose.connect(db,{
        useNewUrlParser:true,
      
     });
     console.log('MongoDB Conected ...')
    }catch(err){
        console.log(err.message);
        //exit process with failure
        process.exit(1);
    } 
}
module.exports = connectDB;
