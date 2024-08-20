/*import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Navigate, Link } from 'react-router-dom';
import Cookies from 'js-cookie';

const ModifierReclamation = () => {
    const { reclamationId } = useParams();

    const [errors, setErrors] = useState({});

    const [reclamation_fournisseur, setReclamationFournisseur] = useState(null);
    const [plan_action, setPlanAction] = useState(null);
    const [fichier_pdf, setFichierPdf] = useState(null);

    const [code, setCode] = useState('');
    const [client, setClient] = useState('');
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
    const [personnes_a_notifierID, setPersonnesANotifierID] = useState([]);
    const [personnes_a_notifiers, setPersonnesANotifiers] = useState([]);
    const [pieces_jointes, setPiecesJointes] = useState(null);

    const [modificationReussi, setModificationReussi] = useState(false);

    useEffect(() => {
        const fetchReclamation = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/CRM/reclamation_client/${reclamationId}/`);
                const data = response.data;
                console.log('Fetched data:', data);
                setClient(data.client);
                setCode(data.code);
                setDateLivraison(data.date_livraison);
                setDescription(data.description);
                setDecisions(data.decisions);
                setTypeReclamation(data.type_reclamation);
                setGravite(data.gravite);
                setDeclencherPlanAction(data.declencher_plan_action);
                setResponsableTraitement(data.responsable_traitement);
                setDateDetection(data.date_detection);
                setDesignationProduitNonConforme(data.designation_produit_non_conforme);
                setDescriptionNonConformite(data.description_non_conformite);
                setProduitsNonConformes(data.produits_non_conformes);
                setTypeNonConformite(data.type_non_conformite);
                setSourceNonConformite(data.source_non_conformite);
                setNiveauGravite(data.niveau_gravite);
                setPersonnesANotifierID(data.personnes_a_notifier);
            } catch (error) {
                console.error('Error fetching reclamation:', error);
            }
        };

        fetchReclamation();

        axios.get(`${process.env.REACT_APP_API_URL}/user/resTrait/`)
            .then(response => {
                console.log('Responsable traitement data:', response.data);
                setResponsableTraitements(response.data);
            })
            .catch(error => console.error('Error fetching responsables:', error));

        axios.get(`${process.env.REACT_APP_API_URL}/user/users/`)
            .then(response => {
                console.log('Users data:', response.data);
                setPersonnesANotifiers(response.data);
            })
            .catch(error => console.error('Error fetching users:', error));

        axios.get(`${process.env.REACT_APP_API_URL}/fournisseur/types-produits/`)
            .then(response => {
                console.log('Products data:', response.data);
                setProduits(response.data);
            })
            .catch(error => console.error('Error fetching products:', error));
    }, [reclamationId]);

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
        if (declencher_plan_action) {
            formData.append('date_detection', date_detection);
            formData.append('designation_produit_non_conforme', designation_produit_non_conforme);
            formData.append('description_non_conformite', description_non_conformite);
            formData.append('produits_non_conformes', produits_non_conformes);
            formData.append('type_non_conformite', type_non_conformite);
            formData.append('source_non_conformite', source_non_conformite);
            formData.append('niveau_gravite', niveau_gravite);
            personnes_a_notifierID.forEach(id => {
                formData.append('personnes_a_notifier', id);
            });
            if (pieces_jointes) {
                formData.append('pieces_jointes', pieces_jointes);
            }
        }

        const headers = {
            'Accept': '*//*',
            'Content-Type': 'multipart/form-data',
            'X-CSRFToken': Cookies.get('csrftoken')
        };

        axios.put(`${process.env.REACT_APP_API_URL}/CRM/update_reclamation_client/${reclamationId}/`, formData, { headers })
            .then(response => {
                console.log('Reclamation modifiée avec succès:', response.data);
                setCode('');
                setResponsableTraitement('');
                setDecisions('');
                setDescription('');
                setDateLivraison('');
                setPersonnesANotifierID([]);
                setModificationReussi(true);
            })
            .catch(error => {
                console.error('Error updating reclamation:', error);
                setErrors(error.response?.data || { message: 'Une erreur s\'est produite lors de la modification de la réclamation.' });
            });
    };

    if (modificationReussi) {
        return <Navigate to={`/AllReclamations/${client}/`} />;
    }


    return (
        <div className="form-container">
            <div className="form-card">
                <h3>Modifier Réclamation</h3>
                <form onSubmit={handleSubmit} className="form">
                    <div className="form-group">
                        <label>Code:</label>
                        {errors.code && <p className="error-text">{errors.code}</p>}
                        <input type="text" name="code" value={code} onChange={(e) => setCode(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Description:</label>
                        {errors.description && <p className="error-text">{errors.description}</p>}
                        <input type="text" name="description" value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Décisions:</label>
                        {errors.decisions && <p className="error-text">{errors.decisions}</p>}
                        <input type="text" name="decisions" value={decisions} onChange={(e) => setDecisions(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Type Réclamation:</label>
                        {errors.type_reclamation && <p className="error-text">{errors.type_reclamation}</p>}
                        <select value={type_reclamation} onChange={(e) => setTypeReclamation(e.target.value)}>
                            <option value="">Sélectionner...</option>
                            <option value="Service">Service</option>
                            <option value="Produit">Produit</option>
                            <option value="Facturation">Facturation</option>
                            <option value="Livraison">Livraison</option>
                            <option value="Support">Support</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Gravité :</label>
                        {errors.gravite && <p className="error-text">{errors.gravite}</p>}
                        <select value={gravite} onChange={(e) => setGravite(e.target.value)}>
                            <option value="">Sélectionner...</option>
                            <option value="Faible">Faible</option>
                            <option value="Moyenne">Moyenne</option>
                            <option value="Grave">Grave</option>
                            <option value="Critique">Critique</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Date de Livraison :</label>
                        <input type="date" name="date_livraison" value={date_livraison} onChange={(e) => setDateLivraison(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Responsable traitement:</label>
                        {errors.responsable_traitement && <p className="error-text">{errors.responsable_traitement}</p>}
                        <select value={responsable_traitement} onChange={(e) => setResponsableTraitement(e.target.value)}>
                            <option value="">Sélectionner...</option>
                            {responsable_traitements.map(responsable_traitement => (
                                <option key={responsable_traitement.id} value={responsable_traitement.id}>{responsable_traitement.username}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Fichier Réclamation fournisseur :</label>
                        <input type="file" onChange={(e) => handleFileChange(e, setReclamationFournisseur)} />
                    </div>
                    <div className="form-group">
                        <label>Fichier plan action :</label>
                        <input type="file" onChange={(e) => handleFileChange(e, setPlanAction)} />
                    </div>
                    <div className="form-group">
                        <label>Pièces jointes :</label>
                        <input type="file" onChange={(e) => handleFileChange(e, setFichierPdf)} />
                    </div>
                    <div className="form-group">
                        <label>Déclencher plan action :</label>
                        <input type="checkbox" name="declencher_plan_action" checked={declencher_plan_action} onChange={e => setDeclencherPlanAction(e.target.checked)} />
                    </div>
                    {declencher_plan_action && (
                        <>
                            <div className="form-group">
                                <label>Date de Détection</label>
                                {errors.date_detection && <p className="error-text">{errors.date_detection}</p>}
                                <input type="date" name="date_detection" value={date_detection} onChange={(e) => setDateDetection(e.target.value)} required />
                            </div>
                            <div className="form-group">
                                <label>Désignation produit non conforme</label>
                                {errors.designation_produit_non_conforme && <p className="error-text">{errors.designation_produit_non_conforme}</p>}
                                <input type="text" name="designation_produit_non_conforme" value={designation_produit_non_conforme} onChange={(e) => setDesignationProduitNonConforme(e.target.value)} required />
                            </div>
                            <div className="form-group">
                                <label>Description non conformité</label>
                                {errors.description_non_conformite && <p className="error-text">{errors.description_non_conformite}</p>}
                                <input type="text" name="description_non_conformite" value={description_non_conformite} onChange={(e) => setDescriptionNonConformite(e.target.value)} required />
                            </div>
                            <div className="form-group">
                        <label>Produit:</label>
                        {errors.produits_non_conformes && <p className="error-text">{errors.produits_non_conformes}</p>}
                        <select value={produits_non_conformes} onChange={(e) => setProduitsNonConformes(e.target.value)}>
                            <option value="">Sélectionner...</option>
                            {produits.map(produits_non_conformes => (
                                <option key={produits_non_conformes.id} value={produits_non_conformes.id}>{produits_non_conformes.nom}</option>
                            ))}
                        </select>
                    </div>
                            <div className="form-group">
                                <label>Type Non conformité:</label>
                                {errors.type_non_conformite && <p className="error-text">{errors.type_non_conformite}</p>}
                                <select value={type_non_conformite} onChange={(e) => setTypeNonConformite(e.target.value)}>
                                    <option value="">Sélectionner...</option>
                                    <option value="Matière première défectueuse">Matière première défectueuse</option>
                                    <option value="Erreur de production">Erreur de production</option>
                                    <option value="Défaut d'emballage">Défaut d'emballage</option>
                                    <option value="Problème de livraison">Problème de livraison</option>
                                    <option value="Mauvaise manipulation">Mauvaise manipulation</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Source :</label>
                                {errors.source_non_conformite && <p className="error-text">{errors.source_non_conformite}</p>}
                                <select value={source_non_conformite} onChange={(e) => setSourceNonConformite(e.target.value)}>
                                    <option value="">Sélectionner...</option>
                                    <option value="Usine">Usine</option>
                                    <option value="Fournisseur">Fournisseur</option>
                                    <option value="Processus de production">Processus de production</option>
                                    <option value="Transport">Transport</option>
                                    <option value="Stockage">Stockage</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Niveau de Gravité :</label>
                                {errors.niveau_gravite && <p className="error-text">{errors.niveau_gravite}</p>}
                                <select value={niveau_gravite} onChange={(e) => setNiveauGravite(e.target.value)}>
                                    <option value="">Sélectionner...</option>
                                    <option value="Faible">Faible</option>
                                    <option value="Moyenne">Moyenne</option>
                                    <option value="Élevée">Élevée</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Personnes à notifier :</label>
                                {errors.personnes_a_notifier && <p className="error-text">{errors.personnes_a_notifier}</p>}
                                <select multiple value={personnes_a_notifierID} onChange={(e) => setPersonnesANotifierID(Array.from(e.target.selectedOptions, option => option.value))}>
                                    {personnes_a_notifiers.map(personnes_a_notifier => (
                                        <option key={personnes_a_notifier.id} value={personnes_a_notifier.id}>{personnes_a_notifier.username}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Pièces jointes :</label>
                                <input type="file" onChange={(e) => handleFileChange(e, setPiecesJointes)} />
                            </div>
                        </>
                    )}
                    <div className="button-group">
                        <button className="btn btn-success mt-3" type="submit">Modifier Réclamation</button>
                        <Link to={`/AllReclamations/${client}/`} className="btn btn-gray mt-3">Retour au tableau de bord</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ModifierReclamation;*/
