const mongoose = require('mongoose')
const { toJSON } = require('./plugins')
const Comment = require('./comment.model')

const channelSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'User',
            required: true,
        },
        orderId: {
            type: Number,
        },
        georeferenceId: {
            type: Number,
        },
    },
    {
        timestamps: true,
    }
)

// add plugin that converts mongoose to json
channelSchema.plugin(toJSON)

channelSchema.post('findOneAndRemove', function (doc, next) {
    Comment.remove({ channel: doc._id }, (err, doc) => {
        next()
    })
})

/**
 * @typedef Channel
 */
const Channel = mongoose.model('Channel', channelSchema)

module.exports = Channel
