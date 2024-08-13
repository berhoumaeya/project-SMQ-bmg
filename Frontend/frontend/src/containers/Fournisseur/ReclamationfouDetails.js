import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import './fournisseur.css'; 

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
    },
    // Add more static data as needed
];

const ReclamationfouDetails = () => {
    const { id } = useParams();
    const [reclamation, setReclamation] = useState(null);

    useEffect(() => {
        // Simulate fetching data from an API
        const fetchedReclamation = sampleReclamations.find(r => r.id === parseInt(id));
        setReclamation(fetchedReclamation);
    }, [id]);

    if (!reclamation) {
        return <p>Loading...</p>;
    }

    return (
        <main style={{ backgroundColor: '#f3f4f6', minHeight: '100vh', padding: '20px' }}>
            <div className="container">
                <Link to="/AllReclamations">
                    <button className="fournisseur-retour">
                        <FaArrowLeft /> Retour
                    </button>
                </Link>
                <h3>Détails de la Réclamation</h3>
                <div className="fournisseur-details">
                    <p><strong>N° Réclamation :</strong> {reclamation.numero_sequentiel}</p>
                    <p><strong>Date :</strong> {reclamation.date_reclamation}</p>
                    <p><strong>Description :</strong> {reclamation.description}</p>
                    <p><strong>Désignation :</strong> {reclamation.designation}</p>
                    <p><strong>Type :</strong> {reclamation.type_reclamation}</p>
                    <p><strong>Gravité :</strong> {reclamation.gravite}</p>
                    <p><strong>Actions :</strong> {reclamation.actions}</p>
                    <p><strong>Client :</strong> {reclamation.reclamation_client}</p>
                    <p><strong>Créé par :</strong> {reclamation.created_by}</p>
                    <p><strong>Créé à :</strong> {reclamation.created_at}</p>
                    <p><strong>Modifié par :</strong> {reclamation.updated_by}</p>
                    <p><strong>Modifié à :</strong> {reclamation.updated_at}</p>
                    <p><strong>Pièces jointes :</strong> {reclamation.pieces_jointes ? <a href="#" target="_blank" rel="noopener noreferrer">Consulter</a> : 'Aucune'}</p>
                </div>
            </div>
        </main>
    );
};

export default ReclamationfouDetails;
