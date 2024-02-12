const fs = require("fs");
const User = require("../../models/User");
const express = require("express");
const Stock = require("../../models/Stock")
const Portfolio = require("../../models/Portfolio");
const router = express.Router();
 
router.get("/", async (req, res) => {
    try {
      const portfolios = await Portfolio.find();
       
      // Create an array to store the extracted data
      const extractedData = [];
  
      // Loop through each portfolio
      for (const portfolio of portfolios) {
      
        const user  = await User.findById(portfolio.DmStockuser);
        if(user){
        let value = 0;
        
        // Loop through stocks in the current portfolio
        for (const stock of portfolio.currentstock) {
            if (stock !== null) {
                const stockDetails = await Stock.findById(stock.stockid);
                if (stockDetails) {
                    value += stock.amount * parseInt(stockDetails.price);
                }
            }
        }
        const userData = { 
            email: user.email,
            balance :user.balance,
            portfolio_value :value,
            Net_worth:value+parseFloat(user.balance) 
        }
        extractedData.push(userData);
      }
    }
      // Write the extracted data to a file (e.g., JSON format)
      const outputFile = "extracted_data.json";  
      fs.writeFileSync(outputFile, JSON.stringify(extractedData, null, 2));
       
      res.json({ message: "Data extracted and stored successfully." });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });

  module.exports = router;

    