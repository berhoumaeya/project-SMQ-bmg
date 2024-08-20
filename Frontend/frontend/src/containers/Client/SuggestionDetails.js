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
                <Link className="nav-item-client active ms-0" to="#">Modifier Suggestion</Link>
            </nav>
            
            <hr className="divider-client" />
            <div className="row">
                <div className="col-xl-4">
                    <div className="card-client mb-4 mb-xl-0">
                        <div className="card-header-client">Profile Picture</div>
                        <div className="card-body-client text-center">
                            <img className="img-client rounded-circle mb-2" src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="Profile" />
       
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
                                <div className="row gx-3 mb-3">
                                    <div className="col-md-6">
                                        <label className="form-label-client mb-1" htmlFor="inputCreatedAt">Créé le</label>
                                        <input
                                            className="form-control-client"
                                            id="created_at"
                                            type="text"
                                            value={`${suggestion.created_at} par ${suggestion.created_by}`}
                                            readOnly
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label-client mb-1" htmlFor="inputUpdatedAt">Mis à jour le</label>
                                        <input
                                            className="form-control-client"
                                            id="updated_at"
                                            type="text"
                                            value={`${suggestion.updated_at} par ${suggestion.updated_by}`}
                                            readOnly
                                        />
                                    </div>
                                </div>
                                <div className="d-flex justify-content-end mt-4">
                                    <button className="btn-save-fournisseur" type="submit">
                                        <CiSaveDown2 /> Save
                                    </button>
                                    <button className="btn-delete-fournisseur ms-2" type="button" onClick={handleDelete}>
                                        <GrTrash /> Delete
                                    </button>
                                    <Link to="/AllSuggestion" className="btn btn-secondary ms-2">
                                        <IoMdArrowRoundBack /> Retour
                                    </Link>
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
