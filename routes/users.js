const express=require('express');
const {createUser,getUser,Login}=require('../controllers/users');
const router=express.Router();

router.route('/').get().post(createUser);
router.route('/:id').get(getUser);
router.route("/login").post(Login);



module.exports=router;