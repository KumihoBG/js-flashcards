import { Link } from 'react-router-dom';
import loginBackground from '../../images/login-bg.jpg';
import '../Login/Login.css';
import React, { useState, useContext } from 'react';
import axios from 'axios';
import UserContext from '../../UserContext.js';
import { Redirect } from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const user = useContext(UserContext);

    function loginUser(e) {
        e.preventDefault();
        const data = { username, password };
        axios({
            method: 'post',
            url: 'http://localhost:5000/auth/login',
            data,
            withCredentials: true 
        })
        .then((response) => {
            user.setUsername(response.data.username);
            return <Redirect to='/home'  />
        })
        .catch((err) => {
            console.log(err);
        });
    }
    return (
        <section className="login-section">
            <div className="login-container">
                <div className="loginForm-container">
                    <form onSubmit={e => loginUser(e)} action="/auth/login" method="POST">
                        <h1>Login</h1>
                        <p>Please enter your credentials.</p>
                        <label>Username</label><br></br>
                        <div className="icon">
                            <i className="fas fa-envelope-open-text"></i>
                            <input name="username" type="text" autoComplete="username" value={username} onChange={e => setUsername(e.target.value)}></input><br></br>
                        </div>
                        <label>Password</label><br></br>
                        <div className="icon">
                            <i className="fas fa-unlock"></i>
                            <input className="login-password" type="password" autoComplete="current-password" name="password" value={password} onChange={e => setPassword(e.target.value)}></input>
                            <i id="eye-three" className="fas fa-eye"></i>
                            <br></br>
                        </div>
                        <div>
                            <button type="submit" className="loginBtn">Login</button>
                        </div>
                    </form>
                    <div className="second">
                        <Link className="link" to="/auth/register">Create new account</Link>
                    </div>
                </div>
            </div>
            <div className="login-image" style={{ backgroundImage: `url(${loginBackground})` }}>
            </div>
        </section>
    )
}
export default Login;
