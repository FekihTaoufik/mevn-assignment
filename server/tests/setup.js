const db = require('./db')
jest.setTimeout(60000)
beforeAll(async () => await db.connect())
beforeEach(async () => await db.clear())
afterAll(async () => await db.close())
