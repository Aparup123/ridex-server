
const generateOtp=require('../../services/generateOtp');
const Otp=require('../../db/otp.model');
const sendTwilioOtp = require('../../services/sendTwilioOtp');
const sendOtp=async (req, res)=>{
    const ph_no=req.body.ph_no;
    try{
        const otp=generateOtp();

        const phNoPresent=await Otp.findOne({ph_no:ph_no});
        if(phNoPresent){
            const updatePhNo=await Otp.findOneAndUpdate({ph_no:ph_no}, {otp:otp});
        }else{
            newOtp=new Otp({
                ph_no:ph_no,
                otp:otp
            })
            const savedNewOtp=await newOtp.save();
        }
        const message=await sendTwilioOtp(ph_no, otp)
        res.json({
            msg:"OTP sent successfully",
            ph_no: ph_no,
            otp: otp
        })
    }catch(err){
        console.log(err)
        res.status(500).json({
            msg:"Error sending OTP"
        })
    }
    
}

module.exports=sendOtp; 