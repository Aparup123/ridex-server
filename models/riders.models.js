import mongoose from "mongoose";
import { Schema } from "mongoose";

const riderSchema = new Schema(
    {
        name: { 
            type: String, 
            required: true,
            unique: true, 
            trim: true,   
            index: true   
        },
        email: { 
            type: String, 
            unique: true,   
            trim: true,     
            required: true, 
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
            match: [        // Regex for phone number validation (adjust for your use case)
                /^\d{10}$/,
                "Please enter a valid 10-digit phone number"
            ]
        },
        password: {
            type: String,
            required: [true, "Password is required"]
        },
        refreshToken: {
            type: String 
        },
        location: {
            lat: { type: Number, required: true }, 
            lng: { type: Number, required: true }, 
            address: { type: String, required: true } 
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
