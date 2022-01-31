import React, { useState } from 'react';
import { Form, Button } from 'semantic-ui-react'
import { useMutation } from '@apollo/client';
import '../styles/styles.css'

// REGISTER MUTATION
import { REGISTER_USER } from '../utils/mutations';

// IMPORT HOOK
import { useForm } from '../utils/hooks'

function Register(props) {
  const [errors, setErrors] = useState({})

  const { onChange, onSubmit, values } = useForm(registerUsers, {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const [registerUser, { loading }] = useMutation(REGISTER_USER, {
    update(proxy, result) {
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

  function registerUsers(){
    registerUser()
  }


  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
        <h1>Register</h1>
        <Form.Input
          label='Username'
          placeholder='Username'
          name='username'
          type='text'
          value={values.username}
          error={errors.username ? true : false}
          onChange={onChange}
        />
        <Form.Input
          label='Email'
          placeholder='Email'
          name='email'
          type='email'
          value={values.email}
          error={errors.email ? true : false}
          onChange={onChange}
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
        <Form.Input
          label='Confirm Password'
          placeholder='Confirm Password'
          name='confirmPassword'
          type='password'
          value={values.confirmPassword}
          error={errors.confirmPassword ? true : false}
          onChange={onChange}
        />
        <Button type='submit' primary >
          Register
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



export default Register;