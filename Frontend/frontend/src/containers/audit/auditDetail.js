import React, { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { GrEdit, GrTrash } from 'react-icons/gr';
import axios from 'axios';
import Cookies from 'js-cookie';
import '../RH/Detail.css';
import SubNavbarAudit from '../../components/SubNavbarAudit';
import SidebarAudit from '../../components/SidebarAudit';

const sampleAudits = [
    { id: 1, reference: 'A001', designation: 'Audit 1', type_audit: 'Interne', statut: 'Complété', champ_audit: 'Champ 1', date_debut: '2024-01-01', date_fin: '2024-01-10', responsable_validation: 'Responsable 1', auditeurs: ['1'], audites: ['1'], created_at: '2024-01-01T12:00:00Z', created_by: 'Michael Brown' },
    { id: 2, reference: 'A002', designation: 'Audit 2', type_audit: 'Externe', statut: 'En cours', champ_audit: 'Champ 2', date_debut: '2024-02-01', date_fin: '2024-02-10', responsable_validation: 'Responsable 2', auditeurs: ['2'], audites: ['2'], created_at: '2024-02-01T12:00:00Z', created_by: 'Michael Christopher' },
    { id: 3, reference: 'A003', designation: 'Audit 3', type_audit: 'Interne', statut: 'Planifié', champ_audit: 'Champ 3', date_debut: '2024-03-01', date_fin: '2024-03-10', responsable_validation: 'Responsable 3', auditeurs: [], audites: [], created_at: '2024-03-01T12:00:00Z', created_by: 'Michael Chris' }
];

const AuditDetail = () => {
    const { id } = useParams();
    const [audit, setAudit] = useState(null);
    const [deleteReussi, setDeleteReussi] = useState(false);
    const [updateReussi, setUpdateReussi] = useState(false);
    const [reference, setReference] = useState('');
    const [designation, setDesignation] = useState('');
    const [typeAudit, setTypeAudit] = useState('');
    const [statut, setStatut] = useState('');
    const [champAudit, setChampAudit] = useState('');
    const [dateDebut, setDateDebut] = useState('');
    const [dateFin, setDateFin] = useState('');
    const [responsableValidation, setResponsableValidation] = useState('');
    const [auditeurs, setAuditeurs] = useState([]);
    const [audites, setAudites] = useState([]);
    const [errors, setErrors] = useState({});
    const [piecesJointes] = useState(null);

    useEffect(() => {
        const fetchedAudit = sampleAudits.find(a => a.id === parseInt(id));
        if (fetchedAudit) {
            setAudit(fetchedAudit);
            setReference(fetchedAudit.reference);
            setDesignation(fetchedAudit.designation);
            setTypeAudit(fetchedAudit.type_audit);
            setStatut(fetchedAudit.statut);
            setChampAudit(fetchedAudit.champ_audit);
            setDateDebut(fetchedAudit.date_debut);
            setDateFin(fetchedAudit.date_fin);
            setResponsableValidation(fetchedAudit.responsable_validation);
            setAuditeurs(fetchedAudit.auditeurs);
            setAudites(fetchedAudit.audites);
        }
    }, [id]);

    const handleDelete = async () => {
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/RH/delete_audit/${id}/`, {
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json',
                    'X-CSRFToken': Cookies.get('csrftoken'),
                }
            });
            setDeleteReussi(true);
        } catch (error) {
            console.error('Erreur lors de la suppression de l\'audit:', error);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newErrors = {};
        if (!reference) newErrors.reference = 'La référence est requise.';
        if (!designation) newErrors.designation = 'La désignation est requise.';
        if (!typeAudit) newErrors.typeAudit = 'Le type d\'audit est requis.';
        if (!statut) newErrors.statut = 'Le statut est requis.';
        if (!champAudit) newErrors.champAudit = 'Le champ d\'audit est requis.';
        if (!dateDebut) newErrors.dateDebut = 'La date de début est requise.';
        if (!dateFin) newErrors.dateFin = 'La date de fin est requise.';
        if (!responsableValidation) newErrors.responsableValidation = 'Le responsable de validation est requis.';
        if (auditeurs.length === 0) newErrors.auditeurs = 'Veuillez sélectionner au moins un auditeur.';
        if (audites.length === 0) newErrors.audites = 'Veuillez sélectionner au moins un audité.';
        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            return;
        }

        try {
            const formData = new FormData();
            formData.append('reference', reference);
            formData.append('designation', designation);
            formData.append('type_audit', typeAudit);
            formData.append('statut', statut);
            formData.append('champ_audit', champAudit);
            formData.append('date_debut', dateDebut);
            formData.append('date_fin', dateFin);
            formData.append('responsable_validation', responsableValidation);
            formData.append('auditeurs', JSON.stringify(auditeurs));
            formData.append('audites', JSON.stringify(audites));

            const headers = {
                'Accept': '*/*',
                'Content-Type': 'multipart/form-data',
                'X-CSRFToken': Cookies.get('csrftoken')
            };

            await axios.put(`${process.env.REACT_APP_API_URL}/RH/update_audit/${id}/`, formData, { headers });
            setUpdateReussi(true);
        } catch (error) {
            console.error('Erreur lors de la mise à jour de l\'audit:', error);
        }
    };

    if (deleteReussi) {
        return <Navigate to="/Audits" />;
    }

    if (updateReussi) {
        return <Navigate to={`/audit/${id}`} />;
    }

    return (
        <>
            <SubNavbarAudit />
            <main style={{ display: 'flex', minHeight: '100vh' }}>
                <SidebarAudit />
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

                                </div>
                            </div>
                            <br />
                            <div className="card mb-4">
                                <div className="card-header-">Historique</div>
                                <div className="card-body">
                                    <ul className="list-group list-group-flush">
                                        {audit ? (
                                            <>
                                                <li className="list-group-item d-flex justify-content-between align-items-center">
                                                    <div>
                                                        <strong>Date début et fin</strong><br />
                                                        <small>{audit.date_debut} - {audit.date_fin}</small>
                                                    </div>
                                                </li>
                                                <li className="list-group-item d-flex justify-content-between align-items-center">
                                                    <div> <strong>Date de création</strong><br />
                                                        <small>{audit.created_at} - {audit.created_by}</small>
                                                    </div>

                                                </li>
                                            </>
                                        ) : (<div>Chargement...</div>)}
                                    </ul>
                                </div>
                            </div>
                        </div>      <div className="col-xl-8">
                            <div className="card mb-4">
                                <div className="card-header-">Audit Details</div>
                                <div className="card-body">
                                    {audit ? (
                                        <form onSubmit={handleSubmit} className="row">
                                            <div className="row gx-3 mb-4">
                                                <div className="col-md-6">
                                                    <label className="form-label">Référence</label>
                                                    <input className="form-control" type="text" value={reference} onChange={(e) => setReference(e.target.value)} />
                                                    {errors.reference && <p className="error">{errors.reference}</p>}
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="form-label">Désignation</label>
                                                    <input className="form-control" type="text" value={designation} onChange={(e) => setDesignation(e.target.value)} />
                                                    {errors.designation && <p className="error">{errors.designation}</p>}
                                                </div>
                                            </div>
                                            <div className="row gx-3 mb-3">
                                                <div className="col-md-6">
                                                    <label className="form-label">Type d'audit</label>
                                                    <input className="form-control" type="text" value={typeAudit} onChange={(e) => setTypeAudit(e.target.value)} />
                                                    {errors.typeAudit && <p className="error">{errors.typeAudit}</p>}
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="form-label">Statut</label>
                                                    <input className="form-control" type="text" value={statut} onChange={(e) => setStatut(e.target.value)} />
                                                    {errors.statut && <p className="error">{errors.statut}</p>}
                                                </div>
                                            </div>
                                            <div className="row gx-3 mb-3">
                                                <div className="col-md-6">
                                                    <label className="form-label">Champ d'audit</label>
                                                    <input type="text" className="form-control" value={champAudit} onChange={(e) => setChampAudit(e.target.value)} />
                                                    {errors.champAudit && <p className="error">{errors.champAudit}</p>}
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="form-label">Date de début</label>
                                                    <input type="date" className="form-control" value={dateDebut} onChange={(e) => setDateDebut(e.target.value)} />
                                                    {errors.dateDebut && <p className="error">{errors.dateDebut}</p>}
                                                </div>
                                            </div>
                                            <div className="row gx-3 mb-3">
                                                <div className="col-md-6">
                                                    <label className="form-label">Date de fin</label>
                                                    <input type="date" className="form-control" value={dateFin} onChange={(e) => setDateFin(e.target.value)} />
                                                    {errors.dateFin && <p className="error">{errors.dateFin}</p>}
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="form-label">Responsable de validation</label>
                                                    <input type="text" className="form-control" value={responsableValidation} onChange={(e) => setResponsableValidation(e.target.value)} />
                                                    {errors.responsableValidation && <p className="error">{errors.responsableValidation}</p>}
                                                </div>
                                            </div>
                                            <div className="row gx-3 mb-3">
                                                <div className="col-md-6">
                                                    <label className="form-label">Auditeurs</label>
                                                    <select multiple className="form-control" value={auditeurs} onChange={(e) => setAuditeurs([...e.target.selectedOptions].map(option => option.value))}>
                                                        <option value="1">Auditeur 1</option>
                                                        <option value="2">Auditeur 2</option>
                                                    </select>
                                                    {errors.auditeurs && <p className="error">{errors.auditeurs}</p>}
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="form-label">Audités</label>
                                                    <select multiple className="form-control" value={audites} onChange={(e) => setAudites([...e.target.selectedOptions].map(option => option.value))}>
                                                        <option value="1">Audité 1</option>
                                                        <option value="2">Audité 2</option>
                                                    </select>
                                                    {errors.audites && <p className="error">{errors.audites}</p>}
                                                </div>
                                            </div>
                                            <div className="d-flex justify-content-end mt-3">
                                                <button type="submit" className="btn btn-primary me-2">
                                                    <GrEdit /> Modifier
                                                </button>
                                                <button type="button" className="btn btn-danger me-2" onClick={handleDelete}>
                                                    <GrTrash /> Supprimer
                                                </button>
                                            </div></form>
                                    ) : (
                                        <p>Aucun audit trouvé.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default AuditDetail;
