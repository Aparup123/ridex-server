require('dotenv').config()
const express= require('express');
const cookieParser=require('cookie-parser')
const app = express();
const mongoose=require('mongoose')
const cors=require('cors')

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:"*",
    credentials: true
}));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));


//Importing Routes
const homeRouter=require('./routes/homeRouter');
const driverRouter = require('./routes/driverRouter');
const riderRouter = require('./routes/riderRouter');
const errorHandler=require('./middlewares/errorHandler');
const connectDB = require('./services/connectDB');

app.use(homeRouter)
app.get('/', (req, res)=>{
    res.json({
        msg:"Success"
    })
})
app.use('/rider', riderRouter)
app.use('/driver', driverRouter)

connectDB()

app.use(errorHandler)


PORT=process.env.PORT || 3000;
app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    
});