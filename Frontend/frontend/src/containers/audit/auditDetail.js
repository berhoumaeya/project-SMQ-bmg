import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { GrEdit, GrTrash } from 'react-icons/gr';
import { IoMdArrowRoundBack } from 'react-icons/io';
import axios from 'axios';
import Cookies from 'js-cookie';
import '../RH/Detail.css';

const sampleAudits = [
    {
        id: 1,
        reference: 'A001',
        designation: 'Audit 1',
        type_audit: 'Interne',
        statut: 'Complété'
    },
    {
        id: 2,
        reference: 'A002',
        designation: 'Audit 2',
        type_audit: 'Externe',
        statut: 'En cours'
    },
    {
        id: 3,
        reference: 'A003',
        designation: 'Audit 3',
        type_audit: 'Interne',
        statut: 'Planifié'
    }
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
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const fetchedAudit = sampleAudits.find(a => a.id === parseInt(id));
        setAudit(fetchedAudit);

        if (fetchedAudit) {
            setReference(fetchedAudit.reference);
            setDesignation(fetchedAudit.designation);
            setTypeAudit(fetchedAudit.type_audit);
            setStatut(fetchedAudit.statut);
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

    const handleSubmit = (event) => {
        event.preventDefault();
        const newErrors = {};
        if (!reference) newErrors.reference = 'La référence est requise.';
        if (!designation) newErrors.designation = 'La désignation est requise.';
        if (!typeAudit) newErrors.typeAudit = 'Le type d\'audit est requis.';
        if (!statut) newErrors.statut = 'Le statut est requis.';
        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            return;
        }

        const formData = new FormData();
        formData.append('reference', reference);
        formData.append('designation', designation);
        formData.append('type_audit', typeAudit);
        formData.append('statut', statut);

        const headers = {
            'Accept': '*/*',
            'Content-Type': 'multipart/form-data',
            'X-CSRFToken': Cookies.get('csrftoken')
        };

        axios.put(`${process.env.REACT_APP_API_URL}/RH/update_audit/${id}/`, formData, { headers })
            .then(response => {
                console.log('Audit mis à jour avec succès :', response.data);
                setUpdateReussi(true);
            })
            .catch(error => {
                console.error('Erreur lors de la mise à jour de l\'audit:', error);
            });
    };

    if (deleteReussi) {
        return <Navigate to="/Audits" />;
    }

    if (updateReussi) {
        return <Navigate to={`/audit/${id}`} />;
    }

    return (
        <main style={{ backgroundColor: '#eeeeee', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div className="container-xl px-4 mt-4">
                <div className="row">
                    <div className="col-xl-8">
                        <div className="card mb-4">
                            <div className="card-header" style={{backgroundColor:'#58b3d3' , color:'white'}}>Audit Details</div>
                            <div className="card-body">
                                {audit ? (
                                    <form onSubmit={handleSubmit} className="row">
                                        <div className="row gx-3 mb-3">
                                            <div className="col-md-6">
                                                <label className="small mb-1">Référence</label>
                                                <input className="form-control" type="text" value={reference} onChange={(e) => setReference(e.target.value)} />
                                                {errors.reference && <p className="error">{errors.reference}</p>}
                                            </div>
                                            <div className="col-md-6">
                                                <label className="small mb-1">Désignation</label>
                                                <input className="form-control" type="text" value={designation} onChange={(e) => setDesignation(e.target.value)} />
                                                {errors.designation && <p className="error">{errors.designation}</p>}
                                            </div>
                                        </div>
                                        <div className="row gx-3 mb-3">
                                            <div className="col-md-6">
                                                <label className="small mb-1">Type d'audit</label>
                                                <input className="form-control" type="text" value={typeAudit} onChange={(e) => setTypeAudit(e.target.value)} />
                                                {errors.typeAudit && <p className="error">{errors.typeAudit}</p>}
                                            </div>
                                            <div className="col-md-6">
                                                <label className="small mb-1">Statut</label>
                                                <input className="form-control" type="text" value={statut} onChange={(e) => setStatut(e.target.value)} />
                                                {errors.statut && <p className="error">{errors.statut}</p>}
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-end mt-3">
                                            <Link to="/Audits" className="btn btn-secondary me-2">
                                                <IoMdArrowRoundBack /> Retour
                                            </Link>
                                            <button type="submit" className="btn btn-primary me-2">
                                                <GrEdit /> Modifier
                                            </button>
                                            <button type="button" className="btn btn-danger me-2" onClick={handleDelete}>
                                                <GrTrash /> Supprimer
                                            </button>
                                        </div>
                                    </form>
                                ) : (
                                    <p>Chargement ...</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default AuditDetail;
