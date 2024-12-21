import { Schema } from "mongoose";

const tripSchema = new mongoose.Schema({
    driver_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Driver" 
    },
    rider_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Rider" 
    },
    price: { 
        type: Number, 
        required: true 
    },
    date: { 
        type: Date, 
        default: Date.now 
    },
    ride_status: { 
        type: String, 
        enum: ["Available", "Ongoing", "Cancelled"], 
        default: "Available" 
    },
    ride_type: { 
        type: String, 
        enum: ["4x","6x","8x"], 
        required: true 
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
  });
  
  module.exports = mongoose.model("Trip", tripSchema);