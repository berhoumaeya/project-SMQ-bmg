

import React, { useState } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './consulterclient.css'; 
import { GrTrash } from 'react-icons/gr';
import { IoMdArrowRoundBack} from 'react-icons/io';
import { CiSaveDown2 } from "react-icons/ci";

const Client = () => {
    const { id } = useParams();
    const [clientData, setClientData] = useState({
        id: id,
        nom: 'aya',
        prenom: 'Sample',
        email: 'aya@example.com',
        code_client: '01',
        raison_sociale: 'de',
        activite: 'Commerce',
        type_client: 'Premium',
        categorie: 'A',
       
        pieces_jointes: true,
        image_url: "https://bootdey.com/img/Content/avatar/avatar1.png",
        historique: [
            { date: '2024-07-28', action: 'Modification des détails', utilisateur: 'Admin' },
            { date: '2024-06-15', action: 'Ajout de la pièce jointe', utilisateur: 'User2' },
            { date: '2024-05-20', action: 'Validation du fournisseur', utilisateur: 'Admin' },
            { date: '2024-01-15', action: 'Création du fournisseur', utilisateur: 'Admin' }
        ]
    });
    const [deleteReussi, setDeleteReussi] = useState(false);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setClientData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleDelete = () => {
        setDeleteReussi(true);
    };

    const validateForm = () => {
        const newErrors = {};
        if (!clientData.nom) newErrors.nom = "Le nom est requis";
        if (!clientData.prenom) newErrors.prenom = "Le prénom est requis";
        if (!clientData.email) newErrors.email = "L'email est requis";
        if (!clientData.code_client) newErrors.code_client = "Le code client est requis";
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        console.log('Client data updated:', clientData);
    };

    if (deleteReussi) {
        return <Navigate to="/Clients" />;
    }

    return (
        <div className="container-client px-4 mt-4">
            <nav className="nav-client">
                <div className="nav-items-container">
                <Link className="nav-item-client active ms-0" to="#">Profile</Link>
                <Link className="nav-item-client" to="/AllReclamations">Reclamations</Link>
                <Link className="nav-item-client" to="/AllSuggestion">Suggestion</Link>
                <Link className="nav-item-client" to="/AllEnquete">Enquete</Link>
                </div>
                <Link className="btn btn-return" to={`/Clients`}><IoMdArrowRoundBack /> Retour</Link>
            </nav>
            <hr className="divider-client" />
            <div className="row">
                <div className="col-xl-4">
                    <div className="card-client mb-4 mb-xl-0">
                        <div className="card-header-client">Profile Picture</div>
                        <div className="card-body-client text-center">
                            <img className="img-client rounded-circle mb-2" src={clientData.image_url} alt="Client" />
                            <div className="small font-italic text-muted mb-4">JPG or PNG no larger than 5 MB</div>
                            <input className="form-control-client mb-2" type="file" accept="image/*" />
                        </div>
                    </div>
                
                <div className="card-fournisseur mb-4">
                    <div className="commentaire-card-header">Historique</div>
                        <div className="card-body-fournisseur">
                            <ul className="list-group list-group-flush">
                                {clientData.historique.map((entry, index) => (
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
                <div className="col-xl-8">
                    <div className="card-client mb-4">
                        <div className="card-header-client">Account Details</div>
                        <div className="card-body-client">
                            <form onSubmit={handleSubmit}>
                                <div className="row gx-3 mb-3">
                                    <div className="col-md-6">
                                        <label className="form-label-client mb-1" htmlFor="inputNom">Nom Client</label>
                                        <input
                                            className={`form-control-client ${errors.nom ? 'is-invalid' : ''}`}
                                            id="inputNom"
                                            name="nom"
                                            type="text"
                                            value={clientData.nom}
                                            onChange={handleChange}
                                        />
                                        {errors.nom && <div className="invalid-feedback">{errors.nom}</div>}
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label-client mb-1" htmlFor="inputPrenom">Prénom Client</label>
                                        <input
                                            className={`form-control-client ${errors.prenom ? 'is-invalid' : ''}`}
                                            id="inputPrenom"
                                            name="prenom"
                                            type="text"
                                            value={clientData.prenom}
                                            onChange={handleChange}
                                        />
                                        {errors.prenom && <div className="invalid-feedback">{errors.prenom}</div>}
                                    </div>
                                </div>
                                <div className="row gx-3 mb-3">
                                    <div className="col-md-6">
                                        <label className="form-label-client mb-1" htmlFor="inputEmail">Email</label>
                                        <input
                                            className={`form-control-client ${errors.email ? 'is-invalid' : ''}`}
                                            id="inputEmail"
                                            name="email"
                                            type="email"
                                            value={clientData.email}
                                            onChange={handleChange}
                                        />
                                        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label-client mb-1" htmlFor="inputCodeClient">Code Client</label>
                                        <input
                                            className={`form-control-client ${errors.code_client ? 'is-invalid' : ''}`}
                                            id="inputCodeClient"
                                            name="code_client"
                                            type="text"
                                            value={clientData.code_client}
                                            onChange={handleChange}
                                        />
                                        {errors.code_client && <div className="invalid-feedback">{errors.code_client}</div>}
                                    </div>
                                </div>
                                <div className="row gx-3 mb-3">
                                    <div className="col-md-6">
                                        <label className="form-label-client mb-1" htmlFor="inputRaisonSociale">Raison Sociale</label>
                                        <input
                                            className="form-control-client"
                                            id="inputRaisonSociale"
                                            name="raison_sociale"
                                            type="text"
                                            value={clientData.raison_sociale}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label-client mb-1" htmlFor="inputActivite">Activité</label>
                                        <input
                                            className="form-control-client"
                                            id="inputActivite"
                                            name="activite"
                                            type="text"
                                            value={clientData.activite}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="row gx-3 mb-3">
                                    <div className="col-md-6">
                                        <label className="form-label-client mb-1" htmlFor="inputTypeClient">Type Client</label>
                                        <input
                                            className="form-control-client"
                                            id="inputTypeClient"
                                            name="type_client"
                                            type="text"
                                            value={clientData.type_client}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label-client mb-1" htmlFor="inputCategorie">Catégorie</label>
                                        <input
                                            className="form-control-client"
                                            id="inputCategorie"
                                            name="categorie"
                                            type="text"
                                            value={clientData.categorie}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="row gx-3 mb-3">
                                    <div className="col-md-6">
                                        <label className="form-label-client mb-1" htmlFor="inputUpdatedBy">Modifié par</label>
                                        <input
                                            className="form-control-client"
                                            id="inputUpdatedBy"
                                            name="updated_by"
                                            type="text"
                                            value={clientData.updated_by}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label-client mb-1" htmlFor="inputUpdatedAt">Modifié le</label>
                                        <input
                                            className="form-control-client"
                                            id="inputUpdatedAt"
                                            name="updated_at"
                                            type="date"
                                            value={clientData.updated_at}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="row gx-3 mb-3">
                                    <div className="col-md-6">
                                        <label className="form-label-client mb-1" htmlFor="inputCreatedBy">Créé par</label>
                                        <input
                                            className="form-control-client"
                                            id="inputCreatedBy"
                                            name="created_by"
                                            type="text"
                                            value={clientData.created_by}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label-client mb-1" htmlFor="inputCreatedAt">Créé le</label>
                                        <input
                                            className="form-control-client"
                                            id="inputCreatedAt"
                                            name="created_at"
                                            type="date"
                                            value={clientData.created_at}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <div className="form-check">
                                        <input
                                            className="form-check-input-client"
                                            id="inputPiecesJointes"
                                            name="pieces_jointes"
                                            type="checkbox"
                                            checked={clientData.pieces_jointes}
                                            onChange={(e) => setClientData({ ...clientData, pieces_jointes: e.target.checked })}
                                        />
                                        <label className="form-check-label-client" htmlFor="inputPiecesJointes">Pièces jointes</label>
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

export default Client;
