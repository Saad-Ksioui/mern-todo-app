const User = require('../Models/userModel')
const JWT = require('jsonwebtoken')


const createToken = (_id) => {
  return JWT.sign({_id}, process.env.SECRET, {expiresIn: '3d'})
}


// login user
const loginUser = async (req, res) => {
  const {email, password} = req.body
  try {
    const user = await User.login(email, password)

    const UserId = user._id
    //créer un jeton
    const token = createToken(UserId)

    res.status(200).json({UserId, email, token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// signup user
const signupUser = async (req, res) => {
  const {nom, email, password} = req.body
  try {
    const user = await User.signup(nom, email, password)

    const UserId = user._id
    //créer un jeton
    const token = createToken(UserId)

    res.status(200).json({UserId, email, token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}



module.exports = {
  signupUser,
  loginUser
}