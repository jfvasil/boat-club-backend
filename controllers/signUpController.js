const User = require('../models/userAuthModel')

//Sign up mehthod
const signup = async (req, res) => {
    // const {token} = req.params
    const {name, email, password,} = req.body
    if(!name || !email || !password ){
      return res.status(400).json({'message': 'Username and password are required.'})
    }
  
     // Check if user already exists
     const existingUser = await User.findOne({ email }).exec()
     if (existingUser) {
       return res.status(400).json({ message: 'User already exists' })
     }
    try {
  
      // const errors = validationResult(req)
      // if(!errors.isEmpty()){
      //   return res.status(400).json({errors: errors.array()})
      // }
  
      // const member = await Member.findOne({token, used: false})
      // if(!member){
      //   return res.status(404).json({errors: 'Invalid token'})
      // }
     
  
      
      // Create new user
      const newUser = new User({ name, email, password})
      await newUser.save()
  
      //Mark token as used
      // member.used = true
      // await member.save()
  
      res.status(201).json({ message: 'Signup successful' })
    } catch (error) {
      res.status(500).json({ error: 'Signup failed' })
    }
  }

module.exports = {signup}