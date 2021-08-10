const express = require('express')
const { userController } = require('../controllers')
const { userValidation } = require('../validations')
const { validate, auth } = require('../middlewares')
const ROLES = require('../config/roles')
const router = express.Router()

router
    .get(
        '/:id?',
        [
            auth.isAuthenticated,
            auth.hasRole(ROLES.ROLE_ADMIN),
            validate(userValidation.get),
        ],
        userController.get
    )
    .post(
        '/',
        [
            auth.isAuthenticated,
            auth.hasRole(ROLES.ROLE_ADMIN),
            validate(userValidation.create),
        ],
        userController.create
    )
    .patch(
        '/:id',
        [
            auth.isAuthenticated,
            auth.hasRole(ROLES.ROLE_ADMIN),
            validate(userValidation.patch),
        ],
        userController.patch
    )
    .delete(
        '/:id',
        [
            auth.isAuthenticated,
            auth.hasRole(ROLES.ROLE_ADMIN),
            validate(userValidation.remove),
        ],
        userController.remove
    )

module.exports = router
