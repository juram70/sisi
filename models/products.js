const mongoose=require('mongoose');
const bcrypt = require('bcryptjs');
const Shop= require('./shops');

const productsSchema=new mongoose.Schema({
    productname:{
        type:String,
        required:[true,"please provide product name"],
        minLength:5,
        maxLength:40,
    },
    productimage:{
        type:String,
        required:[true,'please provide product image'],
        default:"/uploads/productsimages/Untitled design.png",
    },
    shopid:{
        type:mongoose.Types.ObjectId,
        ref:Shop,
        required:[true,"Please provide at what shop this product belong"]
    },
    productprice:{
        type:Number,
        required:[true,"Please provide price of the product"],
        default:0,

    },
   
    productdescription:{
        type:String,
        required:[true,"please provide product description"],
        minLength:20,
        maxLength:255,
    },
     

});

module.exports= mongoose.model('products',productsSchema);