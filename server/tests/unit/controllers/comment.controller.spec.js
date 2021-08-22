const Comment = require('../../../src/models/comment.model')
const User = require('../../../src/models/user.model')
const { commentController } = require('../../../src/controllers')
let req, res, user

const userToCreate = {
    name: 'user1',
    email: 'user1@test.com',
    password: 'userTest1',
    role: 'user',
}
const commentOne = {
    body: 'Hello',
    orderId: 1,
    user: null,
}
const commentTwo = {
    body: 'Hello',
    georeferenceId: 1,
    user: null,
}
const commentThree = {
    body: 'Hello',
    orderId: 1,
    georeferenceId: 1,
    user: null,
}
const commentsToCreate = [commentOne, commentTwo, commentThree]

describe('Comment controller', () => {
    beforeEach(async () => {
        jest.clearAllMocks()
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        }

        req = { body: {}, params: {} }

        const userCreated = await User.create(userToCreate)
        user = await User.findById(userCreated._id)
    })
    it('should list comments', async () => {
        await Comment.create(
            commentsToCreate.map((c) => ({ ...c, user: user._id }))
        )
        const commentsFound = await Comment.find().populate('user')

        await commentController.get(req, res)

        expect(res.json).toBeCalledWith(commentsFound)
    })
    it('should create comment', async () => {
        req.user = user
        req.body = commentOne

        await commentController.create(req, res)

        expect(res.json).toBeCalled()
        const id = res.json.mock.calls[0][0]?._id

        expect(id).toBeDefined()

        const foundComment = await Comment.findById(id).populate('user')

        expect(res.json).toBeCalledWith(foundComment)
    })
    it('should delete comment', async () => {
        const createdComment = await Comment.create({
            ...commentOne,
            user: user._id,
        })
        req.params.id = createdComment._id

        await commentController.remove(req, res)

        expect(res.json).toBeCalled()

        const comment = await Comment.findById(req.params.id)

        expect(comment).toBeNull()
    })
})
