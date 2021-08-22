const _ = require('lodash')
const User = require('../../../src/models/user.model')
const { authController } = require('../../../src/controllers')
const jwt = require('jsonwebtoken')
let req, res

const userOne = {
    name: 'user1',
    email: 'user1@test.com',
    password: 'userTest1',
    role: 'user',
}

describe('Auth controller', () => {
    beforeEach(function () {
        jest.clearAllMocks()
        process.env.JWT_SECRET = 'NOT A SECRET'
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        }

        req = { body: {}, params: {} }
    })
    it('should sign in', async () => {
        const user = await User.create(userOne)

        req.body = {
            email: userOne.email,
            password: userOne.password,
        }

        await authController.signIn(req, res)

        const token = await jwt.sign(
            _.pick(user, ['role', 'id', 'email', 'name']),
            process.env.JWT_SECRET
        )
        expect(res.json).toBeCalledWith({
            user: expect.objectContaining(
                _.pick(user, ['role', 'id', 'email', 'name'])
            ),
            token,
        })
    })
})
