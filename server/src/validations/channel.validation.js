const Joi = require('joi')
const { objectId } = require('./validations')

const get = {
    params: Joi.object().keys({
        id: Joi.string().optional().custom(objectId),
    }),
}

const remove = {
    params: Joi.object().keys({
        id: Joi.string().custom(objectId),
    }),
}

module.exports = {
    get,
    remove,
}
