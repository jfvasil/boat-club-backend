
const jwt = require('jsonwebtoken')
// const {validationResult} = require('express-validator')
const User = require('../models/userAuthModel')
const Member = require('../models/memberModel')

//Register token Validation and form rendering
const signupAuth = async (req, res) => {

  try {
    const { token } = req.params;

    // Validate the token 
    const member = await Member.findOne({ token, used: false })
    if (!member) {
      return res.status(404).json({ error: 'Invalid token' })
    }

    // Render the signup form HTML and send it to the client
    res.sendFile('../views/index.html')
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
 
  
}


//Login method
const login = async (req, res) => {
const {email,password} = req.body
if(!email || !password){
  return res.status(400).json({'message': "Email and password are required"})
}
const foundUser = await User.findOne({email})
if(!foundUser || !foundUser.validPassword(password)){
  return res.SendStatus(401)
} 
// if(foundUser.validPassword(password) === password){
  const accessToken = jwt.sign(
    {"UserInfo": {
      "email": foundUser.email,
      "role": foundUser.role
    }
  },
    process.env.ACCESS_TOKEN_SECRET,
    {expiresIn: '30s'},
  )
  const refreshToken = jwt.sign(
    {"email": foundUser.email},
    process.env.REFRESH_TOKEN_SECRET,
    {expiresIn: '1d'},
  )
  //Saving the token
    foundUser.refreshToken = refreshToken
    const result = await foundUser.save()
    console.log(result)

    //create cookie 
    res.cookie('jwt', refreshToken,{ httpOnly: true, secure: false, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 })
   
    //send access token
  res.json({accessToken})
}
// }else{
//   res.sendStatus(401)
// }


//}



//Logout Method
const logout = async (req, res) => {
  const cookies = req.cookies
  if(!cookies?.jwt){
    return res.sendStatus(204)
  } 
  const refreshToken = cookies.jwt
//checking for refresh token
  const foundUser = await User.findOne({refreshToken}).exec()
  if(!foundUser){
    res.clearCookie('jwt', {httpOnly: true, sameSite: 'None', secure: true})
    return res.sendStatus(204)
  }
  //delete the refresh token
  foundUser.refreshToken = ''
  const result = await foundUser.save()
  console.log(result)

  res.clearCookie('jwt', {httpOnly: true, sameSite: 'None', secure: true})
  res.sendStatus(204)
}

module.exports = {signupAuth, login, logout}