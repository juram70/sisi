const express=require('express');
const {createproduct,
    deleteProduct,
    getProducts,
    getProductsByCategory,
    uploadImage
}=require('../controllers/products');
const router=express.Router();

router.route('/').post(createproduct);
router.route('/:id').get(getProducts).patch();
router.route('/categories/:category').get(getProductsByCategory);
router.route('/productimage').post(uploadImage);


module.exports=router;