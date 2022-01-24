// import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { setContext } from '@apollo/client/link/context';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client'

// WAS import SearchBooks (homepage) & SavedBooks (profile)
// import Homepage from './pages/homepage';
// import Profile from './pages/profile';
import Navbar from './components/Navbar';

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// setting up apollo client to talk to the backend
const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    // Conneting to ApolloProvider Client so anything below the client in the tree can use the query hook
    <ApolloProvider client={client}>
      <Router>
      <>
        <Navbar />
        <Switch>
          {/* <Route exact path='/' component={Homepage} />
          <Route exact path='/saved' component={Profile} /> */}
          <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
        </Switch>
      </>
      </Router>
    </ApolloProvider>
  );
}

export default App;

