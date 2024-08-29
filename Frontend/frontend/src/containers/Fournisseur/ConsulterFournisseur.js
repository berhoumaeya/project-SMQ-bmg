/*import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useParams ,Link , Navigate} from 'react-router-dom';
import '../Client/client.css';


const Fournisseur = () => {
    const { id } = useParams();

    const [fournisseurs, setfournisseurs] = useState([]);
    const [error, setError] = useState(null);
    const [deleteReussi, setDeleteReussi] = useState(false);

    useEffect(() => {
        const fetchfournisseurs = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/fournisseur/Fournisseur/${id}/`, {
                    headers: {
                        'Accept': '*//*',
                    }
                });
                setfournisseurs(response.data);
            } catch (error) {
                console.error('Error fetching fournisseurs:', error);
                setError(error.message || 'Une erreur s\'est produite lors de la récupération des données.');
            }
        };

        fetchfournisseurs();
    }, [id]);

    const handleDelete = async (id) => {
        const headers = {
            'Accept': '*//*',
            /*'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken'),
        };
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/fournisseur/delete_Fournisseur/${id}/`, { headers: headers });
            setDeleteReussi(true);
        } catch (error) {
            console.error('Error deleting fournisseur:', error);
            setError(error.message || 'Une erreur s\'est produite lors de la suppression du fournisseur.');
        }
    };


    if (error) {
        return <div className="error-message">Erreur : {error}</div>;
    }

    if (deleteReussi) {
        return  <Navigate to="/fournisseurs" />
    }

    return (
        <div className="dashboard-doc-int">
            <div className="clients-container">
                {fournisseurs ? (
                    <div  className="document-card">
                        <div className="document-card-body">
                            <p className="document-card-text"><strong>nom Fournisseur:</strong> {fournisseurs.nom}</p>
                            <p className="document-card-text"><strong>Code Fournisseur:</strong> {fournisseurs.code_fournisseur}</p>
                            <p className="document-card-text"><strong>Raison sociale:</strong> {fournisseurs.raison_sociale}</p>
                            <p className="document-card-text"><strong>Adresse:</strong> {fournisseurs.adresse}</p>
                            <p className="document-card-text"><strong>Code Fournisseur:</strong> {fournisseurs.code_fournisseur}</p>
                            <p className="document-card-text"><strong>Numéro:</strong> {fournisseurs.numero_telephone}</p>
                            <p className="document-card-text"><strong>Email:</strong> {fournisseurs.email}</p>
                            <p className="document-card-text"><strong>Type Fournisseur:</strong> {fournisseurs.type_fournisseur}</p>
                            <p className="document-card-text"><strong>Categorie Fournisseur:</strong> {fournisseurs.categorie}</p>
                            <p className="document-card-text"><strong>Agréé:</strong> {fournisseurs.fournisseur_agree ? 'Oui' : 'Non'}</p>
                            <p className="document-card-text"><strong>Périodicité d'évaluation:</strong> {fournisseurs.periodicite_evaluation}</p>
                            <p className="document-card-text"><strong>Modifié par:</strong> {fournisseurs.updated_by}</p>
                            <p className="document-card-text"><strong>Modifié le :</strong> {fournisseurs.updated_at}</p>
                            <p className="document-card-text"><strong>Crée par:</strong> {fournisseurs.created_by}</p>
                            <p className="document-card-text"><strong>Crée à:</strong> {fournisseurs.created_at}</p>
                            <p><strong>Pièces jointes :</strong> {fournisseurs.pieces_jointes ? <a href={`${process.env.REACT_APP_API_URL}/fournisseur/pieces_jointes_fournisseur/${fournisseurs.id}/`} target="_blank" rel="noopener noreferrer">Consulter</a> : 'null'}</p>
                            <div className="document-card-buttons">
                                <Link to={`/modifierFournisseur/${fournisseurs.id}`} className="btn btn-primary">Modifier</Link>
                                <button onClick={() => handleDelete(fournisseurs.id)} className="btn btn-danger">Supprimer</button>
                            </div>
                        </div>
                    </div>
                ):(
                    <p>Chargement...</p>
                )}
            </div>
            <div className="dashboard-buttons">
                <Link to={`/AllReclamationFournisseur/${id}/`} className="btn btn-primary">Consulter réclamation</Link>
            </div>
            <div className="dashboard-buttons">
                <Link to={`/AllEvaluationFournisseur/${id}/`} className="btn btn-primary">Consulter Evaluation</Link>
            </div>
            <div className="dashboard-buttons">
                <Link to={`/fournisseurs/`} className="btn btn-secondary">Retour</Link>
            </div>
        </div>
    );
};

export default Fournisseur;*/
import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './consulterfou.css'; 
import { GrTrash } from 'react-icons/gr';
import { IoMdArrowRoundBack} from 'react-icons/io';
import { CiSaveDown2 } from "react-icons/ci";

