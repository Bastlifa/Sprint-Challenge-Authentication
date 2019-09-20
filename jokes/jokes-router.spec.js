const request = require('supertest')
const server = require('../api/server')
const db = require('../database/dbConfig')

describe('jokes-router', () => {
    beforeEach(async () =>
    {
        await db('users').truncate()
    })
    describe('GET /', () =>
    {
        it('returns jokes if you login first', async () =>
        {
            const user = {username: 'test2', password: 'pass2'}
            await request(server)
                .post('/api/auth/register')
                .send(user)
                .set('Accept', 'application/json')
            let loginRes = await request(server)
                .post('/api/auth/login')
                .send(user)
                .set('Accept', 'application/json')
            
            console.log(`loginRes.body.token: ${loginRes.body.token}`)
            expect(loginRes.body.token).toBeTruthy()
        })
    })
})
