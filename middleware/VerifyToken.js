var express = require('express');
var router = express.Router();
require('dotenv').config()
const jwt = require('jsonwebtoken')
const { PrismaClient } = require("@prisma/client");
const res = require("express/lib/response");


module.exports.verifyToken=(req,res,next)=>{
console.log(req.headers['authorization']);
const authHeader=req.headers['authorization'];
const token=authHeader && authHeader.split(' ')[1];
console.log("token ="+token)
if(token==null) return res.sendStatus(401);
jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,decoded)=>{
    console.log(err)
    if(err) return res.sendStatus(403);
    req.email=decoded.email;
    next();
})

}

