import mongoose from "mongoose";
import userModel from "../models/userModel.js";
import channelModel from "../models/channelModel.js";

export const createChannel = async (req, res) => {
    try {  
        console.log(req.body);

        const { name, members } = req.body;
        const userId = req.userId;
        console.log("userId_______",userId);

        // Validate admin
        const admin = await userModel.findById(userId);
        console.log("admin::::", admin);
        if (!admin) {
            return res.status(400).send("Admin user not found.");
        }

        // Validate members
        const validMembers = await userModel.find({ _id: { $in: members } });
        console.log("validMembers::::", validMembers);
        if (validMembers.length !== members.length) {
            console.log("Some members are not valid users.");
            return res.status(400).send("Some members are not valid users.");
        }


        // Create new channel
        const newChannel = new channelModel({
            name,
            members,
            admin: userId ,
        });

        console.log("newChannel:::::", newChannel);

        await newChannel.save();
        return res.status(201).json({ channel: newChannel });

    } catch (error) {
        console.error("Error creating channel:", error);
        return res.status(500).send("Internal Server Error");
    }
};


  export const getUserChannels = async(req,res) => {
    try {
        const userId = new mongoose.Types.ObjectId(req.userId)
        console.log("userId+++++", userId);
        const channels = await channelModel.find({
            $or: [{ admin: userId }, { members: { $in: [userId] } }]
        }).sort({updatedAt: -1})

        console.log("channelsssssss++++", channels);

        return res.status(201).json({channels})
    } catch (error) {
        return res.status(500).send("Internal Server Error")
    }
  }

