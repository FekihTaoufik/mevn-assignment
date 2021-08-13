const { User } = require('../models')
const httpStatus = require('http-status')
const get = async (req, res) => {
    const { id } = req.params
    if (id)
        User.findById(id, (err, user) => {
            if (err) return res.status(httpStatus.BAD_REQUEST).send(err.message)

            if (!user)
                return res
                    .status(httpStatus.BAD_REQUEST)
                    .send(`User not found with id "${id}"`)
            res.send(user)
        })
    else
        User.find({}, (err, users) => {
            if (err) return res.status(httpStatus.BAD_REQUEST).send(err.message)

            res.send(users)
        })
}

const create = (req, res) => {
    const { name, email, password, role } = req.body

    User.findOne({ email }, (err, user) => {
        if (user)
            return res
                .status(httpStatus.BAD_REQUEST)
                .send(`User already exist with this email`)

        const newUser = new User({ name, email, password, role })

        newUser.save((err, user) => {
            if (err) return res.status(httpStatus.BAD_REQUEST).send(err.message)
            return res.send(user)
        })
    })
}
const patch = (req, res) => {
    const { id } = req.params
    User.findOneAndUpdate(
        { _id: id },
        req.body,
        { new: true },
        function (err, user) {
            if (err) return res.status(httpStatus.BAD_REQUEST).send(err.message)

            if (!user)
                return res.status(404).send(`User not found with id "${id}"`)

            res.send(user)
        }
    )
}
const remove = (req, res) => {
    const { id } = req.params

    User.findOne({ _id: id }, function (err, user) {
        if (err) return res.status(httpStatus.BAD_REQUEST).send(err.message)
        if (!user) return res.status(404).send(`User not found with id "${id}"`)

        user.remove(function (err, doc) {
            if (err) return res.status(httpStatus.BAD_REQUEST).send(err.message)
            return res.status(httpStatus.NO_CONTENT).send()
        })
    })
}
module.exports = {
    get,
    create,
    patch,
    remove,
}
