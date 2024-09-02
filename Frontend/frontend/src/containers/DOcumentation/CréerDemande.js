import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import SidebarDoc from '../../components/SidebarDoc';
import SubNavbarDoc from '../../components/SubNavbarDOC';

const CreateDemande = () => {
    const [errors, setErrors] = useState({});
    const [attached_file, setPiecesJointes] = useState(null);
    const [document_object, setDocumentObject] = useState('');
    const [type, setType] = useState('');
const  [status, setStatus] = useState('En attente');
    const navigate = useNavigate();

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setPiecesJointes(selectedFile);
    };

    const validateForm = () => {
        const formErrors = {};
        if (!document_object) formErrors.document_object = 'Document object est requis.';
        if (!type) formErrors.type = 'Type est requis.';
        if (!status) formErrors.status = 'Status est requis.';
        if (!attached_file) formErrors.attached_file = 'Pièces jointes est requis.';

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
        formData.append('document_object', document_object);
        formData.append('type', type);
        formData.append('status', status);
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
                toast.success('Demande envoyée, en attendant un superviseur pour la traiter!');
                navigate('/ListeDemande');
                setDocumentObject('');
                setType('');
                setStatus('');
                setPiecesJointes(null);
                setErrors({});
            })
            .catch(error => {
                console.error('Error creating demande:', error);
                setErrors(error.response?.data || { message: 'Une erreur s\'est produite lors de la création du demande.' });
            });
    };

    return (
        <> <SubNavbarDoc />
            <main style={{ display: 'flex', minHeight: '100vh' }}>
                <SidebarDoc />
                <div className="container ajout-form">
               
                    <form onSubmit={handleSubmit} className="row">
                      
                    <div className="button-container">
                            <button className="button-add" type="submit" onClick={handleSubmit}>Envoyer</button>
                        </div>   <h4>Création une demande</h4>
                        <div className="col-md-6">
                            <div className="form-label">
                                <label className="form-label">Document object :</label>
                                <input type="text" className="form-control" placeholder='Document object*' value={document_object} onChange={(e) => setDocumentObject(e.target.value)} />
                                {errors.document_object && <p className="error">{errors.document_object}</p>}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-label">
                                <label className="form-label">Type :</label>
                                <select className="form-control" value={type} onChange={(e) => setType(e.target.value)}>
                                    <option value="">Sélectionner...</option>
                                    <option value="Manuel">Manuel</option>
                                    <option value="Procédure">Procédure</option>
                                    <option value="Politique">Politique</option>
                                    <option value="Rapport">Rapport</option>
                                    <option value="Mémoire">Mémoire</option>
                                </select>
                                {errors.type && <p className="error">{errors.type}</p>}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-label">
                                <label className="form-label">Status :</label>
                                <select className="form-control" value={status} onChange={(e) => setStatus(e.target.value)}>
                                    <option value="">Sélectionner...</option>
                                    <option value="En attente">En attente</option>
                                    <option value="Validé">Validé</option>
                                    <option value="Refusé">Refusé</option>
                                    <option value="terminé">Terminé</option>
                                </select>
                                {errors.status && <p className="error">{errors.status}</p>}
                            </div>
                        </div> 
                        <div className="col-md-6">
                        <div className="form-label">
                            <label className="form-label">Pièces jointes :</label>
                            <input type="file" className="form-control" onChange={handleFileChange} />
                            {errors.attached_file && <p className="error">{errors.attached_file}</p>}
                        </div>
                    </div>
                    </form>
                </div>
            </main>
        </>
    );
};

export default CreateDemande;
