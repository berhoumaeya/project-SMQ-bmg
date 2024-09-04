import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './consulterclient.css'; // Ensure consistent styling
import { GrTrash } from 'react-icons/gr';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { CiSaveDown2 } from "react-icons/ci";

const SuggestionDetails = () => {
    const { id } = useParams();

    const initialSuggestion = [
        {
            id: 1,
            name: 'Suggestion A',
            date: '2024-08-10',
            type_suggestion: 'Type 1',
            receptionnaire: 'John Doe',
            description: 'Description de la suggestion A',
            actions: 'Action A',
            pieces_jointes: true,
            created_at: '2024-08-10',
            created_by: 'Admin',
            updated_at: '2024-08-11',
            updated_by: 'Admin',
            historique: [
                { action: 'Création', date: '2024-07-30', utilisateur: 'Marie Curie' },
                { action: 'Mise à jour', date: '2024-08-02', utilisateur: 'Paul Martin' }
            ]
        },
        {
            id: 2,
            name: 'Suggestion B',
            date: '2024-08-11',
            type_suggestion: 'Type 2',
            receptionnaire: 'Jane Doe',
            description: 'Description de la suggestion B',
            actions: 'Action B',
            pieces_jointes: false,
            created_at: '2024-08-11',
            created_by: 'Admin',
            updated_at: '2024-08-12',
            updated_by: 'Admin',
            historique: [
                { action: 'Création', date: '2024-07-30', utilisateur: 'Marie Curie' },
                { action: 'Mise à jour', date: '2024-08-02', utilisateur: 'Paul Martin' }
            ]
        },
    ];

    const [suggestion, setSuggestion] = useState(initialSuggestion.find(suggestion => suggestion.id === parseInt(id)) || {});

    if (!suggestion) {
        return <p>Suggestion not found</p>;
    }

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setSuggestion(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    // Handle save action
    const handleSave = (e) => {
        e.preventDefault();
        // Logic to handle save, e.g., making a request to the server
        console.log('Saving suggestion:', suggestion);
        // Redirect to the list of suggestions or show a success message
    };

    // Handle delete action
    const handleDelete = () => {
        // Logic to handle deletion, e.g., making a request to the server
        console.log('Deleting suggestion with ID:', suggestion.id);
        // Redirect to the list of suggestions or show a success message
    };

    return (
        <div className="container-client px-4 mt-4">
            <nav className="nav-client">
                <div className="nav-items-container">
                    <Link className="nav-item-client active ms-0" to="#">suggestion</Link>
                </div>
                <Link className="btn btn-return" to={`/AllSuggestion`}><IoMdArrowRoundBack /> Retour</Link>
            </nav>
            
            <hr className="divider-client" />
            <div className="row">
                <div className="col-xl-4">
                    <div className="card-client mb-4">
                        <div className="card-header-client">Commentaire</div>
                        <div className="card-body-client text-center">
                            <div className="mb-3">
                                <input
                                    className="form-control-fournisseur"
                                    id="description"
                                    name="description"
                                    placeholder='Ecrire votre commentaire '
                                  
                                />
                            </div>
                        </div>
                    </div>
                    <div className="card-client mb-4">
                        <div className="commentaire-card-header">Historique</div>
                        <div className="card-body-fournisseur">
                            <ul className="list-group list-group-flush">
                                {(suggestion.historique || []).map((entry, index) => (
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
                <div className="col-xl-8">
                    <div className="card-client mb-4">
                        <div className="card-header-client">Suggestion Details</div>
                        <div className="card-body-client">
                            <form onSubmit={handleSave}>
                                <div className="row gx-3 mb-3">
                                    <div className="col-md-6">
                                        <label className="form-label-client mb-1" htmlFor="inputName">Nom</label>
                                        <input
                                            className="form-control-client"
                                            id="name"
                                            type="text"
                                            value={suggestion.name || ''}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label-client mb-1" htmlFor="inputDate">Date</label>
                                        <input
                                            className="form-control-client"
                                            id="date"
                                            type="text"
                                            value={suggestion.date || ''}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                                <div className="row gx-3 mb-3">
                                    <div className="col-md-6">
                                        <label className="form-label-client mb-1" htmlFor="inputType">Type Suggestion</label>
                                        <input
                                            className="form-control-client"
                                            id="type_suggestion"
                                            type="text"
                                            value={suggestion.type_suggestion || ''}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label-client mb-1" htmlFor="inputReceptionnaire">Réceptionnaire</label>
                                        <input
                                            className="form-control-client"
                                            id="receptionnaire"
                                            type="text"
                                            value={suggestion.receptionnaire || ''}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                                <div className="row gx-3 mb-3">
                                    <div className="col-md-12">
                                        <label className="form-label-client mb-1" htmlFor="inputDescription">Description</label>
                                        <textarea
                                            className="form-control-client"
                                            id="description"
                                            rows="3"
                                            value={suggestion.description || ''}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                                <div className="row gx-3 mb-3">
                                    <div className="col-md-6">
                                        <label className="form-label-client mb-1" htmlFor="inputActions">Actions</label>
                                        <input
                                            className="form-control-client"
                                            id="actions"
                                            type="text"
                                            value={suggestion.actions || ''}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label-client mb-1" htmlFor="inputPiecesJointes">Pièces Jointes</label>
                                        <input
                                            className="form-control-client"
                                            id="pieces_jointes"
                                            type="text"
                                            value={suggestion.pieces_jointes ? 'Oui' : 'Non'}
                                            onChange={e => handleInputChange({ target: { id: 'pieces_jointes', value: e.target.value === 'Oui' } })}
                                        />
                                    </div>
                                </div>
                             
                              
                                <div className="text-end">
                                    <button type="submit" className="btn btn-primary"><CiSaveDown2 /> Sauvegarder</button>
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

export default SuggestionDetails;
