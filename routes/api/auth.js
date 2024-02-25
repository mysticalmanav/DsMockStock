const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
 
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const Portfolio = require('../../models/Portfolio');
//@route  GET api/auth
//@desc   Test route
//@access public

router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-code')
        res.json(user);


    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

//@route  Post api/auth 
//@desc   Authenticate user and get token
//@access public
router.post('/', [

    check('code', 'Please enter a valid code')
        .exists(),
    check('email', 'Email is required')
        .exists()



],

    async (req, res) => {
        const errors = validationResult(req);
        
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { email, code } = req.body;

            const isMatch = (code==='DST@SRMS')
            if (!isMatch) {
                return res.status(400).json({errors:[{msg:"Invalid credential"}]})
            }
           let user = await User.findOne({email:email});
           if(user){
            const payload = {
                user:{
                    id:user._id
                }
            }
            
            jwt.sign(payload,
                config.get('jwtSecret'),
                {expiresIn:3600000}, 
                (err,token)=>{
                    if(err) throw err;
                    return res.json({token});
                }
                 
            )
        }
           
            const avatar = gravatar.url(email,{
        
                s: '200', 
                r: 'pg', 
                d:'mm' 
        
            })
            
            const balance = '1000000';
             user = User({
                email,
                code,
                avatar,
                balance
               
        
        
            })
           
            



            
            await user.save();
            let portfolio = Portfolio({
                DmStockuser:  user.id
            });
            
          
            await portfolio.save();
            const user1 = user;
            const payload = {
                user:{ 
                    id:user.id
                }
            }
            jwt.sign(payload,
                config.get('jwtSecret'),
                {expiresIn:3600000}, 
                (err,token)=>{
                    if(err) throw err;
                    res.json({token,user1});
                }
                 
            )
            } 
            catch(err){
        console.error(err.message);
        res.status(500).send('server error');
        
            } 
           
          


    });
module.exports = router;
 
