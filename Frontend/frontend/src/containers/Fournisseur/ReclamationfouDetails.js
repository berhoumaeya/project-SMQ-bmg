import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { GrTrash } from 'react-icons/gr';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { CiSaveDown2 } from "react-icons/ci";
import './consulterfou.css';

// Sample reclamations data, replace this with real API call in production
const sampleReclamations = [
    {
        id: 1,
        numero_sequentiel: '12345',
        date_reclamation: '2024-08-13',
        description: 'Description de la réclamation.',
        designation: 'Désignation',
        type_reclamation: 'Type A',
        gravite: 'Élevée',
        actions: 'Actions effectuées',
        reclamation_client: 'Client X',
        created_by: 'Utilisateur Y',
        created_at: '2024-08-10',
        updated_by: 'Utilisateur Z',
        updated_at: '2024-08-12',
        pieces_jointes: true,
        historique: [
            { date: '2024-08-10', action: 'Création de la réclamation', utilisateur: 'Utilisateur Y' },
            { date: '2024-08-12', action: 'Modification de la réclamation', utilisateur: 'Utilisateur Z' },
            { date: '2024-06-15', action: 'Ajout de la pièce jointe', utilisateur: 'User2' },
        ]
    },
];

const ReclamationfouDetails = () => {
    const { id } = useParams();
    const [reclamation, setReclamation] = useState(null);

    useEffect(() => {
        const fetchedReclamation = sampleReclamations.find(r => r.id === parseInt(id));
        setReclamation(fetchedReclamation);
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setReclamation((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleDelete = () => {
        alert("Réclamation supprimée");
    };

    if (!reclamation) {
        return <p>Loading...</p>;
    }

    return (
        <div className="container-fournisseur px-4 mt-4">
            <nav className="nav-fournisseur">
                <div className="nav-items-container">
                    <Link className="nav-item active ms-0" to="#">Reclamation</Link>
                </div>
                <Link className="btn btn-return" to={`/AllReclamationFournisseur/:id`}><IoMdArrowRoundBack /> Retour</Link>
            </nav>

            <hr className="divider" />
            <div className="row">
                {/* Historique et Description à gauche */}
                <div className="col-lg-4">
                <div className="card-fournisseur mb-4">
                        <div className="card-header-fournisseur">Description</div>
                        <div className="card-body-fournisseur">
                            <div className="mb-3">
                                <textarea
                                    className="form-control-fournisseur"
                                    id="description"
                                    name="description"
                                    value={reclamation.description}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>
                    
                    <div className="card-fournisseur mb-4">
                    <div className="commentaire-card-header">Historique</div>
                        <div className="card-body-fournisseur">
                            <ul className="list-group list-group-flush">
                                {reclamation.historique.map((entry, index) => (
                                    <li key={index} className="list-group-item">
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

                {/* Détails de la Réclamation à droite */}
                <div className="col-lg-8">
                    <div className="card-fournisseur mb-4">
                        <div className="card-header-fournisseur">Détails de la Réclamation</div>
                        <div className="card-body-fournisseur">
                            <form>
                                <div className="row gx-3 mb-3">
                                    <label className="form-label-fournisseur mb-1" htmlFor="numero_sequentiel">N° Réclamation</label>
                                    <input
                                        className="form-control-fournisseur"
                                        id="numero_sequentiel"
                                        name="numero_sequentiel"
                                        type="text"
                                        value={reclamation.numero_sequentiel}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label-fournisseur" htmlFor="date_reclamation">Date</label>
                                    <input
                                        className="form-control-fournisseur"
                                        id="date_reclamation"
                                        name="date_reclamation"
                                        type="date"
                                        value={reclamation.date_reclamation}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label-fournisseur" htmlFor="designation">Désignation</label>
                                    <input
                                        className="form-control-fournisseur"
                                        id="designation"
                                        name="designation"
                                        type="text"
                                        value={reclamation.designation}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label-fournisseur" htmlFor="type_reclamation">Type</label>
                                    <input
                                        className="form-control-fournisseur"
                                        id="type_reclamation"
                                        name="type_reclamation"
                                        type="text"
                                        value={reclamation.type_reclamation}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label-fournisseur" htmlFor="gravite">Gravité</label>
                                    <input
                                        className="form-control-fournisseur"
                                        id="gravite"
                                        name="gravite"
                                        type="text"
                                        value={reclamation.gravite}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label-fournisseur" htmlFor="actions">Actions</label>
                                    <input
                                        className="form-control-fournisseur"
                                        id="actions"
                                        name="actions"
                                        type="text"
                                        value={reclamation.actions}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label-fournisseur" htmlFor="reclamation_client">Client</label>
                                    <input
                                        className="form-control-fournisseur"
                                        id="reclamation_client"
                                        name="reclamation_client"
                                        type="text"
                                        value={reclamation.reclamation_client}
                                        onChange={handleChange}
                                    />
                                </div>
                          
                                
                                <div className="mb-3">
                                    <label className="form-label-fournisseur" htmlFor="pieces_jointes">Pièces Jointes</label>
                                    <input
                                        className="form-control-fournisseur"
                                        id="pieces_jointes"
                                        name="pieces_jointes"
                                        type="checkbox"
                                        checked={reclamation.pieces_jointes}
                                        onChange={handleChange}
                                    />
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className="button-group-fournisseur">
                        <button className="btn btn-save"><CiSaveDown2 /> Enregistrer</button>
                        <button className="btn btn-delete" onClick={handleDelete}><GrTrash /> Supprimer</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReclamationfouDetails;
