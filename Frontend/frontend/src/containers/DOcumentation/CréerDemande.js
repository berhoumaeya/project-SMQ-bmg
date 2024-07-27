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
        <main style={{ backgroundColor: '#eeeeee', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div className="container ajout-form">
                <div className="contact-image ">
                    <img src="/images/plus-1.png" alt="rocket_contact" />
                    <div className="button-container">
                        <Link to="/DashboardDoc">
                            <button className="retour">Retour au tableau de bord</button>
                        </Link>   <button className="button-add-" type="submit">Envoyer demande</button>
                    </div>
                </div>
                <form onSubmit={handleSubmit} className="row">
                    <div className="col-md-6">
                        <div className="form-label">
                            <label className="form-label">Document object :</label>
                            {errors.document_object && <p className="error-text">{errors.document_object}</p>}
                            <input type="text" className="form-control" placeholder='Document object*' name="document_object" value={document_object} onChange={(e) => setdocument_object(e.target.value)} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-label">
                            <label className="form-label">Type :</label>
                            {errors.type && <p className="error-text">{errors.type}</p>}
                            <select className="form-control" value={type} onChange={(e) => setType(e.target.value)}>
                                <option value="">Sélectionner...</option>
                                <option value="Manuel">Manuel</option>
                                <option value="Procédure">Procédure</option>
                                <option value="Politique">Politique</option>
                                <option value="Rapport">Rapport</option>
                                <option value="Mémoire">Mémoire</option>
                            </select>

                        </div>
                    </div>
                    <div className="form-label">
                        <label className="form-label">Pièces jointes :</label>
                        <input type="file" className="form-control" onChange={handleFileChange} />
                    </div>
                </form>
            </div>
        </main>
    );
};

export default CreateDemande;
