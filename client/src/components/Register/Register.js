import '../Register/Register.css';
import registerBackground from '../../images/register-bg.jpg';
import { Link } from 'react-router-dom';
import React, { useState, useContext } from 'react';
import axios from 'axios';
import UserContext from '../../UserContext.js';
import { Redirect } from 'react-router-dom';
const localUrl = 'http://localhost:5000/auth/register';
const herokuUrl = 'https://js-flashcards.herokuapp.com/auth/register';

function Register() {
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [rePass, setRePass] = useState();

    const user = useContext(UserContext);

    function registerUser(e) {
        e.preventDefault();
        
        if (password !== rePass) {
            alert('Two passwords don\'t match!');
            return;
        }
        const data = { username, email, password };
        axios({
            method: 'post',
            url:  herokuUrl,
            data,
            withCredentials: true 
        })
        .then((response) => {
            user.setEmail(response.data.email);
            user.setUsername(response.data.username);
        })
        .catch((err) => {
            console.log(err);
        });

        if(data.username){
            return <Redirect to='/home'  />
        }
    }
    
    return (
        <section className="register-section">
        <div className="register-container">
            <div className="form-container">
            <form className="register-form" onSubmit={e => registerUser(e)} action="/auth/register" method="POST">
                    <h1>Register</h1>
                    <p>Please enter your credentials.</p>
                    <label>Username</label><br></br>
                    <div className="icon">
                        <i className="fas fa-user"></i>
                        <input name="username" type="text" autoComplete="username" value={username} onChange={e => setUsername(e.target.value)}></input><br></br>
                    </div>
                    <label>Email</label><br></br>
                    <div className="icon">
                        <i className="fas fa-envelope-open-text"></i>
                        <input name="email" type="email" autoComplete="email" required pattern="[^]+@[^]+[.][a-z]{2,63}$" value={email} onChange={e => setEmail(e.target.value)}></input><br></br>
                    </div>
                    <p className="register-info"><i className="fas fa-info-circle"></i> Password must be between 6 and 10 characters. Password must consist only of letters and at least 2 digits.</p>
                    <label>Password</label><br></br>
                    <div className="icon">
                        <i className="fas fa-lock"></i>
                        <input className="password" type="password" autoComplete="current-password" name="password" value={password} onChange={e => setPassword(e.target.value)}></input>
                        <i id="eye-one" className="fas fa-eye"></i>
                        <br></br>
                    </div>
                    <label>Repeat password</label><br></br>
                    <div className="icon">
                        <i className="fas fa-lock"></i>
                        <input className="rePass" type="password" autoComplete="current-password" name="rePass" onChange={e => setRePass(e.target.value)}></input><br></br>
                        <i id="eye-two" className="fas fa-eye"></i>
                    </div>
                    <div>
                        <button type="submit" className="registerBtn">Register</button>
                    </div>
            </form>
                <div className="second">
                    <Link className="link" to="/auth/login">Already have an account?</Link><br></br>
                </div>
            </div>
        </div>
        <div className="register-image" style={{ backgroundImage: `url(${registerBackground})` }}>
           
        </div>
        </section>
    )
}

export default Register;
