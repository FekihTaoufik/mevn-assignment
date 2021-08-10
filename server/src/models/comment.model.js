const mongoose = require('mongoose')
const { toJSON, paginate } = require('./plugins')

const commentSchema = mongoose.Schema(
    {
        body: {
            type: String,
            required: true,
            trim: true,
        },
        userId: {
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
        channelId: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Channel',
            required: false,
        },
    },
    {
        timestamps: true,
    }
)

// add plugin that converts mongoose to json
commentSchema.plugin(toJSON)
commentSchema.plugin(paginate)

/**
 * @typedef Comment
 */
const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment
