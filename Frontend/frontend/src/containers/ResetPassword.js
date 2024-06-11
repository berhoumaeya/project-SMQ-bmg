import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PasswordResetRequest = () => {
    const [email, setEmail] = useState('');

    const handleChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`${process.env.REACT_APP_API_URL}/password_reset/`, { email: email }, {
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': Cookies.get('csrftoken'),
            }
        })
        .then(response => {
            toast.success('Email de réinitialisation envoyé avec succès!');
        })
        .catch(error => {
            toast.error('Erreur lors de l\'envoi de l\'email de réinitialisation.');
        });
    };

    return (
        <div className="form-container">
            <ToastContainer />
            <div className="form-card">
                <h3>Réinitialiser le mot de passe</h3>
                <form onSubmit={handleSubmit} className="form">
                    <div className="form-group">
                        <label>Email:</label>
                        <input type="email" name="email" value={email} onChange={handleChange} required />
                    </div>
                    <div className="button-group">
                        <button className="btn btn-primary" type="submit">Envoyer</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PasswordResetRequest;
