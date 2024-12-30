const Driver = require("../models/drivers.models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ApiError = require("../services/ApiError");
const ApiResponse = require("../services/ApiResponse");
const asyncHandler = require("../services/asyncHandler");
const generateAccessToken = require("../services/auth.services");
const generateRefreshToken = require("../services/auth.services");
const sendOtp = require("../services/auth.services");


//function to generate access and refresh token
const generateAccessandRefreshToken = async(userId)=>{
    try {
        const user =await User.findById(userId)

        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false})

        return {accessToken, refreshToken}

    } catch (error) {
        throw new ApiError(500,"Something went wrong while generating tokens")
    }
}

const registerDriver = asyncHandler(async (req, res) => {
    const { driverName, driverNumber, password, ride_type, routes, status} = 
    req.body;

    if ([driverName, driverNumber, password, ride_type, routes, status].includes(undefined)) {
        throw new ApiError(400,"All fields are required")
    }

    const {source, destination, waypoints} = routes;
    
    //validating phone no.,ride type
    const phoneregex = /^(?:\+91[\-\s]?)?[6-9]\d{9}$/;
    if (!phoneregex.test(driverNumber)) {
        throw new ApiError(400, "Invalid phone number");
    }

    if (!["4x", "6x", "8x"].includes(ride_type)) {
        throw new ApiError(400,"Invalid ride type");
    }

    const checkDriver = await Driver.findOne({ driverNumber });
    if (checkDriver) {
        throw new ApiError(400, "Driver already registered");
    }

    //ROUTE VALIDATION USING GMAP API (NOT IMPLEMENTED)

    const hashedPassword=await bcrypt.hash(password, 10)


    const newDriver = await Driver.create({
        driverName,
        driverNumber,
        password: hashedPassword,
        ride_type,
        car_info: {
            registration: "",
            insurance: "",
            permit: "",
            registration_number: "",
            inspection_expiration: "",
            driver_license: "",
        },
        routes: {
            source: {
                lat: 0,
                lng: 0,
                address: source.address
            },
            destination: {
                lat: 0,


                lng: 0,
                address: destination.address
            },
            waypoints: [
                {
                lat: 0,
                lng: 0,
                address: waypoints[0].address
            }
            ]
        },
        rating: 0,
        ride_history:[],
        profile_photo: "",
        residency_proof: "",
        status,
    });

    if(!newDriver){
        throw new ApiError(500,"Something went wrong registering user")
    }

    const createdDriver = await Driver.findById(newDriver._id).select(
        "-password -refreshToken"
    )

    if(!createdDriver){
        throw new ApiError(500,"Driver Registering failed")
    }
    
    res.status(201).json(
        new ApiResponse(200, createdDriver, "Driver registered")
    )

});

module.exports = { registerDriver };