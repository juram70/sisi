const mongoose=require('mongoose');
const User=require('./User');


const shopSchema= new mongoose.Schema({
shopname:{
    type:String,
    required:[true,"Please provide your shop name"],
    maxLength:60,
},
shoplocation:{
    type:String,
    required:[true,"Please provide location of your shop"]


},
shopdescription:{
    type:String,
    required:[true,"please provide what shop description"],
    minLength:20,
    maxLength:1000,
},
shopownedby:{
    type:mongoose.Types.ObjectId,
    ref:User,
    required:[true,"provide owner of the shop"]
},
shoplogo:{
    type:String,
    default:"/uploads/logos/Untitled design.png",
},
 shopcategory:{
        type:String,
        required:[true,"Please provide shop category"],

    }, 
 
    
        
    

},{timestamps:true});

module.exports= mongoose.model('Shops',shopSchema);

