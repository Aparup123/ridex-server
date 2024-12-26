const jwt=require('jsonwebtoken')
const fast2sms = require('fast-two-sms')
const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);


const generateAccessToken=async (_id)=>{
    const accessToken=await jwt.sign({_id}, process.env.ACCESS_TOKEN_SECRET, {expiresIn:process.env.ACCESS_TOKEN_EXPIRY})
    return accessToken
}

const generateRefreshToken=async(_id)=>{
    const refreshToken=await jwt.sign({_id}, process.env.REFRESH_TOKEN_SECRET, {expiresIn:process.env.REFRESH_TOKEN_EXPIRY})
    return refreshToken
}

const sendOtp=async (phone_number, otp)=>{
    const message=`Your otp for ridex is ${otp}. Do not share this to anyone.`
    return client.messages
                        .create({
                            body: message,
                            to: phone_number, // Text your number
                            from: '+12184538951', // From a valid Twilio number
                        })
    
}
module.exports={
    generateAccessToken,
    generateRefreshToken,
    sendOtp
}