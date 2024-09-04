import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Navigate, Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import '../Client/forms.css'; 
const AddEvaluationFournisseur = () => {
    const { id } = useParams();
    const [errors, setErrors] = useState({});
    const [pieces_jointes, setPiecesJointes] = useState(null);
    const [type_produit, setTypeProduit] = useState('');
    const [type_produits, setTypeProduits] = useState([]);
    const [critere_evaluation, setCritereEvaluation] = useState('');
    const [notes, setNotes] = useState('');
    const [commentaires, setCommentaires] = useState('');
    const [ajoutReussi, setAjoutReussi] = useState(false);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/fournisseur/types-produits/`)
            .then(response => setTypeProduits(response.data))
            .catch(error => console.error('Error fetching type:', error));
    }, [id]);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setPiecesJointes(selectedFile);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const wh = parseFloat(notes);
        if (isNaN(wh)) {
            alert('Notes doit être un nombre décimal.');
            return;
        }

        const formData = new FormData();
        formData.append('type_produit', type_produit);
        formData.append('critere_evaluation', critere_evaluation);
        formData.append('notes', notes);
        formData.append('commentaires', commentaires);
        if (pieces_jointes) {
            formData.append('pieces_jointes', pieces_jointes);
        }

        const headers = {
            'Accept': '*/*',
            'Content-Type': 'multipart/form-data',
            'X-CSRFToken': Cookies.get('csrftoken')
        };

        axios.post(`${process.env.REACT_APP_API_URL}/fournisseur/create_EvaluationFournisseur/${id}/`, formData, { headers })
            .then(response => {
                console.log('Évaluation créée avec succès:', response.data);
                setTypeProduit('');
                setCritereEvaluation('');
                setNotes('');
                setCommentaires('');
                setAjoutReussi(true);
            })
            .catch(error => {
                console.error('Error creating Evaluation:', error);
                setErrors(error.response?.data || { message: 'Une erreur s\'est produite lors de la création de l\'évaluation.' });
            });
    };

    if (ajoutReussi) {
        return <Navigate to={`/AllEvaluationFournisseur/${id}/`} />;
    }

    return (
        <main style={{ backgroundColor: '#eeeeee', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div className="container ajout-form">
                <div className="contact-image">
                    <img src="/images/add.png" alt="add_evaluation" />
                    <div className="button-container">
                        <Link to={`/AllEvaluationFournisseur/${id}/`}>
                            <button className="retour">Retour au tableau de bord</button>
                        </Link>
                        <button className="button-add" type="submit" form="add-evaluation-form">Ajouter Évaluation</button>
                    </div>
                </div>
                <form id="add-evaluation-form" onSubmit={handleSubmit} className="row">
                    <div className="col-md-6">
                        <div className="form-label">
                            <label className="form-label">Type de produit:</label>
                            <select className="form-control" value={type_produit} onChange={(e) => setTypeProduit(e.target.value)}>
                                <option value="">Sélectionner...</option>
                                {type_produits.map(type => (
                                    <option key={type.id} value={type.id}>{type.nom}</option>
                                ))}
                            </select>
                            {errors.type_produit && <p className="error-text">{errors.type_produit}</p>}
                        </div>
                        <div className="form-label">
                            <label className="form-label">Critères:</label>
                            <input type="text" className="form-control" placeholder="Critères" value={critere_evaluation} onChange={(e) => setCritereEvaluation(e.target.value)} />
                            {errors.critere_evaluation && <p className="error-text">{errors.critere_evaluation}</p>}
                        </div>
                        <div className="form-label">
                            <label className="form-label">Commentaires:</label>
                            <input type="text" className="form-control" placeholder="Commentaires" value={commentaires} onChange={(e) => setCommentaires(e.target.value)} />
                            {errors.commentaires && <p className="error-text">{errors.commentaires}</p>}
                        </div>
                        <div className="form-label">
                            <label className="form-label">Note sur 5:</label>
                            <input type="text" className="form-control" placeholder="Note sur 5" value={notes} onChange={(e) => setNotes(e.target.value)} />
                            {errors.notes && <p className="error-text">{errors.notes}</p>}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-label">
                            <label className="form-label">Pièces jointes:</label>
                            <input type="file" className="form-control" onChange={handleFileChange} />
                        </div>
                    </div>
                </form>
            </div>
        </main>
    );
};

export default AddEvaluationFournisseur;
