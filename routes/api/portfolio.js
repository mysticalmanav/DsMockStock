const express = require("express");
const request = require("request");
const config = require("config");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
//@route  GET api/profile/me
//@desc   Get current users profile
//@access Private
 
const User = require("../../models/User");
const Portfolio = require("../../models/Portfolio");
router.get("/me",[auth], async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne({ DmStockuser: req.user.id }).populate(
      "DmStockuser",
      ["email", "avatar", "balance"]
    );
    if (!portfolio) {
      return res.status(400).json({
        errors: [{ msg: "There is no portfolio exist for this user " }],
      });
    }
    res.json(portfolio);
  } catch (err) { 
    console.log(err.message);
    res.status(500).send('server error');
  }
});
  

 
 
router.put(
  "/stock",[auth],
  async (req, res) => {
  
   
    const { name, price, sell, buy,amount } =
      req.body;
    const newStock = {
        name, price, sell, buy,amount 
    };
    try {
      const portfolio = await Portfolio.findOne({ user: req.user.id });
      portfolio.stocks.unshift(newStock);
      await portfolio.save();
      res.json(portfolio);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);


router.put(
  "/stock/current",
  [auth],
  async (req, res) => {
    
  
    const { stockid, name, price, amount } =
      req.body;
    const newStock = {
        stockid, name, price, amount
    };
    try {
      const portfolio = await Portfolio.findOne({ user: req.user.id });
      portfolio.currentstock.unshift(newStock);
      await portfolio.save();
      res.json(portfolio);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);
 
router.delete("/stock/current/:stock_id", auth, async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne({ user: req.user.id });
    //get remove index
    const removeindex = Portfolio.currentstock
      .map((item) => item.id)
      .indexOf(req.params.stock_id);
    portfolio.currentstock.splice(removeindex, 1);
    await portfolio.save();
    res.json(portfolio);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});
 

module.exports = router;
