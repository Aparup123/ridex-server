const jwt=require('jsonwebtoken')

const generateAccessToken=async (_id)=>{
    const accessToken=await jwt.sign({_id}, process.env.ACCESS_TOKEN_SECRET, {expiresIn:process.env.ACCESS_TOKEN_EXPIRY})
    return accessToken
}

const generateRefreshToken=async(_id)=>{
    const refreshToken=await jwt.sign({_id}, process.env.REFRESH_TOKEN_SECRET, {expiresIn:process.env.REFRESH_TOKEN_EXPIRY})
    return refreshToken
}

module.exports={
    generateAccessToken,
    generateRefreshToken
}