import React, { useState , useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';import { useNavigate, Link } from 'react-router-dom';
import './ajoutaction.css';
import { toast } from 'react-toastify';

const CreateActionForm = () => {

    const [errors, setErrors] = useState({});
    const [nom_action, setnom_action] = useState('');
    const [designation, setdesignation] = useState('');
    const [description, setdescription] = useState('');
    const [site, setsite] = useState('');
    const [priorite_action, setpriorite_action] = useState('');
    const [gravite_action, setgravite_action] = useState('');
    const [cause_action, setcause_action] = useState('');
    const [source_action, setsource_action] = useState('');
    const [type_action, settype_action] = useState('');
    const [piece_jointe, setpiece_jointe] = useState(null);

    const [responsable_validationID, setresponsable_validation] = useState('');
    const [responsable_validations, setresponsable_validations] = useState([]);
    const [plan, setplan] = useState('');
    const [plans, setplans] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/RH/dashboard_employe/`)
            .then(response => setresponsable_validations(response.data))
            .catch(error => console.error('Error fetching users:', error));

        axios.get(`${process.env.REACT_APP_API_URL}/RH/dashboard_plan/`)
            .then(response => setplans(response.data))
            .catch(error => console.error('Error fetching approbateurs:', error));
    }, []);


    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setpiece_jointe(selectedFile);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('nom_action',nom_action)
        formData.append('designation',designation)
        formData.append('description',description)
        formData.append('site',site)
        formData.append('priorite_action',priorite_action)
        formData.append('gravite_action',gravite_action)
        formData.append('cause_action',cause_action)
        formData.append('source_action',source_action)
        formData.append('type_action',type_action)
        formData.append('plan',plan)
        formData.append('responsable_validation',responsable_validationID)
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
                navigate('/Actions');

            })
         .catch (error =>  {
            console.error('Error:', error);
            setErrors(error.response?.data || { message: 'Une erreur s\'est produite lors de la création du action.' });

        });
    };

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <h3>Ajouter action</h3>

            <div className="form-group">
                <label>Nom Action</label>
                <input type="text" name="nom_action" value={nom_action} onChange={(e) => setnom_action(e.target.value)}  />
            </div>

            <div className="form-group">
                <label>Designation</label>
                <textarea name="designation" value={designation} onChange={(e) => setdesignation(e.target.value)} ></textarea>
            </div>

            <div className="form-group">
                <label>Description</label>
                <textarea name="description" value={description} onChange={(e) => setdescription(e.target.value)} ></textarea>
            </div>
            <div className="form-group">
                <label>Type Action</label>
                <select name="type_action" value={type_action} onChange={(e) => settype_action(e.target.value)} >
                    <option value="">Select Type</option>
                    <option value="Corrective">Corrective</option>
                    <option value="Preventive">Preventive</option>
                    <option value="Improvement">Improvement</option>
                </select>
            </div>

            <div className="form-group">
                <label>Source Action</label>
                <select name="source_action" value={source_action} onChange={(e) => setsource_action(e.target.value)} >
                    <option value="">Select Source</option>
                    <option value="Audit">Audit</option>
                    <option value="Customer Feedback">Customer Feedback</option>
                    <option value="Internal Review">Internal Review</option>
                </select>
            </div>

            <div className="form-group">
                <label>Cause Action</label>
                <select name="cause_action" value={cause_action} onChange={(e) => setcause_action(e.target.value)} >
                    <option value="">Select Cause</option>
                    <option value="Human Error">Human Error</option>
                    <option value="Equipment Failure">Equipment Failure</option>
                    <option value="Process Gap">Process Gap</option>
                </select>
            </div>

            <div className="form-group">
                <label>Gravité Action</label>
                <select name="gravite_action" value={gravite_action} onChange={(e) => setgravite_action(e.target.value)} >
                    <option value="">Select Gravité</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
            </div>

            <div className="form-group">
                <label>Priorité Action</label>
                <select name="priorite_action" value={priorite_action} onChange={(e) => setpriorite_action(e.target.value)} >
                    <option value="">Select Priorité</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
            </div>

            <div className="form-group">
                <label>Site</label>
                <select name="site" value={site} onChange={(e) => setsite(e.target.value)} >
                    <option value="">Select Site</option>
                    <option value="New York">New York</option>
                    <option value="Los Angeles">Los Angeles</option>
                    <option value="Chicago">Chicago</option>
                </select>
            </div>
            <div className="form-group">
                        <label>Responsable validation:</label>
                        {errors.responsable_validation && <p className="error-text">{errors.responsable_validation}</p>}
                        <select value={responsable_validationID} onChange={(e) => setresponsable_validation(e.target.value)}>
                            <option value="">Sélectionner...</option>
                            {responsable_validations.map(responsable_validation => (
                                <option key={responsable_validation.id} value={responsable_validation.id}>{responsable_validation.username}</option>
                            ))}
                        </select>
            </div>

            <div className="form-group">
                        <label>Plan:</label>
                        {errors.plan && <p className="error-text">{errors.plan}</p>}
                        <select value={plan} onChange={(e) => setplan(e.target.value)}>
                            <option value="">Sélectionner...</option>
                            {plans.map(plan => (
                                <option key={plan.id} value={plan.id}>{plan.description}</option>
                            ))}
                        </select>
            </div>

            <div className="form-group">
                <label>Pièce Jointe</label>
                <input type="file" name="piece_jointe" onChange={handleFileChange} className="form-control" />
            </div>

            <div className="button-group">
                        <button className="btn btn-primary" type="submit">
                            Ajouter action
                        </button>
                        <Link to="/AllRisque" className="btn btn-secondary">
                            Retour au tableau de bord
                        </Link>
                    </div>
        </form>
    );
};

export default CreateActionForm;
