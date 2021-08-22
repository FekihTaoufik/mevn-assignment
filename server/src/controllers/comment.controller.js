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
    try {
        const comments = await Comment.find().populate('user')
        res.json(comments)
    } catch (err) {
        return res.status(httpStatus.BAD_REQUEST).json(err.message)
    }
}

const create = async (req, res) => {
    const { body, orderId, georeferenceId } = req.body
    try {
        const channel = await retrieveOrCreateChannel(
            req.user.id,
            orderId,
            georeferenceId
        )
        if (!channel)
            throw new Error("Couldn't retrieve or create the comment's channel")
        const newComment = new Comment({
            body,
            orderId,
            georeferenceId,
            user: req.user.id,
            channel: channel._id,
        })
        await newComment.save()
        const newCommentCreated = await Comment.findById(
            newComment._id
        ).populate('user')

        res.json(newCommentCreated)
    } catch (err) {
        return res.status(httpStatus.BAD_REQUEST).json(err.message)
    }
}
const remove = async (req, res) => {
    const { id } = req.params
    try {
        const comment = await Comment.findOne({ _id: id })
        if (!comment) throw new Error(`Comment not found with id "${id}"`)

        const commentRemoved = await Comment.deleteOne()
        return res.json(commentRemoved)
    } catch (err) {
        return res.status(httpStatus.BAD_REQUEST).json(err.message)
    }
}

module.exports = {
    get,
    create,
    remove,
}
