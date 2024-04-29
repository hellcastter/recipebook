import {useContext, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';

import './Form.css'

import {decodePassword} from './PasswordEncDec';
import {UserContext} from "../../contexts.js";

function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const {user, setUser} = useContext(UserContext);
    const userNavigate = useNavigate();

    if (user) {
        userNavigate('/');
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`http://localhost:3001/users?username=${username}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const userData = await response.json();

                if (userData.length > 0) {
                    const user = userData[0];
                    const storedPassword = user.password;
                    const decodedPassword = decodePassword(storedPassword);

                    if (password === decodedPassword) {
                        console.log('Login successful');
                        setUser({
                            id: user.id,
                            username: user.username,
                            liked_posts: user.liked_posts
                        });
                    } else {
                        console.error('Incorrect password');
                        alert('Incorrect password');
                    }
                } else {
                    console.error('User does not exist');
                    alert('User does not exist');
                }
            } else {
                console.error('Login failed:', response.statusText);
                alert('Login failed');
            }
        } catch (error) {
            console.error('Error logging in:', error);
            alert('Error logging in');
        }
    };

    return (
        <div className="form-container">
            <h2>Login</h2>
            <form className="class-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username:</label><br/>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label><br/>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button className="submit-button" type="submit">Login</button>
            </form>
            <p>Dont have an account? <Link to="/register">Register</Link></p>
        </div>
    );
}

export default LoginForm;
