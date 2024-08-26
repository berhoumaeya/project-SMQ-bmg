import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import SubNavbarAudit from '../../components/SubNavbarAudit';

const AddReunion = () => {
    const [datePrevisionnelle, setDatePrevisionnelle] = useState('');
    const [lieu, setLieu] = useState('');
    const [commentaire, setCommentaire] = useState('');
    const [type_reunion, settype_reunion] = useState('');
    const [ordreDuJour, setOrdreDuJour] = useState('');
    const [participantsID, setParticipantsID] = useState([]);
    const [participantss, setParticipantss] = useState([]);
    const [pieceJointe, setPieceJointe] = useState(null);
    const [ajoutReussi, setAjoutReussi] = useState(false);
    const [errors, setErrors] = useState({});
    const [apiError, setApiError] = useState('');

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/RH/dashboard_participant/`)
            .then(response => setParticipantss(response.data))
            .catch(error => console.error('Error fetching participants:', error));
    }, []);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setPieceJointe(selectedFile);
    };

    const validateForm = () => {
        const newErrors = {};
        if (!datePrevisionnelle) newErrors.datePrevisionnelle = 'La date prévisionnelle est requise.';
        if (!lieu) newErrors.lieu = 'Le lieu est requis.';
        if (!commentaire) newErrors.commentaire = 'Le commentaire est requis.';
        if (!type_reunion) newErrors.type_reunion = 'Le type de réunion est requis.';
        if (!ordreDuJour) newErrors.ordreDuJour = 'L\'ordre du jour est requis.';
        if (participantsID.length === 0) newErrors.participantsID = 'Au moins un participant est requis.';
        if (pieceJointe && !pieceJointe.name.match(/\.(pdf|doc|docx)$/)) {
            newErrors.pieceJointe = 'Le fichier doit être un PDF, DOC ou DOCX.';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!validateForm()) {
            return;
        }

        const formData = new FormData();
        formData.append('date_previsionnelle', datePrevisionnelle);
        formData.append('lieu', lieu);
        formData.append('commentaire', commentaire);
        formData.append('type_reunion', type_reunion);
        formData.append('ordre_du_jour', ordreDuJour);
        participantsID.forEach(id => formData.append('participants', id));
        if (pieceJointe) {
            formData.append('piece_jointe', pieceJointe);
        }

        const headers = {
            'Accept': '*/*',
            'Content-Type': 'multipart/form-data',
            'X-CSRFToken': Cookies.get('csrftoken')
        };

        axios.post(`${process.env.REACT_APP_API_URL}/reunion/create_Meet/`, formData, { headers })
            .then(response => {
                console.log('Réunion ajoutée avec succès :', response.data);
                setDatePrevisionnelle('');
                setLieu('');
                setCommentaire('');
                settype_reunion('');
                setOrdreDuJour('');
                setParticipantsID([]);
                setPieceJointe(null);
                setAjoutReussi(true);
            })
            .catch(error => {
                console.error('Erreur lors de l\'ajout de la réunion :', error);
                setApiError('Erreur lors de l\'ajout de la réunion. Veuillez réessayer.');
            });
    };

    if (ajoutReussi) {
        return <Navigate to="/allreunion/" />;
    }

    return (
        <>
            <SubNavbarAudit />
            <main style={{ display: 'flex', minHeight: '100vh' }}>
                <div className="container ajout-form">
                    {apiError && <p className="error">{apiError}</p>}
                    <form onSubmit={handleSubmit} className="row">
                        <div className="button-container">
                            <button className="button-add" type="submit">Ajouter</button>
                        </div>
                        <h4>Ajout d'une réunion</h4>
                        <div className="col-md-6">
                            <div className="form-label">
                                <label className="form-label">Date prévisionnelle :</label>
                                <input type="date" className="form-control" placeholder="Date prévisionnelle*" name="date_previsionnelle" value={datePrevisionnelle} onChange={(e) => setDatePrevisionnelle(e.target.value)} />
                                {errors.datePrevisionnelle && <p className="error">{errors.datePrevisionnelle}</p>}
                            </div>
                            <div className="form-label">
                                <label className="form-label">Lieu :</label>
                                <input type="text" className="form-control" placeholder="Lieu*" name="lieu" value={lieu} onChange={(e) => setLieu(e.target.value)} />
                                {errors.lieu && <p className="error">{errors.lieu}</p>}
                            </div>
                            <div className="form-label">
                                <label className="form-label">Commentaires :</label>
                                <input type="text" className="form-control" placeholder="Commentaires*" name="commentaire" value={commentaire} onChange={(e) => setCommentaire(e.target.value)} />
                                {errors.commentaire && <p className="error">{errors.commentaire}</p>}
                            </div>
                            <div className="form-label">
                                <label className="form-label">Type de réunion :</label>
                                
                                    <select  className="form-control" value={type_reunion} onChange={(e) => settype_reunion(e.target.value)}>
                                        <option value="">Sélectionner...</option>
                                        <option value="Team Meeting">Team Meeting</option>
                                        <option value="Client Meeting">Client Meeting</option>
                                        <option value="Project Meeting">Project Meeting</option>
                                        <option value="One-on-One'">One-on-One'</option>
                                        <option value="Brainstorming">Brainstorming</option>
                                    </select>
                                {errors.type_reunion && <p className="error">{errors.type_reunion}</p>}
                            </div>
                            <div className="form-label">
                                <label className="form-label">Ordre du jour :</label>
                                <input type="text" className="form-control" placeholder="Ordre du jour*" name="ordre_du_jour" value={ordreDuJour} onChange={(e) => setOrdreDuJour(e.target.value)} />
                                {errors.ordreDuJour && <p className="error">{errors.ordreDuJour}</p>}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-label">
                                <label className="form-label">Pièces jointes :</label>
                                <input type="file" className="form-control" onChange={handleFileChange} />
                                {errors.pieceJointe && <p className="error">{errors.pieceJointe}</p>}
                            </div>
                            <br />
                            <div className="form-label">
                                <label className="form-label">Participants :</label>
                                <select multiple className="form-control" value={participantsID} onChange={(e) => setParticipantsID([...e.target.selectedOptions].map(option => option.value))}>
                                    {participantss.map(participant => (
                                        <option key={participant.id} value={participant.id}>{participant.username}</option>
                                    ))}
                                </select>
                                {errors.participantsID && <p className="error">{errors.participantsID}</p>}
                            </div>
                        </div>
                    </form>
                </div>
            </main>
        </>
    );
};

export default AddReunion;
