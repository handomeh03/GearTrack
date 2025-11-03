import { User } from "../models/UserModel.js";
import bcrypte from "bcrypt";
import { createToken } from "../utils/token/createtoken.js";

export async function register(req,res) {
    let {fullName,email,password}=req.body;
    //check the input use registerValidation middleWare

    try {

    // check if user is in database
     let userfind =await User.findOne({email});
     if(userfind){
      return  res.status(400).send({error:"user already exist"});
     }

     // to hash the password
     let salt=await bcrypte.genSalt(10);
     let hashPassword=await bcrypte.hash(password,salt);

    //generate user and store in database
     const newUser={fullName,email,password:hashPassword};
     const user=await User.create(newUser);

     // generate token and send as respone
     const token =createToken(user._id,user.fullName,user.email,user.role,user.status);


    return res.status(201).send({token});

    } catch (error) {
      return  res.status(500).send({error:error.message });
    }
    
    
}

export async function login(req,res) {
    let{email,password}=req.body;
    // validate the input using login middleWare

    try {
        
        //check if email is exist in database
        const user=await User.findOne({email});
        if(!user){
            return res.status(400).send({error:"user not found"});
        }

        //check if the password is correct
        const match=await bcrypte.compare(password,user.password);
        if(!match){
            res.status(400).send({error:"user not found"});
        }

        //generate token and send it
        const token =createToken(user._id,user.fullName,user.email,user.role,user.status);
        return res.status(201).send({token});
 
        
    } catch (error) {
        return res.status(500).send({error:error.message});
    }
}

export async function getMe(req,res) {
    let {id,fullName,email,role,status}=req.user;

    // return the data of user 

    const user={
        id,
        fullName,
        email,
        role,
        status
    }
  
    return res.status(201).send({user});
    
}

