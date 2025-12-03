const { BadRequestError,NotFoundError } = require('../errors/index');
const products=require('../models/products');
const path=require('path');
const shops=require('../models/shops');
const { error } = require('console');
const cloudinary=require("cloudinary").v2;
cloudinary.config({ 
        cloud_name:process.env.cloudinary_name, 
        api_key:process.env.cloudinary_key, 
        api_secret:process.env.cloudinary_api_secret,
    });




// create new product
const createproduct=async function(req,res){
   req.body.shopId=req.params.id; 
const product=await products.create(req.body);


if(!product){
   throw new BadRequestError("Product doesnt created");
}
  res.json(product);

};
// delete product
const deleteProduct=async function(req,res){
    req.json("deleteing product");
}

// get all products for single shop
const getProducts=async function (req,res){
    const shopId=req.params.id;
    

    const shopproducts=await products.find({shopid:shopId});
    

    if(!shopproducts){
        throw new NotFoundError('no products for this shop');
    }

    res.json(shopproducts);
}
// get products base on category
const getProductsByCategory = async (req, res) => {
  const { category } = req.params;
    
  // 1) get shops under that category
  const shopsInCategory = await shops.find({ shopcategory: category });

  // 2) For each shop, find products
  const productsArrays = await Promise.all(
    shopsInCategory.map(shop => products.find({ shopid: shop._id }))
  );

  // 3) Flatten results into one array
  const allProducts = productsArrays.flat();

  if (allProducts.length === 0) {
    throw new BadRequestError('No products in this category');
  }

  res.json(allProducts);
};

// uploading product images
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

   const imagepath=path.join(__dirname,"../public/uploads/productsimages/" + `${uploadedImage.name}`);

   uploadedImage.mv(imagepath,(error)=>{
    if(error){
        throw new BadRequestError(error);
    }
    res.json({imgUrl:`/uploads/productsimages/${uploadedImage.name}`});
   });


}

const productimageUpload=async function (req,res){
   
  if(!req.files){
      throw new BadRequestError("No image provided")
  }

  const uploadedImage= req.files.image;
  if(uploadedImage.size>size){
        throw new BadRequestError("File got big size!! uploade image with 1mb")
    }

  const uploadedimageresult= await cloudinary.uploader.upload(req.files.image.tempFilePath,{
    folder:"shoplogos"
  }).catch(error=>console.log(error));

res.json({imgUrl:uploadedimageresult.url})

}

module.exports={
    createproduct,
    deleteProduct,
    getProducts,
    getProductsByCategory,
    uploadImage,
    productimageUpload,
}


