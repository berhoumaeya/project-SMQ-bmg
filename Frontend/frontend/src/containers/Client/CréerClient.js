import React, { useState } from 'react';
import axios from 'axios';
import { Navigate, Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import './forms.css';

const AddClient = () => {
    const [errors, setErrors] = useState({});
    const [pieces_jointes, setPiecesJointes] = useState(null);
    const [nom, setNom] = useState('');
    const [code_client, setCodeClient] = useState('');
    const [raison_sociale, setRaisonSociale] = useState('');
    const [activite, setActivite] = useState('');
    const [type_client, setTypeClient] = useState('');
    const [categorie, setCategorie] = useState('');
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
                setNom('');
                setCodeClient('');
                setRaisonSociale('');
                setActivite('');
                setTypeClient('');
                setCategorie('');
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
        <main style={{ backgroundColor: '#eeeeee', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div className="container ajout-form">
                <div className="contact-image">
                    <img src="/images/add.png" alt="add_client" />
                    <div className="button-container">
                        <Link to="/Clients">
                            <button className="retour">Retour à la liste des clients</button>
                        </Link>
                        <button className="button-add" type="submit" form="add-client-form">Ajouter un client</button>
                    </div>
                </div>
                <form id="add-client-form" onSubmit={handleSubmit} className="row">
                    <div className="col-md-6">
                        <div className="form-label">
                            <label className="form-label">Nom Client:</label>
                            <input type="text" className="form-control" placeholder='Nom*' value={nom} onChange={(e) => setNom(e.target.value)} />
                            {errors.nom && <p className="error-text">{errors.nom}</p>}
                        </div>
                        <div className="form-label">
                            <label className="form-label">Code Client:</label>
                            <input type="text" className="form-control" placeholder='Code Client*' value={code_client} onChange={(e) => setCodeClient(e.target.value)} />
                            {errors.code_client && <p className="error-text">{errors.code_client}</p>}
                        </div>
                        <div className="form-label">
                            <label className="form-label">Raison Sociale:</label>
                            <input type="text" className="form-control" placeholder='Raison Sociale' value={raison_sociale} onChange={(e) => setRaisonSociale(e.target.value)} />
                            {errors.raison_sociale && <p className="error-text">{errors.raison_sociale}</p>}
                        </div>
                        <div className="form-label">
                            <label className="form-label">Activité:</label>
                            <input type="text" className="form-control" placeholder='Activité' value={activite} onChange={(e) => setActivite(e.target.value)} />
                            {errors.activite && <p className="error-text">{errors.activite}</p>}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-label">
                            <label className="form-label">Type Client:</label>
                            <select className="form-control" value={type_client} onChange={(e) => setTypeClient(e.target.value)}>
                                <option value="">Sélectionner...</option>
                                <option value="Nouveau">Nouveau</option>
                                <option value="Récurrent">Récurrent</option>
                                <option value="Potentiel">Potentiel</option>
                                <option value="Ancien">Ancien</option>
                            </select>
                            {errors.type_client && <p className="error-text">{errors.type_client}</p>}
                        </div>
                        <div className="form-label">
                            <label className="form-label">Catégorie Client:</label>
                            <select className="form-control" value={categorie} onChange={(e) => setCategorie(e.target.value)}>
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
                            {errors.categorie && <p className="error-text">{errors.categorie}</p>}
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

export default AddClient;
