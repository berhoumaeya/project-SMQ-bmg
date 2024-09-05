import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { GrEdit, GrTrash } from 'react-icons/gr';
import { IoMdArrowRoundBack } from 'react-icons/io';
import SubNavbarAudit from '../../components/SubNavbarAudit';

// Sample actions data
const actions = [
    {
        id: 1,
        nom_action: 'Amélioration du processus',
        designation: 'Optimiser le processus de fabrication pour réduire les coûts.',
        description: 'Analyse approfondie du processus existant et mise en œuvre des améliorations pour augmenter l\'efficacité.',
        site: 'New York',
        priorite_action: 'High',
        gravite_action: 'Medium',
        cause_action: 'Process Gap',
        source_action: 'Internal Review',
        type_action: 'Improvement',
        responsable_validation: 'jdoe',
        plan: 'Plan d\'action 2024',
        piece_jointe: 'plan_action.pdf',
        commentaire: 'Action en cours de validation'
    },
    {
        id: 2,
        nom_action: 'Action corrective client',
        designation: 'Résoudre les problèmes signalés par les clients concernant le produit X.',
        description: 'Collecter les retours clients et effectuer les modifications nécessaires pour améliorer le produit.',
        site: 'Los Angeles',
        priorite_action: 'Medium',
        gravite_action: 'High',
        cause_action: 'Human Error',
        source_action: 'Customer Feedback',
        type_action: 'Corrective',
        responsable_validation: 'mmartin',
        plan: 'Plan de correction client Q3',
        piece_jointe: 'feedback_clients.pdf'
    },
    {
        id: 3,
        nom_action: 'Maintenance préventive',
        designation: 'Planifier et exécuter une maintenance préventive sur l\'équipement Y.',
        description: 'Évaluer l\'état de l\'équipement et effectuer les réparations nécessaires avant toute défaillance.',
        site: 'Chicago',
        priorite_action: 'Low',
        gravite_action: 'Low',
        cause_action: 'Equipment Failure',
        source_action: 'Audit',
        type_action: 'Preventive',
        responsable_validation: 'pdurand',
        plan: 'Plan de maintenance 2024',
        piece_jointe: 'maintenance_plan.pdf'
    },
];

