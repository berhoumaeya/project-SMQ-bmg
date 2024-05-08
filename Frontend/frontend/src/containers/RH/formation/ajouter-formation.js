import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navigate ,Link} from 'react-router-dom';
import './FormationForm.css';
import { format } from 'date-fns';
import Cookies from 'js-cookie';
function AddFormation() {
    const [formData, setFormData] = useState({
        intitule_formation: '',
        type_formation: '',
        organisme_formation: '',
        theme_formation: '',
        date_debut_formation: '',
        date_fin_formation: '',
        responsable_formation: '',
        responsable_validation: '',
        participant: [], 
        pieces_jointes: null,
        parametre_validation: ''
    });


    const [ajoutReussi, setAjoutReussi] = useState(false);

    const [responsablesFormations, setResponsablesFormations] = useState([]);
    const [responsablesValidations, setResponsablesValidations] = useState([]);
    const [participants, setParticipants] = useState([]);

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

            function handleDateChange(event) {
                const date = new Date(event.target.value);
                const dateEnFormatSouhaite = format(date, 'yyyy-MM-dd');
                setFormData({ ...formData, date_debut_formation: dateEnFormatSouhaite });
                setFormData({ ...formData, date_fin_formation: dateEnFormatSouhaite });
            }

    const handleSubmit = (event) => {
        event.preventDefault();

        const Data = {
            intitule_formation: formData.intitule_formation,
            type_formation: formData.type_formation,
            organisme_formation: formData.organisme_formation,
            theme_formation: formData.theme_formation,
            date_debut_formation: formData.date_debut_formation,
            date_fin_formation: formData.date_fin_formation,
            responsable_formation: formData.responsable_formation,
            responsable_validation: formData.responsable_validation,
            participant: formData.participant, 
            pieces_jointes: formData.pieces_jointes,
            parametre_validation: formData.parametre_validation
        };

        const headers = {
            'Accept':'*/*',
            "Content-Type":'application/json',
            'X-CSRFToken': Cookies.get('csrftoken'),

        }
       

        axios.post(`${process.env.REACT_APP_API_URL}/RH/create_formation/`, Data, { headers : headers})
        .then(response =>{
            console.log('Ajout succès',response.data);
            setFormData('');
            setAjoutReussi(false);
        })
        .catch(error =>{
            console.error('Erreur lors de l\'ajout')
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
                    <input type="text" name="intitule_formation" value={formData.intitule_formation} onChange={(e) => setFormData({...formData, intitule_formation : e.target.value})} />
                </div>
                <div className="form-group">
                    <label>Type de formation :</label>
                    <select value={formData.type_formation} onChange={(e) => setFormData({...formData, type_formation : e.target.value})}>
                    <option value="">Sélectionner...</option>
                        <option value="interne">Formation en interne</option>
                        <option value="intra">Formation en intra</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Organisme de formation :</label>
                    <input type="text" name="organisme_formation" value={formData.organisme_formation} onChange={(e) => setFormData({...formData, organisme_formation : e.target.value})} />
                </div>
                <div className="form-group">
                    <label>Thème de formation :</label>
                    <textarea name="theme_formation" value={formData.theme_formation} onChange={(e) => setFormData({...formData, theme_formation : e.target.value})}></textarea>
                </div>
                {/* <div className="form-group">
                    <label>Date de début de la formation :</label>
                    <input type="date" name="date_debut_formation" value={formData.date_debut_formation} onChange={handleDateChange} />
                </div>
                <div className="form-group">
                    <label>Date de fin de la formation :</label>
                    <input type="date" name="date_fin_formation" value={formData.date_fin_formation}onChange={handleDateChange} />
                </div> */}
                <div className="form-group">
                    <label>Responsable de la formation :</label>
                    <select value={formData.responsable_formation} onChange={(e) => setFormData({...formData, responsable_formation : e.target.value})}>
                    <option value="">Sélectionner...</option>
                        {responsablesFormations.map(responsable_formation => (
                            <option key={responsable_formation.id} value={responsable_formation.id}>{responsable_formation.name}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Responsable de la validation :</label>
                    <select value={formData.responsable_validation} onChange={(e) => setFormData({...formData, responsable_validation : e.target.value})}>
                    <option value="">Sélectionner...</option>
                        {responsablesValidations.map(responsable_validation => (
                            <option key={responsable_validation.id} value={responsable_validation.id}>{responsable_validation.username}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Participants :</label>
                    <select multiple value={formData.participant} onChange={(e) => setFormData({...formData, participant: Array.from(e.target.selectedOptions, option => option.value)})}>
                    {participants.map(participant => (<option key={participant.id} value={participant.id}>{participant.username}</option>))}</select>
                </div>
                <div className="form-group">
                    <label>Pièces jointes :</label>
                    <input type="file" name="pieces_jointes" onChange={(e) => setFormData({...formData, pieces_jointes : e.target.value})} />
                </div>
                <div className="form-group">
                    <label>Paramètre de validation :</label>
                    <select value={formData.parametre_validation} onChange={(e) => setFormData({...formData, parametre_validation : e.target.value})}>
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
