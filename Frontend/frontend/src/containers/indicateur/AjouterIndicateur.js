import React, { useState } from 'react';
import axios from 'axios';
import { Navigate, Link } from 'react-router-dom';
import Cookies from 'js-cookie';

const AddIndicateur = () => {

    const [errors, setErrors] = useState({});

    const [piece_jointe, setPiecesJointes] = useState(null);
    const [libelle, setlibelle] = useState('');
    const [type_indicateur, settype_indicateur] = useState('');
    const [processus_lie, setprocessus_lie] = useState('');
    const [axe_politique_qualite, setaxe_politique_qualite] = useState('');
    const [type_resultat_attendu, settype_resultat_attendu] = useState('');
    const [date_debut, setdate_debut] = useState('');
    const [periodicite_indicateur, setperiodicite_indicateur] = useState('');
    const [type_suivi, settype_suivi] = useState('');
    const [valeur_cible, setvaleur_cible] = useState('');
    const [limite_critique, setlimite_critique] = useState('');

    const [ajoutReussi, setAjoutReussi] = useState(false);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setPiecesJointes(selectedFile);
    };


    const handleSubmit = (event) => {
        event.preventDefault();

        const cible = parseFloat(valeur_cible);
        if (isNaN(cible)) {
            alert('La distance doit être un nombre décimal.');
            return;
        }
        const limite = parseFloat(limite_critique);
            if (isNaN(limite)) {
                alert('La distance doit être un nombre décimal.');
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
                console.log('indicateur créé avec succès:', response.data);
                setlibelle('');
                settype_indicateur('');
                setprocessus_lie('');
                setaxe_politique_qualite('');
                settype_resultat_attendu('');
                setperiodicite_indicateur(''); 
                setdate_debut('');               
                settype_suivi('');
                setvaleur_cible('');
                setlimite_critique('');


                setAjoutReussi(true);
            })
            .catch(error => {
                console.error('Error creating fournisseur:', error);
                setErrors(error.response?.data || { message: 'Une erreur s\'est produite lors de la création du fournisseur.' });
            });
    };

    if (ajoutReussi) {
        return <Navigate to="/indicateurs" />;
    }

    return (
        <div className="form-container">
            <div className="form-card">
                <h3>Ajouter Indicateur</h3>
                <form onSubmit={handleSubmit} className="form">
                <div className="form-group">
                        <label>libelle :</label>
                        {errors.libelle && <p className="error-text">{errors.libelle}</p>}
                        <input type="text" name="libelle" value={libelle} onChange={(e) => setlibelle(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Date debut :</label>
                        {errors.date_debut && <p className="error-text">{errors.date_debut}</p>}
                        <input type="date" name="date_debut" value={date_debut} onChange={(e) => setdate_debut(e.target.value)} />
                    </div>
                <div className="form-group">
                        <label>Type indicateur:</label>
                        {errors.type_indicateur && <p className="error-text">{errors.type_indicateur}</p>}
                        <select value={type_indicateur} onChange={(e) => settype_indicateur(e.target.value)}>
                            <option value="">Sélectionner...</option>
                            <option value="qualité">qualité</option>
                            <option value="performance">performance</option>
                            <option value="sécurité">sécurité</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>type resultat attendu:</label>
                        {errors.type_resultat_attendu && <p className="error-text">{errors.type_resultat_attendu}</p>}
                        <select value={type_resultat_attendu} onChange={(e) => settype_resultat_attendu(e.target.value)}>
                            <option value="">Sélectionner...</option>
                            <option value="quantitatif">quantitatif</option>
                            <option value="qualitatif">qualitatif</option>
                            <option value="financier">financier</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>periodicite indicateur:</label>
                        {errors.periodicite_indicateur && <p className="error-text">{errors.periodicite_indicateur}</p>}
                        <select value={periodicite_indicateur} onChange={(e) => setperiodicite_indicateur(e.target.value)}>
                            <option value="">Sélectionner...</option>
                            <option value="annuelle">annuelle</option>
                            <option value="semestrielle">semestrielle</option>
                            <option value="trimestrielle">trimestrielle</option>
                            <option value="mensuelle">mensuelle</option>
                            <option value="hebdomadaire">hebdomadaire</option>
                            <option value="quotidienne">quotidienne</option>
                        </select>
                    </div>
                    <div className="form-group">
                    <label>valeur cible :</label>
                    {errors.valeur_cible && <p className="error-text">{errors.valeur_cible}</p>}
                    <input type="valeur_cible" name="valeur_cible" value={valeur_cible} onChange={(e) => setvaleur_cible(e.target.value)} />
                   </div>
                   <div className="form-group">
                    <label>limite critique :</label>
                    {errors.limite_critique && <p className="error-text">{errors.limite_critique}</p>}
                    <input type="limite_critique" name="limite_critique" value={limite_critique} onChange={(e) => setlimite_critique(e.target.value)} />
                   </div>
                   <div className="form-group">
                    <label>Type suivi :</label>
                    {errors.type_suivi && <p className="error-text">{errors.type_suivi}</p>}
                    <select value={type_suivi} onChange={(e) => settype_suivi(e.target.value)}>
                            <option value="">Sélectionner...</option>
                            <option value="manuel">manuel</option>
                            <option value="formule">Formule de calcul</option>
                        </select>
                </div>
                    <div className="form-group">
                        <label>axe politique qualite:</label>
                        {errors.axe_politique_qualite && <p className="error-text">{errors.axe_politique_qualite}</p>}
                        <select value={axe_politique_qualite} onChange={(e) => setaxe_politique_qualite(e.target.value)}>
                            <option value="">Sélectionner...</option>
                            <option value="satisfaction_client">satisfaction_client</option>
                            <option value="amélioration_continue">Amélioration Continue</option>
                            <option value="conformité">conformité</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>processus_lie:</label>
                        {errors.processus_lie && <p className="error-text">{errors.processus_lie}</p>}
                        <select value={processus_lie} onChange={(e) => setprocessus_lie(e.target.value)}>
                            <option value="">Sélectionner...</option>
                            <option value="production">production</option>
                            <option value="logistique">logistique</option>
                            <option value="achat">achat</option>
                            <option value="vente">vente</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Pièces jointes :</label>
                        <input type="file" onChange={handleFileChange} />
                    </div>
                    <div className="button-group">
                        <button className="btn btn-primary" type="submit">ajouter Indicateur</button>
                        <Link to="/indicateurs" className="btn btn-secondary">Retour au tableau de bord</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddIndicateur;
