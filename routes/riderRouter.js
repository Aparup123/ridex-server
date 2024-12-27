const express=require('express')
const { registerRider, riderLogout, riderLogin, riderRefreshAccessToken, riderGetOtp, riderValidateOtp} = require('../controllers/rider.controller')
const riderRouter=express.Router()

riderRouter.post('/register', registerRider)
riderRouter.post('/logout', riderLogout)
riderRouter.post('/login', riderLogin)
riderRouter.post('/refresh-token', riderRefreshAccessToken)
riderRouter.post('/get-otp', riderGetOtp)
riderRouter.post('/validate-otp', riderValidateOtp)
riderRouter.post('/resend-otp')
module.exports=riderRouter