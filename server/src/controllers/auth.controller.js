const httpStatus = require('http-status')
const { User } = require('../models')
const jwt = require('jsonwebtoken')
const _ = require('lodash')

const signIn = (req, res) => {
    const { email, password } = req.body

    User.findOne({ email }, async (err, user) => {
        if (err) return res.status(httpStatus.BAD_REQUEST).send(err.message)

        if (!user || !(await user.isPasswordMatch(password)))
            return res
                .status(httpStatus.UNAUTHORIZED)
                .send('Incorrect email or password')

        const token = await jwt.sign(
            _.pick(user, ['role', 'id', 'email', 'name']),
            process.env.JWT_SECRET
        )

        res.send({ user, token })
    })
}

module.exports = {
    signIn,
}
