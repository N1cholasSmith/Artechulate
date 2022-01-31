import React, { useState } from 'react';
import { Form } from 'semantic-ui-react'



function Login() {
  const [values, setValues] = useState({
    username: '',
    password: '',
  })
  const onChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.values })
  }
  const onSubmit = (event) => {
    event.preventDefault();

  }
  return (
    <div>
      <Form onSubmit={onSubmit} noValidate>
        <h1>Login</h1>
        <Form.Input
          label='Username'
          placeholder='Username..'
          name='username'
          type='text'
          value={values.username}
          onChange={onChange}
        />
        <Form.Input
          label='Password'
          placeholder='Password'
          name='password'
          type='password'
          value={values.password}
          onChange={onChange}
        />
      </Form>

    </div>
  );
}

export default Login;