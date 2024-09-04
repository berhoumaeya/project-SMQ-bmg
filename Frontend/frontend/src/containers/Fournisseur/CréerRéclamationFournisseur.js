import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navigate, Link, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import '../Client/forms.css'; 
const AddReclamationFournisseur = () => {
    const { id } = useParams();

    const [errors, setErrors] = useState({});
    const [pieces_jointes, setPiecesJointes] = useState(null);
    const [numero_sequentiel, setNumeroSequentiel] = useState('');
    const [date_reclamation, setDateReclamation] = useState('');
    const [description, setDescription] = useState('');
    const [reclamation_client, setReclamationClient] = useState('');
    const [reclamation_clients, setReclamationClients] = useState([]);
    const [type_reclamation, setTypeReclamation] = useState('');
    const [gravite, setGravite] = useState('');
    const [designation, setDesignation] = useState('');
    const [actions, setActions] = useState('');
    const [ajoutReussi, setAjoutReussi] = useState(false);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/CRM/allReclamation/`)
            .then(response => setReclamationClients(response.data))
            .catch(error => console.error('Error fetching reclamation clients:', error));
    }, [id]);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setPiecesJointes(selectedFile);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('numero_sequentiel', numero_sequentiel);
        formData.append('date_reclamation', date_reclamation);
        formData.append('description', description);
        formData.append('designation', designation);
        formData.append('reclamation_client', reclamation_client);
        formData.append('type_reclamation', type_reclamation);
        formData.append('gravite', gravite);
        formData.append('actions', actions);
        if (pieces_jointes) {
            formData.append('pieces_jointes', pieces_jointes);
        }

        const headers = {
            'Accept': '*/*',
            'Content-Type': 'multipart/form-data',
            'X-CSRFToken': Cookies.get('csrftoken')
        };

        axios.post(`${process.env.REACT_APP_API_URL}/fournisseur/create_ReclamationFournisseur/${id}/`, formData, { headers })
            .then(response => {
                console.log('Reclamation créé avec succès:', response.data);
                setNumeroSequentiel('');
                setDateReclamation('');
                setDescription('');
                setReclamationClient('');
                setTypeReclamation('');
                setGravite('');
                setDesignation('');
                setActions('');
                setAjoutReussi(true);
            })
            .catch(error => {
                console.error('Error creating Reclamation:', error);
                setErrors(error.response?.data || { message: 'Une erreur s\'est produite lors de la création de la réclamation.' });
            });
    };

    if (ajoutReussi) {
        return <Navigate to={`/AllReclamationFournisseur/${id}/`} />;
    }

    return (
        <main style={{ backgroundColor: '#eeeeee', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div className="container ajout-form">
                <div className="contact-image">
                    <img src="/images/add.png" alt="add_reclamation" />
                    <div className="button-container">
                        <Link to={`/AllReclamationFournisseur/${id}/`}>
                            <button className="retour">Retour au tableau de bord</button>
                        </Link>
                        <button className="button-add" type="submit" form="add-reclamation-form">Ajouter une réclamation</button>
                    </div>
                </div>
                <form id="add-reclamation-form" onSubmit={handleSubmit} className="row">
                    <div className="col-md-6">
                        <div className="form-label">
                            <label className="form-label">Numéro Séquentiel:</label>
                            <input type="text" className="form-control" placeholder='Numéro Séquentiel*' value={numero_sequentiel} onChange={(e) => setNumeroSequentiel(e.target.value)} />
                            {errors.numero_sequentiel && <p className="error-text">{errors.numero_sequentiel}</p>}
                        </div>
                        <div className="form-label">
                            <label className="form-label">Date Réclamation:</label>
                            <input type="date" className="form-control" placeholder='Date Réclamation' value={date_reclamation} onChange={(e) => setDateReclamation(e.target.value)} />
                            {errors.date_reclamation && <p className="error-text">{errors.date_reclamation}</p>}
                        </div>
                        <div className="form-label">
                            <label className="form-label">Description:</label>
                            <input type="text" className="form-control" placeholder='Description' value={description} onChange={(e) => setDescription(e.target.value)} />
                            {errors.description && <p className="error-text">{errors.description}</p>}
                        </div>
                        <div className="form-label">
                            <label className="form-label">Désignation:</label>
                            <input type="text" className="form-control" placeholder='Désignation' value={designation} onChange={(e) => setDesignation(e.target.value)} />
                            {errors.designation && <p className="error-text">{errors.designation}</p>}
                        </div>
                        <div className="form-label">
                            <label className="form-label">Actions:</label>
                            <input type="text" className="form-control" placeholder='Actions' value={actions} onChange={(e) => setActions(e.target.value)} />
                            {errors.actions && <p className="error-text">{errors.actions}</p>}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-label">
                            <label className="form-label">Type Réclamation:</label>
                            <select className="form-control" value={type_reclamation} onChange={(e) => setTypeReclamation(e.target.value)}>
                                <option value="">Sélectionner...</option>
                                <option value="Service">Service</option>
                                <option value="Produit">Produit</option>
                                <option value="Facturation">Facturation</option>
                                <option value="Livraison">Livraison</option>
                                <option value="Support">Support</option>
                            </select>
                            {errors.type_reclamation && <p className="error-text">{errors.type_reclamation}</p>}
                        </div>
                        <div className="form-label">
                            <label className="form-label">Gravité:</label>
                            <select className="form-control" value={gravite} onChange={(e) => setGravite(e.target.value)}>
                                <option value="">Sélectionner...</option>
                                <option value="faible">Faible</option>
                                <option value="moyenne">Moyenne</option>
                                <option value="élevée">Élevée</option>
                            </select>
                            {errors.gravite && <p className="error-text">{errors.gravite}</p>}
                        </div>
                        <div className="form-label">
                            <label className="form-label">Réclamation Clients:</label>
                            <select className="form-control" value={reclamation_client} onChange={(e) => setReclamationClient(e.target.value)}>
                                <option value="">Sélectionner...</option>
                                {reclamation_clients.map(client => (
                                    <option key={client.id} value={client.id}>{client.code}</option>
                                ))}
                            </select>
                            {errors.reclamation_client && <p className="error-text">{errors.reclamation_client}</p>}
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


export default AddReclamationFournisseur;
