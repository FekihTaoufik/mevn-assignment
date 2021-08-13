const httpStatus = require('http-status')
const { Comment, Channel } = require('../models')

const retrieveOrCreateChannel = (
    user,
    orderId = null,
    georeferenceId = null
) => {
    return new Promise((resolve, reject) => {
        Channel.findOne(
            { user, orderId, georeferenceId },
            (err, foundChannel) => {
                if (err) return reject(err)

                if (foundChannel) return resolve(foundChannel)
                else {
                    Channel.create(
                        { user, orderId, georeferenceId },
                        (err2, createdChannel) => {
                            if (err2) return reject(err2)
                            return resolve(createdChannel)
                        }
                    )
                }
            }
        )
    })
}

const get = async (req, res) => {
    Comment.find()
        .populate('user')
        .then((comments) => {
            res.send(comments)
        })
        .catch((err) => {
            return res.status(httpStatus.BAD_REQUEST).send(err.message)
        })
}

const create = (req, res) => {
    const { body, orderId, georeferenceId } = req.body

    retrieveOrCreateChannel(req.user.id, orderId, georeferenceId)
        .then((channel) => {
            const newComment = new Comment({
                body,
                orderId,
                georeferenceId,
                user: req.user.id,
                channel: channel._id,
            })
            newComment.save((err, comment) => {
                if (err)
                    return res.status(httpStatus.BAD_REQUEST).send(err.message)

                comment
                    .populate('user')
                    .execPopulate()
                    .then((result) => {
                        return res.send(result)
                    })
                    .catch((err2) => {
                        return res
                            .status(httpStatus.BAD_REQUEST)
                            .send(err2.message)
                    })
            })
        })
        .catch((err) => {
            if (err) return res.status(httpStatus.BAD_REQUEST).send(err.message)
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
