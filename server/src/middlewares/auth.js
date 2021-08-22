const jwt = require('jsonwebtoken')
const httpStatus = require('http-status')
const { User } = require('../models')
const _ = require('lodash')

const nonAuthorizedError = Error('Not authenticated, please consider to login')

const isAuthenticated = async (req, res, next) => {
    const authHeader = req.headers['authorization']
    try {
        if (!authHeader) throw nonAuthorizedError

        const token = authHeader.split(' ')[1]

        if (token == null) throw nonAuthorizedError

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findOne({ _id: decoded.id })
        if (!user) throw nonAuthorizedError

        req.user = _.pick(user, ['role', 'id', 'email', 'name'])

        return next()
    } catch (e) {
        return res.status(httpStatus.UNAUTHORIZED).send(e.message)
    }
}

const hasRole = (role) => (req, res, next) => {
    if (req.user?.role === role) return next()

    return res
        .status(httpStatus.UNAUTHORIZED)
        .send("You don't have admin access")
}

module.exports = { isAuthenticated, hasRole }
