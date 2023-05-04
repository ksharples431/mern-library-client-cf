import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import './login-view.scss';

export const LoginView = ({ onLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      email: email,
      password: password,
    };

    try {
      const response = await fetch(
        'http://localhost:5000/api/auth/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      );

      const responseData = await response.json();

      console.log('Login response: ', responseData.user);

      if (responseData.user) {
        localStorage.setItem('user', JSON.stringify(responseData.user));
        localStorage.setItem('token', responseData.token);
        onLoggedIn(responseData.user, responseData.token);
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      console.error('Error occurred while trying to login:', error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Label className="loginLabel">Login</Form.Label>
      <Form.Group controlId="formUsernameLogin">
        <Form.Label>Email:</Form.Label>
        <Form.Control
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          minLength="3"
        />
      </Form.Group>

      <Form.Group controlId="formPasswordLogin">
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};
