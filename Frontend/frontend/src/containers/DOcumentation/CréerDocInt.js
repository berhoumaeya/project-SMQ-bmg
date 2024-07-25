import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
const CreateDocumentForm = () => {
    const { id } = useParams();

    const [errors, setErrors] = useState({});
    const [fichier, setPiecesJointes] = useState(null);
    const [libelle, setLibelle] = useState('');
    const [selection_site, setSelectionSite] = useState('');
    const [selection_activite, setSelectionActivite] = useState('');
    const [selection_verificateurID, setSelectionVerificateur] = useState('');
    const [selection_verificateurs, setSelectionVerificateurs] = useState([]);
    const [selection_approbateurID, setSelectionApprobateur] = useState('');
    const [selection_approbateurs, setSelectionApprobateurs] = useState([]);
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
    }, [id]);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setPiecesJointes(selectedFile);
    };


    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('libelle', libelle);
        formData.append('selection_site', selection_site);
        formData.append('selection_activite', selection_activite);
        formData.append('selection_verificateur', selection_verificateurID);
        formData.append('selection_approbateur', selection_approbateurID);
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
                setListeInformee([]);
                setSelectionApprobateur('');
                setSelectionVerificateur('');
                setSelectionActivite('');
                setSelectionSite('');
                toast.success('Votre document à été envoyé au superviseur pour le vérifier');
                navigate('/VerifDoc');
            })
            .catch(error => {
                console.error('Error creating document:', error);
                setErrors(error.response?.data || { message: 'Une erreur s\'est produite lors de la création du document.' });
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
                        </Link>
                        <button className="button-add-" type="submit">Rédiger un document</button>
                    </div>
                </div>
                <form onSubmit={handleSubmit} className="row">
                    <div className="col-md-6">
                        <div className="form-label">
                            <label className="form-label">Libellé :</label>
                            {errors.libelle && <p className="error-text">{errors.libelle}</p>}
                            <input className="form-control" type="text" placeholder='Libellé*' name="libelle" value={libelle} onChange={(e) => setLibelle(e.target.value)} />
                        </div>
                        <div className="form-label">
                            <label className="form-label">Site :</label>
                            {errors.selection_site && <p className="error-text">{errors.selection_site}</p>}
                            <select className="form-control" value={selection_site} onChange={(e) => setSelectionSite(e.target.value)}>
                                <option value="">Sélectionner...</option>
                                <option value="Site 1">Site 1</option>
                                <option value="Site 2">Site 2</option>
                                <option value="Site 3">Site 3</option>
                                <option value="Site 4">Site 4</option>
                            </select>
                        </div>
                        <div className="form-label">
                            <label className="form-label">Activité :</label>
                            {errors.selection_activite && <p className="error-text">{errors.selection_activite}</p>}
                            <select className="form-control" value={selection_activite} onChange={(e) => setSelectionActivite(e.target.value)}>
                                <option value="">Sélectionner...</option>
                                <option value="Développement">Développement</option>
                                <option value="Test">Test</option>
                                <option value="Documentation">Documentation</option>
                                <option value="Déploiement">Déploiement</option>
                                <option value="Support">Support</option>
                            </select>
                        </div>
                        <div className="form-label">
                            <label className="form-label">Vérificateur :</label>
                            {errors.selection_verificateur && <p className="error-text">{errors.selection_verificateur}</p>}
                            <select className="form-control" value={selection_verificateurID} onChange={(e) => setSelectionVerificateur(e.target.value)}>
                                <option value="">Sélectionner...</option>
                                {selection_verificateurs.map(selection_verificateur => (
                                    <option key={selection_verificateur.id} value={selection_verificateur.id}>{selection_verificateur.username}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-label">
                            <label className="form-label">Approbateur :</label>
                            {errors.selection_approbateur && <p className="error-text">{errors.selection_approbateur}</p>}
                            <select className="form-control" value={selection_approbateurID} onChange={(e) => setSelectionApprobateur(e.target.value)}>
                                <option value="">Sélectionner...</option>
                                {selection_approbateurs.map(selection_approbateur => (
                                    <option key={selection_approbateur.id} value={selection_approbateur.id}>{selection_approbateur.username}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-label">
                            <label className="form-label">Liste informée :</label>
                            {errors.liste_informee && <p className="error-text">{errors.liste_informee}</p>}
                            <select className="form-control" multiple value={liste_informeeID} onChange={(e) => setListeInformee(Array.from(e.target.selectedOptions, option => option.value))}>
                                {liste_informees.map(liste_informee => (
                                    <option key={liste_informee.id} value={liste_informee.id}>{liste_informee.username}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-label">
                            <label className="form-label">Pièces jointes :</label>
                            <input className="form-control" type="file" onChange={handleFileChange} />
                        </div>
                    </div>
                </form>
            </div>
        </main>
    );
};

export default CreateDocumentForm;
