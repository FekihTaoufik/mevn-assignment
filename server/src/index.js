const mongoose = require('mongoose')
const app = require('./app')
const port = process.env.PORT
let server

mongoose
    .connect(process.env.MONGODB_URL, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    })
    .then(() => {
        console.info('Connected to MongoDB')
        server = app.listen(port, () => {
            console.info(`Listening to port http://localhost:${port}`)
        })
    })
