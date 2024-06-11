import React, { useState } from 'react';
import axios from 'axios';
import '../formation/FormationForm.css';
import { useParams, Navigate, Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

function CompetenceForm() {
    const { id } = useParams();
    const [errors, setErrors] = useState({});
    const [ajoutReussi, setAjoutReussi] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        commentaires: '',
        criteres: [
            { skills_acquis: '', note_acquis: 1, note_requis: 1 },
        ],
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleCritereChange = (index, e) => {
        const { name, value } = e.target;
        const newCriteres = [...formData.criteres];
        newCriteres[index][name] = value;
        setFormData({
            ...formData,
            criteres: newCriteres
        });
    };

    const addCritere = () => {
        setFormData({
            ...formData,
            criteres: [...formData.criteres, { skills_acquis: '', note_acquis: 1, note_requis: 1 }]
        });
    };

    const removeCritere = (index) => {
        const newCriteres = [...formData.criteres];
        newCriteres.splice(index, 1);
        setFormData({
            ...formData,
            criteres: newCriteres
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const headers = {
            'Accept': '*/*',
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken')
        };

        axios.post(`${process.env.REACT_APP_API_URL}/RH/create_evaluation_competence/${id}/`, formData, { headers: headers })
            .then(response => {
                console.log('Fiche ajoutée avec succès :', response.data);
                setAjoutReussi(true);
            })
            .catch(error => {
                console.error('There was an error adding the evaluation:', error.response.data);
                setErrors(error.response?.data || { message: 'Une erreur s\'est produite lors de la création du evaluation.' });
            });
    };

    if (ajoutReussi) {
        return <Navigate to={`/Dashboardcompetence/${id}`} />;
    }

    return (
        <div className="form-container">
            <div className="form-card">
                <h3>Evaluer employé</h3>
                <form onSubmit={handleSubmit} className="form">
                    <div className="form-group">
                        <label>Nom du evaluation:</label>
                        {errors.name && <p className="error-text">{errors.name}</p>}
                        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>commentaires:</label>
                        {errors.commentaires && <p className="error-text">{errors.commentaires}</p>}
                        <input type="text" name="commentaires" value={formData.commentaires} onChange={handleChange} />
                    </div>
                    {formData.criteres.map((critere, index) => (
                        <div key={index}>
                            <label>Critère {index + 1}:</label>
                            {errors.criteres && errors.criteres[index] && (
                                <div className="error-text">
                                    {errors.criteres[index].skills_acquis && <p>{errors.criteres[index].skills_acquis}</p>}
                                    {errors.criteres[index].note_acquis && <p>{errors.criteres[index].note_acquis}</p>}
                                    {errors.criteres[index].note_requis && <p>{errors.criteres[index].note_requis}</p>}
                                </div>
                            )}
                            <input
                                type="text"
                                name="skills_acquis"
                                value={critere.skills_acquis}
                                onChange={(e) => handleCritereChange(index, e)}
                                required
                            />
                            <input
                                type="number"
                                name="note_acquis"
                                value={critere.note_acquis}
                                onChange={(e) => handleCritereChange(index, e)}
                                min="1"
                                max="10"
                                required
                            />
                            <input
                                type="number"
                                name="note_requis"
                                value={critere.note_requis}
                                onChange={(e) => handleCritereChange(index, e)}
                                min="1"
                                max="10"
                                required
                            />
                            {index > 0 && (
                                <FontAwesomeIcon icon={faMinus} onClick={() => removeCritere(index)} style={{ cursor: 'pointer', marginLeft: '10px' }} />
                            )}
                        </div>
                    ))}
                    <FontAwesomeIcon icon={faPlus} onClick={addCritere} style={{ cursor: 'pointer', marginTop: '10px' }} />
                    <div className="button-group">
                        <button className="btn btn-primary" type="submit">Evaluer</button>
                        <Link to={`/Dashboardcompetence/${id}`} className="btn btn-secondary">Retour au tableau de bord</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CompetenceForm;
