const _ = require('lodash')
const User = require('../../../src/models/user.model')
const { auth } = require('../../../src/middlewares')
const jwt = require('jsonwebtoken')
const httpStatus = require('http-status')
let req, res, next, user

const userToCreate = {
    name: 'user1',
    email: 'user1@test.com',
    password: 'userTest1',
    role: 'user',
}

describe('Auth controller', () => {
    beforeEach(async function () {
        jest.clearAllMocks()
        process.env.JWT_SECRET = 'NOT A SECRET'
        req = {
            headers: {},
        }
        res = {
            status: jest.fn().mockImplementation(() => ({
                send: jest.fn().mockReturnThis(),
            })),
            json: jest.fn(),
        }
        next = jest.fn().mockReturnThis()

        const userCreated = await User.create(userToCreate)
        user = await User.findById(userCreated._id)
    })
    it('should tell if the user is authenticated or not', async () => {
        await auth.isAuthenticated(req, res, next)

        expect(next).not.toBeCalled()
        expect(res.status).toBeCalledWith(httpStatus.UNAUTHORIZED)

        req.headers['authorization'] =
            'Bearer ' +
            (await jwt.sign(
                _.pick(user, ['role', 'id', 'email', 'name']),
                process.env.JWT_SECRET
            ))
        await auth.isAuthenticated(req, res, next)
        expect(req.user).toStrictEqual(
            _.pick(user, ['role', 'id', 'email', 'name'])
        )
        expect(next).toBeCalled()
    })
    it('should verify the given role for the authenticated user', async () => {
        req.user = user

        await auth.hasRole('admin')(req, res, next)

        expect(next).not.toBeCalled()
        expect(res.status).toBeCalledWith(httpStatus.UNAUTHORIZED)

        await auth.hasRole('user')(req, res, next)

        expect(next).toBeCalled()
    })
})
