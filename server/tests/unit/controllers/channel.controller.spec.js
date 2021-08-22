const Channel = require('../../../src/models/channel.model')
const Comment = require('../../../src/models/comment.model')
const User = require('../../../src/models/user.model')
const { channelController } = require('../../../src/controllers')
let req, res, user

const userToCreate = {
    name: 'user1',
    email: 'user1@test.com',
    password: 'userTest1',
    role: 'user',
}
const channelOne = {
    user: null,
    orderId: 1,
}
const channelTwo = {
    user: null,
    georeferenceId: 1,
}
const channelsToCreate = [channelOne, channelTwo]

describe('Channel controller', () => {
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
    it('should list created channels', async () => {
        await Channel.create(
            channelsToCreate.map((c) => ({ ...c, user: user._id }))
        )
        const channelsFound = await Channel.aggregate([
            {
                $lookup: {
                    from: Comment.collection.name,
                    localField: '_id',
                    foreignField: 'channel',
                    as: 'comments',
                },
            },
            {
                $addFields: { id: '$_id', nbComments: { $size: '$comments' } },
            },
        ])

        await channelController.get(req, res)

        expect(res.json).toBeCalledWith(channelsFound)
    })
    it('should delete channel', async () => {
        const createdChannel = await Channel.create({
            ...channelOne,
            user: user._id,
        })
        req.params.id = createdChannel._id

        await channelController.remove(req, res)

        expect(res.json).toBeCalled()

        const channel = await Channel.findById(req.params.id)

        expect(channel).toBeNull()
    })
})
