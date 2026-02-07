import validator from "validator"
import userModel from "../models/userModel.js";
import generateToken from "../lib/utils.js";
import bcrypt from "bcrypt"
import sendWelcomeEmail from "../emails/emailHandler.js";
import "dotenv/config"
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

export default signup;