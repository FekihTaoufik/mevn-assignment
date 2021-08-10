const status = require('http-status')
const _ = require('lodash')

const validate = (schema) => (req, res, next) => {
    let errors = []

    const toValidate = Object.keys(schema)
    for (let i = 0; i < toValidate.length; i++) {
        const attr = toValidate[i]

        const { error, value } = schema[attr].validate(req[attr], {
            abortEarly: false,
        })
        if (error) errors = errors.concat(error.details.map((d) => d.message))
        req[attr] = value
    }

    if (errors.length > 0) return res.status(status.BAD_REQUEST).send(errors)
    return next()
}

module.exports = validate
