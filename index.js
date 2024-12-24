require('dotenv').config()
const express= require('express');
const cookieParser=require('cookie-parser')
const app = express();
const mongoose=require('mongoose')

app.use(express.json())
app.use(cookieParser())
const homeRouter=require('./routes/homeRouter');
const riderRouter = require('./routes/riderRouter');
const errorHandler=require('./middlewares/errorHandler')

app.use(homeRouter)
app.get('/', (req, res)=>{
    res.json({
        msg:"Success"
    })
})
app.use('/rider', riderRouter)


app.use(errorHandler)

PORT=process.env.PORT || 3000;
app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    await mongoose.connect('mongodb://localhost:27017/ridex')
    console.log('db connected')
});