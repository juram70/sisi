const express=require('express');
const { getAllShops,
    createShop,
    getMyShops,
    getShop,
    updateShop,
    uploadImage,
    getshopsbycategory,
    getcategories
} = require('../controllers/shops');
const router=express.Router();

router.route('/').get(getAllShops).post(createShop);
router.route('/shop/:id').get(getShop).patch(updateShop);
router.route("/logo").post(uploadImage);
router.route("/shops/:category").get(getshopsbycategory);
router.route('/categories').get(getcategories);

module.exports=router;