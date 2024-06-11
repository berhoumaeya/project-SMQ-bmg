import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';


const CreateDemande = () => {

    const [errors, setErrors] = useState({});
    const [attached_file, setPiecesJointes] = useState(null);
    const [document_object, setdocument_object] = useState('');
    const [type, setType] = useState('');

    const navigate = useNavigate();

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setPiecesJointes(selectedFile);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('document_object', document_object);
        formData.append('type', type);
        if (attached_file) {
            formData.append('attached_file', attached_file);
        }

        const headers = {
            'Accept': '*/*',
            'Content-Type': 'multipart/form-data',
            'X-CSRFToken': Cookies.get('csrftoken')
        };

        axios.post(`${process.env.REACT_APP_API_URL}/doc/create-demand/`, formData, { headers })
            .then(response => {
                console.log('Document interne créé avec succès:', response.data);
                toast.success('Demande envoyé ,en attendant un superviseur pour la traiter!');
                navigate('/ListeDemande');
                setdocument_object('');
                setType('');
            })
            .catch(error => {
                console.error('Error creating demande:', error);
                setErrors(error.response?.data || { message: 'Une erreur s\'est produite lors de la création du demande.' });
            });
    };

    return (
        <div className="form-container">
            <div className="form-card">
                <h3>Ajouter document</h3>
                <form onSubmit={handleSubmit} className="form">
                    <div className="form-group">
                        <label>document_object:</label>
                        {errors.document_object && <p className="error-text">{errors.document_object}</p>}
                        <input type="text" name="document_object" value={document_object} onChange={(e) => setdocument_object(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Type:</label>
                        {errors.type && <p className="error-text">{errors.type}</p>}
                        <select value={type} onChange={(e) => setType(e.target.value)}>
                            <option value="">Sélectionner...</option>
                            <option value="Manuel">Manuel</option>
                            <option value="Procédure">Procédure</option>
                            <option value="Politique">Politique</option>
                            <option value="Rapport">Rapport</option>
                            <option value="Mémoire">Mémoire</option>
                        </select>
                        
                    </div>
                    <div className="form-group">
                        <label>Pièces jointes :</label>
                        <input type="file" onChange={handleFileChange} />
                    </div>
                    <div className="button-group">
                        <button className="btn btn-success mt-3" type="submit">Envoyer demande</button>
                        <Link to="/DashboardDoc" className="btn btn-gray mt-3">Retour au tableau de bord</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateDemande;
