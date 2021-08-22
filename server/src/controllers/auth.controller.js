const httpStatus = require('http-status')
const { User } = require('../models')
const jwt = require('jsonwebtoken')
const _ = require('lodash')

const signIn = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email })

        if (!user || !(await user.isPasswordMatch(password)))
            throw new Error('Incorrect email or password')

        const token = await jwt.sign(
            _.pick(user, ['role', 'id', 'email', 'name']),
            process.env.JWT_SECRET
        )

        res.json({ user, token })
    } catch (err) {
        return res.status(httpStatus.BAD_REQUEST).json(err.message)
    }
}

module.exports = {
    signIn,
}
