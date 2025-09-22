// import User from "../db/Models/userModel";

import User from "../db/Models/userModel.js";

export const createUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = new User({ name, email });
    await user.save();
    res.status(201).json({ name, email });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

};


export const getUserByEmail = async (req, res) => { 
    try {   
        const{email} = req.params;
        const user = await User.findOne({email});
        if(!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ user });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }

}

export const getUserProfile = async (req, res) => {
    try{
        const userId = req.user.id;
        const presentUser = await User.findById(userId);
        console.log(presentUser, userId)

        return res.status(200).json(presentUser );
    }
    catch (error) {
        console.error(error.message);
        res.status(500).json({ message: error.message });
    }
}