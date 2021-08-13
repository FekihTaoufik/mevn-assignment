const Joi = require('joi')

const post = {
    body: Joi.object().keys({
        email: Joi.string().required().email(),
        password: Joi.string().required(),
    }),
}

module.exports = {
    post,
}
