const channelRoutes = require('./channel.routes.js')
const userRoutes = require('./user.routes.js')
const authRoutes = require('./auth.routes.js')
const commentRoutes = require('./comment.routes.js')
const express = require('express')

const router = express.Router()

router.use('/auth', authRoutes)
router.use('/user', userRoutes)
router.use('/comment', commentRoutes)
router.use('/channel', channelRoutes)

module.exports = router
