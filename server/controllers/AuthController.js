import { compare } from "bcrypt";
import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";

const validTime = 3 * 24 * 60 * 60 * 1000;
const Token = (email, userId)=> {
  return jwt.sign({email, userId}, process.env.JWT,{expiresIn: validTime})
};
export const signup = async (req, res, next) => {
  try{
    const {email, password} = req.body;
    if (!email || !password){
      return res.status(400).send("Email and password is required");
    }
    const user = await User.create({email, password});
    res.cookie("jwt", Token(email, user.id), {
      validTime,
      secure: true,
      sameSite: "None",
    });
    return res.status(201).json({user:{
      id: user.id,
      email: user.email,
      profileSetup: user.profileSetup,

    }})
  } catch(error){
    console.log({error});
    return res.status(500).send("Internal Server Error");
    
  }
};

export const login = async(req, res, next)=>{
  try{
    const {email, password} = req.body;
    if (!email || !password){
      return res.status(400).send("Email and password required");
    }
    const user = await User.findOne({email});
    if (!user) {
      res.status(400).send("User is not Found");
    }
    const auth = await compare(password, user.password);
    if (!auth){
      return res.status(400).send("Incorrect Password");
    }
    res.cookie("jwt", Token(email, user.id), {
      validTime,
      secure: true,
      sameSite: "None",
    });
    return res.status(200).json({
      user:{
        id: user.id,
        email: user.email,
        profileSetup: user.profileSetup,
        name: user.name,
        image: user.image,
        color: user.color,
      }
    })
  }catch(err){
    console.log({err});
    return res.status(500).send("Internal Server error");

  }
};