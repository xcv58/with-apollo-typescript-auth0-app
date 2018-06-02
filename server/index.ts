// import { createServer } from 'http'
// import { parse } from 'url'
import express from 'express';
import * as next from 'next';
import { ApolloServer, gql } from 'apollo-server';
// const { registerServer } = require('apollo-server-express');

// This is a (sample) collection of books we'll be able to query
// the GraphQL server for.  A more complete example might fetch
// from an existing data source like a REST API or database.
const books = [
  {
    title: 'Harry Potter and the Chamber of Secrets',
    author: 'J.K. Rowling'
  },
  {
    title: 'Jurassic Park',
    author: 'Michael Crichton'
  }
];

// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.
const typeDefs = gql`
  # Comments in GraphQL are defined with the hash (#) symbol.

  # This "Book" type can be used in other type declarations.
  type Book {
    title: String
    author: String
  }

  # The "Query" type is the root of all GraphQL queries.
  # (A "Mutation" type will be covered later on.)
  type Query {
    books: [Book]
  }
`;

// Resolvers define the technique for fetching the types in the
// schema.  We'll retrieve books from the "books" array above.
const resolvers = {
  Query: {
    books: () => books
  }
};

// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.
const apolloServer = new ApolloServer({ typeDefs, resolvers });

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  // This `listen` method launches a web-server. Existing apps
  // can utilize middleware options, which we'll discuss later.
  // server.listen().then(({ url }) => {
  //   console.log(`🚀  Server ready at ${url}`);
  // });

  const server = express();
  console.log(apolloServer);
  // registerServer({ apolloServer, server })
  server.get('/a', (req, res) => {
    return app.render(req, res, '/b', req.query);
  });

  server.get('/b', (req, res) => {
    return app.render(req, res, '/a', req.query);
  });

  server.get('/posts/:id', (req, res) => {
    return app.render(req, res, '/posts', {
      id: req.params.id
    });
  });

  server.get('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });

  // createServer((req, res) => {
  //   const parsedUrl = parse(req.url, true)
  //   const { pathname, query } = parsedUrl
  //
  //   if (pathname === '/a') {
  //     app.render(req, res, '/a', query)
  //   } else if (pathname === '/b') {
  //     app.render(req, res, '/b', query)
  //   } else {
  //     handle(req, res, parsedUrl)
  //   }
  // })
  // .listen(port, (err) => {
  //   if (err) throw err
  //   console.log(`> Ready on http://localhost:${port}`)
  // })
});
