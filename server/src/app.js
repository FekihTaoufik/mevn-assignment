require('dotenv').config()

const express = require('express')
const cors = require('cors')
const passport = require('passport')
const xss = require('xss-clean')
const mongoSanitize = require('express-mongo-sanitize')
const routes = require('./routes')

const app = express()

app.use(cors())
app.options('*', cors())

app.use(express.json())

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }))

// sanitize request data
app.use(xss())
app.use(mongoSanitize())

// jwt authentication
app.use(passport.initialize())

app.use('/', routes)

app.on('error', (appErr, appCtx) => {
    console.error('app error', appErr.stack)
    console.error('on url', appCtx.req.url)
    console.error('with headers', appCtx.req.headers)
})

module.exports = app
