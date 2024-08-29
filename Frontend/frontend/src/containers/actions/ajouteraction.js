import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Link, Navigate } from 'react-router-dom';

import './ajoutaction.css';
import { toast } from 'react-toastify';
import SubNavbarAudit from '../../components/SubNavbarAudit';

const CreateActionForm = () => {
    const [errors, setErrors] = useState({});
    const [nom_action, setNomAction] = useState('');
    const [designation, setDesignation] = useState('');
    const [description, setDescription] = useState('');
    const [site, setSite] = useState('');
    const [priorite_action, setPrioriteAction] = useState('');
    const [gravite_action, setGraviteAction] = useState('');
    const [cause_action, setCauseAction] = useState('');
    const [source_action, setSourceAction] = useState('');
    const [type_action, setTypeAction] = useState('');
    const [piece_jointe, setPieceJointe] = useState(null);

    const [responsable_validationID, setResponsableValidation] = useState('');
    const [responsable_validations, setResponsableValidations] = useState([]);
    const [plan, setPlan] = useState('');
    const [plans, setPlans] = useState([]);
    const [ajoutReussi, setAjoutReussi] = useState(false);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/RH/dashboard_employe/`)
            .then(response => setResponsableValidations(response.data))
            .catch(error => console.error('Error fetching users:', error));

        axios.get(`${process.env.REACT_APP_API_URL}/RH/dashboard_plan/`)
            .then(response => setPlans(response.data))
            .catch(error => console.error('Error fetching approbateurs:', error));
    }, []);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setPieceJointe(selectedFile);
    };

    const validateForm = () => {
        const formErrors = {};
        if (!nom_action) formErrors.nom_action = 'Nom d\'action est requis.';
        if (!designation) formErrors.designation = 'Désignation est requise.';
        // Add other validation checks if needed
        return formErrors;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        const formData = new FormData();
        formData.append('nom_action', nom_action);
        formData.append('designation', designation);
        formData.append('description', description);
        formData.append('site', site);
        formData.append('priorite_action', priorite_action);
        formData.append('gravite_action', gravite_action);
        formData.append('cause_action', cause_action);
        formData.append('source_action', source_action);
        formData.append('type_action', type_action);
        formData.append('plan', plan);
        formData.append('responsable_validation', responsable_validationID);
        if (piece_jointe) {
            formData.append('piece_jointe', piece_jointe);
        }

        axios.post(`${process.env.REACT_APP_API_URL}/action/create_action/`, formData, {
            headers: {
                'Accept': '*/*',
                'Content-Type': 'multipart/form-data',
                'X-CSRFToken': Cookies.get('csrftoken')
            }
        })
            .then(response => {
                console.log('Success:', response.data);
                toast.success('Ajout avec succès!');
                setAjoutReussi(true);
            })
            .catch(error => {
                console.error('Error:', error);
                setErrors(error.response?.data || { message: 'Une erreur s\'est produite lors de la création de l\'action.' });
            });
    };

    if (ajoutReussi) {
        return <Navigate to="/Actions" />;
    }

    return (
        <>
            <SubNavbarAudit />
            <main style={{ display: 'flex', minHeight: '100vh' }}>
                <div className="container ajout-form">
                    <form onSubmit={handleSubmit} className="row">

                        <div className="button-container">
                            <button className="button-add me-2" type="submit" onClick={handleSubmit}>Ajouter</button>
                        </div>
                        <h4>Ajouter action</h4>
                        <div className="col-md-6">
                            <div className="form-label">
                                <label className="form-label">Nom Action:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder='Nom Action*'
                                    value={nom_action}
                                    onChange={(e) => setNomAction(e.target.value)}
                                />
                                {errors.nom_action && <div className="error">{errors.nom_action}</div>}
                            </div>

                            <div className="form-label">
                                <label className="form-label">Designation:</label>
                                <textarea
                                    className="form-control"
                                    placeholder='Designation*'
                                    value={designation}
                                    onChange={(e) => setDesignation(e.target.value)}
                                ></textarea>
                                {errors.designation && <div className="error">{errors.designation}</div>}
                            </div>

                            <div className="form-label">
                                <label className="form-label">Description:</label>
                                <textarea
                                    className="form-control"
                                    placeholder='Description*'
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                ></textarea>
                            </div>

                            <div className="form-label">
                                <label className="form-label">Type Action:</label>
                                <select
                                    className="form-control"
                                    value={type_action}
                                    onChange={(e) => setTypeAction(e.target.value)}
                                >
                                    <option value="">Select Type</option>
                                    <option value="Corrective">Corrective</option>
                                    <option value="Preventive">Preventive</option>
                                    <option value="Improvement">Improvement</option>
                                </select>
                            </div>
                            <div className="form-label">
                                <label className="form-label">Source Action:</label>
                                <select
                                    className="form-control"
                                    value={source_action}
                                    onChange={(e) => setSourceAction(e.target.value)}
                                >
                                    <option value="">Select Source</option>
                                    <option value="Audit">Audit</option>
                                    <option value="Customer Feedback">Customer Feedback</option>
                                    <option value="Internal Review">Internal Review</option>
                                </select>
                            </div>
                       
                            <div className="form-label">
                                <label className="form-label">Cause Action:</label>
                                <select
                                    className="form-control"
                                    value={cause_action}
                                    onChange={(e) => setCauseAction(e.target.value)}
                                >
                                    <option value="">Select Cause</option>
                                    <option value="Human Error">Human Error</option>
                                    <option value="Equipment Failure">Equipment Failure</option>
                                    <option value="Process Gap">Process Gap</option>
                                </select>
                            </div>
                            </div>
                            <div className="col-md-6">
                            <div className="form-label">
                                <label className="form-label">Gravité Action:</label>
                                <select
                                    className="form-control"
                                    value={gravite_action}
                                    onChange={(e) => setGraviteAction(e.target.value)}
                                >
                                    <option value="">Select Gravité</option>
                                    <option value="Low">Low</option>
                                    <option value="Medium">Medium</option>
                                    <option value="High">High</option>
                                </select>
                            </div>

                            <div className="form-label">
                                <label className="form-label">Priorité Action:</label>
                                <select
                                    className="form-control"
                                    value={priorite_action}
                                    onChange={(e) => setPrioriteAction(e.target.value)}
                                >
                                    <option value="">Select Priorité</option>
                                    <option value="Low">Low</option>
                                    <option value="Medium">Medium</option>
                                    <option value="High">High</option>
                                </select>
                            </div>

                            <div className="form-label">
                                <label className="form-label">Site:</label>
                                <select
                                    className="form-control"
                                    value={site}
                                    onChange={(e) => setSite(e.target.value)}
                                >
                                    <option value="">Select Site</option>
                                    <option value="New York">New York</option>
                                    <option value="Los Angeles">Los Angeles</option>
                                    <option value="Chicago">Chicago</option>
                                </select>
                            </div>

                            <div className="form-label">
                                <label className="form-label">Responsable Validation:</label>
                                <select
                                    className="form-control"
                                    value={responsable_validationID}
                                    onChange={(e) => setResponsableValidation(e.target.value)}
                                >
                                    <option value="">Select Responsable</option>
                                    {responsable_validations.map((validation) => (
                                        <option key={validation.id} value={validation.id}>{validation.nom} {validation.prenom}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-label">
                                <label className="form-label">Plan:</label>
                                <select
                                    className="form-control"
                                    value={plan}
                                    onChange={(e) => setPlan(e.target.value)}
                                >
                                    <option value="">Select Plan</option>
                                    {plans.map((plan) => (
                                        <option key={plan.id} value={plan.id}>{plan.nom}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-label">
                                <label className="form-label">Piece Jointe:</label>
                                <input
                                    type="file"
                                    className="form-control"
                                    onChange={handleFileChange}
                                />
                            </div>
                        </div>
                    </form>
                </div>
            </main>
        </>
    );
};

export default CreateActionForm;
