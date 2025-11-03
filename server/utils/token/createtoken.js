import jwt from "jsonwebtoken";
export function createToken(id,fullName,email,role,status){
   return jwt.sign({id,fullName,email,role,status},process.env.TOKENSECRETKEY,{expiresIn:"1h"});
}