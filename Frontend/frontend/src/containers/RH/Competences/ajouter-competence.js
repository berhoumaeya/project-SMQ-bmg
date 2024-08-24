import React, { useState } from 'react';
import axios from 'axios';
import { useParams, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import SubNavbarRH from '../../../components/SubNavbarRH';
import SidebarRH from '../../../components/SidebarRH';

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
        <>
            <SubNavbarRH />
            <main style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#eeeeee' }}>
                <SidebarRH />

                <div class="container ajout-form">
                 
                    <form onSubmit={handleSubmit} className="form">
                    <h4>Ajout de Compétence</h4>
                        <div className="form-label">
                            <label className="form-label">Nom du évaluation :</label>
                            {errors.name && <p className="error-text">{errors.name}</p>}
                            <input className="form-control" placeholder='Nom du évaluation*' type="text" name="name" value={formData.name} onChange={handleChange} required />
                        </div>
                        <div className="form-label">
                            <label className="form-label">Commentaires :</label>
                            {errors.commentaires && <p className="error-text">{errors.commentaires}</p>}
                            <input type="text" className="form-control" placeholder='Commentaires*' name="commentaires" value={formData.commentaires} onChange={handleChange} />
                        </div>
                        {formData.criteres.map((critere, index) => (
                            <div className="criteria-row" key={index}>
                                <label className="criteria-label">Critère {index + 1}:</label>
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
                                    className="form-control criteria-input"
                                    value={critere.skills_acquis}
                                    onChange={(e) => handleCritereChange(index, e)}
                                    required
                                />
                                <input
                                    type="number"
                                    name="note_acquis"
                                    className="form-control criteria-input"
                                    value={critere.note_acquis}
                                    onChange={(e) => handleCritereChange(index, e)}
                                    min="1"
                                    max="10"
                                    required
                                />
                                <input
                                    type="number"
                                    name="note_requis"
                                    className="form-control criteria-input"
                                    value={critere.note_requis}
                                    onChange={(e) => handleCritereChange(index, e)}
                                    min="1"
                                    max="10"
                                    required
                                />
                                {index > 0 && (
                                    <FontAwesomeIcon
                                        icon={faMinus}
                                        onClick={() => removeCritere(index)}
                                        className="remove-icon"
                                    />
                                )}
                            </div>
                        ))}

                        <FontAwesomeIcon icon={faPlus} onClick={addCritere} style={{ cursor: 'pointer', marginTop: '10px' }} />

                    </form>
                    <div class="contact-image ">
                        <div class="button-container">
                            <button className="button-add" type="submit">Evaluer</button>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

export default CompetenceForm;
