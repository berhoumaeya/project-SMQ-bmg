import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Navigate, Link } from 'react-router-dom';
import Cookies from 'js-cookie';

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
                console.log('Document interne créé avec succès:', response.data);
                setCode('');
                setResponsableTraitement('');
                setDecisions('');
                setDescription('');
                setDateLivraison('');
                setPersonnesANotifier([]);
                setAjoutReussi(true);
            })
            .catch(error => {
                console.error('Error creating document:', error);
                setErrors(error.response?.data || { message: 'Une erreur s\'est produite lors de la création du document.' });
            });
    };

    if (ajoutReussi) {
        return <Navigate to={`/AllReclamations/${id}/`} />;
    }

    return (
        <div className="form-container">
            <div className="form-card">
                <h3>Ajouter Réclamation</h3>
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
                                <label>Produits non conformes</label>
                                {errors.produits_non_conformes && <p className="error-text">{errors.produits_non_conformes}</p>}
                                <input type="text" name="produits_non_conformes" value={produits_non_conformes} onChange={(e) => setProduitsNonConformes(e.target.value)} required />
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
                                <select multiple value={personnes_a_notifierID} onChange={(e) => setPersonnesANotifier(Array.from(e.target.selectedOptions, option => option.value))}>
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
                        <button className="btn btn-success mt-3" type="submit">Ajouter Réclamation</button>
                        <Link to={`/AllReclamations/${id}`} className="btn btn-gray mt-3">Retour au tableau de bord</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateReclamation;
