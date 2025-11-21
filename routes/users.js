const express=require('express');
const {createUser,getUser}=require('../controllers/users');
const router=express.Router();

router.route('/').get().post(createUser);
router.route('/:id').get(getUser);



module.exports=router;