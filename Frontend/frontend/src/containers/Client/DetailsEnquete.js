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
                    historique: [
                        { action: 'Création', date: '2024-07-30', utilisateur: 'Marie Curie' },
                        { action: 'Mise à jour', date: '2024-08-02', utilisateur: 'Paul Martin' }
                    ]
                },
                {
                    id: 2,
                    name_enquete: 'Enquête 2',
                    date_debut: '2023-02-01',
                    date_fin: '2023-02-10',
                    type_questionnaire: 'Type 2',
                    clients: ['Client C', 'Client D'],
                    pieces_jointes: false,
                    
                   
                    historique: [
                        { action: 'Création', date: '2024-07-30', utilisateur: 'Marie Curie' },
                        { action: 'Mise à jour', date: '2024-08-02', utilisateur: 'Paul Martin' }
                    ]
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
                <div className="nav-items-container">
                    <Link className="nav-item-client active ms-0" to="#">enquete</Link>
                </div>
                <Link className="nav-item-client" to={`/AllEnquete`}><IoMdArrowRoundBack /> Retour</Link>
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
                                {(enquete.historique || []).map((entry, index) => (
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

export default DetailsEnquete;
