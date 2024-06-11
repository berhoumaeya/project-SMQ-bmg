import React, { useState , useEffect} from 'react';
import axios from 'axios';
import { Navigate, Link } from 'react-router-dom';
import Cookies from 'js-cookie';

const AddEnquete = () => {

    const [errors, setErrors] = useState({});

    const [pieces_jointes, setPiecesJointes] = useState(null);
    const [name_enquete, setname_enquete] = useState('');
    const [date_debut, setdate_debut] = useState('');
    const [date_fin, setdate_fin] = useState('');
    const [type_questionnaire, settype_questionnaire] = useState('');
    const [clientID, setclients] = useState([]);
    const [allClients, setallClients] = useState([]);

    const [ajoutReussi, setAjoutReussi] = useState(false);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/CRM/client/`)
       .then(response => {
           setallClients(response.data);
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
                console.log('enquete créé avec succès:', response.data);
                setname_enquete('');
                settype_questionnaire('');
                setdate_debut('');
                setdate_fin('');

                setAjoutReussi(true);
            })
            .catch(error => {
                console.error('Error creating enquete:', error);
                setErrors(error.response?.data || { message: 'Une erreur s\'est produite lors de la création du document.' });
            });
    };

    if (ajoutReussi) {
        return <Navigate to="/Clients" />;
    }

    return (
        <div className="form-container">
            <div className="form-card">
                <h3>Ajouter Enquete</h3>
                <form onSubmit={handleSubmit} className="form">
                    <div className="form-group">
                        <label>name enquete :</label>
                        {errors.name_enquete && <p className="error-text">{errors.name_enquete}</p>}
                        <input type="text" name="name_enquete" value={name_enquete} onChange={(e) => setname_enquete(e.target.value)} />
                    </div>

                    <div className="form-group">
                        <label>Date de début :</label>
                        <input type="date" name="date_debut" value={date_debut} onChange={(e) => setdate_debut(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Date de fin :</label>
                        <input type="date" name="date_fin" value={date_fin}onChange={(e) => setdate_fin(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Type Questionnaire:</label>
                        {errors.type_questionnaire && <p className="error-text">{errors.type_questionnaire}</p>}
                        <select value={type_questionnaire} onChange={(e) => settype_questionnaire(e.target.value)}>
                            <option value="">Sélectionner...</option>
                            <option value="Feedback">Feedback</option>
                            <option value="Research">Research</option>
                            <option value="Satisfaction">Satisfaction</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Clients <span className="required">*</span>:</label>
                        <select multiple value={clientID} onChange={(e) => setclients(Array.from(e.target.selectedOptions, option => option.value))}>
                            {allClients.map(clients => (
                                <option key={clients.id} value={clients.id}>{clients.nom}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Pièces jointes :</label>
                        <input type="file" onChange={handleFileChange} />
                    </div>
                    <div className="button-group">
                        <button className="btn btn-success mt-3" type="submit">ajouter enquete</button>
                        <Link to="/AllEnquete" className="btn btn-gray mt-3">Retour au tableau de bord</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddEnquete;
