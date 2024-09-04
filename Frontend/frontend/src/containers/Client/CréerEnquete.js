import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navigate, Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import './forms.css';

const AddEnquete = () => {
    const [errors, setErrors] = useState({});
    const [pieces_jointes, setPiecesJointes] = useState(null);
    const [name_enquete, setNameEnquete] = useState('');
    const [date_debut, setDateDebut] = useState('');
    const [date_fin, setDateFin] = useState('');
    const [type_questionnaire, setTypeQuestionnaire] = useState('');
    const [clientID, setClients] = useState([]);
    const [allClients, setAllClients] = useState([]);
    const [ajoutReussi, setAjoutReussi] = useState(false);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/CRM/client/`)
            .then(response => {
                setAllClients(response.data);
            })
            .catch(error => {
                console.error('Error', error);
            });
    }, []);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setPiecesJointes(selectedFile);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (new Date(date_debut) >= new Date(date_fin)) {
            alert("La date de début doit être avant la date de fin.");
            return;
        }

        const formData = new FormData();
        formData.append('name_enquete', name_enquete);
        formData.append('type_questionnaire', type_questionnaire);
        formData.append('date_debut', date_debut);
        formData.append('date_fin', date_fin);
        if (pieces_jointes) {
            formData.append('pieces_jointes', pieces_jointes);
        }
        clientID.forEach(id => {
            formData.append('clients', id);
        });

        const headers = {
            'Accept': '*/*',
            'Content-Type': 'multipart/form-data',
            'X-CSRFToken': Cookies.get('csrftoken')
        };

        axios.post(`${process.env.REACT_APP_API_URL}/CRM/create_enquete/`, formData, { headers })
            .then(response => {
                console.log('Enquête créée avec succès:', response.data);
                setNameEnquete('');
                setTypeQuestionnaire('');
                setDateDebut('');
                setDateFin('');
                setAjoutReussi(true);
            })
            .catch(error => {
                console.error('Error creating enquête:', error);
                setErrors(error.response?.data || { message: 'Une erreur s\'est produite lors de la création du document.' });
            });
    };

    if (ajoutReussi) {
        return <Navigate to="/AllEnquete" />;
    }

    return (
        <main style={{ backgroundColor: '#eeeeee', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div className="container ajout-form">
                <div className="contact-image">
                    <img src="/images/add.png" alt="add_enquete" />
                    <div className="button-container">
                        <Link to="/AllEnquete">
                            <button className="retour">Retour </button>
                        </Link>
                        <button className="button-add" type="submit" form="add-enquete-form">Ajouter une enquête</button>
                    </div>
                </div>
                <form id="add-enquete-form" onSubmit={handleSubmit} className="row">
                    <div className="col-md-6">
                        <div className="form-label">
                            <label className="form-label">Nom Enquête:</label>
                            <input type="text" className="form-control" placeholder="Nom de l'enquête*" value={name_enquete} onChange={(e) => setNameEnquete(e.target.value)} />
                            {errors.name_enquete && <p className="error-text">{errors.name_enquete}</p>}
                        </div>
                        <div className="form-label">
                            <label className="form-label">Date de Début:</label>
                            <input type="date" className="form-control" value={date_debut} onChange={(e) => setDateDebut(e.target.value)} />
                            {errors.date_debut && <p className="error-text">{errors.date_debut}</p>}
                        </div>
                        <div className="form-label">
                            <label className="form-label">Date de Fin:</label>
                            <input type="date" className="form-control" value={date_fin} onChange={(e) => setDateFin(e.target.value)} />
                            {errors.date_fin && <p className="error-text">{errors.date_fin}</p>}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-label">
                            <label className="form-label">Type de Questionnaire:</label>
                            <select className="form-control" value={type_questionnaire} onChange={(e) => setTypeQuestionnaire(e.target.value)}>
                                <option value="">Sélectionner...</option>
                                <option value="Feedback">Feedback</option>
                                <option value="Research">Research</option>
                                <option value="Satisfaction">Satisfaction</option>
                            </select>
                            {errors.type_questionnaire && <p className="error-text">{errors.type_questionnaire}</p>}
                        </div>
                        <div className="form-label">
                            <label className="form-label">Clients:</label>
                            <select multiple className="form-control" value={clientID} onChange={(e) => setClients(Array.from(e.target.selectedOptions, option => option.value))}>
                                {allClients.map(client => (
                                    <option key={client.id} value={client.id}>{client.nom}</option>
                                ))}
                            </select>
                            {errors.clients && <p className="error-text">{errors.clients}</p>}
                        </div>
                        <div className="form-label">
                            <label className="form-label">Pièces Jointes:</label>
                            <input type="file" className="form-control" onChange={handleFileChange} />
                        </div>
                    </div>
                </form>
            </div>
        </main>
    );
};

export default AddEnquete;
