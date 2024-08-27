import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useParams, Navigate, Link } from 'react-router-dom';
import SubNavbarAudit from '../../components/SubNavbarAudit';

const AddDecision = () => {
    const { id } = useParams();
    const [errors, setErrors] = useState({});
    const [actions, setActions] = useState([]);
    const [actionPrise, setActionPrise] = useState('');
    const [decisionText, setDecisionText] = useState('');
    const [ajoutReussi, setAjoutReussi] = useState(false);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/action/dashboard_action/`)
            .then(response => setActions(response.data))
            .catch(error => console.error('Error fetching actions:', error));
    }, [id]);

    const validateForm = () => {
        const newErrors = {};
        if (!decisionText) newErrors.decisionText = 'La décision est requise.';
        if (!actionPrise) newErrors.actionPrise = 'L\'action est requise.';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }

        const formData = new FormData();
        formData.append('action_prise', actionPrise);
        formData.append('decision_text', decisionText);

        axios.post(`${process.env.REACT_APP_API_URL}/reunion/create_Decision/${id}/`, formData, {
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': Cookies.get('csrftoken'),
            }
        })
            .then(response => {
                console.log('Décision ajoutée avec succès:', response.data);
                setAjoutReussi(true);
                setActionPrise('');
                setDecisionText('');
            })
            .catch(error => {
                console.error('Erreur lors de l\'ajout de la décision:', error.response.data);
                setErrors({ message: 'Une erreur s\'est produite lors de l\'ajout de la décision.' });
            });
    };

    if (ajoutReussi) {
        return <Navigate to={`/ConsulterReunion/${id}/`} />;
    }

    return (
        <>
            <SubNavbarAudit />
            <main style={{ display: 'flex', minHeight: '100vh' }}> <div className="container ajout-form">
                <div className="container ajout-form">
                    <form onSubmit={handleSubmit} className="row">
                        <div className="button-container">
                            <button className="button-add" type="submit">Prendre décision</button>
                            <Link to="/allreunion" ><button className="retour me-2">Retour au tableau de bord</button></Link>
                        </div>
                        <h4>Ajouter une décision</h4>

                        <div className="col-md-6">
                            <div className="form-label">
                                <label className="form-label">Décision :</label>
                                <input type="text" className="form-control" placeholder="Décision*" name="decisionText" value={decisionText} onChange={(e) => setDecisionText(e.target.value)} />
                                {errors.decisionText && <p className="error">{errors.decisionText}</p>}
                            </div>
                        </div>
                        <div className="col-md-6">

                            <div className="form-label">
                                <label className="form-label">Plan Actions :</label>
                                <select className="form-control" value={actionPrise} onChange={(e) => setActionPrise(e.target.value)}>
                                    <option value="">Sélectionner...</option>
                                    {actions.map(action => (
                                        <option key={action.id} value={action.id}>{action.nom_action}</option>
                                    ))}
                                </select>
                                {errors.actionPrise && <p className="error">{errors.actionPrise}</p>}
                            </div>
                        </div>

                    </form>
                </div>
            </div>
            </main>
        </>
    );
};

export default AddDecision;
