import jwt from "jsonwebtoken";
import UserModel from "../models/userModel.js";
import {compare, genSalt, hash}  from "bcrypt";

const maxAge = 3 * 24 * 60 * 60 * 1000; // 3 days in milliseconds

// Create JWT token
const createToken = (id, email) => {
  return jwt.sign({ id, email }, process.env.JWT_KEY, {
    expiresIn: maxAge,
  });
};

export const signup = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send("Email and password are required");
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).send("Email is already registered");
    }

    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);

    const user = await UserModel.create({
      email,
      password: hashedPassword,
    });

    const token = createToken(user.id, email);

    res.cookie("jwt", token, {
      maxAge,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "None",
    });

    return res.status(201).json({
      user: {
        id: user.id,
        email: user.email,
        profileSetup: user.profileSetup,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // console.log(req.body);

    if (!email || !password) {
      return res.status(400).send("Email and password are required");
    }

    const user = await UserModel.findOne({ email });
    // console.log(":::",user);
    if (!user) {
      return res.status(404).send("User with given email is not found");
    }

    const auth = await compare(password, user.password);
    // console.log(auth);
    if (!auth) {
      return res.status(400).send("Password is incorrect");
    }

    const token = createToken(user.id, user.email);

    res.cookie("jwt", token, {
      maxAge,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "None",
    });

    return res.status(200).json({
      user: {
        id: user.id,
        email: user.email,
        profileSetup: user.profileSetup,
        firstName: user.firstName,
        lastName: user.lastName,
        image: user.image,
        color: user.color,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

export const getUserInfo = async(req,res) => {
  try {
    const userData = await UserModel.findById(req.userId)

    if(!userData){
      return res.status(404).send("User with given id is not found");
    }

    return res.status(200).json({
        id: userData.id,
        email: userData.email,
        profileSetup: userData.profileSetup,
        firstName: userData.firstName,
        lastName: userData.lastName,
        image: userData.image,
        color: userData.color,
    });
    
  } catch (error) {
    return res.status(500).send("Internal Server Error")
  }
}
