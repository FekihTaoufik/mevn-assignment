const Joi = require('joi')
const { password, objectId } = require('./custom.validation')

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
const patch = {
    params: Joi.object().keys({
        id: Joi.required().custom(objectId),
    }),
    body: Joi.object()
        .keys({
            body: Joi.string(),
        })
        .min(1),
}

const remove = {
    params: Joi.object().keys({
        id: Joi.string().custom(objectId),
    }),
}

module.exports = {
    create,
    get,
    patch,
    remove,
}
