const Admin = require("../modals/Admin")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userRegistration = async (req, res)=>{
  try {
    const {firstName, lastName, email, password, country} = req.body
    if(!firstName || !lastName || !email || !password || !country){
    return  res.status(400).json({message: "All details are required", success: false})
    }
    isExisting = await Admin.findOne({email: email})
    if(isExisting){
     return res.status(400).json({message: "User already exists", success: false})
    }
    const hashPwd = await bcrypt.hash(password, 10)
    const newAdmin = new Admin({
      firstName,
      lastName,
      email,
      country,
      password: hashPwd,
    })
    await newAdmin.save()
    const token = jwt.sign(
      {userId: newAdmin._id},
      process.env.SECRET_KEY,
      { expiresIn: "24h" }
    )
    res.status(200).json({
      message: "User registered and logged in successfully",
      success: true,
      token: token,
      firstName: newAdmin.firstName,
      lastName: newAdmin.lastName,
      email: newAdmin.email,
      country: newAdmin.country
    })
  } catch (error) {
    console.log(error)
  }
}

const userLogin = async (req, res)=>{
  try {
    const {email, password} = req.body
    if(!email || !password){
      res.status(400).json({message: "Invalid Credentials", success: false})
    }
    const user = await Admin.findOne({email: email})
    if(!user){
      return res.status(404).json({message: "User does not exists", success: false})
    }
    const matchedPwd = await bcrypt.compare(password, user.password)
    if(!matchedPwd){
      return res.status(400).json({message: "You have entered a wrong password", success: false})
    }
    const token = jwt.sign(
      {userId: user._id},
      process.env.SECRET_KEY,
      { expiresIn: "60h" }
    )
    res.status(200).json({
      message: "User loggedin successfully",
      success: true,
      token: token,
      firstName: user.firstName,
      lastName: user.lastName,
      country: user.country,
      email: user.email
    })
  } catch (error) {
    console.log(error)
  }
}

const UpdatePassword = async (req, res)=>{
  try {
    const email = req.body.email
    const user = await Admin.findOne({email: email})
    const {oldPassword, newPassword} = req.body
    const comparePassword = await bcrypt.compare(oldPassword, user.password)
    if(!comparePassword){
     return res.status(400).json({message: "Your old password is incorrect", success: false})
    }
    if(oldPassword === newPassword){
     return res.status(400).json({message: "Your old password and new password are same", success: false})
    }
      const hashPwd = await bcrypt.hash(newPassword, 10)
       user.password = hashPwd
       user.name = newName
       const response = await user.save()
       res.status(200).json({message: "Details Updated Successfully", success: true})
  }catch(error){
    console.log(error)
  }
}

  module.exports = {userRegistration, userLogin, UpdatePassword}