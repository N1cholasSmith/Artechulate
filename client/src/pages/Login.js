import React, { useState } from 'react';
import { Form, Button, Alert } from 'semantic-ui-react'
import { useMutation } from '@apollo/client';
import '../styles/styles.css'

// REGISTER MUTATION
import { LOGIN_USER } from '../utils/mutations';

// AUTH *******
import Auth from '../utils/auth';

// IMPORT HOOK
import { useForm } from '../utils/hooks';

function Login(props) {
  // AUTH *******
  const [userFormData, setUserFormData] = useState({ username: '', password: '' });
  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  // errors object
  const [errors, setErrors] = useState({})

  // utils/hooks.js
  const { onChange, onSubmit, values } = useForm(loginUsers, {
    username: '',
    password: '',
  })

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(proxy, result) {
      // NOT LOGGING INFO
      console.log(result)
      // Sends newly registered user to the homepage
      props.history.push('/')
    },
    onError(err) {
      // returns one object with all errors
      console.log(err.graphQLErrors[0].extensions.exception.errors)
      setErrors(err.graphQLErrors[0].extensions.exception.errors)
    },
    variables: values
  })

  // AUTH *******
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  function loginUsers(){
    loginUser();
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const { data } = await loginUser({
        variables: { ...userFormData },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    setUserFormData({
      username: '',
      // email: '',
      password: '',
    });
  };

  
// onSubmit={handleFormSubmit}

  return (
    <div className="form-container">
      <Form noValidate validated={validated} onSubmit={onSubmit} className={loading ? 'loading' : ''}>
        <h1>Login</h1>
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          Something went wrong with your login credentials!
        </Alert>
        <Form.Input
          label='Username'
          placeholder='Username'
          name='username'
          type='text'
          value={values.username}
          error={errors.username ? true : false}
          onChange={onChange}
          // value={userFormData.password}
          // onChange={handleInputChange}
        />
        <Form.Input
          label='Password'
          placeholder='Password'
          name='password'
          type='password'
          value={values.password}
          error={errors.password ? true : false}
          onChange={onChange}
        />

        <Button type='submit' primary >
          Login
        </Button>
      </Form>
      {Object.keys(errors).length > 0 && (
        <div className='ui error message'>
          <ul className='list'>
            {Object.values(errors).map(value => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}



export default Login;