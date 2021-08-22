const { authValidation } = require('../../../src/validations')
const Joi = require('joi')
afterEach(() => {
    jest.restoreAllMocks()
})

describe('Auth validations', () => {
    // it('should validate (or not) auth signin post data', async () => {
    // const data = {
    //     body: { email: 'test@test.com', password: '228S351727Aa' },
    // }
    // const validationResults = { error: undefined }
    // const validateSpy = jest
    //     .spyOn(Joi, 'validate')
    //     .mockReturnValueOnce(validationResults)
    //
    // const mRes = {}
    // const mNext = jest.fn()
    // validateExternalId(authValidation.post.idSchema, 'extClientId')(
    //     data,
    //     mRes,
    //     mNext
    // )
    // expect(validateSpy).toBeCalledWith(data, schemas.idSchema)
    // expect(mNext).toBeCalled()
    // })
})
