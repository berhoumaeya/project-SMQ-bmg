import React, { useState } from 'react';
import axios from 'axios';
import { Navigate, Link } from 'react-router-dom';
import Cookies from 'js-cookie';

function AddAudit() {
    const [reference, setReference] = useState('');
    const [demandeur, setDemandeur] = useState('session_user');
    const [designation, setDesignation] = useState('');
    const [champAudit, setChampAudit] = useState('');
    const [typeAudit, setTypeAudit] = useState('');
    const [auditeurs, setAuditeurs] = useState([]);
    const [dateDebut, setDateDebut] = useState('');
    const [dateFin, setDateFin] = useState('');
    const [documentReference, setDocumentReference] = useState(null);
    const [audites, setAudites] = useState([]);
    const [responsableValidation, setResponsableValidation] = useState('');
    const [ajoutReussi, setAjoutReussi] = useState(false);
    const [errors, setErrors] = useState({});
    const [apiError, setApiError] = useState('');

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setDocumentReference(selectedFile);
    };

    const validateForm = () => {
        const newErrors = {};
        if (!reference) newErrors.reference = 'La référence est requise.';
        if (!designation) newErrors.designation = 'La désignation est requise.';
        if (!champAudit) newErrors.champAudit = 'Le champ d\'audit est requis.';
        if (!typeAudit) newErrors.typeAudit = 'Le type d\'audit est requis.';
        if (!dateDebut) newErrors.dateDebut = 'La date de début est requise.';
        if (!dateFin) newErrors.dateFin = 'La date de fin est requise.';
        if (!responsableValidation) newErrors.responsableValidation = 'Le responsable de validation est requis.';
        if (!auditeurs.length) newErrors.auditeurs = 'Au moins un auditeur est requis.';
        if (!audites.length) newErrors.audites = 'Au moins un audité est requis.';
        if (documentReference && !documentReference.name.match(/\.(pdf|doc|docx)$/)) {
            newErrors.documentReference = 'Le fichier doit être un PDF, DOC ou DOCX.';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!validateForm()) {
            return;
        }

        const formData = new FormData();
        formData.append('reference', reference);
        formData.append('demandeur', demandeur);
        formData.append('designation', designation);
        formData.append('champ_audit', champAudit);
        formData.append('type_audit', typeAudit);
        formData.append('date_debut', dateDebut);
        formData.append('date_fin', dateFin);
        formData.append('responsable_validation', responsableValidation);
        if (documentReference) {
            formData.append('document_reference', documentReference);
        }
        auditeurs.forEach(auditeur => formData.append('auditeurs', auditeur));
        audites.forEach(audite => formData.append('audites', audite));

        const headers = {
            'Accept': '*/*',
            'Content-Type': 'multipart/form-data',
            'X-CSRFToken': Cookies.get('csrftoken')
        };

        axios.post(`${process.env.REACT_APP_API_URL}/audits/create/`, formData, { headers })
            .then(response => {
                console.log('Audit ajouté avec succès :', response.data);
                setReference('');
                setDesignation('');
                setChampAudit('');
                setTypeAudit('');
                setAuditeurs([]);
                setDateDebut('');
                setDateFin('');
                setDocumentReference(null);
                setAudites([]);
                setResponsableValidation('');
                setAjoutReussi(true);
            })
            .catch(error => {
                console.error('Erreur lors de l\'ajout de l\'audit :', error);
                setApiError('Erreur lors de l\'ajout de l\'audit. Veuillez réessayer.');
            });
    };

    if (ajoutReussi) {
        return <Navigate to="/DashboardAudit" />;
    }

    return (
        <main style={{ backgroundColor: '#eeeeee', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div className="container ajout-form">
                <div className="contact-image">
                    <img src="/images/add.png" alt="rocket_contact" />
                </div>
                {apiError && <p className="error">{apiError}</p>}
                <form onSubmit={handleSubmit} className="row">
                    <div className="button-container">
                        <Link to="/Audits">
                            <button className="retour">Retour au tableau de bord</button>
                        </Link>
                        <div className="button-container">
                            <button className="button-add-audit" type="submit">Ajouter audit</button>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-label">
                            <label className="form-label">Référence :</label>
                            <input type="text" className="form-control" placeholder="Référence*" name="reference" value={reference} onChange={(e) => setReference(e.target.value)} />
                            {errors.reference && <p className="error">{errors.reference}</p>}
                        </div>
                        <div className="form-label">
                            <label className="form-label">Désignation :</label>
                            <input type="text" className="form-control" placeholder="Désignation*" name="designation" value={designation} onChange={(e) => setDesignation(e.target.value)} />
                            {errors.designation && <p className="error">{errors.designation}</p>}
                        </div>
                        <div className="form-label">
                            <label className="form-label">Champ d'audit :</label>
                            <input type="text" className="form-control" placeholder="Champ d'audit*" name="champAudit" value={champAudit} onChange={(e) => setChampAudit(e.target.value)} />
                            {errors.champAudit && <p className="error">{errors.champAudit}</p>}
                        </div>
                        <div className="form-label">
                            <label className="form-label">Type d'audit :</label>
                            <input type="text" className="form-control" placeholder="Type d'audit*" name="typeAudit" value={typeAudit} onChange={(e) => setTypeAudit(e.target.value)} />
                            {errors.typeAudit && <p className="error">{errors.typeAudit}</p>}
                        </div>
                        <div className="form-label">
                            <label className="form-label">Date de début :</label>
                            <input type="date" className="form-control" placeholder="Date de début*" name="dateDebut" value={dateDebut} onChange={(e) => setDateDebut(e.target.value)} />
                            {errors.dateDebut && <p className="error">{errors.dateDebut}</p>}
                        </div>
                        <div className="form-label">
                            <label className="form-label">Date de fin :</label>
                            <input type="date" className="form-control" placeholder="Date de fin*" name="dateFin" value={dateFin} onChange={(e) => setDateFin(e.target.value)} />
                            {errors.dateFin && <p className="error">{errors.dateFin}</p>}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-label">
                            <label className="form-label">Pièces jointes :</label>
                            <input type="file" className="form-control" onChange={handleFileChange} />
                        </div>
                        <br />
                        <div className="form-label">
                            <label className="form-label">Auditeurs :</label>
                            <select multiple className="form-control" value={auditeurs} onChange={(e) => setAuditeurs([...e.target.selectedOptions].map(option => option.value))}>
                                <option value="1">Auditeur 1</option>
                                <option value="2">Auditeur 2</option>
                            </select>
                            {errors.auditeurs && <p className="error">{errors.auditeurs}</p>}
                        </div>
                        <div className="form-label">
                            <label className="form-label">Audités :</label>
                            <select multiple className="form-control" value={audites} onChange={(e) => setAudites([...e.target.selectedOptions].map(option => option.value))}>
                                <option value="1">Audité 1</option>
                                <option value="2">Audité 2</option>
                            </select>
                            {errors.audites && <p className="error">{errors.audites}</p>}
                        </div>
                        <div className="form-label">
                            <label className="form-label">Responsable de validation :</label>
                            <input type="text" className="form-control" placeholder="Responsable de validation*" name="responsableValidation" value={responsableValidation} onChange={(e) => setResponsableValidation(e.target.value)} />
                            {errors.responsableValidation && <p className="error">{errors.responsableValidation}</p>}
                        </div>
                    </div>
                </form>
            </div>
        </main>
    );
}

export default AddAudit;
