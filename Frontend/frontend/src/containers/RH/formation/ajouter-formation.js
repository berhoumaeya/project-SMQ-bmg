import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import SubNavbarRH from '../../../components/SubNavbarRH';
import SidebarRH from '../../../components/SidebarRH';

function AddFormation() {
    const [responsablesFormations, setResponsablesFormations] = useState([]);
    const [responsablesValidations, setResponsablesValidations] = useState([]);
    const [participants, setParticipants] = useState([]);
    const [organismes, setOrganismes] = useState([]);

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
    const [date_cloture_formation, setDate_cloture_formation] = useState('');
    const [ajoutReussi, setAjoutReussi] = useState(false);

    // State for validation errors
    const [errors, setErrors] = useState({});

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/RH/dashboard_responsable_formation/`)
            .then(response => {
                setResponsablesFormations(response.data);
            })
            .catch(error => {
                console.error('Error', error);
            });

        axios.get(`${process.env.REACT_APP_API_URL}/RH/dashboard_employe/`)
            .then(response => {
                setResponsablesValidations(response.data);
            })
            .catch(error => {
                console.error('Error', error);
            });

        axios.get(`${process.env.REACT_APP_API_URL}/RH/dashboard_participant/`)
            .then(response => {
                setParticipants(response.data);
            })
            .catch(error => {
                console.error('Error', error);
            });

        axios.get(`${process.env.REACT_APP_API_URL}/achat/organismes/`)
            .then(response => {
                setOrganismes(response.data);
            })
            .catch(error => {
                console.error('Error', error);
            });
    }, []);

    useEffect(() => {
        if (date_fin_formation) {
            const date = new Date(date_fin_formation);
            date.setMonth(date.getMonth() + 6);
            setDate_cloture_formation(date.toISOString().split('T')[0]);
        }
    }, [date_fin_formation]);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setPiecesJointes(selectedFile);
    };

    const validateForm = () => {
        const formErrors = {};
        if (!intitule_formation) formErrors.intitule_formation = 'Intitulé de la formation est requis.';
        if (!type_formation) formErrors.type_formation = 'Type de formation est requis.';
        if (!theme_formation) formErrors.theme_formation = 'Thème de formation est requis.';
        if (!date_debut_formation) formErrors.date_debut_formation = 'Date de début de la formation est requis.';
        if (!date_fin_formation) formErrors.date_fin_formation = 'Date de fin de la formation est requis.';
        if (!responsable_formationID.length) formErrors.responsable_formationID = 'Responsable de la formation est requis.';
        if (!responsable_validation) formErrors.responsable_validation = 'Responsable de la validation est requis.';
        if (!participantID.length) formErrors.participantID = 'Participants sont requis.';
        if (!parametre_validation) formErrors.parametre_validation = 'Paramètre de validation est requis.';
        if (new Date(date_debut_formation) >= new Date(date_fin_formation)) formErrors.date = 'La date de début doit être avant la date de fin.';
        return formErrors;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
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
        formData.append('date_cloture_formation', date_cloture_formation);

        const headers = {
            'Accept': '*/*',
            'Content-Type': 'multipart/form-data',
            'X-CSRFToken': Cookies.get('csrftoken'),
        };

        axios.post(`${process.env.REACT_APP_API_URL}/RH/create_formation/`, formData, { headers })
            .then(response => {
                console.log('Ajout succès', response.data);
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
                setPiecesJointes(null);
                setDate_cloture_formation('');
                setErrors({});
                setAjoutReussi(true);
            })
            .catch(error => {
                console.error('Erreur lors de l\'ajout', error);
            });
    };

    if (ajoutReussi) {
        return <Navigate to="/Dashboardformation" />;
    }

    return (

        <>
            <SubNavbarRH />
            <main style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#eeeeee' }}>
            <SidebarRH />
            <div className="container ajout-form">
                    
                    <form onSubmit={handleSubmit} className="row">
                        <h4>Informations sur la Formation</h4>
                        <div className="col-md-6">
                            <div className="form-label">
                                <label className="form-label">Intitulé de la formation <span className="required">*</span>:</label>
                                <input type="text" className="form-control" placeholder="Nom*" name="intitule_formation" value={intitule_formation} onChange={(e) => setIntitule_formation(e.target.value)} />
                                {errors.intitule_formation && <div className="error">{errors.intitule_formation}</div>}
                            </div>
                            <div className="form-label">
                                <label className="form-label">Type de formation <span className="required">*</span>:</label>
                                <select className="form-control" value={type_formation} onChange={(e) => setType_formation(e.target.value)}>
                                    <option value="">Sélectionner...</option>
                                    <option value="interne">Formation en interne</option>
                                    <option value="intra">Formation en intra</option>
                                </select>
                                {errors.type_formation && <div className="error">{errors.type_formation}</div>}
                            </div>
                            <div className="form-label">
                                <label className="form-label">Organisme de formation :</label>
                                <select className="form-control" value={organisme_formation} onChange={(e) => setOrganisme_formation(e.target.value)}>
                                    <option value="">Sélectionner...</option>
                                    {organismes.map(organisme => (
                                        <option key={organisme.id} value={organisme.id}>
                                            {organisme.nom}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-label">
                                <label className="form-label">Thème de formation :</label>
                                <input type="text" className="form-control" placeholder="Thème de formation*" name="theme_formation" value={theme_formation} onChange={(e) => setTheme_formation(e.target.value)} />
                                {errors.theme_formation && <div className="error">{errors.theme_formation}</div>}
                            </div>
                            <div className="form-label">
                                <label className="form-label">Date prévue de la formation <span className="required">*</span>:</label>
                                <input type="date" className="form-control" placeholder="Date de début de la formation" name="date_debut_formation" value={date_debut_formation} onChange={(e) => setDate_debut_formation(e.target.value)} />
                                {errors.date_debut_formation && <div className="error">{errors.date_debut_formation}</div>}
                            </div>
                            <div className="form-label">
                                <label className="form-label">Date de fin de la formation <span className="required">*</span>:</label>
                                <input type="date" className="form-control" placeholder="Date de fin de la formation" name="date_fin_formation" value={date_fin_formation} onChange={(e) => setDate_fin_formation(e.target.value)} />
                                {errors.date_fin_formation && <div className="error">{errors.date_fin_formation}</div>}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-label">
                                <label className="form-label">Responsable de la formation <span className="required">*</span>:</label>
                                <select className="form-control" value={responsable_formationID} onChange={(e) => setResponsable_formation(Array.from(e.target.selectedOptions, option => option.value))} multiple>
                                    <option value="">Sélectionner...</option>
                                    {responsablesFormations.map(responsable => (
                                        <option key={responsable.id} value={responsable.id}>
                                            {responsable.nom} {responsable.prenom}
                                        </option>
                                    ))}
                                </select>
                                {errors.responsable_formationID && <div className="error">{errors.responsable_formationID}</div>}
                            </div>
                            <div className="form-label">
                                <label className="form-label">Responsable de validation <span className="required">*</span>:</label>
                                <select className="form-control" value={responsable_validation} onChange={(e) => setResponsable_validation(e.target.value)}>
                                    <option value="">Sélectionner...</option>
                                    {responsablesValidations.map(responsable => (
                                        <option key={responsable.id} value={responsable.id}>
                                            {responsable.nom} {responsable.prenom}
                                        </option>
                                    ))}
                                </select>
                                {errors.responsable_validation && <div className="error">{errors.responsable_validation}</div>}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-label">
                                <label className="form-label">Participants <span className="required">*</span>:</label>
                                <select className="form-control" value={participantID} onChange={(e) => setParticipant(Array.from(e.target.selectedOptions, option => option.value))} multiple>
                                    <option value="">Sélectionner...</option>
                                    {participants.map(participant => (
                                        <option key={participant.id} value={participant.id}>
                                            {participant.nom} {participant.prenom}
                                        </option>
                                    ))}
                                </select>
                                {errors.participantID && <div className="error">{errors.participantID}</div>}
                            </div>
                            <div className="form-label">
                                <label className="form-label">Paramètre de critères de validation <span className="required">*</span>:</label>
                                <select className="form-control" value={parametre_validation} onChange={(e) => setParametre_validation(e.target.value)}>
                                    <option value="">Sélectionner...</option>
                                    <option value="evaluation_chaud">Évaluation à chaud</option>
                                    <option value="evaluation_froid">Évaluation à froid</option>
                                </select>
                                {errors.parametre_validation && <div className="error">{errors.parametre_validation}</div>}
                            </div>
                            <div className="form-label">
                                <label className="form-label">Date de clôture de la formation :</label>
                                <input type="date" className="form-control" name="date_cloture_formation" value={date_cloture_formation} readOnly />
                            </div>
                        </div>
                        <h4>Documents et Pièces Jointes</h4>
                        <div className="col-md-6">
                            <div className="form-label">
                                <label className="form-label">Pièces jointes :</label>
                                <input type="file" className="form-control" onChange={handleFileChange} />
                            </div>
                        </div>
                    </form>
                    <div className="contact-image">
                        <div className="button-container">
                            <button className="button-add" type="submit" onClick={handleSubmit}>Ajouter une formation</button>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

export default AddFormation;
