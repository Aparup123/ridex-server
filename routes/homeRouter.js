const express = require('express');

const homeRouter=express.Router()

homeRouter.get('/home', (req, res)=>{
    res.send("<h1> Home </h1>")
})

module.exports=homeRouter