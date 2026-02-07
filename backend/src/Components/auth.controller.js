import validator from "validator"
import userModel from "../models/userModel.js";
import generateToken from "../lib/utils.js";
import bcrypt from "bcrypt"
import sendWelcomeEmail from "../emails/emailHandler.js";
import "dotenv/config"
import mongoose from "mongoose";

const signup = async (req, res) => {

    try {
        const { fullName, email, password } = req.body;
        const exist = await userModel.findOne({ email })

        if (!fullName || !password || !email) {
            return res.status(400).json({ message: "All Feilds are requied" })
        }
        if (exist) {
            return res.status(400).json({ message: "User Already Exist" })
        }

        if (password.length < 8) {
            return res.status(400).json({ message: "Password must be at least 8 characters" })
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Please Enter a valid Email" })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            fullName,
            email,
            password: hashedPassword
        })

        const user = await newUser.save();
        const token = generateToken(user._id, res);

        res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            email: newUser.email,
            profilePic: newUser.profilePic
        })

        try {
            await sendWelcomeEmail(email, fullName, process.env.CLIENT_URL)
        } catch (error) {
            res.status(400).json({ message: "Invalid User Data" })
        }

    } catch (error) {
        console.log("Error is generated in signup", error);
        res.status(500).json("Internal Server Error");
    }
}

const login = async (req, res) => {

    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({ message: "All Fields are required" })
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Please Enter a valid email" })
        }


        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "email does not exist" })
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password)

        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Please enter a correct Password" })
        }

        generateToken(user._id, res);

        res.status(201).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic
        })
    } catch (error) {
        console.log("Error in login Controller")
        res.status(500).json({ message: "Internal Server Error" })
    }

};

const logout = (_, res) => {
    res.cookie("jwt", "", { maxAge: 0 })
    res.status(200).json({ message: "Logged Out Successfully" })
};

export { signup, login, logout };