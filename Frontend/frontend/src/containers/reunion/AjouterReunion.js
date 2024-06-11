import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Navigate, Link } from 'react-router-dom';
import Cookies from 'js-cookie';

const AddReunion = () => {
    const { id } = useParams();

    const [errors, setErrors] = useState({});


    const [date_previsionnelle, setdate_previsionnelle] = useState('');
    const [lieu, setlieu] = useState('');
    const [commentaire, setcommentaire] = useState('');
    const [type_reunion, settype_reunion] = useState('');
    const [ordre_du_jour, setordre_du_jour] = useState('');
    const [participantsID, setparticipants] = useState([]);
    const [participantss, setparticipantss] = useState([]);
    const [piece_jointe, setPiecesJointes] = useState(null);

    const [ajoutReussi, setAjoutReussi] = useState(false);

    useEffect(() => {


        axios.get(`${process.env.REACT_APP_API_URL}/RH/dashboard_participant/`)
            .then(response => setparticipantss(response.data))
            .catch(error => console.error('Error fetching participants:', error));
        
    }, [id]);

    const handleFileChange = (event, setFile) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('lieu', lieu);
        formData.append('commentaire', commentaire);
        formData.append('type_reunion', type_reunion);
        formData.append('date_previsionnelle', date_previsionnelle);
        formData.append('ordre_du_jour', ordre_du_jour);
        participantsID.forEach(id => { formData.append('participants', id)});
            if (piece_jointe) {
            formData.append('piece_jointe', piece_jointe);
        }

        const headers = {
            'Accept': '*/*',
            'Content-Type': 'multipart/form-data',
            'X-CSRFToken': Cookies.get('csrftoken')
        };

        axios.post(`${process.env.REACT_APP_API_URL}/reunion/create_Meet/`, formData, { headers })
            .then(response => {
                console.log('meet créé avec succès:', response.data);
                setcommentaire('');
                setlieu('');
                setdate_previsionnelle('');
                setparticipants([]);
                setAjoutReussi(true);
            })
            .catch(error => {
                console.error('Error creating meet:', error);
                setErrors(error.response?.data || { message: 'Une erreur s\'est produite lors de la création du meet.' });
            });
    };

    if (ajoutReussi) {
        return <Navigate to={`/allreunion/`} />;
    }

    return (
        <div className="form-container">
            <div className="form-card">
                <h3>Ajouter Réunion</h3>
                <form onSubmit={handleSubmit} className="form">
                <div className="form-group">
                        <label>date previsionnelle :</label>
                        <input type="date" name="date_previsionnelle" value={date_previsionnelle} onChange={(e) => setdate_previsionnelle(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>lieu:</label>
                        {errors.lieu && <p className="error-text">{errors.lieu}</p>}
                        <input type="text" name="lieu" value={lieu} onChange={(e) => setlieu(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Commentaires:</label>
                        {errors.commentaire && <p className="error-text">{errors.commentaire}</p>}
                        <input type="text" name="commentaire" value={commentaire} onChange={(e) => setcommentaire(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Type reunion:</label>
                        {errors.type_reunion && <p className="error-text">{errors.type_reunion}</p>}
                        <select value={type_reunion} onChange={(e) => settype_reunion(e.target.value)}>
                            <option value="">Sélectionner...</option>
                            <option value="Team Meeting">Team Meeting</option>
                            <option value="Client Meeting">Client Meeting</option>
                            <option value="Project Meeting">Project Meeting</option>
                            <option value="One-on-One'">One-on-One'</option>
                            <option value="Brainstorming">Brainstorming</option>
                        </select>
                    </div>
                    <div className="form-group">
                                <label>Ordre de jour</label>
                                {errors.ordre_du_jour && <p className="error-text">{errors.ordre_du_jour}</p>}
                                <input type="text" name="ordre_du_jour" value={ordre_du_jour} onChange={(e) => setordre_du_jour(e.target.value)} required />
                            </div>
                            <div className="form-group">
                                <label>Participants :</label>
                                {errors.participants && <p className="error-text">{errors.participants}</p>}
                                <select multiple value={participantsID} onChange={(e) => setparticipants(Array.from(e.target.selectedOptions, option => option.value))}>
                                    {participantss.map(participants => (
                                        <option key={participants.id} value={participants.id}>{participants.username}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                        <label>Pièces jointes :</label>
                        <input type="file" onChange={(e) => handleFileChange(e, setPiecesJointes)} />
                    </div>
                    <div className="button-group">
                        <button className="btn btn-success mt-3" type="submit">Ajouter réunion</button>
                        <Link to={`/allreunion/`} className="btn btn-gray mt-3">Retour au tableau de bord</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddReunion;
