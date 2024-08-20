import React from 'react';
import { Link } from 'react-router-dom';
import './consulterclient.css';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { CiSaveDown2 } from 'react-icons/ci';

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
    personnes_a_notifier: 'Alice, Bob',
};

const ReclamationDetails = () => {
    return (
        <div className="container-client px-4 mt-4">
            <nav className="nav-client">
                <Link className="nav-item-client active ms-0" to="#">Détails</Link>
                <Link className="nav-item-client" to="/AllReclamations">Reclamations</Link>
                <Link className="nav-item-client" to="/AllSuggestion">Suggestion</Link>
                <Link className="nav-item-client" to="/AllEnquete">Enquete</Link>
            </nav>
            <hr className="divider-client" />
            <div className="row">
                <div className="col-xl-12">
                    <div className="card-client mb-4">
                        <div className="card-header-client">Détails de la Réclamation</div>
                        <div className="card-body-client">
                            <div className="row gx-3 mb-3">
                                <div className="col-md-6">
                                    <label className="form-label-client mb-1">Code Réclamation</label>
                                    <p className="form-control-client">{staticReclamation.code}</p>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label-client mb-1">Description</label>
                                    <p className="form-control-client">{staticReclamation.description}</p>
                                </div>
                            </div>
                            <div className="row gx-3 mb-3">
                                <div className="col-md-6">
                                    <label className="form-label-client mb-1">Type Réclamation</label>
                                    <p className="form-control-client">{staticReclamation.type_reclamation}</p>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label-client mb-1">Date Livraison</label>
                                    <p className="form-control-client">{staticReclamation.date_livraison}</p>
                                </div>
                            </div>
                            {/* Additional rows for other details... */}
                            <div className="d-flex justify-content-end mt-4">
                                <Link to={`/ModifierReclamation/${staticReclamation.code}`} className="btn-save-fournisseur"><CiSaveDown2 /> Modifier</Link>
                                <Link to="/AllReclamations" className="btn btn-secondary ms-2"><IoMdArrowRoundBack /> Retour à la Liste</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReclamationDetails;
