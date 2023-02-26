const User = require('../modal/User.js')
const jwt = require('jsonwebtoken')

const maxAge = 60*60*24
const createToken = (id) => {
    jwt.sign({id}, 'login', {expiresIn: maxAge})
}

const login_get = (req, res) => {
  res.redirect('/login')
}
const login_post = async (req, res) => {

    const { email, password } = req.body
    try {
        const user = await User.login(email, password)
        const token = createToken(user._id)
        res.cookie('User', token, {httpOnly: true, maxAge: maxAge * 1000})
        console.log("hoşgeldin knk");
        console.log(token);
        return true
    } catch (error) {
        console.log(error)
        

    }
}

module.exports = {
    login_get,
    login_post
}