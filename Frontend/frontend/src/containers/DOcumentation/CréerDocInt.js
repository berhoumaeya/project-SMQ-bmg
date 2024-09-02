import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import SubNavbarDoc from '../../components/SubNavbarDOC';
import SidebarDoc from '../../components/SidebarDoc';
const CreateDocumentForm = () => {
    const { id } = useParams();

    const [errors, setErrors] = useState({});
    const [fichier, setPiecesJointes] = useState(null);
    const [code, setCode] = useState('');
    const [type_doc, setTypeDoc] = useState('');
    const [libelle, setLibelle] = useState('');
    const [selection_site, setSelectionSite] = useState('');
    const [selection_activite, setSelectionActivite] = useState('');
    const [selection_verificateurID, setSelectionVerificateur] = useState('');
    const [selection_verificateurs, setSelectionVerificateurs] = useState([]);
    const [selection_approbateurID, setSelectionApprobateur] = useState('');
    const [selection_approbateurs, setSelectionApprobateurs] = useState([]);
    const [selection_redacteurID, setSelectionRedacteur] = useState('');
    const [selection_redacteurs, setSelectionRedacteurs] = useState([]);
    const [status , setStatus] = useState('En cours');
    const [liste_informeeID, setListeInformee] = useState([]);
    const [liste_informees, setListeInformees] = useState([]);

    const navigate = useNavigate();


    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/user/users/`)
            .then(response => setListeInformees(response.data))
            .catch(error => console.error('Error fetching users:', error));

        axios.get(`${process.env.REACT_APP_API_URL}/user/app/`)
            .then(response => setSelectionApprobateurs(response.data))
            .catch(error => console.error('Error fetching approbateurs:', error));

        axios.get(`${process.env.REACT_APP_API_URL}/user/verif/`)
            .then(response => setSelectionVerificateurs(response.data))
            .catch(error => console.error('Error fetching verificateurs:', error));
       
        axios.get(`${process.env.REACT_APP_API_URL}/user/redact/`)
            .then(response => setSelectionRedacteurs(response.data))
            .catch(error => console.error('Error fetching redacteurs:', error));    
            
    }, [id]);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setPiecesJointes(selectedFile);
    };

    const validateForm = () => {
        const formErrors = {};
        if (!libelle) formErrors.libelle = 'Libellé est requis.';
        if (!code) formErrors.code = 'Code est requis.';
        if (!type_doc) formErrors.type_doc = 'Type est requis.';
        if (!selection_site) formErrors.selection_site = 'Site est requis.';
        if (!selection_activite) formErrors.selection_activite = 'Activité est requis.';
        if (!selection_verificateurID) formErrors.selection_verificateur = 'Vérificateur est requis.';
        if (!selection_approbateurID) formErrors.selection_approbateur = 'Approbateur est requis.';
        if (!selection_redacteurID) formErrors.selection_redacteur = 'Rédacteur est requis.';
        if (liste_informeeID.length === 0) formErrors.liste_informee = 'Liste informée est requis.';
        if(!status) formErrors.status = 'Statut est requis.';
        if (!fichier) formErrors.fichier = 'Pièces jointes est requis.';

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
        formData.append('libelle', libelle);
        formData.append('code', code);
        formData.append('type_doc', type_doc);
        formData.append('selection_site', selection_site);
        formData.append('selection_activite', selection_activite);
        formData.append('selection_verificateur', selection_verificateurID);
        formData.append('selection_approbateur', selection_approbateurID);
        formData.append('selection_redacteur', selection_redacteurID);
        formData.append('status', status);
        liste_informeeID.forEach(id => formData.append('liste_informee', id));
        if (fichier) {
            formData.append('fichier', fichier);
        }

        const headers = {
            'Accept': '*/*',
            'Content-Type': 'multipart/form-data',
            'X-CSRFToken': Cookies.get('csrftoken')
        };

        axios.post(`${process.env.REACT_APP_API_URL}/doc/create-document-interne/${id}/`, formData, { headers })
            .then(response => {
                console.log('Document interne créé avec succès:', response.data);
                setLibelle('');
                setCode('');
                setTypeDoc('');
                setListeInformee([]);
                setSelectionApprobateur('');
                setSelectionVerificateur('');
                setSelectionRedacteur('');
                setSelectionActivite('');
                setSelectionSite('');
                setStatus('');
                toast.success('Votre document à été envoyé au superviseur pour le vérifier');
                navigate('/VerifDoc');
            })
            .catch(error => {
                console.error('Error creating document:', error);
                setErrors(error.response?.data || { message: 'Une erreur s\'est produite lors de la création du document.' });
            });
    };

    return (
        <> <SubNavbarDoc />
            <main style={{ display: 'flex', minHeight: '100vh' }}>
                <SidebarDoc />
                <div className="container ajout-form">

                    <form onSubmit={handleSubmit} className="row">
                        <div className="button-container">
                            <button className="button-add" type="submit" onClick={handleSubmit}>Rédiger</button>
                        </div> <h4>Création un document interne</h4>
                        <div className="col-md-6">
                            <div className="form-label">
                                <label className="form-label">Code :</label>
                                <input className="form-control" type="text" placeholder='Code*' name="code" value={code} onChange={(e) => setCode(e.target.value)} />
                                {errors.code && <p className="error">{errors.code}</p>}
                            </div>
                            <div className="form-label">
                                <label className="form-label">Type de document:</label>
                                <select className="form-control" value={type_doc} onChange={(e) => setTypeDoc(e.target.value)}>
                                    <option value="">Sélectionner...</option>
                                    <option value="Interne">Manuel</option>
                                    <option value="Externe">Procédure</option>
                                    <option value="Externe">Politique</option>
                                    <option value="Externe">Rapport</option>
                                    <option value="Externe">Mémoire</option>
                                </select>
                                {errors.type_doc && <p className="error">{errors.type_doc}</p>}
                            </div>
                            <div className="form-label">
                                <label className="form-label">Libellé :</label>
                                <input className="form-control" type="text" placeholder='Libellé*' name="libelle" value={libelle} onChange={(e) => setLibelle(e.target.value)} />
                                {errors.libelle && <p className="error">{errors.libelle}</p>}

                            </div>
                            <div className="form-label">
                                <label className="form-label">Site :</label>
                                <select className="form-control" value={selection_site} onChange={(e) => setSelectionSite(e.target.value)}>
                                    <option value="">Sélectionner...</option>
                                    <option value="Site 1">Site 1</option>
                                    <option value="Site 2">Site 2</option>
                                    <option value="Site 3">Site 3</option>
                                    <option value="Site 4">Site 4</option>
                                </select>
                                {errors.selection_site && <p className="error">{errors.selection_site}</p>}

                            </div>
                            
                            <div className="form-label">
                                <label className="form-label">Statut :</label>
                                <select className="form-control" value={status} onChange={(e) => setStatus(e.target.value)}>
                                    <option value="">Sélectionner...</option>
                                    <option value="En cours">En cours</option>
                                    <option value="En attente">En attente</option>
                                    <option value="Approuvé">Approuvé</option>
                                    <option value="Vérifié">Vérifié</option>
                                    <option value="Rejeté">Rejeté</option>
                                </select>
                                {errors.status && <p className="error">{errors.status}</p>}
                            </div>
                            <div className="form-label">
                                <label className="form-label">Activité :</label>
                                <select className="form-control" value={selection_activite} onChange={(e) => setSelectionActivite(e.target.value)}>
                                    <option value="">Sélectionner...</option>
                                    <option value="Développement">Développement</option>
                                    <option value="Test">Test</option>
                                    <option value="Documentation">Documentation</option>
                                    <option value="Déploiement">Déploiement</option>
                                    <option value="Support">Support</option>
                                </select>
                                {errors.selection_activite && <p className="error">{errors.selection_activite}</p>}

                            </div>
                            <div className="form-label">
                                <label className="form-label">Rédacteur :</label>
                                <select className="form-control" value={selection_redacteurID} onChange={(e) => setSelectionRedacteur(e.target.value)}>
                                    <option value="">Sélectionner...</option>
                                    {selection_redacteurs.map(selection_redacteur => (
                                        <option key={selection_redacteur.id} value={selection_redacteur.id}>{selection_redacteur.username}</option>
                                    ))}
                                </select>
                                {errors.selection_redacteur && <p className="error">{errors.selection_redacteur}</p>}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-label">
                                <label className="form-label">Vérificateur :</label>
                                <select className="form-control" value={selection_verificateurID} onChange={(e) => setSelectionVerificateur(e.target.value)}>
                                    <option value="">Sélectionner...</option>
                                    {selection_verificateurs.map(selection_verificateur => (
                                        <option key={selection_verificateur.id} value={selection_verificateur.id}>{selection_verificateur.username}</option>
                                    ))}
                                </select>
                                {errors.selection_verificateur && <p className="error">{errors.selection_verificateur}</p>}

                            </div>

                            <div className="form-label">
                                <label className="form-label">Approbateur :</label>
                                <select className="form-control" value={selection_approbateurID} onChange={(e) => setSelectionApprobateur(e.target.value)}>
                                    <option value="">Sélectionner...</option>
                                    {selection_approbateurs.map(selection_approbateur => (
                                        <option key={selection_approbateur.id} value={selection_approbateur.id}>{selection_approbateur.username}</option>
                                    ))}
                                </select>
                                {errors.selection_approbateur && <p className="error">{errors.selection_approbateur}</p>}

                            </div>
                            <div className="form-label">
                                <label className="form-label">Liste informée :</label>
                                <select className="form-control" multiple value={liste_informeeID} onChange={(e) => setListeInformee(Array.from(e.target.selectedOptions, option => option.value))}>
                                    {liste_informees.map(liste_informee => (
                                        <option key={liste_informee.id} value={liste_informee.id}>{liste_informee.username}</option>
                                    ))}
                                </select>
                                {errors.liste_informee && <p className="error">{errors.liste_informee}</p>}

                            </div>
                            <div className="form-label">
                                <label className="form-label">Pièces jointes :</label>
                                <input className="form-control" type="file" onChange={handleFileChange} />
                                {errors.fichier && <p className="error">{errors.fichier}</p>}
                            </div>
                        </div>
                    </form>
                </div>
            </main>
        </>
    );
};

export default CreateDocumentForm;
