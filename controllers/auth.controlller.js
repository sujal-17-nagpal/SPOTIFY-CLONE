
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

const loginUser = async(req,res)=>{
    try {
        const {userName,email,password} = req.body
        console.log(req.body)

        const User = await userModel.findOne({
            $or:[
                {userName},
                {email}
            ]
        })
        
        if(!User){
            return res.status(404).json({message : "no user exists with this email"})
        }

        const validPass = await bcrypt.compare(password,User.password)

        if(!validPass){
            return res.status(401).json({message:"incorrect password"})
        }

        const token = jwt.sign({
            id : User._id,
            role : User.role
        },process.env.JWT_SECRET)

        res.cookie("token",token)

        return res.status(200).json({
            message : "Login successful",
            User : {
                id : User._id,
                role : User.role,
                email : User.email,
                userName : User.userName
            }
        })

    } catch (error) {
        console.log(error.message)
        res.status(400).json({message : error.message})
    }
}

module.exports = {register,loginUser}