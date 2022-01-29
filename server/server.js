const express = require('express');
const path = require('path');
const db = require('./config/connection');
require('dotenv').config()
// Import the ApolloServer class
const { ApolloServer} = require('apollo-server-express')
const { PubSub } = require('graphql-subscriptions')

// SUBSCRIPTION ==================================================================================
//import { createServer } from 'http';
// import { execute, subscribe } from 'graphql';
// import { SubscriptionServer } from 'subscriptions-transport-ws';
// import { makeExecutableSchema } from '@graphql-tools/schema';
// // creates the sub server
// const httpServer = createServer(app);

// const subscriptionServer = SubscriptionServer.create({
//   // This is the `schema` we just created.
//   schema,
//   // These are imported from `graphql`.
//   execute,
//   subscribe,
// }, {
//   // This is the `httpServer` we created in a previous step.
//   server: httpServer,
//   // Pass a different path here if your ApolloServer serves at
//   // a different path.
//   path: '/graphql',
// });

// const server = new ApolloServer({
//   schema,
//   plugins: [{
//     async serverWillStart() {
//       return {
//         async drainServer() {
//           subscriptionServer.close();
//         }
//       };
//     }
//   }],
// });

// const pubsub = new PubSub();

// Import the two parts of a GraphQL schema
const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth')


const app = express();
const PORT = process.env.PORT || 3001;

const pubsub = new PubSub();

// Create a new instance of an Apollo server with the GraphQL schema
const server = new ApolloServer({
  typeDefs,
  resolvers,
// add context to our server so data from the "authMiddleware()" function can passs data to our resolver functions
  context: authMiddleware, pubsub 
})



// Update Express.js to use Apollo server features
server.applyMiddleware({ app });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// -----------------------------------------------------------------
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
});
