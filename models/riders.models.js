const { required } = require('joi');
const mongoose=require('mongoose')

const riderSchema = new mongoose.Schema(
    {
        name: { 
            type: String, 
            trim: true,  
        },
        username:{
            type: String, 
            trim: true,   
            index: true   
        },
        email: { 
            type: String, 
            unique: true,   
            trim: true,
            match: [        
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                "Please fill a valid email address"
            ]
        },
        phone_number: { 
            type: String,
            required: true, 
            unique: true,   
            trim: true,
        },
        password: {
            type: String,
        },
        refreshToken: {
            type: String 
        },
        profile_image: {
            type: String, 
            default: ""   
        }
    },
    { 
        timestamps: true 
    }
);

module.exports = mongoose.model("Rider", riderSchema);
