const express=require('express');
const {createproduct,
    deleteProduct,
    getProducts,
    getProductsByCategory,
    uploadImage,
    productimageUpload
}=require('../controllers/products');
const router=express.Router();

router.route('/').post(createproduct);
router.route('/:id').get(getProducts).patch();
router.route('/categories/:category').get(getProductsByCategory);
router.route('/productimage').post(productimageUpload);


module.exports=router;