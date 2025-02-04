import userModel from "../models/userModel.js";




export const searchContacts = async (req, res) => {
  try {
    const { searchTerm } = req.body;

    if (!searchTerm) {
      return res.status(400).send("searchTerm is required");
    }

    const sanitizedSearchToken = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(sanitizedSearchToken, "i");

    const contacts = await userModel.find({
      $and: [
        { _id: { $ne: req.userId } },
        {
          $or: [{ firstName: regex }, { lastName: regex }, { email: regex }],
        },
      ],
    });

    return res.status(200).json({ contacts });
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
};
