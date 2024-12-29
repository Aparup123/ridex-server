const mongoose=require('mongoose')

const locationSchema=new mongoose.Schema({
    lat: { 
        type: Number, 
        required: true 
    },
    lng: { 
        type: Number, 
        required: true 
    },
})

const pathSchema = new mongoose.Schema({
    source: { 
        type: locationSchema, 
        required: true 
    },
    destination: { 
        type: locationSchema, 
        required: true 
    },
    waypoints: { 
        type: [locationSchema], 
    },
    distance: { 
        type: Number, 
        required: true 
    },
})

const Path=new mongoose.model('Path', pathSchema)
module.exports=Path