// Import necessary dependencies
import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { register } from '../actions/auth';
import CSRFToken from '../components/CSRFToken';

// Define the Register component
const Register = ({ register, isAuthenticated }) => {
    // State to manage form data and account creation status
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        re_password: ''
    });

    const [accountCreated, setAccountCreated] = useState(false);

    // Destructure form data
    const { username, password, re_password } = formData;

    // Event handler to update form data on input change
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    // Event handler for form submission
    const onSubmit = e => {
        e.preventDefault();

        // Check if passwords match before attempting registration
        if (password === re_password) {
            register(username, password, re_password);
            setAccountCreated(true);
        }
    };

    // If the user is already authenticated, redirect to the dashboard
    if (isAuthenticated) {
        return <Navigate to="/dashboard" />;
    } else if (accountCreated) {
        // If the account is created successfully, redirect to the login page
        return <Navigate to="/login" />;
    }

    // Render the registration form
    return (
        <div className='container mt-5'>
            <h1>Inscrivez-vous pour un compte</h1>
            <form onSubmit={e => onSubmit(e)}>
                <CSRFToken />
                <div className='form-group'>
                    <label className='form-label'> Nom :</label>
                    <input
                        className='form-control'
                        type='text'
                        placeholder='Nom*'
                        name='Nom'
                        required
                        onChange={e => onChange(e)}
                        value={username}
                    />
                </div>
                <div className='form-group'>
                    <label className='form-label'> Prénom :</label>
                    <input
                        className='form-control'
                        type='text'
                        placeholder='Prénom*'
                        name='Prénom'
                        required
                        onChange={e => onChange(e)}
                        value={username}
                    />
                </div>
                <div className='form-group'>
                    <label className='form-label'> Email :</label>
                    <input
                        className='form-control'
                        type='text'
                        placeholder='Email*'
                        name='Email'
                        required
                        onChange={e => onChange(e)}
                        value={username}
                    />
                </div>
                <div className='form-group mt-3'>
                    <label className='form-label'> Mot de passe :</label>
                    <input
                        className='form-control'
                        type='Mot de passe'
                        placeholder='Mot de passe*'
                        name='Mot de passe'
                        required
                        onChange={e => onChange(e)}
                        value={password}
                        minLength='8'
                    />
                </div>
                <div className='form-group mt-3'>
                    <label className='form-label'> Confirmez Mot de passe :</label>
                    <input
                        className='form-control'
                        type='password'
                        placeholder='Confirmez Mot de passe*'
                        name='re_password'
                        required
                        onChange={e => onChange(e)}
                        value={re_password}
                        minLength='8'
                    />
                </div>
                <button className='btn btn-primary mt-3' type='submit'>
                    S'inscrire
                </button>
            </form>
            <p>
            Vous avez déjà un compte ? <Link to='/login'>Se connecter</Link>
            </p>
        </div>
    );
};

// Map the isAuthenticated state from Redux to props
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

// Connect the component to Redux and export it
export default connect(mapStateToProps, { register })(Register);