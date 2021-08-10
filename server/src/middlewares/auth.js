const jwt = require('jsonwebtoken')
const httpStatus = require('http-status')
const { User } = require('../models')
const _ = require('lodash')

const isAuthenticated = async (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null)
        return res.status(httpStatus.UNAUTHORIZED).send('Not authenticated')

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findOne({ _id: decoded.id })
        if (!user)
            return res.status(httpStatus.UNAUTHORIZED).send('Not authenticated')

        req.user = _.pick(user, ['role', 'id', 'email', 'name'])

        return next()
    } catch (e) {
        return res.status(httpStatus.BAD_REQUEST).send(e.message)
    }
}

const hasRole = (role) => (req, res, next) => {
    if (req.user?.role === role) return next()

    return res
        .status(httpStatus.UNAUTHORIZED)
        .send("You don't have admin access")
}

module.exports = { isAuthenticated, hasRole }
