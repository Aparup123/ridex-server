const Rider=require('../models/riders.models')
const bcrypt=require('bcrypt')
const { generateAccessToken, generateRefreshToken } = require('../services/auth.services')
const registerRider=async(req, res)=>{
    const {email, username, password}=req.body
        try{
            // check for existing rider with email or username
            const rider=await Rider.findOne({
                $or:[{email}, {username}]
            })

            if(rider){
                return res.status(401).json("username or email already exists!")
            }

            // Creating new rider
            // hash the given password
            const saltRounds=10
            const hashedPassword=await bcrypt.hash(password, saltRounds)

            const newRider=new Rider({email,username, password:hashedPassword})
            const savedRider=await newRider.save()

            if(!savedRider){
                return res.status(500).json("Something went wrong registering user")
            }

            // Generate refresh and access token
            const accessToken=await generateAccessToken(savedRider._id)
            const generatedRefreshToken=await generateRefreshToken(savedRider._id)
            
            // update rider refresh token
            savedRider.refreshToken=generatedRefreshToken
            var updatedRider=await savedRider.save()
            if(!updatedRider){
                return res.status(500).json("error saving refresh token")
            }

            updatedRider=updatedRider.toObject()
            delete updatedRider.password
            delete updatedRider.refreshToken

            res.status(200)
            .cookie("accessToken",accessToken)
            .cookie("refreshToken",generatedRefreshToken)
            .json({"rider registered":updatedRider})




        }catch(err){
            console.log(err)
            return res.status(500).json(
               "error"
            )
        }
}

module.exports={
    registerRider
}