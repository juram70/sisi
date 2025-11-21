const { BadRequestError } = require('../errors/index');
const shops=require('../models/shops');
const products=require('../models/products');
const user=require("../models/User");
const path=require('path');
const { NotFoundError } = require('../errors');

//get all shops 
const getAllShops=async function (req,res) {

    const allshops=await shops.find({});
    
    res.json(allshops);
    
}
//getting sinlge shop for seller
const getShop=async function (req,res) {
    const {params:{id}}=req;

    const shop= await shops.findById(id)
    if(!shop){
    throw new BadRequestError("NO shop with that id")
    }
     
     
     const responseuser=await  user.findById(shop.shopownedby);
     

      if(!responseuser){
    throw new BadRequestError("Shop is not valid")
    }
 
     const shopId=shop._id;
    const shopproducts= await products.find({shopid:shopId});
    
    

    res.json({shop,responseuser,shopproducts});


}
//creating new shop
const createShop=async function (req,res) {
    // next line will be used when login implemented 😒 
    // req.body.ownedBy=req.user.userId;
    const shop=await shops.create(req.body);
    if(!shop){
        throw new BadRequestError('shop not created');
    }
      res.json(shop);
    
}
//get sellers shops
const getMyShops=async function(req,res){
    const id=req.user.userID;
    const shops=await shops.find({shopownedBy:id});

    if(!shop){
        throw new BadRequestError('You do not have shops')
    }
    res.json(shops);
}
//upadate shop
const updateShop=async function(req,res){
    const id=req.params;
    const ownerId=req.user.userID;
if(!id){
    throw new BadRequestError('No shop id');
}

const shop=await shops.find({_id:id,ownedBy:ownerId});

if(!shop){
    throw new BadRequestError("No shop with given id");
}

const {name,location,description,category}=req.body;

if(!name || !location || !description || !category){
    throw new BadRequestError("Name/location/description/category are required");

}

const updatedshop= await shops.findOneAndUpdate({_id:id},{name:name,location:location,description:description,category:category},{new:true});
 
res.json(updateShop);

}
//upload logo image for the shop
const uploadImage=async function (req,res) {
    if(!req.files){
        throw new BadRequestError("No file uploaded");
    }

    const uploadedImage=req.files.image;

    if(!uploadedImage.mimetype.startsWith('image')){
        throw new BadRequestError("File you uploaded is not valid Image")
    }

    const size=1024 * 1024;

    if(uploadedImage.size>size){
        throw new BadRequestError("File got big size!! uploade image with 1mb")
    }

   const imagepath=path.join(__dirname,"../public/uploads/logos/" + `${uploadedImage.name}`);

   uploadedImage.mv(imagepath,(error)=>{
    if(error){
        throw new BadRequestError(error);
    }
    res.json({imgUrl:`/uploads/logos/${uploadedImage.name}`});
   });


}
//get all shops base on category
const getshopsbycategory=async function (req,res) {
    const {category}=req.params;
    if(!category){
        throw new BadRequestError("No category provided");
    }
    const allshops=await shops.find({shopcategory:category});
    res.json(allshops);
}

//get shop categories
const getcategories= async function (req,res) {
     
   const categories=await shops.distinct('shopcategory');
   
   res.json(categories);
}

module.exports={
    getAllShops,
    createShop,
    getShop,
    getMyShops,
    updateShop,
    uploadImage,
    getshopsbycategory,
    getcategories,
}