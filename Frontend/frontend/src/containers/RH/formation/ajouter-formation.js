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
    const [responsable_formation, setResponsable_formation] = useState('');
    const [responsable_validation, setResponsable_validation] = useState('');
    const [participantID, setParticipant] = useState([]);
    const [pieces_jointes, setPieces_jointes] = useState(null);
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

    const handleSubmit = (event) => {
        event.preventDefault();

        if (new Date(date_debut_formation) >= new Date(date_fin_formation)) {
            alert("La date de début doit être avant la date de fin.");
            return;
        }

        const Data = {
            intitule_formation: intitule_formation,
            type_formation: type_formation,
            organisme_formation: organisme_formation,
            theme_formation: theme_formation,
            date_debut_formation: date_debut_formation,
            date_fin_formation: date_fin_formation,
            responsable_formation: responsable_formation,
            responsable_validation: responsable_validation,
            participants: participantID, 
            pieces_jointes: pieces_jointes,
            parametre_validation: parametre_validation
        };

        const headers = {
            'Accept':'*/*',
            "Content-Type":'application/json',
            'X-CSRFToken': Cookies.get('csrftoken'),

        }
       

        axios.post(`${process.env.REACT_APP_API_URL}/RH/create_formation/`, Data, { headers : headers})
        .then(response =>{
            console.log('Ajout succès',response.data);
            setIntitule_formation('');
            setType_formation('');
            setOrganisme_formation('');
            setTheme_formation('');
            setDate_debut_formation('');
            setDate_fin_formation('');
            setResponsable_formation('');
            setResponsable_validation('');
            setParticipant('');
            setPieces_jointes(null);
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
                <div className="form-group">
                    <label>Intitulé de la formation :</label>
                    <input type="text" name="intitule_formation" value={intitule_formation} onChange={(e) => setIntitule_formation(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Type de formation :</label>
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
                <div className="form-group">
                    <label>Responsable de la formation :</label>
                    <select value={responsable_formation} onChange={(e) => setResponsable_formation(e.target.value)}>
                    <option value="">Sélectionner...</option>
                        {responsablesFormations.map(responsable_formation => (
                            <option key={responsable_formation.id} value={responsable_formation.id}>{responsable_formation.name}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Responsable de la validation :</label>
                    <select value={responsable_validation} onChange={(e) => setResponsable_validation(e.target.value)}>
                    <option value="">Sélectionner...</option>
                        {responsablesValidations.map(responsable_validation => (
                            <option key={responsable_validation.id} value={responsable_validation.id}>{responsable_validation.username}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Participants :</label>
                    <select multiple value={participantID} onChange={e => setParticipant(Array.from(e.target.selectedOptions, option => option.value))}>
                    {participantss.map(participants => (<option key={participants.id} value={participants.id}>{participants.username}</option>))}</select>
                </div>
                <div className="form-group">
                    <label>Pièces jointes :</label>
                    <input type="file" name="pieces_jointes" onChange={(e) => setPieces_jointes(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Paramètre de validation :</label>
                    <select value={parametre_validation} onChange={(e) => setParametre_validation(e.target.value)}>
                    <option value="">Sélectionner...</option>
                        <option value="chaud">Évaluation à chaud</option>
                        <option value="froid">Évaluation à froid</option>
                    </select>
                </div>
                <button className="btn btn-primary mt-3"  type="submit">Ajouter Formation</button>
                <Link to="/Dashboardformation">
                        <button className="btn btn-gray mt-3">Retour au tableau de bord</button>
                    </Link>
            </form>
        </div>
    </div>
);
      
    
};

export default AddFormation;
