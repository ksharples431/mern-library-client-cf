import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import './signup-view.scss';

export const SignupView = ( {onLoggedIn} ) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      username: username,
      password: password,
      email: email,
      birthday: birthday,
    };

    try {
      const response = await fetch(
        'http://localhost:5000/api/auth/signup',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      );

      const responseData = await response.json();

      console.log('Signup response: ', responseData.user);

      if (responseData) {
        localStorage.setItem('user', JSON.stringify(responseData.user));
        localStorage.setItem('token', responseData.token);
        onLoggedIn(responseData.user, responseData.token);
      } else {
        throw new Error('Signup failed');
      }
    } catch (error) {
      console.error('Error occurred while trying to signup:', error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Label className="signupLabel">Signup</Form.Label>
      <Form.Group controlId="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          minLength="3"
        />
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength="7"
        />
      </Form.Group>

      <Form.Group controlId="formEmail">
        <Form.Label>Email:</Form.Label>
        <Form.Control
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="formBirthday">
        <Form.Label>Birthday:</Form.Label>
        <Form.Control
          type="date"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

