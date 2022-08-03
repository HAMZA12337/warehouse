var express = require('express');
var router = express.Router();
require('dotenv').config()

//get prisma models 
const { PrismaClient } = require("@prisma/client");
const res = require("express/lib/response");
const app = require('../app');
const { patch } = require('.');
const prisma = new PrismaClient();

// add brand 

router.post("/addBrand",async(req,res)=>
{
 const brand= await prisma.brand.create({
        data:{
    
            label_Brand:req.body.label_Brand,
            id_Categorie:req.body.id_Categorie,
            quantite:req.body.quantite,
        }
        })
        const result = brand ? brand : "NULL";
        res.json(result)

})

// delete brand

router.post('/removeBrand/:id',async(req,res)=>{

    const brand= await prisma.brand.delete({
        where:{
         id_Brand:parseInt(req.params.id)
        }
})
const result = brand ? brand : "NULL";
res.json(result)
})

//edit brand
router.patch('/editBrand/:id',async(req,res)=>{

    const brand= await prisma.brand.update({
        where:{
         id_Brand:parseInt(req.params.id)
        },
        data:{
            label_Brand:req.body.label_Brand,
            id_Categorie:req.body.id_Categorie,
            quantite:req.body.quantite,
        }
})
const result = brand ? brand : "NULL";
res.json(result)
})

//get all brand
router.get('/getBrands',async(req,res)=>{

    const brand= await prisma.brand.findMany();
const result = brand ? brand : "NULL";
res.json(result)
})
// get brand 

router.get('/getBrand/:id',async(req,res)=>{

    const brand= await prisma.brand.findUnique({
        where:{
            id_Brand:parseInt(req.params.id)
        }
        
    });
const result = brand ? brand : "NULL";
res.json(result)
})
// get number of brands 

router.get('/getNbrBrand',async(req,res)=>{
    const brand= await prisma.brand.count();
    const result = brand ? brand : "NULL";
    res.json(result)
})


//get categorie of the id_brand given 

router.get('/test',async(req,res)=>{
    const brand= await prisma.brand.count();
    const result = brand ? brand : "NULL";
    res.json(result)
})




module.exports = router;