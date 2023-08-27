const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const User = require("../../models/User");
 
  
const News = require("../../models/News");
const Portfolio = require("../../models/Portfolio");
const Stock = require("../../models/Stock");
//@route  Post api/posts
//@desc   create a post
//@access private
router.post(
    "/",
    
    async (req, res) => {
     
       
      const {
        topic,
        detail,
         code2
      } = req.body;
      
       
      try {
       
        if(code2!=='manav'){
            return res.status(401).json({
                errors: [{ msg: "Not authorized" }],
              });
        }
        

         const news = new News({
          topic :topic,
           detail:detail
 
        });
        await news.save();
  
        res.json(news);
      } catch (error) { 
        console.error(error.message);
        res.status(500).send({ errors: [{ msg: "server error" }] });
      }
    }
  );
  
router.get("/", async (req, res) => {
    try {
      const news = await News.find().sort({ date: -1 });
      res.json(news);
    } catch (err) {
      console.log(err);
      res.status(500).send("Server error");
    }
  });
router.put("/round/end", async (req, res) => {
    try {
      const portfolios = await Portfolio.find();
     

      portfolios.forEach(async (portfolio) => {
        const aggregatedStocks = {};
        portfolio.currentstock.forEach((stock) => {
          if (stock!=null&&!aggregatedStocks[stock.stockid]) {
            aggregatedStocks[stock.stockid] = stock.amount;
          } else if(stock!=null) {
            aggregatedStocks[stock.stockid] += stock.amount;
          }
         
        });
        const round = Object.keys(aggregatedStocks).map((stockid) => ({
          stockid,
          amount: aggregatedStocks[stockid],
        }));
         portfolio.round.unshift(round);
         await portfolio.save();
      });
    
      
    
      
      
      
  res.json('SUCCESS');
    } catch (err) { 
      console.log(err);
      res.status(500).send("Server error");
    }
  });
router.put("/contest/end", async (req, res) => {
    try {
      const portfolios = await Portfolio.find();
       
      const stocks  = await Stock.find();
      portfolios.forEach(async (portfolio) => {
        const aggregatedStocks = {};
        portfolio.round.forEach((round) => {
          round.forEach((stock)=>{ 
          if (!aggregatedStocks[stock.stockid]) {
            aggregatedStocks[stock.stockid] = stock.amount;
          } else {
            aggregatedStocks[stock.stockid] = Math.min(stock.amount,aggregatedStocks[stock.stockid]);
          }})
         
         
        });
         let increase = 0;
         stocks.forEach((stock,index)=>{
          const stockId = stock._id.toString(); // Convert the ObjectId to a string
          if( !(aggregatedStocks[stockId])){
              // ...
          }
          else{
              increase += ( aggregatedStocks[stockId] * parseInt(stock.price)) / 10;
          }
      })
         const user  =await  User.findById(portfolio.DmStockuser);
          if(user){
         let balance = parseInt(user.balance);
        balance += (increase);
        
        user.balance = balance.toString(); 
        
         await user.save();}    
      }); 
    
      
    
      
      
      
  res.json('SUCCESS');
    } catch (err) {  
      console.log(err);
      res.status(500).send("Server error");
    }
  });
module.exports = router;