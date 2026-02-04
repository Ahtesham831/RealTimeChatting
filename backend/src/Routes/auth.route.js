import express from "express"
import signup from "../Components/auth.controller.js"

const router = express.Router()

router.get('/signup', signup)

router.get('/login', (req, res) => {
    res.send("Welcome to Login tab")
})

export default router;