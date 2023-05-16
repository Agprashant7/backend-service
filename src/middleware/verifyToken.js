const jwt = require('jsonwebtoken');

const verifyToken=(req,res,next)=>{
  
    try {
        const token = req.header('authorization');
        // console.log("INSODE TOKEN",token)
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if(verified){
            console.log("INSODE verified",verified)
            req.body.userId=verified.id
            // res.send("Successfully Verified");
            next();
        }else{
            // Access Denied
            console.log("Access Denied",verified)
            return res.status(401).send(error);
        }
    } catch (error) {
        // Access Denied
        console.log("Access catch",error)
        return res.status(401).send(error);
    }

}
module.exports=verifyToken