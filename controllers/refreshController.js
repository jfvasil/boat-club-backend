const User = require('../models/userAuthModel')
const jwt = require('jsonwebtoken')

const handleRefreshToken = async (req,res) => {
    const cookies = req.cookies
    if(!cookies.jwt){
        return res.sendStatus(403)
    }
    const refreshToken = cookies.jwt

    const foundUser = await User.findOne({refreshToken}).exec()
    if(!foundUser){
        return res.sendStatus(403)
    }
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if(err || foundUser.email !== decoded.email){
                return res.sendStatus(403)
            }
            const role = foundUser.role
            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "email": decoded.email,
                        "role": role
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn: '30s'}
            )
            res.json({role, accessToken})
        }
    )
}

module.exports = {handleRefreshToken}