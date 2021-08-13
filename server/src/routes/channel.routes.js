const express = require('express')
const { channelController } = require('../controllers')
const { channelValidation } = require('../validations')
const { validate, auth } = require('../middlewares')
const ROLES = require('../config/roles')
const router = express.Router()

// List channels
// Delete channel (soft delete)

router
    .get(
        '/:id?',
        [
            auth.isAuthenticated,
            auth.hasRole(ROLES.ROLE_ADMIN),
            validate(channelValidation.get),
        ],
        channelController.get
    )
    .delete(
        '/:id',
        [
            auth.isAuthenticated,
            auth.hasRole(ROLES.ROLE_ADMIN),
            validate(channelValidation.remove),
        ],
        channelController.remove
    )

module.exports = router
