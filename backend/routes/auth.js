const express=require('express')
const router=express.Router()
const User = require('../models/User')
const { body,validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const jwt_secret="zuhairisagoodb$y";

//ROUTE-1 : create a user with POST
router.post('/createuser',[
    body("name","Enter a Valid Name").isLength({min:3}),
    body("email","Enter a Valid Email").isEmail(),
    body("password").isLength({min:5})
],
//if there are errors return bad request and the error array
async (req,res)=>{
    let success=false;
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({success,errors:errors.array()});
    }
//check any duplication of user.
    let user=await User.findOne({email:req.body.email});
    if(user){
        return res.status(400).json({success,errors:"Sorry User Already Exists!"});
    }

    const salt= await bcrypt.genSalt(10);
    secpass= await bcrypt.hash(req.body.password,salt);
    user=await User.create({
        name:req.body.name,
        email:req.body.email,
        password:secpass,
    });
    // .then(user => res.json(user));

    const data={
        user:{
            id:user.id
        }
    }

   const authtoken=jwt.sign(data,jwt_secret);
   success=true;
   res.json({success,authtoken,name:user.name});
   console.log(success,authtoken);

})




//ROUTE-2 : Authenticate a user with POST
router.post('/login',[   //checking here wether  name,email and password staisfy its a check for using server.
    body("email","Enter a Valid Email").isEmail(),
    body("password","Password cannot be Blank").exists(),
],
async (req,res)=>{
    let success=false;
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({success,errors:errors.array()});
    }

    const {email,password}=req.body;

    try {
        let user= await User.findOne({email});
        if(!user){
            success=false;
            return res.status(400).json({success,errors:"Enter Correct Credentials"});
        }
            
        const passwordcompare= await bcrypt.compare(password,user.password);
        if(!passwordcompare){
            success=false;
            return res.status(400).json({success,errors:"Enter Correct Credentials"});
        }

        const data={
            user:{
                id:user.id
            }
        }
        const authtoken=jwt.sign(data,jwt_secret);
        success=true;
        res.json({success,authtoken,name:user.name});    

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }

})

//ROUTE-3 : Login Details
router.post('/getuser',fetchuser,
async (req,res)=>{
    try {
        userid=req.user.id;
        const user=await User.findById(userid).select("-password");
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})


module.exports=router;
