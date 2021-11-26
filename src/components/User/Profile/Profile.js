import '../Profile/Profile.css';
import * as authService from '../../../services/authService.js';
import React from "react";
import { useNavigate } from 'react-router-dom';

function Profile() {
    const userId = localStorage.getItem('userId');
    const username = localStorage.getItem('username');
    const email = localStorage.getItem('email');
    const navigate = useNavigate();

    async function deleteAccount() {
        try {
            await authService.onDelete(userId);
            navigate('/');
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="profile-container">
            <div className="user-profile">
                <div className="user-image"></div>
                <div className="user-details">
                    <h1>{username}</h1>
                    <h3><ion-icon name="mail-outline"></ion-icon><span className="user-details-span"> Email:</span> {email}</h3>
                    <h3><ion-icon name="id-card-outline"></ion-icon><span className="user-details-span"> User Id:</span> {userId}</h3>
                    <h3><ion-icon name="star-outline"></ion-icon><span className="user-details-span"> Contributions made:</span> 24 flashcards</h3>
                    <h3><ion-icon name="speedometer-outline"></ion-icon><span className="user-details-span"> Current status:</span> Master creator</h3>
                    <h3><i class="fas fa-check-double"></i> Delete account:</h3>
                    <p>If you don't want to be part of our community anymore, click the button below. Please note that once deleted,
                        your account information cannot be recovered and you will need to re-register.</p>
                    <button onClick={deleteAccount} type="button" className="deleteAccount" name="deleteAccount">Delete account</button>
                </div>
            </div>
        </div>
    )
}

export default Profile;
