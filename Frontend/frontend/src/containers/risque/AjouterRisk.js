import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import '../Client/forms.css';  // Ensure the CSS file path is correct

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
        <main style={{ backgroundColor: '#eeeeee', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div className="container ajout-form">
                <div className="contact-image">
                    <img src="/images/add.png" alt="add_risk" />
                    <div className="button-container">
                        <Link to="/AllRisque">
                            <button className="retour">Retour au tableau de bord</button>
                        </Link>
                        <button className="button-add" type="submit" form="add-risk-form">Ajouter risque</button>
                    </div>
                </div>
                <form id="add-risk-form" onSubmit={handleSubmit} className="row">
                    <div className="col-md-6">
                        <div className="form-label">
                            <label className="form-label">Nom du Risque:</label>
                            <input type="text" name="nom_risk" className="form-control" placeholder='Nom du Risque*' value={formData.nom_risk} onChange={handleChange} />
                            {errors.nom_risk && <p className="error-text">{errors.nom_risk}</p>}
                        </div>
                        <div className="form-label">
                            <label className="form-label">Date de Déclaration:</label>
                            <input type="date" name="date_declaration" className="form-control" value={formData.date_declaration} onChange={handleChange} />
                            {errors.date_declaration && <p className="error-text">{errors.date_declaration}</p>}
                        </div>
                        <div className="form-label">
                            <label className="form-label">Déclencheur:</label>
                            <select name="declencheur" className="form-control" value={formData.declencheur} onChange={handleChange}>
                                <option value="">Sélectionner...</option>
                                <option value="Faille de sécurité dans le système">Faille de sécurité dans le système</option>
                                <option value="Attaque de phishing">Attaque de phishing</option>
                                <option value="Panne équipement">Panne équipement</option>
                                <option value="Erreur humaine">Erreur humaine</option>
                            </select>
                            {errors.declencheur && <p className="error-text">{errors.declencheur}</p>}
                        </div>
                        <div className="form-label">
                            <label className="form-label">Liste Concernée:</label>
                            <select name="liste_concernee" className="form-control" value={formData.liste_concernee} onChange={handleChange}>
                                <option value="">Sélectionner...</option>
                                <option value="Département IT">Département IT</option>
                                <option value="Équipe de production">Équipe de production</option>
                                <option value="Clients">Clients</option>
                                <option value="Fournisseurs">Fournisseurs</option>
                            </select>
                            {errors.liste_concernee && <p className="error-text">{errors.liste_concernee}</p>}
                        </div>
                        <div className="form-label">
                            <label className="form-label">Type Risque:</label>
                            <select name="type_risque" className="form-control" value={formData.type_risque} onChange={handleChange}>
                                <option value="">Sélectionner...</option>
                                <option value="MENACE">Menace</option>
                                <option value="OPPORTUNITE">Opportunité</option>
                            </select>
                            {errors.type_risque && <p className="error-text">{errors.type_risque}</p>}
                        </div>
                    </div>
                    <div className="col-md-6">
                        {formData.criteres.map((critere, index) => (
                            <div key={index}>
                                <label>Critère {index + 1}:</label>
                                {errors.criteres && <p className="error-text">{errors.criteres}</p>}
                                <select name="nom" className="form-control" value={critere.nom} onChange={(e) => handleCritereChange(index, e)}>
                                    <option value="">Sélectionner critère</option>
                                    <option value="Probabilité occurrence">Probabilité occurrence</option>
                                    <option value="Impact">Impact</option>
                                    <option value="Vulnérabilité">Vulnérabilité</option>
                                    <option value="Mesures de contrôle existantes">Mesures de contrôle existantes</option>
                                    <option value="Capacité de détection">Capacité de détection</option>
                                    <option value="Tendance">Tendance</option>
                                </select>
                                <input type="number" name="note" className="form-control" value={critere.note} onChange={(e) => handleCritereChange(index, e)} min="1" max="10" />
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
                    </div>
                </form>
            </div>
        </main>
    );
};

export default AddRisque;
