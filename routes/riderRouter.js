const express=require('express')
const { registerRider } = require('../controllers/rider.controller')
const riderRouter=express.Router()

riderRouter.post('/register', registerRider)

module.exports=riderRouter