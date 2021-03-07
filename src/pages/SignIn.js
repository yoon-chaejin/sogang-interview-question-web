import axios from 'axios';
import { React, useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { withRouter, Link } from 'react-router-dom';
import { API_BASE_URL } from '../constants';

const SignIn = (props) => {
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");

    useEffect(() => {
        if (localStorage.getItem('token')) {
            props.history.push('/')
        }
    })
    const signIn = async () => {
        axios.post(API_BASE_URL+'/auth/login', { email, password })
        .then(response => {
            if (response.data.accessToken) {
                localStorage.setItem("token", response.data.accessToken);
            }
            alert('Success');
            props.history.push('/');
        })
        .catch(error => alert('Failed'))
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter' || event.charCode === 13) {
            signIn();
        }
    }

    return (
        <div>
            <h2>SignIn</h2>
            <Form>
                <Form.Group controlId='formEmailId'>
                    <Form.Label>ID: </Form.Label>
                    <Form.Control type="email" placeholder="Enter email id" value={email} onChange={event => setEmail(event.target.value)}/>
                </Form.Group>
                <Form.Group controlId='formPassword'>
                    <Form.Label>PW: </Form.Label>
                    <Form.Control type="password" placeholder="Enter password" value={password} onChange={event => setPassword(event.target.value)} onKeyPress={handleKeyPress}/>
                </Form.Group>
                <Button variant='primary' onClick={signIn}>로그인</Button>
                <Link to='/signup'>
                    <Button variant='primary' >회원가입</Button>
                </Link>
            </Form>
        </div>
    )
}

export default withRouter(SignIn);