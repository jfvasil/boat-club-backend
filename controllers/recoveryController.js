const express = require('express')
const User = require('../models/userAuthModel')
// const nodemailer = require("nodemailer")
const sgMail = require('@sendgrid/mail')


sgMail.setApiKey(process.env.SENDGRID_API_KEY)

async function sendEmail(email, code){
    try{

// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: process.env.SENDER_EMAIL,
//       pass: process.env.SENDER_PASSWORD
//     },
//   })

  const msg = {
    to: email,
    from:'lakewickaboagboatclub@gmail.com',
    subject: 'Boat Club Password Reset', 
    html: `<!DOCTYPE html>
    <html lang="en" >
    <head>
      <meta charset="UTF-8">
      <title>CodePen - OTP Email Template</title>
      
    
    </head>
    <body>
    <!-- partial:index.partial.html -->
    <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
      <div style="margin:50px auto;width:70%;padding:20px 0">
        <div style="border-bottom:1px solid #eee">
          <h1 style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Lake Wickaboag Boat Club</h1>
        </div>
        <p style="font-size:1.1em">Hi,</p>
        <p>Here is your password reset code. The code is valid for 5 minuetes.</p>
        <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${code}</h2>
        <p style="font-size:0.9em;">Regards,<br />LWBC Team</p>
        <hr style="border:none;border-top:1px solid #eee" />
        <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
          <p>Lake Wickaboag Boat Club</p>
        </div>
      </div>
    </div>
    <!-- partial -->
      
    </body>
    </html>`,
  }
   await sgMail.send(msg)
   console.log('Sent email sucessfully')
    }
  catch(error){
    console.error(error)
    throw {message: 'An error has occured'}
  }
}



const sendCode = async (req, res) => {

    const {email, code, expiration} = req.body

    try{
        const user = await User.findOne({email}).exec()
        
        if(!user){
            return res.status(400).json({message: 'Invalid Email'})
        }
       user.resetCode = code
       user.codeExpiration = new Date(expiration)

        await user.save()
        
        await sendEmail(email, code)
        
        res.sendStatus(200)
        
    } catch(err){
        res.status(500).json({message:'error test'})
        console.log(err)
    }
}

const resetPassword = async (req, res) => {
    const {code, newPassword} = req.body

    const resetCode = code
    try{
        const user = await User.findOne({
            resetCode

        }).exec()

        if(!user){
            return res.status(400).json({message: 'Invalid or expired code'})
        }

        user.password = newPassword
        user.resetCode = undefined
        user.codeExpiration = undefined

        await user.save()

        return res.status(200).json({message: 'Password reset sucessfully'})
    } catch(error){
        console.log(error)
        return res.status(500).json({message: 'Internal Server Error'})
    }
}

module.exports = {sendCode, resetPassword}