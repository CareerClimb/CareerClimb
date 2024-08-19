import mongoose from 'mongoose';
import User from '../models/User.js';

/*  
  Saves the User state into mongodb
*/
// Login user
export const saveState = async (req, res) => {
  try {
      const { userID, filter, applications } = req.body;
      const user = await User.findOne({ _id: new mongoose.Types.ObjectId(userID) }); // find user
      if (!user) {
          return res.status(404).json({msg: "User not found"});
      }
      // save filter, applications objects to mongodb
      user.filter = filter;
      user.applications = applications;
      await user.save();
      res.status(200).json({}); 
  } catch (err) {
      console.log(err);
      res.status(500).json({error: err.message});
  }
};