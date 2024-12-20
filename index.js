const express= require('express');
const app = express();
const homeRouter=require('./routes/homeRouter')


app.use(homeRouter)
app.get('/', (req, res)=>{
    res.json({
        msg:"Success"
    })
})



PORT=process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});