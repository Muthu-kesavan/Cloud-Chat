import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const verifyToken = (req, res, next)=> {
  const token = req.cookies.jwt;
  if (!token){
    return res.status(401).send("Your not authenticated");
  }
  jwt.verify(token, process.env.JWT, async(err, payload)=>{
    if(err){
      return res.status(403).send("Token is not valid");
    }
    //console.log('Payload:', payload);
    req.userId = payload.userId;
    next();
  });
  
}
