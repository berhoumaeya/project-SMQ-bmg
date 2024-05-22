import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navigate ,Link} from 'react-router-dom';
import './FormationForm.css';
import Cookies from 'js-cookie';
function AddFormation() {
    const [responsablesFormations, setResponsablesFormations] = useState([]);
    const [responsablesValidations, setResponsablesValidations] = useState([]);
    const [participantss, setParticipants] = useState([]);

    const [intitule_formation, setIntitule_formation] = useState('');
    const [type_formation, setType_formation] = useState('');
    const [organisme_formation, setOrganisme_formation] = useState('');
    const [theme_formation, setTheme_formation] = useState('');
    const [date_debut_formation, setDate_debut_formation] = useState('');
    const [date_fin_formation, setDate_fin_formation] = useState('');
    const [responsable_formationID, setResponsable_formation] = useState([]);
    const [responsable_validation, setResponsable_validation] = useState('');
    const [participantID, setParticipant] = useState([]);
    const [pieces_jointes, setPiecesJointes] = useState(null);
    const [parametre_validation, setParametre_validation] = useState('');


    const [ajoutReussi, setAjoutReussi] = useState(false);


    useEffect(() => {
                 axios.get(`${process.env.REACT_APP_API_URL}/RH/dashboard_responsable_formation/`)
                .then(response => {
                    setResponsablesFormations(response.data);
                })
                .catch(error => {
                    console.error('Error',error)
                });

                axios.get(`${process.env.REACT_APP_API_URL}/RH/dashboard_employe/`)
                .then(response => {
                    setResponsablesValidations(response.data);
                })
                .catch(error => {
                    console.error('Error',error)
                });

                axios.get(`${process.env.REACT_APP_API_URL}/RH/dashboard_participant/`)
                .then(response => {
                    setParticipants(response.data);
                })
                .catch(error => {
                    console.error('Error',error)
                });
            },[]);

            const handleFileChange = (event) => {
                const selectedFile = event.target.files[0];
                setPiecesJointes(selectedFile);
            };      

    const handleSubmit = (event) => {
        event.preventDefault();

        if (new Date(date_debut_formation) >= new Date(date_fin_formation)) {
            alert("La date de début doit être avant la date de fin.");
            return;
        }

        const formData = new FormData();

        formData.append('intitule_formation', intitule_formation);
        formData.append('type_formation', type_formation);
        formData.append('organisme_formation', organisme_formation);
        formData.append('theme_formation', theme_formation);
        formData.append('date_debut_formation', date_debut_formation);
        formData.append('date_fin_formation', date_fin_formation);
        formData.append('responsable_validation', responsable_validation);
        participantID.forEach(id => {
            formData.append('participants', id);
        });
        responsable_formationID.forEach(id => {
            formData.append('responsable_formation', id);
        });
        formData.append('parametre_validation', parametre_validation);

        if (pieces_jointes) {
            formData.append('pieces_jointes', pieces_jointes);
        }

        const headers = {
            'Accept':'*/*',
            'Content-Type': 'multipart/form-data',
            'X-CSRFToken': Cookies.get('csrftoken'),

        }
       

        axios.post(`${process.env.REACT_APP_API_URL}/RH/create_formation/`, formData, { headers : headers})
        .then(response =>{
            console.log('Ajout succès',response.data);
            setIntitule_formation('');
            setType_formation('');
            setOrganisme_formation('');
            setTheme_formation('');
            setDate_debut_formation('');
            setDate_fin_formation('');
            setResponsable_formation([]);
            setResponsable_validation('');
            setParticipant([]);
            setParametre_validation('');
            setAjoutReussi(true);
        })
        .catch(error =>{
            console.error('Erreur lors de l\'ajout',error)
        });
        };
        if(ajoutReussi){
            return <Navigate to="/Dashboardformation" />;
        }
    return (
        <div className="form-container">
        <div className="form-card">
            <h3>Ajouter une Formation</h3>
            <form onSubmit={handleSubmit} className="form">
                <div className="form-section">
                    <h4>Informations sur la Formation</h4>
                    <div className="form-group">
                        <label>Intitulé de la formation <span className="required">*</span>:</label>
                        <input type="text" name="intitule_formation" value={intitule_formation} onChange={(e) => setIntitule_formation(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Type de formation <span className="required">*</span>:</label>
                        <select value={type_formation} onChange={(e) => setType_formation(e.target.value)}>
                            <option value="">Sélectionner...</option>
                            <option value="interne">Formation en interne</option>
                            <option value="intra">Formation en intra</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Organisme de formation :</label>
                        <input type="text" name="organisme_formation" value={organisme_formation} onChange={(e) => setOrganisme_formation(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Thème de formation :</label>
                        <input type="text" name="theme_formation" value={theme_formation} onChange={(e) => setTheme_formation(e.target.value)}></input>
                    </div>
                    <div className="form-group">
                        <label>Date de début de la formation :</label>
                        <input type="date" name="date_debut_formation" value={date_debut_formation} onChange={(e) => setDate_debut_formation(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Date de fin de la formation :</label>
                        <input type="date" name="date_fin_formation" value={date_fin_formation}onChange={(e) => setDate_fin_formation(e.target.value)} />
                    </div>
                </div>
    
                <div className="form-section">
                    <h4>Responsabilités et Participants</h4>
                    <div className="form-group">
                        <label>Responsables Formation <span className="required">*</span>:</label>
                        <select multiple value={responsable_formationID} onChange={(e) => setResponsable_formation(Array.from(e.target.selectedOptions, option => option.value))}>
                            {responsablesFormations.map(responsable_formation => (
                                <option key={responsable_formation.id} value={responsable_formation.id}>{responsable_formation.username}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Responsable de la validation <span className="required">*</span>:</label>
                        <select value={responsable_validation} onChange={(e) => setResponsable_validation(e.target.value)}>
                            <option value="">Sélectionner...</option>
                            {responsablesValidations.map(responsable_validation => (
                                <option key={responsable_validation.id} value={responsable_validation.id}>{responsable_validation.username}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Participants <span className="required">*</span>:</label>
                        <select multiple value={participantID} onChange={(e) => setParticipant(Array.from(e.target.selectedOptions, option => option.value))}>
                            {participantss.map(participant => (
                                <option key={participant.id} value={participant.id}>{participant.username}</option>
                            ))}
                        </select>
                    </div>
                </div>
    
                <div className="form-section">
                    <h4>Pièces jointes</h4>
                    <div className="form-group">
                        <label>Pièces jointes :</label>
                        <input type="file" onChange={handleFileChange} accept=".pdf,.doc,.docx" />
                        <small>Formats acceptés : PDF, Word (.doc, .docx)</small>
                    </div>
                </div>
    
                <div className="form-section">
                    <h4>Paramètre de validation</h4>
                    <div className="form-group">
                        <label>Paramètre de validation <span className="required">*</span>:</label>
                        <select value={parametre_validation} onChange={(e) => setParametre_validation(e.target.value)}>
                            <option value="">Sélectionner...</option>
                            <option value="chaud">Évaluation à chaud</option>
                            <option value="froid">Évaluation à froid</option>
                        </select>
                    </div>
                </div>
    
                <div className="form-actions">
                    <button className="btn btn-primary" type="submit">Ajouter Formation</button>
                    <Link to="/Dashboardformation" className="btn btn-gray">Retour au tableau de bord</Link>
                </div>
            </form>
        </div>
    </div>
    
);
      
    
};

export default AddFormation;
