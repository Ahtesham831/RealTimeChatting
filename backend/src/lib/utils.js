import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config();

const generateToken = (id, res) => {
    const token = jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "7d"
    })

    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 100, // this will be in milli seconds
        httpOnly: true, // javascript cannot acces this cookie : protect from xss attacks
        sameSite: "strict", // protect from CSRF attacts
        secure: process.env.NODE_ENV === "development" ? true : false
    })

    return token;
};

export default generateToken;