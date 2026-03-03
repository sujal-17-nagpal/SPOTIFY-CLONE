const express = require("express")
const { register, loginUser } = require("../controllers/auth.controlller")

const authRouter = express.Router()

authRouter.post('/register',register)
authRouter.post('/login',loginUser)

module.exports = authRouter