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
        <main style={{ backgroundColor: '#eeeeee', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
               <div>
                    <ToastContainer />
                    <div className="vh-xxl-100 section-container content-with-navbar-margin">

                        <div >
                            <h3 className='centered-text'>Mot de passe oublié?</h3>
                            <div className="p-5 p-sm-7">
                                <p className='link'>Entrez votre adresse e-mail pour réinitialiser votre mot de passe.</p>
                                <form onSubmit={handleSubmit} className="mt-4 text-start">
                                    <div className="mb-3">
                                        <label className="form-label">Email:</label>
                                        <input className="form-control"
                                            type="email" name="email" value={email} onChange={handleChange} required />
                                    </div>
                                    <div className="button-group">
                                        <button className="button-log ">Envoyer</button>
                                    </div>
                                </form>
                            </div></div>
                    </div></div>
            </main>
    );
};

export default PasswordResetRequest;
