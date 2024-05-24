import React, {useEffect} from 'react';
import styled from "styled-components";
import {gql, useApolloClient, useMutation} from "@apollo/client";
import {useNavigate} from "react-router-dom";

const Wrapper = styled.div`
    border: 1px solid #333;
    max-width: 500px;
    padding: 1em;
    margin: 0 auto;
`;

const Form = styled.form`
    label, input {
        border: 1px solid #333;
        max-width: 500px;
        padding: 1em;
        margin: 0 auto;
    }

    input {
        width: 100%;
        margin-bottom: 1em;
    }
`;

export const SignUp = () => {
    let SIGNUP_USER = gql`
        mutation createUser($username: String!, $password: String!) {
            createUser(input: {username: $username, password: $password})
        }
    `;

    const [values, setValues] = React.useState({});

    const onChange = function (event: any) {
        console.log('event passed', event);
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
    }

    useEffect(() => {
        document.title = 'Sign Up - azflow';
    });

    const client = useApolloClient();
    const navigate = useNavigate();

    const [createUser, {loading, error}] = useMutation(SIGNUP_USER, {
        onCompleted: data => {
            localStorage.setItem('token', data.createUser);
            client.writeQuery({
                query: SIGNUP_USER,
                data: {isLoggedIn: true}
            });

            navigate('/');
        }
    });

    return (
        <Wrapper>
            <h2>Sign Up</h2>
            <Form
                onSubmit={event => {
                    event.preventDefault();
                    console.log('values are', values);
                    createUser({variables: {...values}}).then(r => {
                        console.log(r);
                    });
                }}
            >
                <label htmlFor="username">Username:</label>
                <input required type="text" id="username" name="username" placeholder="username" onChange={onChange}/>
                <label htmlFor="email">Email:</label>
                <input required type="email" id="email" name="email" placeholder="email" onChange={onChange}/>
                <label htmlFor="password">Password:</label>
                <input required type="password" id="password" name="password" placeholder="password"
                       onChange={onChange}/>
                <button type="submit">Submit</button>
            </Form>
        </Wrapper>
    )
}