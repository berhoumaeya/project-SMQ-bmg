import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './client.css';


const DetailEnquete = () => {
    const { id } = useParams();
    const [enquete, setEnquete] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEnquete = async () => {
         
            const data = [
                {
                    id: 1,
                    name_enquete: 'Enquête 1',
                    date_debut: '2023-01-01',
                    date_fin: '2023-01-10',
                    type_questionnaire: 'Type 1',
                    clients: ['Client A', 'Client B'],
                    pieces_jointes: true,
                    created_at: '2023-01-01T12:00:00Z',
                    created_by: 'User 1',
                    updated_at: '2023-01-05T12:00:00Z',
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
                    created_at: '2023-02-01T12:00:00Z',
                    created_by: 'User 3',
                    updated_at: null,
                    updated_by: null,
                },
            ];

            const selectedEnquete = data.find(enq => enq.id === parseInt(id));
            setEnquete(selectedEnquete);
            setLoading(false);
        };

        fetchEnquete();
    }, [id]);

    if (loading) {
        return <div>Chargement...</div>;
    }

    if (!enquete) {
        return <div>Aucune enquête trouvée</div>;
    }

    return (
        <main style={{ backgroundColor: '#f3f4f6', minHeight: '100vh', display: 'flex', justifyContent: 'center' }}>
            <div className="client-dashboard">
                <div className="row">
                    <div>
                        <br />
                        <br />
                        <div className="client-profile-container">
                            <h3 className='client-formation-title'>Détails de l'Enquête</h3>
                            <div className="client-button-container">
                                <Link to={`/ModifierReclamation/${enquete.id}`}>
                                    <button className="client-button-add">Modifier Enquête</button>
                                </Link>
                                <Link to="/AllEnquetes">
                                    <button className="client-retour">Retour</button>
                                </Link>
                            </div>
                            <div className="client-detail-section">
                                <p><strong>Nom Enquête :</strong> {enquete.name_enquete}</p>
                                <p><strong>Date Début :</strong> {enquete.date_debut}</p>
                                <p><strong>Date Fin :</strong> {enquete.date_fin}</p>
                                <p><strong>Type Questionnaire :</strong> {enquete.type_questionnaire}</p>
                                <p><strong>Clients :</strong> {enquete.clients.join(', ')}</p>
                                <p><strong>Pièces Jointes :</strong> {enquete.pieces_jointes ? 'Oui' : 'Non'}</p>
                                <p><strong>Créé le :</strong> {new Date(enquete.created_at).toLocaleString()}</p>
                                <p><strong>Créé par :</strong> {enquete.created_by}</p>
                                {enquete.updated_at && (
                                    <>
                                        <p><strong>Mis à jour le :</strong> {new Date(enquete.updated_at).toLocaleString()}</p>
                                        <p><strong>Mis à jour par :</strong> {enquete.updated_by}</p>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default DetailEnquete;
