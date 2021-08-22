const Joi = require('joi')
const { password, objectId } = require('./validations')

const create = {
    body: Joi.object()
        .keys({
            body: Joi.string().required(),
            orderId: Joi.number(),
            georeferenceId: Joi.number(),
        })
        .or('orderId', 'georeferenceId'),
}

const get = {
    params: Joi.object().keys({
        id: Joi.string().optional().custom(objectId),
    }),
    query: Joi.object().keys({
        page: Joi.number().optional(),
        limit: Joi.number().optional(),
        sortBy: Joi.string().optional(),
    }),
}

module.exports = {
    create,
    get,
}
