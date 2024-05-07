import React, { useState } from 'react';
import axios from 'axios';
import '../formation/FormationForm.css';
import { Navigate ,Link} from 'react-router-dom';
import Cookies from 'js-cookie';

const AddEmploye = () => {
    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        email: '',
        username: '',
        is_user: false
    });
    const [ajoutReussi, setAjoutReussi] = useState(false);

    const onChange = e => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({ ...formData, [e.target.name]: value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/RH/create-employe/`, formData, {
                headers : {
                    'Accept':'*/*',
                    "Content-Type":'application/json',
                    'X-CSRFToken': Cookies.get('csrftoken'),
                }
            });
            setAjoutReussi(true);
        } catch (error) {
            console.error('Error adding formation:', error);
        }
    };
    if(ajoutReussi){
        return <Navigate to="/Dashboardemploye" />;
    }

    return (
        <div className="form-container">
            <div className="form-card">
                <h3>Ajouter un Employe</h3>
                <form onSubmit={e => handleSubmit(e)} className="form">
                    <div className="form-group">
                        <label>Nom Employe :</label>
                        <input type="text" name="nom" value={formData.nom} onChange={e => onChange(e)} />
                    </div>
                    <div className="form-group">
                        <label>Prenom de Employe :</label>
                        <input type="text" name="prenom" value={formData.prenom} onChange={e => onChange(e)} />
                    </div>
                    <div className="form-group">
                        <label>Nom de l'utilisateur Employe :</label>
                        <input name="username" value={formData.username} onChange={e => onChange(e)} />
                    </div>
                    <div className="form-group">
                        <label>Email de Employe :</label>
                        <input name="email" value={formData.email} onChange={e => onChange(e)} />
                    </div>
                    <div className="form-group">
                        <label>Est un utilisateur :</label>
                        <input type="checkbox" name="is_user" checked={formData.is_user} onChange={e => onChange(e)} />
                    </div>
                    <button className="btn btn-success mt-3" type="submit">Ajouter Employe</button>
                    <Link to="/Dashboardemploye">
                        <button className="btn btn-gray mt-3">Retour au tableau de bord</button>
                    </Link>
                </form>
            </div>
        </div>
    );    
};

export default AddEmploye;