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
        it('returns jokes if you login first', () =>
        {
            const user = {username: 'test2', password: 'pass2'}
            return request(server)
                .post('/api/auth/register')
                .send(user)
                .set('Accept', 'application/json')
                .then(res =>
                    {
                        return request(server)
                        .post('/api/auth/login')
                        .send(user)
                        .set('Accept', 'application/json')
                        .then(res =>
                            {
                                // expect(res.body.token).toBeTruthy()
                                return request(server)
                                .get('/api/jokes')
                                .set('authorization', `${res.body.token}`)
                                .then(res =>
                                    {
                                        expect(res.status).toBe(200)
                                    })
                            })
                    })
        })
        it('gives a 401 when no token is provided', () =>
        {
            const user = {username: 'test2', password: 'pass2'}
            return request(server)
                .post('/api/auth/register')
                .send(user)
                .set('Accept', 'application/json')
                .then(res =>
                    {
                        return request(server)
                        .post('/api/auth/login')
                        .send(user)
                        .set('Accept', 'application/json')
                        .then(res =>
                            {
                                // expect(res.body.token).toBeTruthy()
                                return request(server)
                                .get('/api/jokes')
                                // .set('authorization', `${res.body.token}`)
                                .then(res =>
                                    {
                                        expect(res.status).toBe(401)
                                    })
                            })
                    })
        })
    })
})
