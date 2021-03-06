const router = require('express').Router();
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Users = require('./authHelper')

router.post('/register', (req, res) =>
{
  if(!req.body.username || !req.body.password)
  {
    res.status(400).json({ errorMessage: "Missing username or password" })
  }
  else
  {
    let {username, password} = req.body
    bcryptjs.genSalt(14, function(err, salt)
    {
      bcryptjs.hash(password, salt, function(err, hash)
      {
        password = hash
        // if(!Users.findBy({username}))
        // {
          Users.add({username, password})
            .then(response =>
              {
                res.status(201).json({id: response.id, username: response.username})
              })
            .catch(error =>
              {
                res.status(500).json({ errorMessage: `Could not register user` })
              })
        // }
        // else 
        // {
        //   console.log(Users.find())
        //   res.status(409).json({errorMessage: `That username is already taken`})
        // }
      })
    })
  }
})

router.post('/login', (req, res) =>
{
  if(!req.body.username || !req.body.password)
  {
    res.status(400).json({ errorMessage: "Missing credentials" })
  }
  else
  {
    let {username, password} = req.body
    Users.findBy({ username })
      .first()
      .then(user =>
        {
          if(user)
          {
            bcryptjs.compare(req.body.password, user.password, function(err, response)
            {
              if(response)
              {
                const token = generateToken(user)
                res.status(200).json({token})
              }
              else res.status(401).json({ message: 'Invalid Credentials' })
            })
          }
          else res.status(401).json({ message: 'Invalid Credentials' })
        })
      .catch(error =>
        {
            res.status(500).json(error)
        })
  }
})

function generateToken(user)
{
  const payload = {username: user.username}
  const secret = require('../config/secret').jwtSecret
  const options = {expiresIn: '1d'}

  return jwt.sign(payload, secret, options)
}

module.exports = router;
