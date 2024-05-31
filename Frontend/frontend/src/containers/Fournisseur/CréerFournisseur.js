import React, { useState } from 'react';
import axios from 'axios';
import { Navigate, Link } from 'react-router-dom';
import Cookies from 'js-cookie';

const AddFournisseur = () => {

    const [errors, setErrors] = useState({});

    const [pieces_jointes, setPiecesJointes] = useState(null);
    const [nom, setnom] = useState('');
    const [code_fournisseur, setcode_fournisseur] = useState('');
    const [raison_sociale, setraison_sociale] = useState('');
    const [adresse, setadresse] = useState('');
    const [type_fournisseur, settype_fournisseur] = useState('');
    const [categorie, setcategorie] = useState('');
    const [numero_telephone, setnumero_telephone] = useState('');
    const [email, setsetemail] = useState('');
    const [fournisseur_agree, setfournisseur_agree] = useState(false);
    const [periodicite_evaluation, setperiodicite_evaluation] = useState('');

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
                console.log('fournisseur créé avec succès:', response.data);
                setnom('');
                setcode_fournisseur('');
                setraison_sociale('');
                setadresse('');
                settype_fournisseur('');
                setcategorie('');
                setnumero_telephone('');
                setsetemail('');
                setperiodicite_evaluation('');


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
        <div className="form-container">
            <div className="form-card">
                <h3>Ajouter fournisseur</h3>
                <form onSubmit={handleSubmit} className="form">
                <div className="form-group">
                        <label>Code Fournisseur:</label>
                        {errors.code_fournisseur && <p className="error-text">{errors.code_fournisseur}</p>}
                        <input type="text" name="code_fournisseur" value={code_fournisseur} onChange={(e) => setcode_fournisseur(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Nom Fournisseur:</label>
                        {errors.nom && <p className="error-text">{errors.nom}</p>}
                        <input type="text" name="nom" value={nom} onChange={(e) => setnom(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Type Fournisseur:</label>
                        {errors.type_fournisseur && <p className="error-text">{errors.type_fournisseur}</p>}
                        <select value={type_fournisseur} onChange={(e) => settype_fournisseur(e.target.value)}>
                            <option value="">Sélectionner...</option>
                            <option value="Fournisseur de matière première">Fournisseur de matière première</option>
                            <option value="Fournisseur de composants">Fournisseur de composants</option>
                            <option value="Fournisseur de produits finis">Fournisseur de produits finis</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Catégorie Fournisseur:</label>
                        {errors.categorie && <p className="error-text">{errors.categorie}</p>}
                        <select value={categorie} onChange={(e) => setcategorie(e.target.value)}>
                            <option value="">Sélectionner...</option>
                            <option value="electronique">electronique</option>
                            <option value="textile">textile</option>
                            <option value="alimentation">alimentation</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>periodicite evaluation:</label>
                        {errors.periodicite_evaluation && <p className="error-text">{errors.periodicite_evaluation}</p>}
                        <select value={periodicite_evaluation} onChange={(e) => setperiodicite_evaluation(e.target.value)}>
                            <option value="">Sélectionner...</option>
                            <option value="annuelle">annuelle</option>
                            <option value="semestrielle">semestrielle</option>
                            <option value="trimestrielle">trimestrielle</option>
                        </select>
                    </div>
                    <div className="form-group">
                    <label>Email :</label>
                    {errors.email && <p className="error-text">{errors.email}</p>}
                    <input type="email" name="email" value={email} onChange={(e) => setsetemail(e.target.value)} />
                    
                   </div>
                   <div className="form-group">
                    <label>Mobile :</label>
                    {errors.numero_telephone && <p className="error-text">{errors.numero_telephone}</p>}
                    <input type="text" value={numero_telephone} onChange={(e) => setnumero_telephone(e.target.value)} />
                </div>
                    <div className="form-group">
                        <label>adresse:</label>
                        {errors.adresse && <p className="error-text">{errors.adresse}</p>}
                        <input type="text" name="adresse" value={adresse} onChange={(e) => setadresse(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>raison_sociale:</label>
                        {errors.raison_sociale && <p className="error-text">{errors.raison_sociale}</p>}
                        <input type="text" name="raison_sociale" value={raison_sociale} onChange={(e) => setraison_sociale(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Fournisseur agréé :</label>
                        <input type="checkbox" name="fournisseur_agree" checked={fournisseur_agree} onChange={e => setfournisseur_agree(e.target.checked)} />
                    </div>
                    <div className="form-group">
                        <label>Pièces jointes :</label>
                        <input type="file" onChange={handleFileChange} />
                    </div>
                    <div className="button-group">
                        <button className="btn btn-success mt-3" type="submit">ajouter fournisseur</button>
                        <Link to="/fournisseurs" className="btn btn-gray mt-3">Retour au tableau de bord</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddFournisseur;
