var express = require('express');
var router = express.Router();
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

router.post('/addUser',async(req,res,next)=>{
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


router.get("/getUsers",async(req,res)=>{
  
 
  var users= await prisma.user.findMany();
  
    const resultat = users ? users : "NULL";
    res.json(resultat)
  })


// remove user 

router.post("/removeUser/:id",async(req,res)=>{
  var users= await prisma.user.delete({
  where:{
    id_USER: parseInt(req.params.id),
  }

})
  const resultat = users ? users : "NULL";
  res.json(resultat)

})


// edit information of user 

router.patch("/editUser/:id",async(req,res)=>{

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
})





















// let refreshTokens = []

// // generate the token 
// app.post('/token', (req, res) => {
//   const refreshToken = req.body.token
//   if (refreshToken == null) return res.sendStatus(401)
//   if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
//   jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
//     if (err) return res.sendStatus(403)
//     const accessToken = generateAccessToken({ name: user.name })
//     res.json({ accessToken: accessToken })
//   })
// })

// // logout =delete token 
// app.delete('/logout', (req, res) => {
//   refreshTokens = refreshTokens.filter(token => token !== req.body.token)
//   res.sendStatus(204)
// })

// // Authenticate User

// app.post('/login', async (req, res) => {
  
//   // const username = req.body.username
//   // const user = { name: username }
//   // const accessToken = generateAccessToken(user)
//   // const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
//   // refreshTokens.push(refreshToken)
//   // res.json({ accessToken: accessToken, refreshToken: refreshToken })
  
//   const body = req.body;
//   const user = await prisma.Utilisateur.findUnique({
//     where: {
//       email: req.body.email,
      
//     },
//   })

 
//   if (user) {
//   //   // check user password with hashed password stored in the database
//     const validPassword = await bcrypt.compare(body.password, user.password);
//     if (validPassword) {
//       res.status(200).json({ error: "Valid password" });
//     } else {
//       res.status(400).json({ error: "Invalid Password" });
//     }
//   } else {
//     res.status(401).json({ error: "User does not exist" });
//    }

  

// console.log('hello')

// })




// // generate the the token=hashage de mot de passe + la duree  de toke
// function generateAccessToken(user) {
//   return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' })
// }

// // edite password 





// // add LL users 



// //get all users 

// function to crypt the password 
async function HashFunct(password) {
  const salt = await bcrypt.genSalt(10);

  const pass = await bcrypt.hash(password, salt);

  return pass;
}
module.exports = router;
