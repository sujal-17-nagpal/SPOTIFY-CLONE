
const userModel = require("../model/user.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const register = async(req,res)=>{
    try {
        const {userName,email,password,role = "user"} = req.body
        if(!userName || !email || !password){
            return res.status(400).json({message:"required fields are misssing"})
        }

        const existingUser = await userModel.findOne({
            $or:[
                {email},
                {userName}
            ]
        })
        if(existingUser){
            return res.status(409).json({message : "user with this email already exists"})
        }

        const hashPassword = await bcrypt.hash(password,10)


        const User = await userModel.create({

            userName,email,role,
            password: hashPassword
        })

        const token = jwt.sign({
            id : User._id,
            role : User.role
        },process.env.JWT_SECRET)

        res.cookie("token",token)

        res.status(201).json({
            message : "user created successfully",
            userName : User.userName,
            email : User.email
        })


    } catch (error) {
        console.log(error.message)
        res.send(error.message)
    }
}

module.exports = {register}