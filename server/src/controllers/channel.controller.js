const { Channel, Comment } = require('../models')
const httpStatus = require('http-status')
const get = async (req, res) => {
    const { id } = req.params
    if (id)
        Channel.findById(id, (err, channel) => {
            if (err) return res.status(httpStatus.BAD_REQUEST).send(err.message)

            if (!channel)
                return res
                    .status(httpStatus.NOT_FOUND)
                    .send(`Channel not found with id "${id}"`)
            res.send(channel)
        })
    else
        Channel.aggregate([
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
            { $unset: ['_id', '__v'] },
        ])
            .then((channels) => {
                res.send(channels)
            })
            .catch((err) => {
                return res.status(httpStatus.BAD_REQUEST).send(err.message)
            })
}

const remove = (req, res) => {
    const { id } = req.params

    Channel.findOneAndRemove({ _id: id }, function (err, channel) {
        if (err) return res.status(httpStatus.BAD_REQUEST).send(err.message)
        return res.send()
    })
}
module.exports = {
    get,
    remove,
}
