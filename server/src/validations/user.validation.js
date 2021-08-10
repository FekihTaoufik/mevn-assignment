const Joi = require('joi')
const { password, objectId } = require('./custom.validation')

const create = {
    body: Joi.object().keys({
        email: Joi.string().required().email(),
        password: Joi.string().required().custom(password),
        name: Joi.string().required(),
        role: Joi.string().required().valid('user', 'admin'),
    }),
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
            email: Joi.string().optional().email(),
            password: Joi.string().optional().custom(password),
            name: Joi.string().optional(),
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
