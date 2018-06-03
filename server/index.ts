const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const next = require('next')
const apolloServer = require('./apollo')
const { parse } = require('url')
import { resolvers as schema } from './apollo'

const dev = process.env.NODE_ENV !== 'production'
const port = parseInt(process.env.PORT, 10) || 3000
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()
  // console.log({ apolloServer, app: server })

  server.use(bodyParser.json())
  // server.use(
  //   session({
  //     secret: 'super-secret-key',
  //     resave: false,
  //     saveUninitialized: false,
  //     cookie: { maxAge: 60000 }
  //   })
  // );

  // server.use('/api', apiRoutes);

  // Server-side
  // const route = pathMatch()

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
