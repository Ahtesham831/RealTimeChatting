import express from "express"


const router = express.Router()

router.get('/signup', (req, res) => {
    res.send("Welcome to Signup Page")
})

router.get('/login', (req, res) => {
    res.send("Welcome to Login tab")
})

export default router;