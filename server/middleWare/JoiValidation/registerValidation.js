import joi from "joi";

const safeRegex = /^[a-zA-Z0-9 _@.-]*$/;
const strongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+=-]).{8,}$/;

export const registerSchema = joi.object({
  fullName: joi.string().min(3).max(50).required().pattern(safeRegex),

  email: joi.string().email().required(),

  password: joi.string().required().pattern(strongPassword),
});

export function registerValid(schema){
    return (req,res,next)=>{
        const {value,error}=schema.validate(req.body);
        if(error){  
            return res.status(400).send({error:error.details[0].message})
        }
        req.body=value;
        next();
    }
}