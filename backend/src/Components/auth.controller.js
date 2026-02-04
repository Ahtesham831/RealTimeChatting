import validator from "validator"
import userModel from "../models/userModel.js";
const signup = async (req, res) => {

    try {
        const { fullName, email, password } = req.body;
        const exist = await userModel.findOne({ email })

        if (!fullName) {
            return res.json({ success: false, message: "Please enter your full Name" })
        }

        if (!exist) {
            return res.json({ success: false, message: "User Already Exist" })
        }

        if (password.length < 8) {
            res.json({ success: false, message: "Password must be min 8 character" })
        }

        if (!validator.isEmail(email)) {
            res.json({ success: false, message: "Please Enter a valid Email" })
        }



    } catch (error) {

    }
}

export default signup;