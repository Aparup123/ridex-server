require('dotenv').config()
const express= require('express');
const cookieParser=require('cookie-parser')
const app = express();
const mongoose=require('mongoose')

app.use(express.json())
app.use(cookieParser())
const homeRouter=require('./routes/homeRouter');
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


connectDB()

app.use(errorHandler)


PORT=process.env.PORT || 3000;
app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    
});