import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { GrTrash } from 'react-icons/gr';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { CiSaveDown2 } from "react-icons/ci";
import './client.css';

const DetailsEnquete = () => {
    const { id } = useParams();

    const [enquete, setEnquete] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate fetching data from an API
        const fetchEnqueteDetails = () => {
            // Replace with actual API call
            const data = [
                {
                    id: 1,
                    name_enquete: 'Enquête 1',
                    date_debut: '2023-01-01',
                    date_fin: '2023-01-10',
                    type_questionnaire: 'Type 1',
                    clients: ['Client A', 'Client B'],
                    pieces_jointes: true,
                    created_at: '2023-01-01',
                    created_by: 'User 1',
                    updated_at: '2023-01-05',
                    updated_by: 'User 2',
                },
                {
                    id: 2,
                    name_enquete: 'Enquête 2',
                    date_debut: '2023-02-01',
                    date_fin: '2023-02-10',
                    type_questionnaire: 'Type 2',
                    clients: ['Client C', 'Client D'],
                    pieces_jointes: false,
                    created_at: '2023-02-01',
                    created_by: 'User 3',
                    updated_at: null,
                    updated_by: null,
                },
            ];

            const enqueteDetails = data.find(item => item.id === parseInt(id, 10));
            setEnquete(enqueteDetails);
            setLoading(false);
        };

        fetchEnqueteDetails();
    }, [id]);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setEnquete(prevState => ({
            ...prevState,
            [id]: id === 'pieces_jointes' ? value === 'Oui' : value
        }));
    };

    const handleSave = (e) => {
        e.preventDefault();
        // Logic to handle save, e.g., making a request to the server
        console.log('Saving enquête:', enquete);
        // Redirect to the list of enquêtes or show a success message
    };

    const handleDelete = () => {
        // Logic to handle delete, e.g., making a request to the server
        console.log('Deleting enquête with id:', id);
        // Redirect to the list of enquêtes or show a success message
    };

    if (loading) {
        return <div>Chargement...</div>;
    }

    if (!enquete) {
        return <div>Enquête non trouvée</div>;
    }

    return (
        <div className="container-client px-4 mt-4">
            <nav className="nav-client">
                <Link className="nav-item-client active ms-0" to="#">Détails de l'Enquête</Link>
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
                        <div className="card-header-client">Détails de l'Enquête</div>
                        <div className="card-body-client">
                            <form onSubmit={handleSave}>
                                <div className="row gx-3 mb-3">
                                    <div className="col-md-6">
                                        <label className="form-label-client mb-1" htmlFor="name_enquete">Nom Enquête</label>
                                        <input
                                            className="form-control-client"
                                            id="name_enquete"
                                            type="text"
                                            value={enquete.name_enquete || ''}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label-client mb-1" htmlFor="date_debut">Date Début</label>
                                        <input
                                            className="form-control-client"
                                            id="date_debut"
                                            type="text"
                                            value={enquete.date_debut || ''}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                                <div className="row gx-3 mb-3">
                                    <div className="col-md-6">
                                        <label className="form-label-client mb-1" htmlFor="date_fin">Date Fin</label>
                                        <input
                                            className="form-control-client"
                                            id="date_fin"
                                            type="text"
                                            value={enquete.date_fin || ''}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label-client mb-1" htmlFor="type_questionnaire">Type Questionnaire</label>
                                        <input
                                            className="form-control-client"
                                            id="type_questionnaire"
                                            type="text"
                                            value={enquete.type_questionnaire || ''}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                                <div className="row gx-3 mb-3">
                                    <div className="col-md-6">
                                        <label className="form-label-client mb-1" htmlFor="clients">Clients</label>
                                        <input
                                            className="form-control-client"
                                            id="clients"
                                            type="text"
                                            value={enquete.clients.join(', ') || ''}
                                            onChange={e => handleInputChange({ target: { id: 'clients', value: e.target.value.split(',').map(client => client.trim()) } })}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label-client mb-1" htmlFor="pieces_jointes">Pièces Jointes</label>
                                        <input
                                            className="form-control-client"
                                            id="pieces_jointes"
                                            type="text"
                                            value={enquete.pieces_jointes ? 'Oui' : 'Non'}
                                            onChange={e => handleInputChange({ target: { id: 'pieces_jointes', value: e.target.value } })}
                                        />
                                    </div>
                                </div>
                                <div className="row gx-3 mb-3">
                                    <div className="col-md-6">
                                        <label className="form-label-client mb-1" htmlFor="created_at">Créé le</label>
                                        <input
                                            className="form-control-client"
                                            id="created_at"
                                            type="date"
                                            value={enquete.created_at || ''}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label-client mb-1" htmlFor="created_by">Créé par</label>
                                        <input
                                            className="form-control-client"
                                            id="created_by"
                                            type="text"
                                            value={enquete.created_by || ''}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label-client mb-1" htmlFor="updated_at">Mis à jour le</label>
                                        <input
                                            className="form-control-client"
                                            id="updated_at"
                                            type="date"
                                            value={enquete.updated_at || ''}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label-client mb-1" htmlFor="updated_by">Mis à jour par</label>
                                        <input
                                            className="form-control-client"
                                            id="updated_by"
                                            type="text"
                                            value={enquete.updated_by || ''}
                                            onChange={handleInputChange}
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
                                    <Link to="/AllEnquete" className="btn btn-secondary ms-2">
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

export default DetailsEnquete;
