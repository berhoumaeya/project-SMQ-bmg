import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import '../styles/log.css';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        re_password: '',
        prenom: '',
        nom: ''
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const validatePassword = (password) => {
        return password.length >= 8;
    };

    const validateFields = (name, value) => {
        let error = '';
        switch (name) {
            case 'username':
                if (!validateEmail(value)) {
                    error = 'Adresse email invalide.';
                }
                break;
            case 'password':
                if (!validatePassword(value)) {
                    error = 'Le mot de passe doit contenir au moins 8 caractères.';
                }
                break;
            case 're_password':
                if (value !== formData.password) {
                    error = 'Les mots de passe ne correspondent pas.';
                }
                break;
            case 'prenom':
            case 'nom':
                if (!value.trim()) {
                    error = `Le champ ${name} ne peut pas être vide.`;
                }
                break;
            default:
                break;
        }
        return error;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        const error = validateFields(name, value);
        setFormData({
            ...formData,
            [name]: value
        });
        setErrors({
            ...errors,
            [name]: error
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let valid = true;
        const newErrors = {};
        Object.keys(formData).forEach((key) => {
            const error = validateFields(key, formData[key]);
            if (error) {
                valid = false;
                newErrors[key] = error;
            }
        });

        if (!valid) {
            setErrors(newErrors);
            return;
        }

        axios.post(`${process.env.REACT_APP_API_URL}/user/register`, formData, {
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': Cookies.get('csrftoken'),
            }
        })
            .then(response => {
                navigate('/login');
                toast.success(response.data.success);
                setFormData({
                    username: '',
                    password: '',
                    re_password: '',
                    prenom: '',
                    nom: ''
                });
                setErrors({});
            })
            .catch(error => {
                if (error.response && error.response.data) {
                    setErrors(error.response.data);
                } else {
                    setErrors({ message: 'Une erreur s\'est produite.' });
                }
            });
    };

    return (
        <main style={{ backgroundColor: '#eeeeee', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <ToastContainer />

            <section className="vh-xxl-100 section-container content-with-navbar-margin">
                <div className="row g-0">
                    <div className="col-lg-6 d-flex align-items-center order-2 order-lg-1">
                        <div className="p-3 p-lg-4">
                            <img src="../images/signin.png" alt="Sign in" style={{ width: '400px', height: '400px' }} />
                        </div>
                        <div className="vr opacity-1 d-none d-lg-block" />
                    </div>
                    <div className="col-lg-6 order-1">
                        <div className="p-5 p-sm-7">
                            <h1 className="mb-2 centered-text">La meilleure offre pour vous</h1>
                            <form className="mt-4 text-start" onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label>Email:</label>
                                    {errors.username && <p className="error-text">{errors.username}</p>}
                                    <input className='form-control' type="email" name="username" value={formData.username} onChange={handleChange} required placeholder='Email*' />
                                </div>
                                <div className="mb-3">
                                    <label>Prénom:</label>
                                    {errors.prenom && <p className="error-text">{errors.prenom}</p>}
                                    <input className='form-control' type="text" name="prenom" value={formData.prenom} onChange={handleChange} required placeholder='Prénom*' />
                                </div>
                                <div className="mb-3">
                                    <label>Nom:</label>
                                    {errors.nom && <p className="error-text">{errors.nom}</p>}
                                    <input className='form-control' type="text" name="nom" value={formData.nom} onChange={handleChange} required placeholder='Nom*' />
                                </div>
                                <div className="mb-3">
                                    <label>Mot de passe:</label>
                                    {errors.password && <p className="error-text">{errors.password}</p>}
                                    <input className='form-control' type="password" name="password" value={formData.password} onChange={handleChange} required placeholder='Mot de passe*' minLength='8' />
                                </div>
                                <div className="mb-3">
                                    <label>Confirmer le mot de passe:</label>
                                    {errors.re_password && <p className="error-text">{errors.re_password}</p>}
                                    <input className='form-control' type="password" name="re_password" value={formData.re_password} onChange={handleChange} required placeholder='Confirmer mot de passe*' />
                                </div>
                                <button className="button-log w-100 mb-0" type='submit'>
                                    S'inscrire
                                </button>
                            </form>
                            <p className='link'>
                                Vous avez déjà un compte ? <Link className='link-page' to='/login'>Se connecter</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Register;
