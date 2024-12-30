const Driver = require("../models/drivers.models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ApiError = require("../services/ApiError");
const ApiResponse = require("../services/ApiResponse");
const asyncHandler = require("../services/asyncHandler");
const {sendOtp, generateAccessandRefreshToken} = require("../services/auth.services");
const { options } = require("joi");
const { UserDefinedMessageInstance } = require("twilio/lib/rest/api/v2010/account/call/userDefinedMessage");


//function to generate access and refresh token


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

    const {accessToken, refreshToken} = await generateAccessandRefreshToken(newDriver._id, Driver)

    const createdDriver = await Driver.findById(newDriver._id).select(
        "-password -refreshToken"
    )

    if(!createdDriver){
        throw new ApiError(500,"Driver Registering failed")
    }
    const options = {
        httpOnly: true,
        secure: true
    }
    res.status(201)
    .cookie("accessToken", accessToken , options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(200, createdDriver, "Driver registered")
    )

});

const loginDriver = asyncHandler(async (req, res) => {
    const { driverNumber, password } = req.body;

    if ([driverNumber, password].includes(undefined)) {
        throw new ApiError(400, "All fields are required");
    }

    const driver = await Driver.findOne({ driverNumber });

    if (!driver) {
        throw new ApiError(404, "Driver not Registered");
    }

    const isMatch = await bcrypt.compare(password, driver.password);

    if (!isMatch) {
        throw new ApiError(400, "Invalid credentials");
    }
    console.log(driver._id)
    const { accessToken, refreshToken } = await generateAccessandRefreshToken(driver._id);
    driver.refreshToken = refreshToken;
    await driver.save({ validateBeforeSave: false });

    const LoggedinDriver = await Driver.findById(driver._id).select(
        "-password -refreshToken"
    );

    const options = {
        httpOnly: true,
        secure: true
    }

    res.status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(200, LoggedinDriver, "Driver logged in")
    );
});
module.exports = { registerDriver, loginDriver };