import User from "../models/UserModel.js";

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