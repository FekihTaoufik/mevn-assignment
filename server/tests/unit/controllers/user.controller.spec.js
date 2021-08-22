const flushPromises = require('flush-promises')

const User = require('../../../src/models/user.model')
const { userController } = require('../../../src/controllers')
let req, res

const userOne = {
    name: 'user1',
    email: 'user1@test.com',
    password: 'userTest1',
    role: 'user',
}
const userOneUpdatedFields = {
    name: 'user1_new',
    email: 'user1-new@test.com',
    password: 'userTest1_new',
    role: 'admin',
}
const userTwo = {
    name: 'user2',
    email: 'user2@test.com',
    password: 'userTest2',
    role: 'user',
}
const usersToCreate = [userOne, userTwo]

describe('User controller', () => {
    beforeEach(function () {
        jest.clearAllMocks()
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        }

        req = { body: {}, params: {} }
    })
    it('should list created users', async () => {
        await User.create(usersToCreate)
        const usersFound = await User.find()

        await userController.get(req, res)

        expect(res.json).toBeCalledWith(usersFound)
    })
    it('should fetch user with specified id', async () => {
        const createdUser = await User.create(userOne)

        const userFound = await User.findById(createdUser._id)

        req.params.id = userFound._id

        await userController.get(req, res)

        expect(res.json).toBeCalledWith(userFound)
    })
    it('should create user', async () => {
        req.body = userOne

        await userController.create(req, res)

        expect(res.json).toBeCalled()

        const id = res.json.mock.calls[0][0]?._id

        expect(id).toBeDefined()

        const foundUser = await User.findById(id)

        expect(res.json).toBeCalledWith(foundUser)
    })
    it('should update user', async () => {
        const createdUser = await User.create(userOne)

        req.params.id = createdUser._id
        req.body = userOneUpdatedFields

        await userController.patch(req, res)

        expect(res.json).toBeCalled()

        const id = res.json.mock.calls[0][0]?._id

        expect(id).toBeDefined()

        const foundUpdatedUser = await User.findById(id)

        expect(res.json).toBeCalledWith(foundUpdatedUser)
    })
    it('should delete user', async () => {
        const createdUser = await User.create(userOne)
        req.params.id = createdUser._id

        await userController.remove(req, res)

        expect(res.json).toBeCalled()

        const user = await User.findById(req.params.id)

        expect(user).toBeNull()
    })
})