const ActionDetail = () => {
    const { id } = useParams();
    const [action, setAction] = useState(null);
    const [updateReussi, setUpdateReussi] = useState(false);
    const [piecesJointes, setPiecesJointes] = useState(null);
    const [viewMode, setViewMode] = useState('list');
    const [commentaire, setCommentaire] = useState('');

    useEffect(() => {
        const actionDetail = actions.find(action => action.id === parseInt(id));
        setAction(actionDetail);
        if (actionDetail) {
            setCommentaire(actionDetail.commentaire || ''); // Load the initial comment
        }
    }, [id]);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setPiecesJointes(selectedFile);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setUpdateReussi(true);
    };

    const handleDelete = () => {
        // Handle delete action
        console.log('Action deleted');
        setUpdateReussi(true);
    };

    if (updateReussi) {
        return <Navigate to="/actions" />;
    }

    if (!action) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <SubNavbarAudit viewMode={viewMode} setViewMode={setViewMode} />
            <main style={{ display: 'flex', minHeight: '100vh', flex: ' ' }}>
                <div className="container-xl px-4 mt-4">
                    <div className="row">
                        <div className="col-xl-4">
                            <div className="card mb-4 mb-xl-0">
                                <div className="card-header-">Profile Picture</div>
                                <div className="card-body text-center">
                                    <div className="img-container mb-2">
                                        <img
                                            className="img-account-profile rounded-circle"
                                            src={piecesJointes ? URL.createObjectURL(piecesJointes) : "http://bootdey.com/img/Content/avatar/avatar1.png"}
                                            alt="Profile"
                                            style={{ width: '150px', height: '150px' }}
                                        />
                                    </div>
                                    <div className="small font-italic text-muted mb-4">
                                        JPG or PNG no larger than 5 MB
                                    </div>
                                    <input
                                        type="file"
                                        className="form-control mb-2"
                                        onChange={handleFileChange}
                                        accept=".jpg, .png"
                                    />
                                </div>
                            </div>
                            <br />
                            <div className="card mb-4 mb-xl-0">
                                <div className="card-header-">Commentaire</div>
                                <div className="card-body text-center">
                                    {updateReussi ? (
                                        <div className="small font-italic text-muted mb-4">
                                            {commentaire ? commentaire : "Aucun commentaire disponible"}
                                        </div>
                                    ) : (
                                        <>
                                            <input
                                                className="form-control mb-3"
                                                placeholder="Entrez un commentaire"
                                                value={commentaire}
                                                onChange={(e) => setCommentaire(e.target.value)}
                                            />
                                            <button
                                                className="btn btn-primary"
                                                style={{ backgroundColor: '#5585b5' }}
                                                onClick={() => {
                                                    setUpdateReussi(true);
                                                }}
                                            >
                                                Sauvegarder
                                            </button>
                                        </>
                                    )}
                                    {/* Display the comment below the input field */}
                                    <div className="mt-3">
                                        {updateReussi && (
                                            <p>Commentaire Sauvegardé: {commentaire || "Aucun commentaire disponible"}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <br />
                        </div>
                        <div className="col-xl-8">
                            <div className="card mb-4">
                                <div className="card-header-">Détails de l'Action</div>
                                <div className="card-body">
                                    <form onSubmit={handleSubmit} className='row'>
                                        <div className="row gx-3 mb-3">
                                            <div className="col-md-6">
                                                <label className="small mb-1">Nom Action</label>
                                                <input className="form-control" type="text" value={action.nom_action} readOnly />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="small mb-1">Designation</label>
                                                <input className="form-control" type="text" value={action.designation} readOnly />
                                            </div>
                                        </div>
                                        <div className='row gx-3 mb-3'>
                                            <div className="col-md-6">
                                                <label className="small mb-1">Description</label>
                                                <textarea className="form-control" rows="3" value={action.description} readOnly />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="small mb-1">Site</label>
                                                <input className="form-control" type="text" value={action.site} readOnly />
                                            </div>
                                        </div>
                                        <div className='row gx-3 mb-3'>
                                            <div className="col-md-6">
                                                <label className="small mb-1">Priorité</label>
                                                <input className="form-control" type="text" value={action.priorite_action} readOnly />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="small mb-1">Gravité</label>
                                                <input className="form-control" type="text" value={action.gravite_action} readOnly />
                                            </div>
                                        </div>
                                        <div className='row gx-3 mb-3'>
                                            <div className="col-md-6">
                                                <label className="small mb-1">Cause</label>
                                                <input className="form-control" type="text" value={action.cause_action} readOnly />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="small mb-1">Source</label>
                                                <input className="form-control" type="text" value={action.source_action} readOnly />
                                            </div>
                                        </div>
                                        <div className='row gx-3 mb-3'>
                                            <div className="col-md-6">
                                                <label className="small mb-1">Type d'action</label>
                                                <input className="form-control" type="text" value={action.type_action} readOnly />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="small mb-1">Responsable Validation</label>
                                                <input className="form-control" type="text" value={action.responsable_validation} readOnly />
                                            </div>
                                        </div>
                                        <div className='row gx-3 mb-3'>
                                            <div className="col-md-6">
                                                <label className="small mb-1">Plan</label>
                                                <input className="form-control" type="text" value={action.plan} readOnly />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="small mb-1">Pièce jointe</label>
                                                <input className="form-control" type="text" value={action.piece_jointe} readOnly />
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-end mt-3">
                                            <Link to="/Actions" className="btn btn-secondary me-2">
                                                <IoMdArrowRoundBack /> Retour
                                            </Link>
                                            <button type="submit" className="btn btn-primary me-2">
                                                <GrEdit /> Modifier
                                            </button>
                                            <button type="button" className="btn btn-danger" onClick={handleDelete}>
                                                <GrTrash /> Supprimer
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default ActionDetail;
