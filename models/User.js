const { required } = require('joi');
const bcryptjs = require('bcryptjs')
const mongoose=require('mongoose');


const UsersSchema=new mongoose.Schema({
    firstname:{
        type:String,
        required:[true,"jina la kwanza lina hitajika"]
    },
     Lastname:{
        type:String,
        required:[true,"jina la mwisho name linahitajika"]
     },
     phonenumber:{
        type:String,
        required:[true,"namba ina hitajika"],
        unique: true,
     },
     whatsappnumber:{
         type:String,
        required:[true," whatsapp namba ina hitajika"]
     },
      password: {
    type: String,
    required: [true, 'Please provide password'],
    minlength: 6,
}
});

UsersSchema.pre('save',async function(){
   if(!this.isModified('password')) return;
   const rounds=await bcryptjs.genSalt(10);
   const hashPassword= await bcryptjs.hash(this.password,rounds);

   this.password=hashPassword;
});


module.exports= mongoose.model("User",UsersSchema);