const mongoose=require('mongoose')

const stationSchema = new mongoose.Schema({
    admins:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin'
    }],
    stationName: { 
        type: String, 
        required: true 
    },
    stationLocation: { 
        type: String, 
        required: true 
    },
    stationCapacity: { 
        type: Number, 
        required: true 
    },
    stationStatus:{
        type: String, 
        enum: ["Available", "Not Available"], 
        default: "Available" 
    },
    queue: {
        type: [{
            path: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Path'
            },
            drivers:[{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Driver'
            }]
        }],
        default: []
    },
    availablePaths:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Path'
        }
    ],
})

const Station=new mongoose.model('Station', stationSchema)
module.exports=Station