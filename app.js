require ('dotenv').config();

const express=require ("express");
const cors=require("cors");
const bodyParser=require("body-parser");
const connectDB=require("./database/connect");
const errorHandler=require("./mildwares/errorhandle");
const notFound=require("./mildwares/notFound");
const fileupload=require("express-fileupload");

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

app.use(errorHandler);
app.use(notFound);

app.get("/",(req,res)=>{
res.send("Welecome SiSi");
});


const start= async function name(params) {
     console.log(process.env.db_string);
    await connectDB(process.env.db_string);
    app.listen(process.env.Port || 3000,'0.0.0.0',()=>{
    console.log("Running on port 3000");
})
}

start();
