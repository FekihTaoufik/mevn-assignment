const mongoose = require('mongoose')
const { toJSON, paginate } = require('./plugins')

const channelSchema = mongoose.Schema(
    {
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
    },
    {
        timestamps: true,
    }
)

// add plugin that converts mongoose to json
channelSchema.plugin(toJSON)
channelSchema.plugin(paginate)

/**
 * @typedef Channel
 */
const Channel = mongoose.model('Channel', channelSchema)

module.exports = Channel
