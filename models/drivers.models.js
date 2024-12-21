import mongoose from "mongoose";
import { Schema } from "mongoose"

const driverSchema = new Schema({
    driverName:{ 
        type: String, 
        required: true 
    },
    driverNumber: { 
        type: String, 
        required: true 
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    refreshToken:{
        type: String
    },
    ride_type: { 
        type: String, 
        enum: ["4x","6x","8x"], 
        required: true },
    car_info: {
            registration: { 
                type: String, 
                required: true 
            },
            insurance: { 
                type: String, 
                required: true 
            },
            permit: { 
                type: String, 
                required: true 
            }, 
            registration_number: { 
                type: String, 
                required: true 
            },
            inspection_expiration: { 
                type: Date, 
                required: true 
            },
            driver_license: { 
                type: String, 
                required: true 
            }
          },
    profile_photo: { 
        type: String, //cloudinary url
        required: true 
    }, 
    residency_proof: { 
        type: String, 
        required: true 
    },
    status:{
        type: String, 
        enum: ["Available", "Not Available"], 
        default: "Available" 
    },
    routes: {
        source:{
            lat: {type: Number, required: true},
            lng: {type: Number, required: true},
            address: {type: String, required: true}
        },
        destination: {
            lat: {type: Number, required: true},
            lng: {type: Number, required: true},
            address: {type: String, required: true}
        },
        waypoints: {
            lat: {type: Number, required: true},
            lng: {type: Number, required: true},
            address: {type: String, required: true}
        }
    },
    rating: {
        type: Number,
        default: 0
    },
    ride_history: {
        type: Array,
        default: []
    }
}, {timestamps: true});

module.exports = mongoose.model("Driver", driverSchema);
