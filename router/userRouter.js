const express = require('express')
const mongoose = require('mongoose')
const User = require('../modal/User')
const router = express.Router()
const bcrypt = require('bcrypt')
const saltRounds = 10
const jwt = require('jsonwebtoken')

router.get('/', async (req, res, next) => {
  let token = req.headers.token
  jwt.verify(token, 'secretKey', (err, decoded) => {
    if(err) return res.status(401).json({
      title: 'unautherized'
    })
    User.findOne({ _id: decoded.userId }, (err, user) => {
      if (err) return console.log(err)
        return res.status(200).json({
          title: 'user grabbed',
          user: {
            fullName: user.fullName,
            email: user.email,
            todoList: user.todoList
          }
        })
    })
  })

})

router.put('/:id', async(req, res) => {
  try {
    const hashedPwd = await bcrypt.hash(req.body.password, saltRounds);
    const user = await User.findByIdAndUpdate(req.params.id, {
      fullName: req.body.fullName,
      email: req.body.email,
      password: hashedPwd
    })
    if (!user) throw Error('Something went wrong')
    const updated = { ...response._doc, ...req.body }
    res.status(200).json(updated)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.delete('/:id', async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id)
      res.status(200).send("Kullanıcı Başarıyla silindi")
    } catch (error) {
      res.status(500).json({message: error.message})
    }
})

module.exports = router