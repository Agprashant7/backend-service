const { StatusCodes } = require("http-status-codes");
const User = require("../models/usersModal");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const shortid = require("shortid");

const signUp=async(req,res)=>{
    const{firstName,lastName,email,password}=req.body;
    if (!firstName || !lastName || !email || !password) {
        return res.status(StatusCodes.BAD_REQUEST).json
        ({message:"Please provide reqd info"})
    }
    const hash_password=await bcrypt.hash(password,10);
    const userData={
        firstName,lastName,email,hash_password
    }
    const user=await User.findOne({email:req.body.email});
    if(user){
        return res.status(StatusCodes.BAD_REQUEST).json({
            message:"User Already Registered"
        })
    }
    else{
        User.create(userData).then((data,err)=>{
            if(err)res.status(StatusCodes.BAD_REQUEST).json({message:err})
            else{
                res.status(StatusCodes.CREATED).json({message:'User Created Sucessfully'})
            }
        })
    }
}

const signIn=async(req,res)=>{
   
    try{
        
        if(!req.body.email || !req.body.password){
            res.status(StatusCodes.BAD_GATEWAY).json({message:'Please enter email and password'})
        }
        else{
            const user=await User.findOne({email:req.body.email})
        
            if(user){
                const auth= await user.authenticate(req.body.password)
                if(auth){
                    const token=jwt.sign({_id:user._id,role:user.role}, 
                    process.env.JWT_SECRET,{ expiresIn: "30d"});
                
                const{_id,firstName,lastName,email,role,fullName}=user;
                res.status(StatusCodes.OK).json({token,user:{_id,firstName,lastName,email,role,fullName}})
            }else {
                res.status(StatusCodes.UNAUTHORIZED).json({
                message: "Password is not matching",
                });
        }
    }
    else {
        res.status(StatusCodes.BAD_REQUEST).json({
            message: "User does not exist..!",
        })
    }
}
    
}
    catch(error) {
        res.status(StatusCodes.BAD_REQUEST).json({ error });
    }
}

module.exports={signIn,signUp};