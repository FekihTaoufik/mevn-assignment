require('dotenv').config()
const seeder = require('mongoose-seed')
const data = require('./data.json')

// Connect to MongoDB via Mongoose
seeder.connect(
    process.env.MONGODB_URL,
    {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    },
    function () {
        // Load Mongoose models
        seeder.loadModels([
            'src/models/user.model.js',
            'src/models/comment.model.js',
            'src/models/channel.model.js',
        ])

        // Clear specified collections
        seeder.clearModels(['User', 'Comment', 'Channel'], function () {
            // Callback to populate DB once collections have been cleared
            seeder.populateModels(data, function () {
                seeder.disconnect()
            })
        })
    }
)

// Data array containing seed data - documents organized by Model