const sampleFournisseur = {
    id: 1,
    nom: 'Fournisseur A',
    code_fournisseur: 'FA123',
    raison_sociale: 'Raison Sociale A',
    adresse: 'Adresse A',
    numero_telephone: '0123456789',
    email: 'fourniss@example.com',
    type_fournisseur: 'Type A',
    categorie: 'Catégorie A',
    fournisseur_agree: true,
    periodicite_evaluation: 'Annuel',
    updated_by: 'Admin',
    updated_at: '2024-07-28',
    created_by: 'Admin',
    created_at: '2024-01-15',
    pieces_jointes: true,
    historique: [
        { date: '2024-07-28', action: 'Modification des détails', utilisateur: 'Admin' },
        { date: '2024-06-15', action: 'Ajout de la pièce jointe', utilisateur: 'User2' },
        { date: '2024-05-20', action: 'Validation du fournisseur', utilisateur: 'Admin' },
        { date: '2024-01-15', action: 'Création du fournisseur', utilisateur: 'Admin' }
    ]
};

const Fournisseur = () => {
    const { id } = useParams();
    const [fournisseurData, setFournisseurData] = useState(sampleFournisseur);
    const [deleteReussi, setDeleteReussi] = useState(false);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFournisseurData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleDelete = () => {
        setDeleteReussi(true);
    };

    const validateForm = () => {
        const newErrors = {};
        if (!fournisseurData.nom) newErrors.nom = "Le nom est requis";
        if (!fournisseurData.code_fournisseur) newErrors.code_fournisseur = "Le code fournisseur est requis";
        if (!fournisseurData.email) newErrors.email = "L'email est requis";
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        console.log('Fournisseur data updated:', fournisseurData);
    };

    if (deleteReussi) {
        return <Navigate to="/fournisseurs" />;
    }

    return (
        <div className="container-fournisseur px-4 mt-4">
            <nav className="nav-fournisseur">
                <div className="nav-items-container">
                    <Link className="nav-item active ms-0" to="#">Profile</Link>
                    <Link className="nav-item" to={`/AllReclamationFournisseur/${fournisseurData.id}`}>Reclamations</Link>
                    <Link className="nav-item" to={`/AllEvaluationFournisseur/${fournisseurData.id}`}>Evaluations</Link>
                </div>
                <Link className="btn btn-return" to={`/fournisseurs`}><IoMdArrowRoundBack /> Retour</Link>
            </nav>
           
            <hr className="divider" />
            <div className="row">
                <div className="col-lg-4">
                    <div className="card-fournisseur mb-4">
                        <div className="card-header-fournisseur">Profile Picture</div>
                        <div className="card-body-fournisseur text-center">
                            <img className="img-fournisseur rounded-circle mb-2" src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="Fournisseur" />
                            <div className="small font-italic text-muted mb-4">JPG or PNG no larger than 5 MB</div>
                            <input className="form-control mb-2" type="file" accept="image/*" />
                        </div>
                    </div>


                    <div className="card-fournisseur mb-4">
                    <div className="commentaire-card-header">Historique</div>
                        <div className="card-body-fournisseur">
                            <ul className="list-group list-group-flush">
                                {fournisseurData.historique.map((entry, index) => (
                                    <li key={index} className="list-group-item ">
                                        <div>
                                            <strong>{entry.action}</strong><br />
                                            <small>{entry.date} - {entry.utilisateur}</small>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    </div>
                <div className="col-lg-8">
                    <div className="card-fournisseur mb-4">
                        <div className="card-header-fournisseur">Account Details</div>
                        <div className="card-body-fournisseur">
                            <form onSubmit={handleSubmit}>
                                <div className="row gx-3 mb-3">
                                    <div className="col-md-6">
                                        <label className="form-label-fournisseur mb-1" htmlFor="inputNom">Nom Fournisseur</label>
                                        <input
                                            className={`form-control-fournisseur ${errors.nom ? 'is-invalid' : ''}`}
                                            id="inputNom"
                                            name="nom"
                                            type="text"
                                            value={fournisseurData.nom}
                                            onChange={handleChange}
                                        />
                                        {errors.nom && <div className="invalid-feedback">{errors.nom}</div>}
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label-fournisseur mb-1" htmlFor="inputCodeFournisseur">Code Fournisseur</label>
                                        <input
                                            className={`form-control-fournisseur ${errors.code_fournisseur ? 'is-invalid' : ''}`}
                                            id="inputCodeFournisseur"
                                            name="code_fournisseur"
                                            type="text"
                                            value={fournisseurData.code_fournisseur}
                                            onChange={handleChange}
                                        />
                                        {errors.code_fournisseur && <div className="invalid-feedback">{errors.code_fournisseur}</div>}
                                    </div>
                                </div>
                                <div className="row gx-3 mb-3">
                                    <div className="col-md-6">
                                        <label className="form-label-fournisseur mb-1" htmlFor="inputRaisonSociale">Raison Sociale</label>
                                        <input
                                            className="form-control-fournisseur"
                                            id="inputRaisonSociale"
                                            name="raison_sociale"
                                            type="text"
                                            value={fournisseurData.raison_sociale}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label-fournisseur mb-1" htmlFor="inputAdresse">Adresse</label>
                                        <input
                                            className="form-control-fournisseur"
                                            id="inputAdresse"
                                            name="adresse"
                                            type="text"
                                            value={fournisseurData.adresse}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="row gx-3 mb-3">
                                    <div className="col-md-6">
                                        <label className="form-label-fournisseur mb-1" htmlFor="inputNumeroTelephone">Numéro</label>
                                        <input
                                            className="form-control-fournisseur"
                                            id="inputNumeroTelephone"
                                            name="numero_telephone"
                                            type="text"
                                            value={fournisseurData.numero_telephone}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label-fournisseur mb-1" htmlFor="inputEmail">Email</label>
                                        <input
                                            className={`form-control-fournisseur ${errors.email ? 'is-invalid' : ''}`}
                                            id="inputEmail"
                                            name="email"
                                            type="email"
                                            value={fournisseurData.email}
                                            onChange={handleChange}
                                        />
                                        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                                    </div>
                                </div>
                                <div className="row gx-3 mb-3">
                                    <div className="col-md-6">
                                        <label className="form-label-fournisseur mb-1" htmlFor="inputTypeFournisseur">Type Fournisseur</label>
                                        <input
                                            className="form-control-fournisseur"
                                            id="inputTypeFournisseur"
                                            name="type_fournisseur"
                                            type="text"
                                            value={fournisseurData.type_fournisseur}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label-fournisseur mb-1" htmlFor="inputCategorie">Catégorie</label>
                                        <input
                                            className="form-control-fournisseur"
                                            id="inputCategorie"
                                            name="categorie"
                                            type="text"
                                            value={fournisseurData.categorie}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="row gx-3 mb-3">
                                    <div className="col-md-6">
                                        <label className="form-label-fournisseur mb-1" htmlFor="inputUpdatedBy">Modifié par</label>
                                        <input
                                            className="form-control-fournisseur"
                                            id="inputUpdatedBy"
                                            name="updated_by"
                                            type="text"
                                            value={fournisseurData.updated_by}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label-fournisseur mb-1" htmlFor="inputUpdatedAt">Modifié le</label>
                                        <input
                                            className="form-control-fournisseur"
                                            id="inputUpdatedAt"
                                            name="updated_at"
                                            type="date"
                                            value={fournisseurData.updated_at}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="row gx-3 mb-3">
                                    <div className="col-md-6">
                                        <label className="form-label-fournisseur mb-1" htmlFor="inputCreatedBy">Créé par</label>
                                        <input
                                            className="form-control-fournisseur"
                                            id="inputCreatedBy"
                                            name="created_by"
                                            type="text"
                                            value={fournisseurData.created_by}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label-fournisseur mb-1" htmlFor="inputCreatedAt">Créé le</label>
                                        <input
                                            className="form-control-fournisseur"
                                            id="inputCreatedAt"
                                            name="created_at"
                                            type="date"
                                            value={fournisseurData.created_at}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                        <label className="form-label-fournisseur mb-1" htmlFor="inputPeriodiciteEvaluation">Périodicité d'évaluation</label>
                                        <input
                                            className="form-control-fournisseur"
                                            id="inputPeriodiciteEvaluation"
                                            name="periodicite_evaluation"
                                            type="text"
                                            value={fournisseurData.periodicite_evaluation}
                                            onChange={handleChange}
                                        />
                                    </div>
                                <div className="row gx-3 mb-3">
                                    <div className="col-md-6">
                                        <div className="form-check-fournisseur">
                                            <input
                                                className="form-check-input-fournisseur"
                                                id="inputFournisseurAgree"
                                                name="fournisseur_agree"
                                                type="checkbox"
                                                checked={fournisseurData.fournisseur_agree}
                                                onChange={() => setFournisseurData((prevData) => ({ ...prevData, fournisseur_agree: !prevData.fournisseur_agree }))}
                                            />
                                            <label className="form-check-label-fournisseur" htmlFor="inputFournisseurAgree">
                                                Fournisseur Agréé
                                            </label>
                                        </div>
                                    </div>
                                   
                                    <div className="form-group">
                                    <label>Pièces jointes :</label>
                                    <input
                                        type="file"
                                        onChange={handleChange}
                                        className="form-check-fournisseur"
                                    />
                                </div>

                                </div>
                                <div className="text-end">
                                    <button type="submit" className="btn btn-primary"><CiSaveDown2 /> Sauvgarder</button>
                                    <button type="button" className="btn btn-danger ms-2" onClick={handleDelete}><GrTrash /> Supprimer</button>

                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Fournisseur;
