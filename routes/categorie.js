var express = require('express');
var router = express.Router();
require('dotenv').config()

//get prisma models 
const { PrismaClient } = require("@prisma/client");
const res = require("express/lib/response");
const app = require('../app');
const { patch } = require('.');
const prisma = new PrismaClient();


// add categorie
router.post("/addCategorie",async(req,res)=>
{
 const categorie= await prisma.categorie.create({
        data:{
    
            label_categorie:req.body.label_categorie
        }
        })
        const result = categorie ? categorie : "NULL";
        res.json(result)

})

// edit catgeorie 

router.patch("/editCategorie/:id",async(req,res)=>
{
  try{
 const categorie= await prisma.categorie.update({
    where :{

        id_Categorie:parseInt(req.params.id)
    },
        data:{
    
            label_categorie:req.body.label_categorie
        }
        })
        const result = categorie ? categorie : "NULL";
        res.json(result)
      }catch(e){
        res.json("NULL")
     }

})

// remove categorie

router.post("/removeCategorie/:id",async(req,res)=>{
  try{
    const categorie= await prisma.categorie.delete({
    where:{
        id_Categorie:parseInt(req.params.id)
    }
  
  })
  const result = categorie ? categorie : "NULL";
  res.json(result)
}catch(e){
  res.json("NULL")
}
  })
  
// get all categorie

router.get("/getCategories",async(req,res)=>{
  
 
    var categorie= await prisma.categorie.findMany();
    
      const result = categorie ? categorie : "NULL";
      res.json(result)
    })

//get catgorie

router.get("/getCategorie/:id",async(req,res)=>{
  
 
    var categorie= await prisma.categorie.findUnique({
   
      where:{
        id_Categorie: parseInt(req.params.id),
      }
    })
      const result= categorie ? categorie : "NULL";
      res.json(result)
    })














module.exports = router;






