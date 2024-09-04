import React, { useState } from 'react';
import axios from 'axios';
import { Navigate, Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import '../Client/forms.css';

const AddIndicateur = () => {
    const [errors, setErrors] = useState({});
    const [piece_jointe, setPiecesJointes] = useState(null);
    const [libelle, setLibelle] = useState('');
    const [type_indicateur, setTypeIndicateur] = useState('');
    const [processus_lie, setProcessusLie] = useState('');
    const [axe_politique_qualite, setAxePolitiqueQualite] = useState('');
    const [type_resultat_attendu, setTypeResultatAttendu] = useState('');
    const [date_debut, setDateDebut] = useState('');
    const [periodicite_indicateur, setPeriodiciteIndicateur] = useState('');
    const [type_suivi, setTypeSuivi] = useState('');
    const [valeur_cible, setValeurCible] = useState('');
    const [limite_critique, setLimiteCritique] = useState('');
    const [ajoutReussi, setAjoutReussi] = useState(false);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setPiecesJointes(selectedFile);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const cible = parseFloat(valeur_cible);
        if (isNaN(cible)) {
            alert('La valeur cible doit être un nombre décimal.');
            return;
        }
        const limite = parseFloat(limite_critique);
        if (isNaN(limite)) {
            alert('La limite critique doit être un nombre décimal.');
            return;
        }

        const formData = new FormData();
        formData.append('libelle', libelle);
        formData.append('type_indicateur', type_indicateur);
        formData.append('processus_lie', processus_lie);
        formData.append('axe_politique_qualite', axe_politique_qualite);
        formData.append('type_resultat_attendu', type_resultat_attendu);
        formData.append('periodicite_indicateur', periodicite_indicateur);
        formData.append('date_debut', date_debut);
        formData.append('type_suivi', type_suivi);
        formData.append('valeur_cible', valeur_cible);
        formData.append('limite_critique', limite_critique);
        if (piece_jointe) {
            formData.append('piece_jointe', piece_jointe);
        }

        const headers = {
            'Accept': '*/*',
            'Content-Type': 'multipart/form-data',
            'X-CSRFToken': Cookies.get('csrftoken')
        };

        axios.post(`${process.env.REACT_APP_API_URL}/indicateur/create_Indicateur/`, formData, { headers })
            .then(response => {
                console.log('Indicateur créé avec succès:', response.data);
                setLibelle('');
                setTypeIndicateur('');
                setProcessusLie('');
                setAxePolitiqueQualite('');
                setTypeResultatAttendu('');
                setPeriodiciteIndicateur(''); 
                setDateDebut('');
                setTypeSuivi('');
                setValeurCible('');
                setLimiteCritique('');
                setAjoutReussi(true);
            })
            .catch(error => {
                console.error('Error creating indicateur:', error);
                setErrors(error.response?.data || { message: 'Une erreur s\'est produite lors de la création de l\'indicateur.' });
            });
    };

    if (ajoutReussi) {
        return <Navigate to="/indicateurs" />;
    }

    return (
        <main style={{ backgroundColor: '#eeeeee', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div className="container ajout-form">
                <div className="contact-image">
                    <img src="/images/add.png" alt="add_indicateur" />
                    <div className="button-container">
                        <Link to="/indicateurs">
                            <button className="retour">Retour au tableau de bord</button>
                        </Link>
                        <button className="button-add" type="submit" form="add-indicateur-form">Ajouter Indicateur</button>
                    </div>
                </div>
                <form id="add-indicateur-form" onSubmit={handleSubmit} className="row">
                    <div className="col-md-6">
                        <div className="form-label">
                            <label className="form-label">Libelle:</label>
                            <input type="text" className="form-control" placeholder='Libelle*' value={libelle} onChange={(e) => setLibelle(e.target.value)} />
                            {errors.libelle && <p className="error-text">{errors.libelle}</p>}
                        </div>
                        <div className="form-label">
                            <label className="form-label">Date Début:</label>
                            <input type="date" className="form-control" placeholder='Date Début' value={date_debut} onChange={(e) => setDateDebut(e.target.value)} />
                            {errors.date_debut && <p className="error-text">{errors.date_debut}</p>}
                        </div>
                        <div className="form-label">
                            <label className="form-label">Type Indicateur:</label>
                            <select className="form-control" value={type_indicateur} onChange={(e) => setTypeIndicateur(e.target.value)}>
                                <option value="">Sélectionner...</option>
                                <option value="qualité">Qualité</option>
                                <option value="performance">Performance</option>
                                <option value="sécurité">Sécurité</option>
                            </select>
                            {errors.type_indicateur && <p className="error-text">{errors.type_indicateur}</p>}
                        </div>
                        <div className="form-label">
                            <label className="form-label">Type Résultat Attendu:</label>
                            <select className="form-control" value={type_resultat_attendu} onChange={(e) => setTypeResultatAttendu(e.target.value)}>
                                <option value="">Sélectionner...</option>
                                <option value="quantitatif">Quantitatif</option>
                                <option value="qualitatif">Qualitatif</option>
                                <option value="financier">Financier</option>
                            </select>
                            {errors.type_resultat_attendu && <p className="error-text">{errors.type_resultat_attendu}</p>}
                        </div>
                        <div className="form-label">
                            <label className="form-label">Périodicité Indicateur:</label>
                            <select className="form-control" value={periodicite_indicateur} onChange={(e) => setPeriodiciteIndicateur(e.target.value)}>
                                <option value="">Sélectionner...</option>
                                <option value="annuelle">Annuelle</option>
                                <option value="semestrielle">Semestrielle</option>
                                <option value="trimestrielle">Trimestrielle</option>
                                <option value="mensuelle">Mensuelle</option>
                                <option value="hebdomadaire">Hebdomadaire</option>
                                <option value="quotidienne">Quotidienne</option>
                            </select>
                            {errors.periodicite_indicateur && <p className="error-text">{errors.periodicite_indicateur}</p>}
                        </div>
                        <div className="form-label">
                            <label className="form-label">Valeur Cible:</label>
                            <input type="number" className="form-control" placeholder='Valeur Cible' value={valeur_cible} onChange={(e) => setValeurCible(e.target.value)} />
                            {errors.valeur_cible && <p className="error-text">{errors.valeur_cible}</p>}
                        </div>
                        <div className="form-label">
                            <label className="form-label">Limite Critique:</label>
                            <input type="number" className="form-control" placeholder='Limite Critique' value={limite_critique} onChange={(e) => setLimiteCritique(e.target.value)} />
                            {errors.limite_critique && <p className="error-text">{errors.limite_critique}</p>}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-label">
                            <label className="form-label">Processus Lié:</label>
                            <input type="text" className="form-control" placeholder='Processus Lié' value={processus_lie} onChange={(e) => setProcessusLie(e.target.value)} />
                            {errors.processus_lie && <p className="error-text">{errors.processus_lie}</p>}
                        </div>
                        <div className="form-label">
                            <label className="form-label">Axe Politique Qualité:</label>
                            <input type="text" className="form-control" placeholder='Axe Politique Qualité' value={axe_politique_qualite} onChange={(e) => setAxePolitiqueQualite(e.target.value)} />
                            {errors.axe_politique_qualite && <p className="error-text">{errors.axe_politique_qualite}</p>}
                        </div>
                        <div className="form-label">
                            <label className="form-label">Type Suivi:</label>
                            <input type="text" className="form-control" placeholder='Type Suivi' value={type_suivi} onChange={(e) => setTypeSuivi(e.target.value)} />
                            {errors.type_suivi && <p className="error-text">{errors.type_suivi}</p>}
                        </div>
                        <div className="form-label">
                            <label className="form-label">Pièce Jointe:</label>
                            <input type="file" className="form-control" onChange={handleFileChange} />
                            {errors.piece_jointe && <p className="error-text">{errors.piece_jointe}</p>}
                        </div>
                    </div>
                </form>
            </div>
        </main>
    );
};

export default AddIndicateur;
