const Rider=require('../models/riders.models')
const bcrypt=require('bcrypt')
const Joi=require('joi')
const ApiError=require('../services/ApiError')
const { generateAccessToken, generateRefreshToken } = require('../services/auth.services')
const jwt=require('jsonwebtoken')

const registerRider=async(req, res, next)=>{
    
        try{
            const {email, username, password}=req.body
            // Validate req.body
            const schema=Joi.object({
                password:Joi.string()
                        .required()
                        .min(6),
                username: Joi.string()
                            .required()
                            .min(5)
                            .max(10),
                email:Joi.string()
                        .email()
                        .required()
                })

            await schema.validateAsync(req.body)

            // check for existing rider with email or username
            const rider=await Rider.findOne({
                $or:[{email}, {username}]
            })

            if(rider){
                throw new ApiError(400, "User already exists!")
            }

            // Creating new rider
            // hash the given password
            const saltRounds=10
            const hashedPassword=await bcrypt.hash(password, saltRounds)

            const newRider=new Rider({email,username, password:hashedPassword})
            const savedRider=await newRider.save()

            if(!savedRider){
                throw new ApiError(500,"Something went wrong registering user")
            }

            // Generate refresh and access token
            const accessToken=await generateAccessToken(savedRider._id)
            const generatedRefreshToken=await generateRefreshToken(savedRider._id)
            
            // update rider refresh token
            savedRider.refreshToken=generatedRefreshToken
            var updatedRider=await savedRider.save()
            if(!updatedRider){
                throw new ApiError(500,"Error saving refresh token")
            }

            updatedRider=updatedRider.toObject()
            delete updatedRider.password
            delete updatedRider.refreshToken

            res.status(200)
            .cookie("accessToken",accessToken)
            .cookie("refreshToken",generatedRefreshToken)
            .json({"rider registered":updatedRider})

        }catch(err){
            next(err);
        }
}

const riderLogin=async (req, res, next)=>{
    try{
        const {email, password}=req.body

        // Validate req.body
        const schema=Joi.object({
            email: Joi.string()
                    .email()
                    .required(),
            password: Joi.string()
                        .required()
                        .min(6)
        })

        await schema.validateAsync(req.body)

        // Check rider existence
        const rider=await Rider.findOne({email})
        if(!rider){
            throw new ApiError(401, "User doesn't exist")
        }

        // Check password
        const passwordMatched=await bcrypt.compare(password, rider.password)
        if(!passwordMatched){
            throw new ApiError(404, "Incorrect email or password")
        }

        // Generate Access and Refresh tokens
        const accessToken=await generateAccessToken(rider._id)
        const generatedRefreshToken=await generateRefreshToken(rider._id)
        rider.refreshToken=generatedRefreshToken
        await rider.save()
        
        // Send user info
        const riderObject={
            email:rider.email,
            username:rider.username,
            profile_image:rider.profile_image
        }
        
        // Login successful send response
        res
        .status(200)
        .cookie("accessToken", accessToken)
        .cookie("refreshToken", generatedRefreshToken)
        .json({
            message:"Successfully logged in",
            rider:riderObject
        })

    }catch(err){
        next(err)
    }
}

const riderLogout=(req, res, next)=>{
    try{
        res
        .cookie("accessToken", "")
        .cookie("refreshToken", "")
        .json("Successfully logged out.")
    }catch(err){
        next(err)
    }
}

const riderRefreshAccessToken= async (req, res, next)=>{
    try{
        const {refreshToken}= req.cookies
        
        if(!refreshToken){
            throw new ApiError(401, "Refresh token not found!")
        }
        // Decode refresh token
        const riderDetails=await jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
        
        if(!riderDetails){
            throw new ApiError(401, "Invalid refresh token!")
        }

        // Find the refresh token and match
        const rider=await Rider.findById(riderDetails._id)
        if(rider.refreshToken!==refreshToken){
            throw new ApiError(401, "Invalid refresh token")
        }

        // Generate new refresh and access tokens
        const newRefreshToken=await generateRefreshToken(rider._id)
        const newAccessToken=await generateAccessToken(rider._id)

        if(!newRefreshToken || !newAccessToken){
            throw new ApiError(500, "Failed to generate tokens!")
        }

        // save refresh token in db
        rider.refreshToken=newRefreshToken
        await rider.save()


        res
        .status(200)
        .cookie("accessToken", newAccessToken)
        .cookie("refreshToken", newRefreshToken)
        .json("Token refreshed")

    }catch(err){
        next(err)
    }
    

}

module.exports={
    registerRider,
    riderLogout,
    riderLogin,
    riderRefreshAccessToken
}