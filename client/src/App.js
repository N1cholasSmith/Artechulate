
import './App.css';
import './styles/styles.css'
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { setContext } from '@apollo/client/link/context';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client'



import Navbar from './components/Navbar';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Feed from './pages/Feed'
import Login from './pages/Login'
import Register from './pages/Register'; 


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
      <div className='ui container'>
        <Navbar />
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route exact path='/profile'>
            <Profile />
          </Route>
          <Route exact path='/feed'>
            <Feed />
          </Route>
          <Route exact path='/login'>
            <Login />
          </Route>
          <Route exact path='/register'>
            <Register />
          </Route>
          <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
        </Switch>
      </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
