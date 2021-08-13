const mongoose = require('mongoose')
const { toJSON } = require('./plugins')

const commentSchema = mongoose.Schema(
    {
        body: {
            type: String,
            required: true,
            trim: true,
        },
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
        channel: {
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

/**
 * @typedef Comment
 */
const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment
