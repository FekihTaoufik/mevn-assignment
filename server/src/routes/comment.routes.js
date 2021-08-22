const express = require('express')
const { commentController } = require('./../controllers')
const { commentValidation } = require('../validations')
const { validate, auth } = require('../middlewares')
const router = express.Router()

router
    .get('/:id?', [validate(commentValidation.get)], commentController.get)
    .post(
        '/',
        [auth.isAuthenticated, validate(commentValidation.create)],
        commentController.create
    )

module.exports = router
