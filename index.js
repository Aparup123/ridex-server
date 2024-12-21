const express= require('express');
const app = express();
require('dotenv').config();
const homeRouter=require('./routes/homeRouter')
const generateOtp=require('./services/generateOtp');
const authRouter = require('./routes/auth/authRouter');
const mongoose=require('mongoose');

app.use(express.json());
app.use('/auth', authRouter);
app.get('/', (req, res)=>{
    const otp=generateOtp();
    res.json({
        msg:"Your OTP is:",
        otp: otp
    })
})

const connectDB=async()=>{
    await mongoose.connect('mongodb://localhost:27017/ridex')
    console.log("database connected");
}


PORT=process.env.PORT || 3000;
app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
});