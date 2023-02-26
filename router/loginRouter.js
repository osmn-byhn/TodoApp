const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../modal/User.js')
const authController = require('../controller/loginController.js')
const router = express.Router()


router.get('/', authController.login_get )
//router.post('/', authController.login_post)


router.post("/", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const cmp = await bcrypt.compare(req.body.password, user.password);
      if (cmp) {
        let token = jwt.sign({userId: user._id}, "secretKey")
        return res.status(200).json({
          title: 'login successful',
          token: token
        })
      } else {
        return res.status(401).json({
          title: 'login failed',
          error: 'Wrong password'
        })
      }
    } else {
      return res.status(401).json({
        title: 'login failed',
        error: 'Wrong email'
      })
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server error Occured");
  }
});

module.exports = router