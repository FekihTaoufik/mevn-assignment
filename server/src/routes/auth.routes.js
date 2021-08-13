const express = require('express')
const { authController } = require('../controllers')

const { authValidation } = require('../validations')
const { validate } = require('../middlewares')

const router = express.Router()

router.post('/signin', [validate(authValidation.post)], authController.signIn)

module.exports = router
