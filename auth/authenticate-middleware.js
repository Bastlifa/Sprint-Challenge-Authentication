/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/

const jwt = require('jsonwebtoken')
const secret = require('../config/secret')

module.exports = (req, res, next) => {
  const token = req.headers.authorization
  if(token)
  {
    jwt.verify(token, secret.jwtSecret, (err, decodedToken) =>
    {
      if(err) res.status(401).json({ errorMessage: 'Invalid Credentials' })
      else
      {
        req.user = {username: decodedToken.username}
        next()
      }
    })
  }
  else res.status(401).json({ you: 'shall not pass!' });
};
