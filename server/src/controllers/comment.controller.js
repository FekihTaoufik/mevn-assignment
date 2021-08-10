const httpStatus = require('http-status')
const { Comment } = require('../models')
const get = async (req, res) => {
    const filters = {}
    const { page, limit, sortBy } = req.query
    try {
        const comments = await Comment.paginate(filters, {
            page,
            limit,
            sortBy,
        })
        return res.send(comments)
    } catch (e) {
        return res.status(500).send(e.message)
    }
}

const create = (req, res) => {
    const newComment = new Comment({ ...req.body, userId: req.user.id })

    newComment.save((err, comment) => {
        if (err) return res.status(httpStatus.BAD_REQUEST).send(err.message)
        return res.send(comment)
    })
}
const remove = (req, res) => {
    const { id } = req.params

    Comment.findOne({ _id: id }, function (err, comment) {
        if (err) return res.status(httpStatus.BAD_REQUEST).send(err.message)
        if (!comment)
            return res.status(404).send(`Comment not found with id "${id}"`)

        comment.remove(function (err) {
            if (err) return res.status(httpStatus.BAD_REQUEST).send(err.message)
            return res.status(httpStatus.NO_CONTENT).send()
        })
    })
}

const patch = (req, res) => {
    const { id } = req.params
    Comment.findOneAndUpdate(
        { _id: id },
        req.body,
        { new: true },
        function (err, comment) {
            if (err) return res.status(httpStatus.BAD_REQUEST).send(err.message)

            if (!comment)
                return res.status(404).send(`Comment not found with id "${id}"`)
            res.send(comment)
        }
    )
}

module.exports = {
    get,
    create,
    remove,
    patch,
}
