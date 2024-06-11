import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
import { useNavigate , Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        re_password: '',
        prenom: '',
        nom: ''
    });
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
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
        <div className='container mt-5'>
            <ToastContainer />
            <div className="form-card">
                <h1>S'inscrire</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                         <label className='form-label'>Email:</label>
                        {errors.username && <p className="error-text">{errors.username}</p>}
                        <input className='form-control' type="email" name="username" value={formData.username} onChange={handleChange} required placeholder='Email*' />
                    </div>
                    <div className="form-group">
                         <label className='form-label'>Prénom:</label>
                        {errors.prenom && <p className="error-text">{errors.prenom}</p>}
                        <input className='form-control' type="text" name="prenom" value={formData.prenom} onChange={handleChange} required placeholder='Prénom*' />
                    </div>
                    <div className="form-group">
                         <label className='form-label'>Nom:</label>
                        {errors.nom && <p className="error-text">{errors.nom}</p>}
                        <input className='form-control' type="text" name="nom" value={formData.nom} onChange={handleChange} required placeholder='Nom*' />
                    </div>
                    <div className="form-group">
                         <label className='form-label'>Mot de passe:</label>
                        {errors.password && <p className="error-text">{errors.password}</p>}
                        <input className='form-control' type="password" name="password" value={formData.password} onChange={handleChange} required placeholder='mot de passe*' minLength='8' />
                    </div>
                    <div className="form-group">
                         <label className='form-label'>Confirmer le mot de passe:</label>
                        {errors.re_password && <p className="error-text">{errors.re_password}</p>}
                        <input className='form-control' type="password" name="re_password" value={formData.re_password} onChange={handleChange} required placeholder='confirmer mot de passe*' />
                    </div>
                    <button className='btn btn-primary mt-3' type='submit'>
                    S'inscrire
                </button>
                </form>
                <p>
            Vous avez déjà un compte ? <Link to='/login'>Se connecter</Link>
            </p>
            </div>
        </div>
    );
};

export default Register;
