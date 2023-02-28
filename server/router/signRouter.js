const express = require('express')
const router = express.Router()
const signController = require('../controller/signController')

router.post('/', signController.sign_post)

module.exports = router