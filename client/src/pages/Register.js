import React, { useState } from 'react';
import { BrowserRouter as Router, useHistory } from "react-router-dom";
import { Form, Button } from 'semantic-ui-react'
import { useMutation } from '@apollo/client';
import '../styles/styles.css'

// REGISTER MUTATION
import { REGISTER_USER } from '../utils/mutations';

// AUTH *******
import Auth from '../utils/auth';

// IMPORT HOOK
// import { useForm } from '../utils/hooks'

function Register(props) {
  const [errors, setErrors] = useState({});

  const [ userFormData, setUserFormData ] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const history = useHistory

  const [registerUser, { loading }] = useMutation(REGISTER_USER, {
    update(proxy, result) {
      console.log(result)
    },
    onError(err) {
      // returns one object with all errors
      console.log(err)
      setErrors(err)
    },
    // variables: values
  })

   // AUTH *******
   const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };


  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(userFormData)

    try {
      const { data } = await registerUser({
        variables: { ...userFormData },
      });
      console.log('checking if register is fetching data')
      // when data comes back from login call the Authorization
      Auth.login(data.registerUser.token);
    } catch (e) {
      console.error(e);
      console.log(e)
    }

    // resets form once its done
    setUserFormData({
      username: '',
      password: '',
    });
  };

  function handleClick() {
    history.push('/Feed');
  }


  // function registerUsers() {
  //   registerUser()
  // }


  return (
    <div className="form-container">
      <Form onSubmit={handleFormSubmit} noValidate className={loading ? 'loading' : ''}>
        <h1>Register</h1>
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
          label='Email'
          placeholder='Email'
          name='email'
          type='email'
          value={userFormData.email}
          error={errors.email ? true : false}
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
        <Form.Input
          label='Confirm Password'
          placeholder='Confirm Password'
          name='confirmPassword'
          type='password'
          value={userFormData.confirmPassword}
          error={errors.confirmPassword ? true : false}
          onChange={handleInputChange}
        />
        <Router>
          <Button type='submit' primary onClick={handleClick}>
            Register
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
  );
}



export default Register;