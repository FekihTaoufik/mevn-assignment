const { Channel, Comment } = require('../models')
const httpStatus = require('http-status')
const get = async (req, res) => {
    try {
        const channels = await Channel.aggregate([
            {
                $lookup: {
                    from: Comment.collection.name,
                    localField: '_id',
                    foreignField: 'channel',
                    as: 'comments',
                },
            },
            {
                $addFields: { id: '$_id', nbComments: { $size: '$comments' } },
            },
        ])
        res.json(channels)
    } catch (err) {
        return res.status(httpStatus.BAD_REQUEST).json(err.message)
    }
}

const remove = async (req, res) => {
    const { id } = req.params
    try {
        const removedChannel = await Channel.findOneAndRemove({ _id: id })
        return res.json(removedChannel)
    } catch (err) {
        return res.status(httpStatus.BAD_REQUEST).json(err.message)
    }
}
module.exports = {
    get,
    remove,
}
