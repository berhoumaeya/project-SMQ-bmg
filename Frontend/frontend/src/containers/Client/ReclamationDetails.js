import React from 'react';
import { Link } from 'react-router-dom';


const staticReclamation = {
    code: 'RCL123',
    description: 'Description de la réclamation',
    type_reclamation: 'Type A',
    date_livraison: '2024-08-01',
    gravite: 'Haute',
    responsable_traitement: 'Jean Dupont',
    decisions: 'Décision prise',
    created_at: '2024-07-30',
    created_by: 'Marie Curie',
    updated_at: '2024-08-02',
    updated_by: 'Paul Martin',
    reclamation_fournisseur: true,
    plan_action: false,
    fichier_pdf: true,
    declencher_plan_action: true,
    date_detection: '2024-07-29',
    designation_produit_non_conforme: 'Produit XYZ',
    description_non_conformite: 'Non-conformité détectée',
    produits_non_conformes: 'Produit 1, Produit 2',
    type_non_conformite: 'Type B',
    source_non_conformite: 'Source C',
    niveau_gravite: 'Élevé',
    pieces_jointes: true,
    personnes_a_notifier: 'Alice, Bob'
};

const ReclamationDetails = () => {
    return (
        <div className="reclamation-details">
            <div className="details-header">
                <h3>Détails de la Réclamation</h3>
            </div>
            <div className="details-container">
                <p><strong>Code Réclamation:</strong> {staticReclamation.code}</p>
                <p><strong>Description:</strong> {staticReclamation.description}</p>
                <p><strong>Type Réclamation:</strong> {staticReclamation.type_reclamation}</p>
                <p><strong>Date Livraison:</strong> {staticReclamation.date_livraison}</p>
                <p><strong>Gravité:</strong> {staticReclamation.gravite}</p>
                <p><strong>Responsable Traitement:</strong> {staticReclamation.responsable_traitement}</p>
                <p><strong>Décisions:</strong> {staticReclamation.decisions}</p>
                <p><strong>Créé à:</strong> {staticReclamation.created_at}</p>
                <p><strong>Créé par:</strong> {staticReclamation.created_by}</p>
                <p><strong>Modifié à:</strong> {staticReclamation.updated_at}</p>
                <p><strong>Modifié par:</strong> {staticReclamation.updated_by}</p>
                <p><strong>Reclamation Fournisseur:</strong> {staticReclamation.reclamation_fournisseur ? <a href="#" target="_blank" rel="noopener noreferrer">Consulter</a> : 'null'}</p>
                <p><strong>Plan Action:</strong> {staticReclamation.plan_action ? <a href="#" target="_blank" rel="noopener noreferrer">Consulter</a> : 'null'}</p>
                <p><strong>Pièces Jointes:</strong> {staticReclamation.fichier_pdf ? <a href="#" target="_blank" rel="noopener noreferrer">Consulter</a> : 'null'}</p>
                {staticReclamation.declencher_plan_action && (
                    <div className="additional-info">
                        <p><strong>Date Détection:</strong> {staticReclamation.date_detection}</p>
                        <p><strong>Désignation Produit Non Conforme:</strong> {staticReclamation.designation_produit_non_conforme}</p>
                        <p><strong>Description Non Conformité:</strong> {staticReclamation.description_non_conformite}</p>
                        <p><strong>Produits Non Conformes:</strong> {staticReclamation.produits_non_conformes}</p>
                        <p><strong>Type Non Conformité:</strong> {staticReclamation.type_non_conformite}</p>
                        <p><strong>Source Non Conformité:</strong> {staticReclamation.source_non_conformite}</p>
                        <p><strong>Niveau Gravité:</strong> {staticReclamation.niveau_gravite}</p>
                        <p><strong>Pièces Jointes:</strong> {staticReclamation.pieces_jointes ? <a href="#" target="_blank" rel="noopener noreferrer">Consulter</a> : 'null'}</p>
                        <p><strong>Personnes à Notifier:</strong> {staticReclamation.personnes_a_notifier}</p>
                    </div>
                )}
            </div>
            <div className="details-actions">
                <Link to={`/ModifierReclamation/${staticReclamation.code}`} className="btn btn-primary">Modifier</Link>
                <Link to={`/AllReclamations`} className="btn btn-secondary">Retour à la Liste</Link>
            </div>
        </div>
    );
};

export default ReclamationDetails;