import React, { useState, useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './consulterclient.css'; 
import { GrTrash } from 'react-icons/gr';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { CiSaveDown2 } from 'react-icons/ci';

const staticReclamation = {
    // Données statiques pour la réclamation
    code: 'RCL123',
    description: 'Description de la réclamation',
    type_reclamation: 'Type A',
    date_livraison: '2024-08-01',
    gravite: 'Haute',
    responsable_traitement: 'Jean Dupont',
    decisions: 'Décision prise',
    created_at: '2024-07-30',
    created_by: 'Marie Curie',
    updated_at: '2024-08-02',
    updated_by: 'Paul Martin',
    reclamation_fournisseur: true,
    plan_action: false,
    fichier_pdf: true,
    declencher_plan_action: true,
    date_detection: '2024-07-29',
    designation_produit_non_conforme: 'Produit XYZ',
    description_non_conformite: 'Non-conformité détectée',
    produits_non_conformes: 'Produit 1, Produit 2',
    type_non_conformite: 'Type B',
    source_non_conformite: 'Source C',
    niveau_gravite: 'Élevé',
    pieces_jointes: true,
    personnes_a_notifier: 'Alice, Bob',
};

const ModifierReclamation = () => {
    const { reclamationId } = useParams();

    // Initialisation des états avec des valeurs statiques
    const [code, setCode] = useState(staticReclamation.code);
    const [description, setDescription] = useState(staticReclamation.description);
    const [type_reclamation, setTypeReclamation] = useState(staticReclamation.type_reclamation);
    const [date_livraison, setDateLivraison] = useState(staticReclamation.date_livraison);
    const [gravite, setGravite] = useState(staticReclamation.gravite);
    const [responsable_traitement, setResponsableTraitement] = useState(staticReclamation.responsable_traitement);
    const [decisions, setDecisions] = useState(staticReclamation.decisions);
    const [declencher_plan_action, setDeclencherPlanAction] = useState(staticReclamation.declencher_plan_action);
    const [date_detection, setDateDetection] = useState(staticReclamation.date_detection);
    const [designation_produit_non_conforme, setDesignationProduitNonConforme] = useState(staticReclamation.designation_produit_non_conforme);
    const [description_non_conformite, setDescriptionNonConformite] = useState(staticReclamation.description_non_conformite);
    const [produits_non_conformes, setProduitsNonConformes] = useState(staticReclamation.produits_non_conformes);
    const [type_non_conformite, setTypeNonConformite] = useState(staticReclamation.type_non_conformite);
    const [source_non_conformite, setSourceNonConformite] = useState(staticReclamation.source_non_conformite);
    const [niveau_gravite, setNiveauGravite] = useState(staticReclamation.niveau_gravite);
    const [personnes_a_notifierID, setPersonnesANotifierID] = useState(staticReclamation.personnes_a_notifier.split(', '));
    const [pieces_jointes, setPiecesJointes] = useState(staticReclamation.pieces_jointes);
    const [fichier_pdf, setFichierPdf] = useState(null); // A gérer avec les fichiers

    const [modificationReussi, setModificationReussi] = useState(false);
    const [deleteReussi, setDeleteReussi] = useState(false);
    
    // État pour les erreurs de validation
    const [errors, setErrors] = useState({});

    useEffect(() => {
        // Logic to fetch actual data if needed
        // This is just a placeholder for demonstration
    }, [reclamationId]);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFichierPdf(selectedFile);
    };

    const handleDelete = () => {
        setDeleteReussi(true);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Logic to handle form submission and validation
        // Example of setting errors if validation fails
        let validationErrors = {};
        if (!code) validationErrors.code = 'Le code est requis.';
        // ... Add validation for other fields
        
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        
        // Simuler le succès de la soumission du formulaire
        setModificationReussi(true);
    };

    if (modificationReussi) {
        return <Navigate to={`/AllReclamations/${reclamationId}/`} />;
    }

    return (
        <div className="container-client px-4 mt-4">
            <nav className="nav-client">
                <Link className="nav-item-client active ms-0" to="#">Modifier Réclamation</Link>
            </nav>
            <hr className="divider-client" />
            <div className="row">
                <div className="col-xl-4">
                    <div className="card-client mb-4 mb-xl-0">
                        <div className="card-header-client">Profile Picture</div>
                        <div className="card-body-client text-center">
                            <img className="img-client rounded-circle mb-2" src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="Profile" />
                        </div>
                    </div>
                </div>
                <div className="col-xl-8">
                    <div className="card-client mb-4">
                        <div className="card-header-client">Modifier Réclamation</div>
                        <div className="card-body-client">
                            <form onSubmit={handleSubmit}>
                                <div className="row gx-3 mb-3">
                                    <div className="col-md-6">
                                        <label className="form-label-client mb-1" htmlFor="inputcode">Code</label>
                                        <input
                                            className={`form-control-client ${errors.code ? 'is-invalid' : ''}`}
                                            id="inputcode"
                                            name="code"
                                            type="text"
                                            value={code}
                                            onChange={(e) => setCode(e.target.value)}
                                        />
                                        {errors.code && <div className="invalid-feedback">{errors.code}</div>}
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label-client mb-1">Description:</label>
                                        <input 
                                            type="text" 
                                            name="description" 
                                            className={`form-control-client ${errors.description ? 'is-invalid' : ''}`}
                                            value={description} 
                                            onChange={(e) => setDescription(e.target.value)} 
                                        />
                                        {errors.description && <div className="invalid-feedback">{errors.description}</div>}
                                    </div>
                                </div>
                                <div className="row gx-3 mb-3">
                                    <div className="col-md-6">
                                        <label className="form-label-client mb-1">Décisions:</label>
                                        <input 
                                            type="text" 
                                            name="decisions" 
                                            className={`form-control-client ${errors.decisions ? 'is-invalid' : ''}`}
                                            value={decisions} 
                                            onChange={(e) => setDecisions(e.target.value)} 
                                        />
                                        {errors.decisions && <div className="invalid-feedback">{errors.decisions}</div>}
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label-client mb-1">Type Réclamation:</label>
                                        <select 
                                            className={`form-control-client ${errors.type_reclamation ? 'is-invalid' : ''}`} 
                                            value={type_reclamation} 
                                            onChange={(e) => setTypeReclamation(e.target.value)}
                                        >
                                            <option value="">Sélectionner...</option>
                                            <option value="Service">Service</option>
                                            <option value="Produit">Produit</option>
                                            <option value="Facturation">Facturation</option>
                                            <option value="Livraison">Livraison</option>
                                            <option value="Support">Support</option>
                                        </select>
                                        {errors.type_reclamation && <div className="invalid-feedback">{errors.type_reclamation}</div>}
                                    </div>
                                </div>
                                <div className="row gx-3 mb-3">
                                    <div className="col-md-6">
                                        <label className="form-label-client mb-1">Gravité:</label>
                                        <input 
                                            type="text" 
                                            name="gravite" 
                                            className={`form-control-client ${errors.gravite ? 'is-invalid' : ''}`}
                                            value={gravite} 
                                            onChange={(e) => setGravite(e.target.value)} 
                                        />
                                        {errors.gravite && <div className="invalid-feedback">{errors.gravite}</div>}
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label-client mb-1">Date de Livraison:</label>
                                        <input 
                                            type="date" 
                                            name="date_livraison" 
                                            className={`form-control-client ${errors.date_livraison ? 'is-invalid' : ''}`}
                                            value={date_livraison} 
                                            onChange={(e) => setDateLivraison(e.target.value)} 
                                        />
                                        {errors.date_livraison && <div className="invalid-feedback">{errors.date_livraison}</div>}
                                    </div>
                                </div>
                                <div className="row gx-3 mb-3">
                                    <div className="col-md-6">
                                        <label className="form-label-client mb-1">Date de Détection:</label>
                                        <input 
                                            type="date" 
                                            name="date_detection" 
                                            className={`form-control-client ${errors.date_detection ? 'is-invalid' : ''}`}
                                            value={date_detection} 
                                            onChange={(e) => setDateDetection(e.target.value)} 
                                        />
                                        {errors.date_detection && <div className="invalid-feedback">{errors.date_detection}</div>}
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label-client mb-1">Désignation Produit Non Conforme:</label>
                                        <input 
                                            type="text" 
                                            name="designation_produit_non_conforme" 
                                            className={`form-control-client ${errors.designation_produit_non_conforme ? 'is-invalid' : ''}`}
                                            value={designation_produit_non_conforme} 
                                            onChange={(e) => setDesignationProduitNonConforme(e.target.value)} 
                                        />
                                        {errors.designation_produit_non_conforme && <div className="invalid-feedback">{errors.designation_produit_non_conforme}</div>}
                                    </div>
                                </div>
                                <div className="row gx-3 mb-3">
                                    <div className="col-md-6">
                                        <label className="form-label-client mb-1">Description Non-Conformité:</label>
                                        <input 
                                            type="text" 
                                            name="description_non_conformite" 
                                            className={`form-control-client ${errors.description_non_conformite ? 'is-invalid' : ''}`}
                                            value={description_non_conformite} 
                                            onChange={(e) => setDescriptionNonConformite(e.target.value)} 
                                        />
                                        {errors.description_non_conformite && <div className="invalid-feedback">{errors.description_non_conformite}</div>}
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label-client mb-1">Produits Non-Conformes:</label>
                                        <input 
                                            type="text" 
                                            name="produits_non_conformes" 
                                            className={`form-control-client ${errors.produits_non_conformes ? 'is-invalid' : ''}`}
                                            value={produits_non_conformes} 
                                            onChange={(e) => setProduitsNonConformes(e.target.value)} 
                                        />
                                        {errors.produits_non_conformes && <div className="invalid-feedback">{errors.produits_non_conformes}</div>}
                                    </div>
                                </div>
                                <div className="row gx-3 mb-3">
                                    <div className="col-md-6">
                                        <label className="form-label-client mb-1">Type Non-Conformité:</label>
                                        <input 
                                            type="text" 
                                            name="type_non_conformite" 
                                            className={`form-control-client ${errors.type_non_conformite ? 'is-invalid' : ''}`}
                                            value={type_non_conformite} 
                                            onChange={(e) => setTypeNonConformite(e.target.value)} 
                                        />
                                        {errors.type_non_conformite && <div className="invalid-feedback">{errors.type_non_conformite}</div>}
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label-client mb-1">Source Non-Conformité:</label>
                                        <input 
                                            type="text" 
                                            name="source_non_conformite" 
                                            className={`form-control-client ${errors.source_non_conformite ? 'is-invalid' : ''}`}
                                            value={source_non_conformite} 
                                            onChange={(e) => setSourceNonConformite(e.target.value)} 
                                        />
                                        {errors.source_non_conformite && <div className="invalid-feedback">{errors.source_non_conformite}</div>}
                                    </div>
                                </div>
                                <div className="row gx-3 mb-3">
                                    <div className="col-md-6">
                                        <label className="form-label-client mb-1">Niveau Gravité:</label>
                                        <input 
                                            type="text" 
                                            name="niveau_gravite" 
                                            className={`form-control-client ${errors.niveau_gravite ? 'is-invalid' : ''}`}
                                            value={niveau_gravite} 
                                            onChange={(e) => setNiveauGravite(e.target.value)} 
                                        />
                                        {errors.niveau_gravite && <div className="invalid-feedback">{errors.niveau_gravite}</div>}
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label-client mb-1">Personnes à Notifier:</label>
                                        <input 
                                            type="text" 
                                            name="personnes_a_notifier" 
                                            className={`form-control-client ${errors.personnes_a_notifier ? 'is-invalid' : ''}`}
                                            value={personnes_a_notifierID.join(', ')} 
                                            onChange={(e) => setPersonnesANotifierID(e.target.value.split(', '))} 
                                        />
                                        {errors.personnes_a_notifier && <div className="invalid-feedback">{errors.personnes_a_notifier}</div>}
                                    </div>
                                </div>
                                <div className="row gx-3 mb-3">
                                    <div className="col-md-6">
                                        <label className="form-label-client mb-1">Pièces Jointes:</label>
                                        <input 
                                            type="checkbox" 
                                            name="pieces_jointes" 
                                            checked={pieces_jointes} 
                                            onChange={(e) => setPiecesJointes(e.target.checked)} 
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label-client mb-1">Fichier PDF:</label>
                                        <input 
                                            type="file" 
                                            name="fichier_pdf" 
                                            onChange={handleFileChange} 
                                        />
                                    </div>
                                </div>
                                <div className="row gx-3 mb-3">
                                    <div className="col-md-6">
                                        <label className="form-label-client mb-1">Déclencher Plan d'Action:</label>
                                        <input 
                                            type="checkbox" 
                                            name="declencher_plan_action" 
                                            checked={declencher_plan_action} 
                                            onChange={(e) => setDeclencherPlanAction(e.target.checked)} 
                                        />
                                    </div>
                                </div>
                                <div className="d-flex justify-content-end">
                                    <button type="submit" className="btn btn-primary-client me-2">
                                        <CiSaveDown2 className="icon-client me-1" /> Sauvegarder
                                    </button>
                                    <Link to={`/AllReclamations/`} className="btn btn-danger-client">
                                        <IoMdArrowRoundBack className="icon-client me-1" /> Retour
                                    </Link>
                                    <button className="btn-delete-fournisseur ms-2" type="button" onClick={handleDelete}>
                                        <GrTrash /> Delete
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModifierReclamation;
