import React, { useState } from "react";
import { Container , Header, Button, Form } from "semantic-ui-react";
import { Redirect } from "react-router-dom";
import Message from "../components/Message";
import { history } from "../helpers";
import { authenticationService } from '../services'


function Signup() {

    const [loading, setLoading] = useState(false);
    const [error,setError] = useState(null);

    const [username,setUsername] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');

    function handleSubmit(e){

        setLoading(true)
        e.preventDefault()

        authenticationService.signup(username,email,password,confirmPassword)
        .then(res => {
            setLoading(false)
            history.push("/")
        })
        .catch(err => {
            setLoading(false)
            setError(err.message || err)
        })

    }
    if(authenticationService.isAuthenticated){
        return <Redirect to="/" />
    }
    return (
        <Container>
            <Header>Create an Account</Header>
            {error && <Message danger message={error} />}
            <Form onSubmit={handleSubmit}>
                <Form.Field>
                <label>Username</label>
                <input
                    placeholder="Username"
                    value={username}
                    type="text"
                    onChange={(e) => setUsername(e.target.value)}
                />
                </Form.Field>
                <Form.Field>
                <label>Email</label>
                <input
                    placeholder="Email"
                    value={email}
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                />
                </Form.Field>
                <Form.Field>
                <label>Password</label>
                <input
                    placeholder="Password"
                    value={password}
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                </Form.Field>
                <Form.Field>
                <label>Confirm Password</label>
                <input
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    type="password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                </Form.Field>
            
                <Button
                primary
                fluid
                loading={loading}
                disabled={loading}
                type="submit"
                >
               Sign up
                </Button>
            </Form>
        </Container>
  );
}

export default Signup;
