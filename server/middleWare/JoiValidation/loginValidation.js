import joi from "joi";

const safeRegex = /^[a-zA-Z0-9 _@.-]*$/;

export const loginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
});

export function loginValid(schema){
    return (req,res,next)=>{
        const {value,error}=schema.validate(req.body);
        if(error){  
            return res.status(400).send({error:error.details[0].message})
        }
        req.body=value;
        next();
    }
}