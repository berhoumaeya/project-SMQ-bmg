import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Navigate, Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import './forms.css';

const CreateReclamation = () => {
    const { id } = useParams();

    const [errors, setErrors] = useState({});
    const [reclamation_fournisseur, setReclamationFournisseur] = useState(null);
    const [plan_action, setPlanAction] = useState(null);
    const [fichier_pdf, setFichierPdf] = useState(null);

    const [code, setCode] = useState('');
    const [date_livraison, setDateLivraison] = useState('');
    const [description, setDescription] = useState('');
    const [decisions, setDecisions] = useState('');
    const [type_reclamation, setTypeReclamation] = useState('');
    const [gravite, setGravite] = useState('');
    const [declencher_plan_action, setDeclencherPlanAction] = useState(false);
    const [responsable_traitement, setResponsableTraitement] = useState('');
    const [responsable_traitements, setResponsableTraitements] = useState([]);

    // Non conformité
    const [date_detection, setDateDetection] = useState('');
    const [designation_produit_non_conforme, setDesignationProduitNonConforme] = useState('');
    const [description_non_conformite, setDescriptionNonConformite] = useState('');
    const [produits_non_conformes, setProduitsNonConformes] = useState('');
    const [produits, setProduits] = useState([]);
    const [type_non_conformite, setTypeNonConformite] = useState('');
    const [source_non_conformite, setSourceNonConformite] = useState('');
    const [niveau_gravite, setNiveauGravite] = useState('');
    const [personnes_a_notifierID, setPersonnesANotifier] = useState([]);
    const [personnes_a_notifiers, setPersonnesANotifiers] = useState([]);
    const [pieces_jointes, setPiecesJointes] = useState(null);

    const [ajoutReussi, setAjoutReussi] = useState(false);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/user/resTrait/`)
            .then(response => setResponsableTraitements(response.data))
            .catch(error => console.error('Error fetching responsables:', error));

        axios.get(`${process.env.REACT_APP_API_URL}/user/users/`)
            .then(response => setPersonnesANotifiers(response.data))
            .catch(error => console.error('Error fetching users:', error));
        
        axios.get(`${process.env.REACT_APP_API_URL}/fournisseur/types-produits/`)
            .then(response => setProduits(response.data))
            .catch(error => console.error('Error fetching users:', error));
    }, [id]);

    const handleFileChange = (event, setFile) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('code', code);
        formData.append('description', description);
        formData.append('decisions', decisions);
        formData.append('gravite', gravite);
        formData.append('type_reclamation', type_reclamation);
        formData.append('date_livraison', date_livraison);
        formData.append('responsable_traitement', responsable_traitement);
        formData.append('declencher_plan_action', declencher_plan_action ? 'True' : 'False');

        if (reclamation_fournisseur) {
            formData.append('reclamation_fournisseur', reclamation_fournisseur);
        }
        if (plan_action) {
            formData.append('plan_action', plan_action);
        }
        if (fichier_pdf) {
            formData.append('fichier_pdf', fichier_pdf);
        }

        // Si plan déclenché
        formData.append('date_detection', date_detection);
        formData.append('designation_produit_non_conforme', designation_produit_non_conforme);
        formData.append('description_non_conformite', description_non_conformite);
        formData.append('produits_non_conformes', produits_non_conformes);
        formData.append('type_non_conformite', type_non_conformite);
        formData.append('source_non_conformite', source_non_conformite);
        formData.append('niveau_gravite', niveau_gravite);
        personnes_a_notifierID.forEach(id => formData.append('personnes_a_notifier', id));
        
        if (pieces_jointes) {
            formData.append('pieces_jointes', pieces_jointes);
        }

        const headers = {
            'Accept': '*/*',
            'Content-Type': 'multipart/form-data',
            'X-CSRFToken': Cookies.get('csrftoken')
        };

        axios.post(`${process.env.REACT_APP_API_URL}/CRM/create_reclamation_client/${id}/`, formData, { headers })
            .then(response => {
                console.log('Réclamation créée avec succès:', response.data);
                setCode('');
                setResponsableTraitement('');
                setDecisions('');
                setDescription('');
                setDateLivraison('');
                setPersonnesANotifier([]);
                setAjoutReussi(true);
            })
            .catch(error => {
                console.error('Error creating réclamation:', error);
                setErrors(error.response?.data || { message: 'Une erreur s\'est produite lors de la création de la réclamation.' });
            });
    };

    if (ajoutReussi) {
        return <Navigate to={`/AllReclamations/${id}/`} />;
    }

    return (
        <main style={{ backgroundColor: '#eeeeee', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div className="container ajout-form">
                <div className="contact-image">
                    <img src="/images/add.png" alt="add_reclamation" />
                    <div className="button-container">
                        <Link to={`/AllReclamations`}>
                            <button className="retour">Retour </button>
                        </Link>
                        <button className="button-add" type="submit" form="create-reclamation-form">Ajouter une réclamation</button>
                    </div>
                </div>
                <form id="create-reclamation-form" onSubmit={handleSubmit} className="row">
                    <div className="col-md-6">
                        <div className="form-label">
                            <label>Code:</label>
                            <input type="text" className="form-control" placeholder='Code*' value={code} onChange={(e) => setCode(e.target.value)} />
                            {errors.code && <p className="error-text">{errors.code}</p>}
                        </div>
                        <div className="form-label">
                            <label>Date de Livraison:</label>
                            <input type="date" className="form-control" value={date_livraison} onChange={(e) => setDateLivraison(e.target.value)} />
                            {errors.date_livraison && <p className="error-text">{errors.date_livraison}</p>}
                        </div>
                        <div className="form-label">
                            <label>Description:</label>
                            <textarea className="form-control" placeholder='Description*' value={description} onChange={(e) => setDescription(e.target.value)} />
                            {errors.description && <p className="error-text">{errors.description}</p>}
                        </div>
                        <div className="form-label">
                            <label>Décisions:</label>
                            <textarea className="form-control" placeholder='Décisions*' value={decisions} onChange={(e) => setDecisions(e.target.value)} />
                            {errors.decisions && <p className="error-text">{errors.decisions}</p>}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-label">
                            <label>Type de Réclamation:</label>
                            <select className="form-control" value={type_reclamation} onChange={(e) => setTypeReclamation(e.target.value)}>
                                <option value="">Sélectionner...</option>
                                <option value="Qualité">Qualité</option>
                                <option value="Service">Service</option>
                                <option value="Livraison">Livraison</option>
                            </select>
                            {errors.type_reclamation && <p className="error-text">{errors.type_reclamation}</p>}
                        </div>
                        <div className="form-label">
                            <label>Gravité:</label>
                            <select className="form-control" value={gravite} onChange={(e) => setGravite(e.target.value)}>
                                <option value="">Sélectionner...</option>
                                <option value="Mineure">Mineure</option>
                                <option value="Majeure">Majeure</option>
                                <option value="Critique">Critique</option>
                            </select>
                            {errors.gravite && <p className="error-text">{errors.gravite}</p>}
                        </div>
                        <div className="form-label">
                            <label>Responsable de Traitement:</label>
                            <select className="form-control" value={responsable_traitement} onChange={(e) => setResponsableTraitement(e.target.value)}>
                                <option value="">Sélectionner...</option>
                                {responsable_traitements.map((res) => (
                                    <option key={res.id} value={res.id}>
                                        {res.username}
                                    </option>
                                ))}
                            </select>
                            {errors.responsable_traitement && <p className="error-text">{errors.responsable_traitement}</p>}
                        </div>
                        <div className="form-label">
                            <label>Déclencher Plan d'Action:</label>
                            <input type="checkbox" checked={declencher_plan_action} onChange={(e) => setDeclencherPlanAction(e.target.checked)} />
                        </div>
                        <div className="form-label">
                            <label>Pièces Jointes:</label>
                            <input type="file" className="form-control" onChange={(e) => handleFileChange(e, setPiecesJointes)} />
                        </div>
                    </div>
                </form>
            </div>
        </main>
    );
};

export default CreateReclamation;
