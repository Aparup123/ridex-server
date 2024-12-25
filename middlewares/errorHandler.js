const ApiError = require("../services/ApiError")
const {va} = require('joi')

const errorHandler = (err, req, res, next) => {
    
    // Validation error
    if (err.name=="ValidationError"){
        console.log({
            name:"Validation Error",
            message:err.details
        })
        return res.status(400).json({
            name:"Validation Error",
            message:err.details[0]?.message
        })}

    // JWT token expired error
    if(err.name==="TokenExpiredError"){
        console.log({
            name:"TokenExpiredError",
            error: err
        })
        return res.status(400).json("Token expired!")
    }

    // Api error
    if(err instanceof ApiError){
        return res.status(err.status).json(err.message)
    }
   
    // Other errors
    console.log(err)
    return res.status(500).json(err.message)
}

module.exports=errorHandler