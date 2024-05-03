import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FormationForm.css';
import Cookies from 'js-cookie';
const AddFormation = () => {
    const [formData, setFormData] = useState({
        intitule_formation: '',
        type_formation: '',
        organisme_formation: '',
        theme_formation: '',
        date_debut_formation: '',
        date_fin_formation: '',
        responsable_formation: '',
        responsable_validation: '',
        participants: [], 
        pieces_jointes: null,
        parametre_validation: ''
    });

    const [responsablesFormation, setResponsablesFormation] = useState([]);
    const [responsablesValidation, setResponsablesValidation] = useState([]);
    const [participants, setParticipants] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responsablesFormationResponse = await axios.get(`${process.env.REACT_APP_API_URL}/RH/dashboard_responsable_formation/`);
                setResponsablesFormation(responsablesFormationResponse.data);

                const responsablesValidationResponse = await axios.get(`${process.env.REACT_APP_API_URL}/RH/dashboard_employe/`);
                setResponsablesValidation(responsablesValidationResponse.data);

                const participantsResponse = await axios.get(`${process.env.REACT_APP_API_URL}/RH/dashboard_participant/`);
                setParticipants(participantsResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleChange = (e) => {
        const { name, value, type } = e.target;

        if (type === 'select-multiple') {
            const selectedOptions = Array.from(e.target.selectedOptions).map(option => option.value);
            setFormData(prevState => ({
                ...prevState,
                [name]: selectedOptions
            }));
        } else {
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, pieces_jointes: e.target.files[0] });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            

            await axios.post(`http://localhost:8000/RH/create_formation/`, formData, {
                headers : {
                    'Accept':'*/*',
                    "Content-Type":'application/json',
                    'X-CSRFToken': Cookies.get('csrftoken'),
                }
            });
        } catch (error) {
            console.error('Error adding formation:', error);
        }
    };
    return (
        <div className="form-container">
        <div className="form-card">
            <h3>Ajouter une Formation</h3>
            <form onSubmit={e => handleSubmit(e)} className="form">
                <div className="form-group">
                    <label>Intitulé de la formation :</label>
                    <input type="text" name="intitule_formation" value={formData.intitule_formation} onChange={e => handleChange(e)} />
                </div>
                <div className="form-group">
                    <label>Type de formation :</label>
                    <select name="type_formation" value={formData.type_formation} onChange={e => handleChange(e)}>
                        <option value="interne">Formation en interne</option>
                        <option value="intra">Formation en intra</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Organisme de formation :</label>
                    <input type="text" name="organisme_formation" value={formData.organisme_formation} onChange={e => handleChange(e)} />
                </div>
                <div className="form-group">
                    <label>Thème de formation :</label>
                    <textarea name="theme_formation" value={formData.theme_formation} onChange={e => handleChange(e)}></textarea>
                </div>
                <div className="form-group">
                    <label>Date de début de la formation :</label>
                    <input type="date" name="date_debut_formation" value={formData.date_debut_formation} onChange={e => handleChange(e)} />
                </div>
                <div className="form-group">
                    <label>Date de fin de la formation :</label>
                    <input type="date" name="date_fin_formation" value={formData.date_fin_formation}onChange={e => handleChange(e)} />
                </div>
                <div className="form-group">
                    <label>Responsable de la formation :</label>
                    <select name="responsable_formation" value={formData.responsable_formation} onChange={e => handleChange(e)}>
                        {responsablesFormation.map(responsable => (
                            <option key={responsable.id} value={responsable.id}>{responsable.name}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Responsable de la validation :</label>
                    <select name="responsable_validation" value={formData.responsable_validation} onChange={e => handleChange(e)}>
                        {responsablesValidation.map(responsable => (
                            <option key={responsable.id} value={responsable.id}>{responsable.name}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Participants :</label>
                    <select name="participants" value={formData.participants} onChange={e => handleChange(e)} multiple>
                        {participants.map(participant => (
                            <option key={participant.id} value={participant.id}>{participant.name}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Pièces jointes :</label>
                    <input type="file" name="pieces_jointes" onChange={e => handleFileChange(e)} />
                </div>
                <div className="form-group">
                    <label>Paramètre de validation :</label>
                    <select name="parametre_validation" value={formData.parametre_validation} onChange={handleChange}>
                        <option value="chaud">Évaluation à chaud</option>
                        <option value="froid">Évaluation à froid</option>
                    </select>
                </div>
                <button className="btn btn-primary mt-3"  type="submit">Ajouter Formation</button>
            </form>
        </div>
    </div>
);
      
    
};

export default AddFormation;
