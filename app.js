require('dotenv').config()


const express=require ("express");
const cors=require("cors");
const bodyParser=require("body-parser");
const connectDB=require("./database/connect");
const errorHandler=require("./mildwares/errorhandle");
const notFound=require("./mildwares/notFound");
const fileupload=require("express-fileupload");
const cron = require('node-cron');



const app=express();
app.use(express.static("public"));
app.use(express.json());
app.use(cors());
app.use(fileupload({useTempFiles:true}))




const shoprouter=require('./routes/shops');
const productsrouter=require('./routes/products');
const usersrouter=require('./routes/users');

app.use('/shops',shoprouter);
app.use('/products',productsrouter);
app.use('/auth',usersrouter);



app.get("/",(req,res)=>{
    
res.send("Welecome to SiSi");
});

app.use(errorHandler);
app.use(notFound);

const start= async function name(params) {
    
    await connectDB(process.env.db_String)
    app.listen(process.env.PORT || 3000,'0.0.0.0',()=>{
    console.log("Running on port 3000");
})
}


start();
