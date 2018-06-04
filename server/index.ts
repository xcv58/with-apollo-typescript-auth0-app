const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const next = require('next')
const jwt = require('express-jwt')
const jwksRsa = require('jwks-rsa')
// const jwtAuthz = require('express-jwt-authz')
const cors = require('cors')
const { parse } = require('url')

const dev = process.env.NODE_ENV !== 'production'
const port = parseInt(process.env.PORT, 10) || 3000
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()

  server.use(cors())
  const checkJwt = jwt({
    // Dynamically provide a signing key based on the kid in the header and the singing keys provided by the JWKS endpoint
    secret: jwksRsa.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `https://xcv58.auth0.com/.well-known/jwks.json`
    }),

    // Validate the audience and the issuer
    audience: 'https://xcv58.auth0.com/api/v2/',
    issuer: 'https://xcv58.auth0.com/',
    algorithms: ['RS256']
  })

  server.use(bodyParser.json())
  server.post('/timesheets', checkJwt, function(req, res) {
    res.status(201).send({ message: 'This is the POST /timesheets endpoint' })
  })

  server.get('/a', (req, res) => {
    return app.render(req, res, '/a', req.query)
  })

  server.get('/b', (req, res) => {
    return app.render(req, res, '/b', req.query)
  })

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, err => {
    if (err) throw err
    console.log(`Server ready on http://localhost:${port}`)
  })
})
