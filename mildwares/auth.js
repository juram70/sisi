const {UnAuthorizedError}=require('../errors/index');
const {isTokenValid}=require('../utilts/utilts')

const authencateUser=(req,res,next)=>{
    const token=req.signedCookies.token;

    if(!token){
        throw new UnAuthorizedError("Your not authorized try to login again")
    }
    try {
        const {_id}=isTokenValid(token);
        req.user={_id};
        next();
    } catch (error) {
        throw new UnAuthorizedError("Authentication is invalid!");s
    }

}

module.exports={
authencateUser
}
