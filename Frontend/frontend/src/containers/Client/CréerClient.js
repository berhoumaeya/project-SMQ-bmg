import React, { useState } from 'react';
import axios from 'axios';
import { Navigate, Link } from 'react-router-dom';
import Cookies from 'js-cookie';

const AddClient = () => {

    const [errors, setErrors] = useState({});

    const [pieces_jointes, setPiecesJointes] = useState(null);
    const [nom, setnom] = useState('');
    const [code_client, setcode_client] = useState('');
    const [raison_sociale, setraison_sociale] = useState('');
    const [activite, setactivite] = useState('');
    const [type_client, settype_client] = useState('');
    const [categorie, setcategorie] = useState('');

    const [ajoutReussi, setAjoutReussi] = useState(false);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setPiecesJointes(selectedFile);
    };


    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('nom', nom);
        formData.append('code_client', code_client);
        formData.append('raison_sociale', raison_sociale);
        formData.append('activite', activite);
        formData.append('type_client', type_client);
        formData.append('categorie', categorie);
        if (pieces_jointes) {
            formData.append('pieces_jointes', pieces_jointes);
        }

        const headers = {
            'Accept': '*/*',
            'Content-Type': 'multipart/form-data',
            'X-CSRFToken': Cookies.get('csrftoken')
        };

        axios.post(`${process.env.REACT_APP_API_URL}/CRM/create_client/`, formData, { headers })
            .then(response => {
                console.log('Client créé avec succès:', response.data);
                setnom('');
                setcode_client('');
                setraison_sociale('');
                setactivite('');
                settype_client('');
                setcategorie('');

                setAjoutReussi(true);
            })
            .catch(error => {
                console.error('Error creating client:', error);
                setErrors(error.response?.data || { message: 'Une erreur s\'est produite lors de la création du document.' });
            });
    };

    if (ajoutReussi) {
        return <Navigate to="/Clients" />;
    }

    return (
        <div className="form-container">
            <div className="form-card">
                <h3>Ajouter Client</h3>
                <form onSubmit={handleSubmit} className="form">
                <div className="form-group">
                        <label>Code client:</label>
                        {errors.code_client && <p className="error-text">{errors.code_client}</p>}
                        <input type="text" name="code_client" value={code_client} onChange={(e) => setcode_client(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Nom client:</label>
                        {errors.nom && <p className="error-text">{errors.nom}</p>}
                        <input type="text" name="nom" value={nom} onChange={(e) => setnom(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Type client:</label>
                        {errors.type_client && <p className="error-text">{errors.type_client}</p>}
                        <select value={type_client} onChange={(e) => settype_client(e.target.value)}>
                            <option value="">Sélectionner...</option>
                            <option value="Nouveau">Nouveau</option>
                            <option value="Récurrent">Récurrent</option>
                            <option value="Potentiel">Potentiel</option>
                            <option value="Ancien">Ancien</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Catégorie Client:</label>
                        {errors.categorie && <p className="error-text">{errors.categorie}</p>}
                        <select value={categorie} onChange={(e) => setcategorie(e.target.value)}>
                            <option value="">Sélectionner...</option>
                            <option value="Premium">Premium</option>
                            <option value="Standard">Standard</option>
                            <option value="Basique">Basique</option>
                            <option value="VIP">VIP</option>
                            <option value="Or">Or</option>
                            <option value="Argent">Argent</option>
                            <option value="Bronze">Bronze</option>
                            <option value="Entreprise">Entreprise</option>
                            <option value="Individuel">Individuel</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>activite:</label>
                        {errors.activite && <p className="error-text">{errors.activite}</p>}
                        <input type="text" name="activite" value={activite} onChange={(e) => setactivite(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>raison_sociale:</label>
                        {errors.raison_sociale && <p className="error-text">{errors.raison_sociale}</p>}
                        <input type="text" name="raison_sociale" value={raison_sociale} onChange={(e) => setraison_sociale(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Pièces jointes :</label>
                        <input type="file" onChange={handleFileChange} />
                    </div>
                    <div className="button-group">
                        <button className="btn btn-success mt-3" type="submit">ajouter client</button>
                        <Link to="/clients" className="btn btn-gray mt-3">Retour au tableau de bord</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddClient;
