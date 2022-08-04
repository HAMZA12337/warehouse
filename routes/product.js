var express = require('express');
var router = express.Router();
require('dotenv').config()

//get prisma models 
const { PrismaClient } = require("@prisma/client");
const res = require("express/lib/response");
const app = require('../app');
const { patch } = require('.');
const prisma = new PrismaClient();

// add product

router.post("/addProduct",async(req,res)=>
{
 const product= await prisma.product.create({
        data:{
    
            model:req.body.model,
            serie:req.body.serie,
            description:req.body.description,
            id_Brand:req.body.id_Brand 
        }
        })
        const result = product ? product : "NULL";
        res.json(result)

})
// delete brand

router.post('/removeProduct/:id',async(req,res)=>{
try{
    const product= await prisma.product.delete({
        where:{
         id_Product:parseInt(req.params.id)
        }
})
const result = product? product : "NULL";
res.json(result)
}catch(e){
    res.json("NULL")
 }
})


//edit brand
router.patch('/editProduct/:id',async(req,res)=>{
try{
    const product= await prisma.product.update({
        where:{
         id_Product:parseInt(req.params.id)
        },
        data:{
            model:req.body.model,
            serie:req.body.serie,
            etat:req.body.etat,
            description:req.body.description,
            id_Brand:req.body.id_Brand 
        }
})
const result = product ? product : "NULL";
res.json(result)
}catch(e){
    res.json("NULL")
 }
})

//get all brand
router.get('/getProducts',async(req,res)=>{

    const product= await prisma.product.findMany();
const result = product ? product: "NULL";
res.json(result)
})
// get product
router.get('/getProduct/:id',async(req,res)=>{

    const product= await prisma.product.findUnique({
        where:{
            id_Product:parseInt(req.params.id)
        }
        
    });
    const result = product ? product: "NULL";
res.json(result)
})


// get all products for the given id(id_brand)
router.get('/Product_Brand/:id',async(req,res)=>{
try{
    const product= await prisma.brand.findUnique({
        where:{
            id_Brand:parseInt(req.params.id)
        },include :{
            Product:true
        }
        
    });
    const result = product ? product: "NULL";
res.json(result)
}catch(e){
    res.send("NULL")
}
})

// les produit qui ont un bon etat

router.get('/ProductG',async(req,res)=>{
    try{
        const product= await prisma.product.findMany({
            where:{
                etat:false
            }
            
        });
        const result = product ? product: "NULL";
    res.json(result)
    }catch(e){
        res.send("NULL")
    }
    })
// les produit qui ont un mauvais etat

router.get('/ProductB',async(req,res)=>{
    try{
        const product= await prisma.product.findMany({
            where:{
                etat:true
            }
            
        });
        const result = product ? product: "NULL";
    res.json(result)
    }catch(e){
        res.send("NULL")
    }
    })






// les produit d'un categorie donnee


// id=id categorie
router.get('/AllProduct/:id',async(req,res)=>{
    try{
        const product= await prisma.categorie.findUnique({
            where:{
                id_Categorie:parseInt(req.params.id)
            },
            include:{
               Brand:{
               include:{
                    Product:true
               } 
            }
            }
        
        });
        const result = product ? product: "NULL";
    res.json(result)
    }catch(e){
        res.send("NULL")
        console.log(product)
    }
    })

// GET THE PRODUCT WHEN(ID CATEGORIE=ID // ID_B=ID-BRAND)
    router.get('/AllProduct-Brand/:id/:id_',async(req,res)=>{
        try{
            const product= await prisma.categorie.findUnique({
                where:{
                    id_Categorie:parseInt(req.params.id)
                },
                include:{
                   Brand:{
                    where:{
                     id_Brand:parseInt(req.params.id_)
                    },
                   include:{
                        Product:true
                   } 
                }
                }
            
            });
            const result = product ? product: "NULL";
        res.json(result)
        }catch(e){
            res.send("NULL")
            console.log(product)
        }
        })




module.exports = router;