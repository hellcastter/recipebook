import React, {useContext, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Form.css';

import { encodePassword, decodePassword } from './PasswordEncDec';
import {UserContext} from "../../contexts.js";

function RegisterForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const userNavigate = useNavigate();

    const {user, setUser} = useContext(UserContext);
    if (user) {
        userNavigate('/');
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const encodedPassword = encodePassword(password);

        const formData = {
            username: username,
            password: encodedPassword
        };

        try {
            const response = await fetch("http://localhost:3001/users", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const data = await response.json();
                console.log('User registered successfully:', data);
                // Redirect the user to the login page after successful registration
                setUser(username);
            } else {
                console.error('Failed to register user:', response.statusText);
                // Handle error cases (e.g., display error message)
            }
        } catch (error) {
            console.error('Error registering user:', error.message);
        }
    };

    return (
        <div className="form-container">
            <h2>Register</h2>
            <form className="class-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username:</label><br />
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label><br />
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button className="submit-button" type="submit">Register</button>
            </form>
            <p>Already have an account? <Link to="/Login">Login</Link></p>
        </div>
    );
}

export default RegisterForm;
