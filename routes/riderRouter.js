const express=require('express')
const { registerRider, riderLogout, riderLogin } = require('../controllers/rider.controller')
const riderRouter=express.Router()

riderRouter.post('/register', registerRider)
riderRouter.post('/logout', riderLogout)
riderRouter.post('/login', riderLogin)
module.exports=riderRouter