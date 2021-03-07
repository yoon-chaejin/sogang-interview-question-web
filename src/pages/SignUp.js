import { React, useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../constants';

const SignUp = (props) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [sogangEmail, setSogangEmail] = useState('');

    const signUp = () => {
        return axios.post(API_BASE_URL + "/users", {
          username,
          email,
          password,
        })
        .then(response => {
            props.history.push('/signin');
        });
    };
    
    return (
        <div>
            <h2>SignUp</h2>
            <Form.Group controlId='formUsername'>
                <Form.Label>Username: </Form.Label>
                <Form.Control type="text" placeholder="Enter username" value={username} onChange={event => setUsername(event.target.value)} />
            </Form.Group>
            <Form.Group controlId='formEmail'>
                <Form.Label>Email: </Form.Label>
                <Form.Control type="email" placeholder="Enter email id" value={email} onChange={event => setEmail(event.target.value)} />
            </Form.Group>
            <Form.Group controlId='formPassword'>
                <Form.Label>PW: </Form.Label>
                <Form.Control type="password" placeholder="Enter password" value={password} onChange={event => setPassword(event.target.value)} />
            </Form.Group>
            <Form.Group controlId='formPasswordCheck'>
                <Form.Label>PW 확인: </Form.Label>
                <Form.Control type="password" placeholder="Enter password" value={passwordCheck} onChange={event => setPasswordCheck(event.target.value)} />
            </Form.Group>
            <Form.Group controlId='formEmailAuthentication'>
                <Form.Label>Sogang Email: </Form.Label>
                <Form.Control type="email"  placeholder="Enter Sogang email address" value={sogangEmail} onChange={event => setSogangEmail(event.target.value)} />
                <Button variant='primary' onClick={signUp}>인증</Button>
            </Form.Group>
        </div>
    )
}

export default withRouter(SignUp);