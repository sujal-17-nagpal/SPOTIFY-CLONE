const express = require("express")
const { register, loginUser, logoutUser } = require("../controllers/auth.controlller")

const authRouter = express.Router()

authRouter.post('/register',register)
authRouter.post('/login',loginUser)

authRouter.post('/logout',logoutUser)

module.exports = authRouter