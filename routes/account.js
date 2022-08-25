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
const { Router } = require('express');
const prisma = new PrismaClient();


// block account 

router.patch('/Baccount/:id',async(req,res)=>{

var account=await prisma.user.update({

    where:{
        id_USER: parseInt(req.params.id), 
    },
    data:
    {
         state:false
    }

})
const result = account ? account : "NULL";
  res.json(result)

})





//unblock account

router.patch('/Daccount/:id',async(req,res)=>{

    var account=await prisma.user.update({
    
        where:{
            id_USER: parseInt(req.params.id), 
        },
        data:
        {
             state:true
        }
    
    })
    const result = account ? account : "NULL";
      res.json(result)
    
    })
    
    

// login

// il faut implementer JWT
router.post('/login',async(req,res)=>{
try{
    const body = req.body;
    const user = await prisma.user.findUnique({
      where: {
        email: req.body.email,
        
      },
    })
    
   
    if (user) {
       // check user password with hashed password stored in the database
      const validPassword = await bcrypt.compare(body.password, user.password);
      if (validPassword) {
        const refreshTokens=[] ;
      console.log(user.email)
     const id=user.User;
     const email=user.email;
     const first_name=user.nom;
     const last_name=user.prenom;
     const function_=user.fonction;
     const role=user.role;
     const state=user.state; 
      const accessToken = jwt.sign({id,email,first_name,last_name,function_,role,state}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30s' })
      const refreshToken = jwt.sign({id,email,first_name,last_name,function_,role,state}, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' })
      await prisma.user.update({
        where: {
          email:req.body.email 
    
        },data :{
        refresh_token:refreshToken
}
})
        // res.status(200).json({ error: "Valid password" });
        
       res.cookie('refreshToken',refreshToken,{
         maxeAge:24*60*60*1000,
        httpOnly: true,
       });
       
       res.status(200).json({ accessToken: accessToken, refreshToken: refreshToken })
      } else { 
        res.status(400).json({ error: "Invalid Password" });
      }
    } else {
      res.status(401).json({ error: "User does not exist" });
     }
     
    }catch(e){
       res.status(404).json({msg:e})
    } 
      
})

// logout 

router.delete('/logout',async(req,res)=>{

  const refreshToken=req.cookies.refreshToken;
  if(!refreshToken)  return res.sendStatus(401)
  const user= await prisma.user.findUnique({
    where:{
      refresh_token:refreshToken
    }
  })
 if(!user) return res.sendStatus(403)
console.log('user.id_USER='+user.id_USER)
 const upd=await prisma.user.update({
  where: {
    id_USER:parseInt(user.id_USER)

  },
  data: {
    refresh_token:null
  }
 }) 


 res.clearCookie('refreshToken')
  return res.sendStatus(200)



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
