import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';

const AddRisque = () => {
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        nom_risk: '',
        date_declaration: '',
        declencheur: '',
        liste_concernee: '',
        type_risque: '',
        criteres: [{ nom: '', note: 1 }],
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleCritereChange = (index, e) => {
        const { name, value } = e.target;
        const newCriteres = [...formData.criteres];
        newCriteres[index][name] = value;
        setFormData({
            ...formData,
            criteres: newCriteres,
        });
    };

    const addCritere = () => {
        setFormData({
            ...formData,
            criteres: [...formData.criteres, { nom: '', note: 1 }],
        });
    };

    const removeCritere = (index) => {
        const newCriteres = [...formData.criteres];
        newCriteres.splice(index, 1);
        setFormData({
            ...formData,
            criteres: newCriteres,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post(`${process.env.REACT_APP_API_URL}/risk/risques/`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': Cookies.get('csrftoken'),
                },
            })
            .then((response) => {
                console.log('Risk added successfully:', response.data);
                toast.success('Ajout avec succès!');
                navigate('/AllRisque');
            })
            .catch((error) => {
                console.error('There was an error adding the risk:', error.response.data);
                setErrors(
                    error.response?.data || { message: "Une erreur s'est produite lors de la création du risque." }
                );
            });
    };

    return (
        <div className="form-container">
            <div className="form-card">
                <h3>Ajouter risque</h3>
                <form onSubmit={handleSubmit} className="form">
                    <div className="form-group">
                        <label>Nom du Risque:</label>
                        {errors.nom_risk && <p className="error-text">{errors.nom_risk}</p>}
                        <input type="text" name="nom_risk" value={formData.nom_risk} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Date de Déclaration:</label>
                        {errors.date_declaration && <p className="error-text">{errors.date_declaration}</p>}
                        <input type="date" name="date_declaration" value={formData.date_declaration} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Déclencheur:</label>
                        {errors.declencheur && <p className="error-text">{errors.declencheur}</p>}
                        <select name="declencheur" value={formData.declencheur} onChange={handleChange}>
                            <option value="">Sélectionner...</option>
                            <option value="Faille de sécurité dans le système">Faille de sécurité dans le système</option>
                            <option value="Attaque de phishing">Attaque de phishing</option>
                            <option value="Panne équipement">Panne équipement</option>
                            <option value="Erreur humaine">Erreur humaine</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Liste Concernée:</label>
                        {errors.liste_concernee && <p className="error-text">{errors.liste_concernee}</p>}
                        <select name="liste_concernee" value={formData.liste_concernee} onChange={handleChange}>
                            <option value="">Sélectionner...</option>
                            <option value="Département IT">Département IT</option>
                            <option value="Équipe de production">Équipe de production</option>
                            <option value="Clients">Clients</option>
                            <option value="Fournisseurs">Fournisseurs</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Type Risque:</label>
                        {errors.type_risque && <p className="error-text">{errors.type_risque}</p>}
                        <select name="type_risque" value={formData.type_risque} onChange={handleChange}>
                            <option value="">Sélectionner...</option>
                            <option value="MENACE">Menace</option>
                            <option value="OPPORTUNITE">Opportunité</option>
                        </select>
                    </div>
                    {formData.criteres.map((critere, index) => (
                        <div key={index}>
                            <label>Critère {index + 1}:</label>
                            {errors.criteres && <p className="error-text">{errors.criteres}</p>}
                            <select name="nom" value={critere.nom} onChange={(e) => handleCritereChange(index, e)}>
                                <option value="">Sélectionner critère</option>
                                <option value="Probabilité occurrence">Probabilité occurrence</option>
                                <option value="Impact">Impact</option>
                                <option value="Vulnérabilité">Vulnérabilité</option>
                                <option value="Mesures de contrôle existantes">Mesures de contrôle existantes</option>
                                <option value="Capacité de détection">Capacité de détection</option>
                                <option value="Tendance">Tendance</option>
                            </select>
                            <input type="number" name="note" value={critere.note} onChange={(e) => handleCritereChange(index, e)} min="1" max="10" />
                            {index > 0 && (
                                <FontAwesomeIcon
                                    icon={faMinus}
                                    onClick={() => removeCritere(index)}
                                    style={{ cursor: 'pointer', marginLeft: '10px' }}
                                />
                            )}
                        </div>
                    ))}
                    <FontAwesomeIcon icon={faPlus} onClick={addCritere} style={{ cursor: 'pointer', marginTop: '10px' }} />
                    <div className="button-group">
                        <button className="btn btn-primary" type="submit">
                            Ajouter risque
                        </button>
                        <Link to="/AllRisque" className="btn btn-secondary">
                            Retour au tableau de bord
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddRisque;
