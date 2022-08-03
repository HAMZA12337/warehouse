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

// delete brand



//edit brand

//get all brand

// get brand 


// get number of brand 














module.exports = router;