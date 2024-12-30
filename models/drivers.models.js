const mongoose=require('mongoose')
const Schema = mongoose.Schema

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
                required: false,
                default: ""
            },
            insurance: { 
                type: String, 
                required: false,
                default: ""
            },
            permit: { 
                type: String, 
                required: false,
                default: ""
            }, 
            registration_number: { 
                type: String, 
                required: false,
                default: ""
            },
            inspection_expiration: { 
                type: Date, 
                required: false,
                default: ""
            },
            driver_license: { 
                type: String, 
                required: false,
                default: ""
            }
          },
    profile_photo: { 
        type: String, //cloudinary url
        required: false,
        default: ""
    }, 
    residency_proof: { 
        type: String, 
        required: false,
        default: ""
    },
    status:{
        type: String, 
        enum: ["Available", "Not Available"], 
        default: "Not Available" 
    },
    routes: {
        source:{
            lat: {type: Number, required: false, default: 0},
            lng: {type: Number, required: false, default: 0},
            address: {type: String, required: true, default: ""}
        },
        destination: {
            lat: {type: Number, required: false, default: 0},
            lng: {type: Number, required: false, default: 0},
            address: {type: String, required: true, default: ""}
        },
        waypoints: [
            {
            lat: {type: Number, required: false, default: 0},
            lng: {type: Number, required: false, default: 0},
            address: {type: String, required: true, default: ""}
        }
    ],
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



//temporary generating tokens

driverSchema.methods.generateAccessToken = function () {
    const accessToken = jwt.sign(
        { 
            id: this._id 
        }, 
            process.env.ACCESS_TOKEN_SECRET, 
        {
            expiresIn: "1d",
        }
    );
    return accessToken;
};

driverSchema.methods.generateRefreshToken = function () {
    const refreshToken = jwt.sign(
        { 
            id: this._id 
        }, 
            process.env.REFRESH_TOKEN_SECRET, 
        {
            expiresIn: "7d",
        }
    );
    return refreshToken;
};

module.exports = mongoose.model("Driver", driverSchema);
