const mongoose = require('mongoose')

const otpSchema=new mongoose.Schema({
    phone_number:{
        type:String,
        unique:true,
        require:true
    },
    otp:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
    
},{timestamps:true})

// Delete otp after 5 mins of creation
otpSchema.index({createdAt:1}, {expireAfterSeconds:60*5})

const Otp=mongoose.model('Otp', otpSchema)

module.exports=Otp