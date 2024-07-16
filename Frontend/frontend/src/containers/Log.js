import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../actions/auth';
import CSRFToken from '../components/CSRFToken';
import '../styles/log.css';
const Login = ({ login, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const [loginError, setLoginError] = useState('');

    const { username, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    // Event handler to handle form submission
    const onSubmit = async e => {
        e.preventDefault();

        // Attempt to log in with provided credentials
        const loginSuccess = await login(username, password);

        // If login is not successful, set an error message
        if (!loginSuccess) {
            setLoginError('Données invalides. Réessayer.');
        }
    };

    if (isAuthenticated) {
        return <Navigate to="/Dashboard" />;
    }

    return (
        <main style={{ backgroundColor: '#5585b5', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <section className="vh-xxl-100 section-container content-with-navbar-margin">
                <div className="row g-0">
                    <div className="col-lg-6 d-flex align-items-center order-2 order-lg-1 ">
                        <div className="p-3 p-lg-4">
                            <img src="/images/Sign.png" alt="Sign in" style={{ width: '400px', height: '400px' }} />
                        </div>
                        <div className="vr opacity-1 d-none d-lg-block" />
                    </div>
                    <div className="col-lg-6 order-1">
                        <div className="p-5 p-sm-7">
                            <h1 className="mb-2 centered-text">Connectez-vous à votre compte</h1>
                            <br></br>
                            <p className="mb-0 link">
                                Vous n'avez pas de compte ?
                                <Link className='link-page' to="/register"> Inscrivez-vous</Link>
                            </p>
                            {loginError && <p className="error-message">{loginError}</p>}
                            <form className="mt-4 text-start" onSubmit={e => onSubmit(e)}>
                                <CSRFToken />
                                <div className="mb-3">
                                    <label className="form-label">Email :</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Email*"
                                        name="username"
                                        value={username}
                                        onChange={e => onChange(e)}
                                    />
                                </div>
                                <div className="mb-3 position-relative">
                                    <label htmlFor="psw-input" className="form-label">Mot de passe :</label>
                                    <input
                                        className="form-control fakepassword"
                                        type="password"
                                        placeholder="Mot de passe*"
                                        name="password"
                                        value={password}
                                        onChange={e => onChange(e)}
                                        minLength="8"
                                    />
                                </div>
                                <p className='link'>
                                    Mot de passe oublié ?  <Link  className='link-page' to="/ResetPassword">Réinitialiser mot de passe</Link>
                                </p>
                                <div>
                                    <button type="submit" className="button-log w-100 mb-0">
                                        Se connecter

                                    </button>
                                </div>
                                <div className="position-relative my-4">
                                    <hr />
                                    <p className="small bg-mode position-absolute top-50 start-50 translate-middle px-2"></p>
                                </div>
                                <div className="text-primary-hover text-body mt-3 text-center">
                                    Copyrights ©2024. Build by BMG
                                </div>

                            </form>
                        </div>
                    </div>

                </div>
            </section>
        </main>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
