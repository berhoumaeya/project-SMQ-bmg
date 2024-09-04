import React, { useState } from 'react';
import axios from 'axios';
import { Navigate, Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import '../Client/forms.css'; 

const AddFournisseur = () => {
    const [errors, setErrors] = useState({});
    const [pieces_jointes, setPiecesJointes] = useState(null);
    const [nom, setNom] = useState('');
    const [code_fournisseur, setCodeFournisseur] = useState('');
    const [raison_sociale, setRaisonSociale] = useState('');
    const [adresse, setAdresse] = useState('');
    const [type_fournisseur, setTypeFournisseur] = useState('');
    const [categorie, setCategorie] = useState('');
    const [numero_telephone, setNumeroTelephone] = useState('');
    const [email, setEmail] = useState('');
    const [fournisseur_agree, setFournisseurAgree] = useState(false);
    const [periodicite_evaluation, setPeriodiciteEvaluation] = useState('');
    const [ajoutReussi, setAjoutReussi] = useState(false);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setPiecesJointes(selectedFile);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!numero_telephone) {
            alert('Veuillez saisir votre numéro de téléphone mobile.');
            return;
        } else if (!/^\d+$/.test(numero_telephone)) {
            alert('Le numéro de téléphone mobile ne doit contenir que des chiffres.');
            return;
        }

        const formData = new FormData();
        formData.append('nom', nom);
        formData.append('code_fournisseur', code_fournisseur);
        formData.append('raison_sociale', raison_sociale);
        formData.append('adresse', adresse);
        formData.append('type_fournisseur', type_fournisseur);
        formData.append('categorie', categorie);
        formData.append('numero_telephone', numero_telephone);
        formData.append('email', email);
        formData.append('periodicite_evaluation', periodicite_evaluation);
        formData.append('fournisseur_agree', fournisseur_agree ? 'True' : 'False');
        if (pieces_jointes) {
            formData.append('pieces_jointes', pieces_jointes);
        }

        const headers = {
            'Accept': '*/*',
            'Content-Type': 'multipart/form-data',
            'X-CSRFToken': Cookies.get('csrftoken')
        };

        axios.post(`${process.env.REACT_APP_API_URL}/fournisseur/create_Fournisseur/`, formData, { headers })
            .then(response => {
                console.log('Fournisseur créé avec succès:', response.data);
                setNom('');
                setCodeFournisseur('');
                setRaisonSociale('');
                setAdresse('');
                setTypeFournisseur('');
                setCategorie('');
                setNumeroTelephone('');
                setEmail('');
                setPeriodiciteEvaluation('');
                setAjoutReussi(true);
            })
            .catch(error => {
                console.error('Error creating fournisseur:', error);
                setErrors(error.response?.data || { message: 'Une erreur s\'est produite lors de la création du fournisseur.' });
            });
    };

    if (ajoutReussi) {
        return <Navigate to="/fournisseurs" />;
    }

    return (
        <main style={{ backgroundColor: '#eeeeee', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div className="container ajout-form">
                <div className="contact-image">
                    <img src="/images/add.png" alt="add_fournisseur" />
                    <div className="button-container">
                        <Link to="/fournisseurs">
                            <button className="retour">Retour à la liste des fournisseurs</button>
                        </Link>
                        <button className="button-add" type="submit" form="add-fournisseur-form">Ajouter un fournisseur</button>
                    </div>
                </div>
                <form id="add-fournisseur-form" onSubmit={handleSubmit} className="row">
                    <div className="col-md-6">
                        <div className="form-label">
                            <label className="form-label">Code Fournisseur:</label>
                            <input type="text" className="form-control" placeholder='Code Fournisseur*' value={code_fournisseur} onChange={(e) => setCodeFournisseur(e.target.value)} />
                            {errors.code_fournisseur && <p className="error-text">{errors.code_fournisseur}</p>}
                        </div>
                        <div className="form-label">
                            <label className="form-label">Nom Fournisseur:</label>
                            <input type="text" className="form-control" placeholder='Nom Fournisseur*' value={nom} onChange={(e) => setNom(e.target.value)} />
                            {errors.nom && <p className="error-text">{errors.nom}</p>}
                        </div>
                        <div className="form-label">
                            <label className="form-label">Raison Sociale:</label>
                            <input type="text" className="form-control" placeholder='Raison Sociale' value={raison_sociale} onChange={(e) => setRaisonSociale(e.target.value)} />
                            {errors.raison_sociale && <p className="error-text">{errors.raison_sociale}</p>}
                        </div>
                        <div className="form-label">
                            <label className="form-label">Adresse:</label>
                            <input type="text" className="form-control" placeholder='Adresse' value={adresse} onChange={(e) => setAdresse(e.target.value)} />
                            {errors.adresse && <p className="error-text">{errors.adresse}</p>}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-label">
                            <label className="form-label">Type Fournisseur:</label>
                            <select className="form-control" value={type_fournisseur} onChange={(e) => setTypeFournisseur(e.target.value)}>
                                <option value="">Sélectionner...</option>
                                <option value="Fournisseur de matière première">Fournisseur de matière première</option>
                                <option value="Fournisseur de composants">Fournisseur de composants</option>
                                <option value="Fournisseur de produits finis">Fournisseur de produits finis</option>
                            </select>
                            {errors.type_fournisseur && <p className="error-text">{errors.type_fournisseur}</p>}
                        </div>
                        <div className="form-label">
                            <label className="form-label">Catégorie Fournisseur:</label>
                            <select className="form-control" value={categorie} onChange={(e) => setCategorie(e.target.value)}>
                                <option value="">Sélectionner...</option>
                                <option value="electronique">Electronique</option>
                                <option value="textile">Textile</option>
                                <option value="alimentation">Alimentation</option>
                            </select>
                            {errors.categorie && <p className="error-text">{errors.categorie}</p>}
                        </div>
                        <div className="form-label">
                            <label className="form-label">Périodicité Évaluation:</label>
                            <select className="form-control" value={periodicite_evaluation} onChange={(e) => setPeriodiciteEvaluation(e.target.value)}>
                                <option value="">Sélectionner...</option>
                                <option value="annuelle">Annuelle</option>
                                <option value="semestrielle">Semestrielle</option>
                                <option value="trimestrielle">Trimestrielle</option>
                            </select>
                            {errors.periodicite_evaluation && <p className="error-text">{errors.periodicite_evaluation}</p>}
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

export default AddFournisseur;
