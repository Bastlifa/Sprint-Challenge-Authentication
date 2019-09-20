const request = require('supertest')
const server = require('../api/server')
const db = require('../database/dbConfig')


describe('auth-router', () => {
    beforeEach(async () =>
    {
        await db('users').truncate()
    })

    describe('register', () =>
    {
        it('has process.env.DB_ENV as testing', () =>
        {
            expect(process.env.DB_ENV).toBe('testing')
        })
        it('registers a user when providing username, pass', () =>
        {
            return request(server)
                .post('/api/auth/register')
                .send({username: 'test1', password: 'pass1'})
                .set('Accept', 'application/json')
                .then(res =>
                    {
                        expect(res.status).toBe(201)
                    })
        })

        it('fails to register if the user is already in the db', () =>
        {
            const user = {username: 'test2', password: 'pass2'}
            return request(server)
                .post('/api/auth/register')
                .send(user)
                .set('Accept', 'application/json')
                .then(res =>
                    {
                        return request(server)
                        .post('/api/auth/register')
                        .send(user)
                        .set('Accept', 'application/json')
                        .then(res =>
                            {
                                expect(res.status).toBe(500)
                            })
                    })
        })
    })
    
    describe('login', () =>
    {
        it('logs you in when you provide correct name/pass', () =>
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
                                expect(res.status).toBe(200)
                            })
                    })
        })

        it('won\'t let you log in when you don\'t provide the correct name/pass', () =>
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
                        .send({...user, password: 'pass3'})
                        .set('Accept', 'application/json')
                        .then(res =>
                            {
                                expect(res.status).toBe(401)
                            })
                    })
        })
    })
})

// describe('auth-router', () => {
//     beforeEach(async () =>
//     {
//         await db('users').truncate()
//     })

//     describe('register', () =>
//     {
//         it('has process.env.DB_ENV as testing', () =>
//         {
//             expect(process.env.DB_ENV).toBe('testing')
//         })
//         it('registers a user when providing username, pass', () =>
//         {
//             return request(server)
//                 .post('/api/auth/register')
//                 .send({username: 'test1', password: 'pass1'})
//                 .set('Accept', 'application/json')
//                 .then(res =>
//                     {
//                         expect(res.status).toBe(201)
//                     })
//         })

//         it('fails to register if the user is already in the db', async () =>
//         {
//             const user = {username: 'test2', password: 'pass2'}
//             await db('users').insert(user)

//             const res = await request(server)
//             .post('/api/auth/register')
//             .send(user)
//             .set('Accept', 'application/json')
            
//             expect(res.status).toBe(500)
//         })
//     })
    
//     describe('login', () =>
//     {
//         it('logs you in when you provide correct name/pass', async () =>
//         {
//             const user = {username: 'test3', password: 'pass3'}
//             await db('users').insert(user)
            
//             const res = await request(server)
//                 .post('/api/auth/login')
//                 .send(user)
//                 .set('Accept', 'application/json')
                
//             expect(res.status).toBe(200)
//         })

//         it('won\'t let you log in when you don\'t provie the correct name/pass', async () =>
//         {
//             await request(server)
//                 .post('/api/auth/register')
//                 .send({username: 'test3', password: 'pass3'})
//                 .set('Accept', 'application/json')
                
//             const res = await request(server)
//                 .post('/api/auth/login')
//                 .send({username: 'test3', password: 'pass3'})
//                 .set('Accept', 'application/json')
//                 console.log(`res: ${res}`)
//                 expect(res.status).toBe(401)
//         })
//     })


// })

