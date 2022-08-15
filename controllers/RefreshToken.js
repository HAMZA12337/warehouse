var express = require('express');
var router = express.Router();
require('dotenv').config()

const jwt = require('jsonwebtoken')
const { PrismaClient } = require("@prisma/client");
const res = require("express/lib/response");
const prisma = new PrismaClient();



router.get('/getToken',async(req,res)=>{
  
const refreshToken=req.cookies.refreshToken;
   console.log(refreshToken)
if(!refreshToken) return res.sendStatus(401);

const user=await prisma.user.findUnique({
    where:{
        refresh_token:refreshToken
    }
});
console.log('user='+user)
if(!user) return res.sendStatus(403)
    
jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET, (err,decoded)=>{
    if(err) return res.sendStatus(403);
    const id=user.User;
     const email=user.email;
     const first_name=user.nom;
     const last_name=user.prenom;
     const function_=user.fonction;
     const role=user.role;
     const state=user.state;
     const accessToken = jwt.sign({id,email,first_name,last_name,function_,role,state}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '20s' })

     res.status(200).json({accessToken})
    });





   
})


module.exports = router;