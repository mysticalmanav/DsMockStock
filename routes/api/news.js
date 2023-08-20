const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const User = require("../../models/User");
 
  
const News = require("../../models/News");
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
module.exports = router;