const mongoose=require('mongoose');

const otpSchema=new mongoose.Schema({
    ph_no: String,
    otp: String
})

const Otp=mongoose.model('Otp',otpSchema);

module.exports=Otp