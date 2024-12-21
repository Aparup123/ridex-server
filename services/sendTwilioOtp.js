const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
require('dotenv').config()
const sendTwilioOtp = async (ph_no, otp) => {
    try {
        // Ensure phone number is in E.164 format
        const formattedPhoneNumber = ph_no.startsWith('+') ? ph_no : `+${ph_no}`;
        
        const message = await client.messages.create({
            body: `Your otp is ${otp}`,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: formattedPhoneNumber
        });
        return message;
    } catch (error) {
        console.error('Twilio Error:', error);
        throw new Error(`Failed to send OTP: ${error.message}`);
    }
};

module.exports = sendTwilioOtp;