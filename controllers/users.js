const UserModel=require('../models/User');
const {BadRequestError}=require('../errors/index');



const createUser=async function(req,res) {
    const {firstname,lastname,password,phonenumber,whatsappnumber}=req.body;
     const newUser={
        
     }
  const phonenumberAlreadyExists = await UserModel.findOne({ phonenumber });
  if (phonenumberAlreadyExists) {
    throw new BadRequestError('phone number already exists');
  }

    const user=await UserModel.create({
        firstname:firstname,
        Lastname:lastname,
        password:password,
        phonenumber:phonenumber,
        whatsappnumber:whatsappnumber,
    });

    res.json(user);
}

const getUser=async function(req,res){
  const {id}=req.params;
  const _id=id;
  const user=await UserModel.findById(id);

  if(!user){
    throw new BadRequestError('No user with this id')
  }

  res.json(user);
}
module.exports={
    createUser,
    getUser,
}