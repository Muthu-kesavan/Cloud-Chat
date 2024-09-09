import mongoose from "mongoose";
import User from "../models/UserModel.js";
import Message from "../models/MessagesModel.js";

export const searchContacts = async(req, res)=>{
  try{
    const {searchTerm} = req.body;

    if(searchTerm === undefined || searchTerm === null){
      return res.status(400).send("searchTerm is required");
    }
    const cleanItem = searchTerm.replace(
    /[.*+?^{}()|[\]\\]/g,"\\$&"
    );
    const regex = new RegExp(cleanItem,"i");

    const contacts = await User.find({
      $and: 
      [
        { _id: { $ne: req.userId }}, 
        {
        $or: [{name: regex}, {email: regex}],
        },
      ],
    });
    return res.status(200).json({contacts});
  } catch(err){
    console.log({err})
  }

}

export const getContactsForDMList = async(req, res)=>{
  try{
    let {userId} = req;
    userId = new mongoose.Types.ObjectId(userId);

    const contacts = await Message.aggregate([
      {
        $match:{
          $or:[{sender: userId}, { recipient: userId}],
        },
    },
    {
      $sort:{timestamp: -1},
    },
    {
      $group: {
      _id: {
        $cond: {
          if: { $eq: ["$sender", userId] },
          then:"$recipient",
          else: "$sender",
        },
      },
      lastMessageTime: {$first: "$timestamp"},
    },
  },
  {
    $lookup:{
      from: "users",
      localField:"_id",
      foreignField: "_id",
      as: "contactInfo",
    },
  },
  {
    $unwind:"$contactInfo",
  },
  {
    $project: {
      _id: 1,
      lastMessageTime: 1,
      email: "$contactInfo.email",
      name: "$contactInfo.name",
      image: "$contactInfo.image",
      color: "$contactInfo.color",
    },
  },
  {
    $sort: { lastMessageTime: -1},
  }
  ]);
    return res.status(200).json({contacts});
  } catch(err){
    console.log({err})
  }
}