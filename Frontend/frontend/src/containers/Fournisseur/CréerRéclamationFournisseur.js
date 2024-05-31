import React, { useState , useEffect} from 'react';
import axios from 'axios';
import { useParams ,Navigate,Link} from 'react-router-dom';
import Cookies from 'js-cookie';

const AddReclamationFournisseur = () => {

    const { id } = useParams();


    const [errors, setErrors] = useState({});

    const [pieces_jointes, setPiecesJointes] = useState(null);

    const [numero_sequentiel, setnumero_sequentiel] = useState('');
    const [date_reclamation, setdate_reclamation] = useState([]);
    const [description, setdescription] = useState('');
    const [reclamation_client, setreclamation_client] = useState('');
    const [reclamation_clients, setreclamation_clients] = useState([]);
    const [type_reclamation, settype_reclamation] = useState('');
    const [gravite, setgravite] = useState('');
    const [designation, setdesignation] = useState([]);
    const [actions, setactions] = useState('');


    const [ajoutReussi, setAjoutReussi] = useState(false);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/CRM/reclamation_client/`)
            .then(response => setreclamation_clients(response.data))
            .catch(error => console.error('Error fetching type:', error));
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
                console.log('Evaluation créé avec succès:', response.data);
                setnumero_sequentiel('');
                setdate_reclamation('');
                setdescription('');
                setreclamation_client('');
                settype_reclamation('');
                setgravite('');
                setdesignation('');
                setactions('');


                setAjoutReussi(true);
            })
            .catch(error => {
                console.error('Error creating Evaluation:', error);
                setErrors(error.response?.data || { message: 'Une erreur s\'est produite lors de la création du Evaluation.' });
            });
    };

    if (ajoutReussi) {
        return <Navigate to={`/AllReclamationFournisseur/${id}/`}/>;
    }
    return (
        <div className="form-container">
            <div className="form-card">
                <h3>Ajouter Reclamation</h3>
                <form onSubmit={handleSubmit} className="form">
                    <div className="form-group">
                        <label>numero sequentiel:</label>
                        {errors.numero_sequentiel && <p className="error-text">{errors.numero_sequentiel}</p>}
                        <input type="text" name="numero_sequentiel" value={numero_sequentiel} onChange={(e) => setnumero_sequentiel(e.target.value)} />
                    </div>

                    <div className="form-group">
                        <label>date reclamation:</label>
                        {errors.date_reclamation && <p className="error-text">{errors.date_reclamation}</p>}
                        <input type="date" name="date_reclamation" value={date_reclamation} onChange={(e) => setdate_reclamation(e.target.value)} />
                    </div>

                    <div className="form-group">
                        <label>Description:</label>
                        {errors.description && <p className="error-text">{errors.description}</p>}
                        <input type="text" name="description" value={description} onChange={(e) => setdescription(e.target.value)} />
                    </div>

                    <div className="form-group">
                        <label>Designation:</label>
                        {errors.designation && <p className="error-text">{errors.designation}</p>}
                        <input type="text" name="designation" value={designation} onChange={(e) => setdesignation(e.target.value)} />
                    </div>

                    <div className="form-group">
                        <label>Actions:</label>
                        {errors.actions && <p className="error-text">{errors.actions}</p>}
                        <input type="text" name="actions" value={actions} onChange={(e) => setactions(e.target.value)} />
                    </div>

                    <div className="form-group">
                        <label>Type Réclamation:</label>
                        {errors.type_reclamation && <p className="error-text">{errors.type_reclamation}</p>}
                        <select value={type_reclamation} onChange={(e) => settype_reclamation(e.target.value)}>
                            <option value="">Sélectionner...</option>
                            <option value="Service">Service</option>
                            <option value="Produit">Produit</option>
                            <option value="Facturation">Facturation</option>
                            <option value="Livraison">Livraison</option>
                            <option value="Support">Support</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Gravité:</label>
                        {errors.gravite && <p className="error-text">{errors.gravite}</p>}
                        <select value={gravite} onChange={(e) => setgravite(e.target.value)}>
                            <option value="">Sélectionner...</option>
                            <option value="faible">faible</option>
                            <option value="moyenne">moyenne</option>
                            <option value="élevée">élevée</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Réclamation clients:</label>
                        {errors.reclamation_client && <p className="error-text">{errors.reclamation_client}</p>}
                        <select value={reclamation_client} onChange={(e) => setreclamation_client(e.target.value)}>
                            <option value="">Sélectionner...</option>
                            {reclamation_clients.map(reclamation_client => (
                                <option key={reclamation_client.id} value={reclamation_client.id}>{reclamation_client.code}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Pièces jointes :</label>
                        <input type="file" onChange={handleFileChange} />
                    </div>
                    <div className="button-group">
                        <button className="btn btn-success mt-3" type="submit">ajouter Evaluation</button>
                        <Link to={`/AllEvaluationFournisseur/${id}/`} className="btn btn-gray mt-3">Retour au tableau de bord</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddReclamationFournisseur;
