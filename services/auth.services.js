const jwt=require('jsonwebtoken')

const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);


const generateAccessToken=async (_id)=>{
    console.log(_id)
    const accessToken=await jwt.sign({_id}, process.env.ACCESS_TOKEN_SECRET, {expiresIn:process.env.ACCESS_TOKEN_EXPIRY})
    return accessToken
}

const generateRefreshToken=async(_id)=>{
    console.log(_id)
    const refreshToken=await jwt.sign({_id}, process.env.REFRESH_TOKEN_SECRET, {expiresIn:process.env.REFRESH_TOKEN_EXPIRY})
    return refreshToken
}
const generateAccessandRefreshToken = async(userId,User)=>{
    try {
        const user =await User.findById(userId)
        console.log(user)
        console.log(userId.toString())
        const accessToken = await  generateAccessToken(userId.toString())
        const refreshToken = await generateRefreshToken(userId.toString()) 

        console.log(accessToken,refreshToken)

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false})

        return {accessToken, refreshToken}

    } catch (error) {
        console.log(error)
        throw new ApiError(500,"Something went wrong while generating tokens")
    }
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
    generateAccessandRefreshToken,
    sendOtp
}