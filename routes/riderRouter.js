const express=require('express')
const { registerRider, riderLogout, riderLogin, riderRefreshAccessToken, riderGetOtp} = require('../controllers/rider.controller')
const riderRouter=express.Router()

riderRouter.post('/register', registerRider)
riderRouter.post('/logout', riderLogout)
riderRouter.post('/login', riderLogin)
riderRouter.post('/refresh-token', riderRefreshAccessToken)
riderRouter.post('/get-otp', riderGetOtp)
module.exports=riderRouter