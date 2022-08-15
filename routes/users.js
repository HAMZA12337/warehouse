var express = require('express');
var router = express.Router();
const {verifyToken} = require('../middleware/VerifyToken.js');
const bcrypt = require("bcrypt");
require('dotenv').config()
const jwt = require('jsonwebtoken')


//get prisma models 
const { PrismaClient } = require("@prisma/client");
const res = require("express/lib/response");
const app = require('../app');
const { patch } = require('.');
const prisma = new PrismaClient();


// add user 

//post ===>la requette 

router.post('/addUser', async(req,res,next)=>{
try{
const password=await HashFunct(req.body.password) ;
const user= await prisma.user.create({
data:{
  email:req.body.email,
  nom:req.body.nom,
  prenom:req.body.prenom,
  fonction:req.body.fonction,
  password:password
}
})
}catch(e){
res.send(e)
}
})

// get only one  user 

router.get("/getUser/:id",async(req,res)=>{
  
 
  var users= await prisma.user.findUnique({
 
    where:{
      id_USER: parseInt(req.params.id),
    }
  })
    const resultat = users ? users : "NULL";
    res.json(resultat)
  })
  
 //get all users 


router.get("/getUsers",verifyToken,async(req,res)=>{
  
  
  var users= await prisma.user.findMany();
  
    const resultat = users ? users : "NULL";
    res.json(resultat)
  })


// remove user 

router.post("/removeUser/:id",async(req,res)=>{
  try{
  var users= await prisma.user.delete({
  where:{
    id_USER: parseInt(req.params.id),
  }

})
  const resultat = users ? users : "NULL";
  res.json(resultat)
}catch(e){
  res.json("NULL")
}

})


// edit information of user 

router.patch("/editUser/:id",async(req,res)=>{
try{
  const updateUser = await prisma.user.update({
      where: {
        id_USER:parseInt(req.params.id)
  
      },
      data: {
        email:req.body.email,
        nom: req.body.nom,
        prenom:req.body.prenom,
        fonction:req.body.fonction,
        password: await HashFunct(req.body.password)
      }
    })
    res.send(updateUser)
  }catch(e){
    res.json("NULL")
 }
})
 

// function to crypt the password 
async function HashFunct(password) {
  const salt = await bcrypt.genSalt(10);

  const pass = await bcrypt.hash(password, salt);

  return pass;
}
module.exports = router;
