import React, { useState, useContext } from 'react';
import { BrowserRouter as Router, useHistory } from "react-router-dom";
import { Form, Button } from 'semantic-ui-react'
import { useMutation } from '@apollo/client';
import '../styles/styles.css'

// REGISTER MUTATION
import { LOGIN_USER } from '../utils/mutations';
// AUTH *******
import Auth from '../utils/auth';
import { AuthContext } from '../utils/authentication';
// COMPONENTS
import RegisterBackground from '../assets/images/register.jpeg'


function Login(props) {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({})
  const [userFormData, setUserFormData] = useState({
    username: '',
    password: ''
  });

  const history = useHistory

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(proxy, { data: { login: userData } }) {
      context.login(userData)
      console.log(userData)
    },
    onError(err) {
      // returns one object with all errors
      console.log(err)
      setErrors(err.graphQLErrors[0].extensions.exception.errors)
    },
  })

  function handleClick() {
    history.push('/Feed');
  }

  // AUTH *******
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await loginUser({
        variables: { ...userFormData },
      });

      if (data != undefined)
        // when data comes back from login call the Authorization
        Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // resets form once its done
    setUserFormData({
      username: '',
      password: '',
    });
  };

  return (
    <div className='login-container'>
      <div>
        <img className='register-background' src={RegisterBackground} alt='lightbulb' />
      </div>
      <div className="login-form-container">
        <Form noValidate onSubmit={handleFormSubmit} className={loading ? 'loading' : ''}>
          <h1 className='login-title'>Login</h1>
          <Form.Input
            label='Username'
            placeholder='Username'
            name='username'
            type='text'
            value={userFormData.username}
            error={errors.username ? true : false}
            onChange={handleInputChange}
          />
          <Form.Input
            label='Password'
            placeholder='Password'
            name='password'
            type='password'
            value={userFormData.password}
            error={errors.password ? true : false}
            onChange={handleInputChange}
          />

          <Router>
            <Button type='submit' inverted primary onClick={handleClick}>
              Login
            </Button>
          </Router>
        </Form>
        {Object.keys(errors).length > 0 && (
          <div className='ui error message'>
            <ul className='list'>
              {Object.values(errors).map((value, index) => (
                <li key={index}>{value}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;