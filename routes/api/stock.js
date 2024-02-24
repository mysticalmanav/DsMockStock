const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const Portfolio = require("../../models/Portfolio");

const Stock = require("../../models/Stock");
//@route  Post api/posts
//@desc   create a post
//@access private
router.post(
  "/",

  async (req, res) => {
    const { name, price, code } = req.body;

    try {
      let stock = await Stock.findOne({ name: name });
      if (code !== "manav") {
        return res.status(400).json({
          errors: [{ msg: "Not authorized" }],
        });
      }

      if (stock) {
        const past = stock.past;
        const newPrice = {
          price: price,
        };
        past.unshift(newPrice);
        const st = {
          name: name,
          price: price,
          past: past,
        };
        stock = await Stock.findOneAndUpdate(
          { name: name },
          { $set: st },
          { new: true }
        );
        await stock.save();
        const stocks = await Stock.find();
        return res.json(stocks);
      }

      stock = new Stock({
        name: name,
        price: price,
        past: [
          {
            price: price,
          },
        ],
      });
      await stock.save();
      const stocks = await Stock.find();
      res.json(stocks);
    } catch (error) {
      console.error(error.message);
      res.status(500).send({ errors: [{ msg: "server error" }] });
    }
  }
);

router.get("/", async (req, res) => {
  try {
    const stocks = await Stock.find();
    res.json(stocks);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});
router.put("/buy", [auth], async (req, res) => {
  const { stock, balance, amount } = req.body;
  try {
    const user = await User.findById(req.user.id);

    user.balance = balance;
    const portfolio = await Portfolio.findOne({ DmStockuser: req.user.id });
    const { name, price, _id } = stock;
    const newstock = {
      name: name,
      price: price,
      amount: amount,
      stockid: _id,
      short:false
    };

    const transaction = {
      name: name,
      price: price,
      amount: amount,
      balance: balance,
      buy: true,
      sell: false,
    };
    portfolio.stocks.unshift(transaction);
    portfolio.currentstock.unshift(newstock);
    await user.save();
    await portfolio.save();
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});

router.put("/sell", [auth], async (req, res) => {
  let { stock, balance, amount } = req.body;
  try {
    const user = await User.findById(req.user.id);
    const amount2 = amount;
    user.balance = balance;
    const portfolio = await Portfolio.findOne({ DmStockuser: req.user.id });
    const { name, price, _id } = stock;
    const updatedStocks = portfolio.currentstock.map((stock) => {
      if (stock != null && stock.name === name &&((!(stock.short) ) )) {
        console.log("true");
        const newAmount =
          stock.amount > 0 ? Math.max(0, stock.amount - amount) : 0;
        if (newAmount === 0) {
          amount = amount - stock.amount; 
          return;
        }
        amount = 0;
        return { ...stock, amount: newAmount };
      }
      console.log("false");
      return stock;
    });
    const transaction = {
      name: name,
      price: price,
      amount: amount2,
      balance: balance,
      buy: false,
      sell: true,
    };
    portfolio.stocks.unshift(transaction);
    portfolio.currentstock = updatedStocks;
    await portfolio.save();

    await user.save();

    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});
router.put("/shortsell", [auth], async (req, res) => {
  const { stock, balance, amount } = req.body;
  try {
    const user = await User.findById(req.user.id);

    user.balance = balance;
    const portfolio = await Portfolio.findOne({ DmStockuser: req.user.id });
    const { name, price, _id } = stock;
    const newstock = {
      name: name,
      price: price,
      amount: amount,
      stockid: _id,
      short:true
    };

    const transaction = {
      name: name,
      price: price,
      amount: amount,
      balance: balance,
      buy: false,
      sell: false,
    };
    portfolio.stocks.unshift(transaction);
    portfolio.currentstock.unshift(newstock);
    await user.save();
    await portfolio.save();
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});
module.exports = router;
