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
            <section className="vh-xxl-100 section-container content-with-navbar-margin">
                <ToastContainer />
                <div className="row g-0">
                    <div className="col-lg-6 d-flex align-items-center order-2 order-lg-1 ">
                        <div className="p-3 p-lg-4">
                            <img src="/images/forgot_password.png" alt="Sign in" style={{ width: '500px', height: '400px' }} />
                        </div>
                        <div className="vr opacity-1 d-none d-lg-block" />
                    </div>
                    <div className="col-lg-6 order-1">
                        <div className="p-5 p-sm-7">
                            <h1 className="centered-text">Mot de passe oublié?</h1>
                            <div className="p-5 p-sm-7">
                                <p >Entrez votre adresse e-mail pour réinitialiser votre mot de passe.</p>
                                <form onSubmit={handleSubmit} className="mt-4 text-start">
                                    <div className="mb-3">
                                        <label className="form-label">Email:</label>
                                        <input className="form-control"
                                            type="email" name="email" value={email} onChange={handleChange} required />
                                    </div>
                                    <div className="button-group">
                                    <button type="submit" className="button-log w-100 mb-0">
                                    Envoyer</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main >
    );
};

export default PasswordResetRequest;
