const { User } = require('../models')
const httpStatus = require('http-status')
const bcrypt = require('bcryptjs')
const get = async (req, res) => {
    const { id } = req.params
    try {
        if (id) {
            const user = await User.findById(id)
            if (!user) throw new Error(`User not found with id "${id}"`)

            return res.json(user)
        } else {
            const users = await User.find({})
            return res.json(users)
        }
    } catch (err) {
        return res.status(httpStatus.BAD_REQUEST).json(err.message)
    }
}

const create = async (req, res) => {
    const { name, email, password, role } = req.body
    try {
        const userFound = await User.findOne({ email })
        if (userFound) throw new Error(`User already exist with this email`)

        const newUser = new User({ name, email, password, role })

        const newUserCreated = await newUser.save()

        const user = await User.findById(newUserCreated._id)
        return res.json(user)
    } catch (err) {
        return res.status(httpStatus.BAD_REQUEST).json(err.message)
    }
}
const patch = async (req, res) => {
    const { id } = req.params
    try {
        if (req.body.password)
            req.body.password = await bcrypt.hash(req.body.password, 8)

        const updatedUser = await User.findOneAndUpdate({ _id: id }, req.body, {
            new: true,
        })
        if (!updatedUser) throw new Error(`User not found with id "${id}"`)

        const user = await User.findById(updatedUser._id)
        return res.json(user)
        res.json(user)
    } catch (err) {
        return res.status(httpStatus.BAD_REQUEST).json(err.message)
    }
}
const remove = async (req, res) => {
    const { id } = req.params
    try {
        const user = await User.findOne({ _id: id })

        if (!user) throw new Error(`User not found with id "${id}"`)

        await user.remove()
        return res.json()
    } catch (err) {
        return res.status(httpStatus.BAD_REQUEST).json(err.message)
    }
}
module.exports = {
    get,
    create,
    patch,
    remove,
}
