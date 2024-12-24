const ApiError = require("../services/ApiError")
const {va} = require('joi')

const errorHandler = (err, req, res, next) => {
    console.log(err)
    if (err.name=="ValidationError"){
        console.log({
            name:"Validation Error",
            message:err.details
        })
        return res.status(400).json({
            name:"Validation Error",
            message:err.details[0]?.message
        })}

    if(err instanceof ApiError)
        return res.status(err.status).json(err.message)
    else
        return res.status(500).json(err.message)
}

module.exports=errorHandler