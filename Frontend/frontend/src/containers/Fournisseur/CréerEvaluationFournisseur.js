import React, { useState , useEffect} from 'react';
import axios from 'axios';
import { useParams ,Navigate,Link} from 'react-router-dom';
import Cookies from 'js-cookie';

const AddEvaluationFournisseur = () => {

    const { id } = useParams();


    const [errors, setErrors] = useState({});

    const [pieces_jointes, setPiecesJointes] = useState(null);
    const [type_produit, settype_produit] = useState('');
    const [type_produits, settype_produits] = useState([]);
    const [critere_evaluation, setcritere_evaluation] = useState('');
    const [notes, setnotes] = useState('');
    const [commentaires, setsetcommentaires] = useState('');

    const [ajoutReussi, setAjoutReussi] = useState(false);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/fournisseur/types-produits/`)
            .then(response => settype_produits(response.data))
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
            alert('notes doit être un nombre décimal.');
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
                console.log('Evaluation créé avec succès:', response.data);
                settype_produit('');
                setcritere_evaluation('');
                setnotes('');
                setsetcommentaires('');


                setAjoutReussi(true);
            })
            .catch(error => {
                console.error('Error creating Evaluation:', error);
                setErrors(error.response?.data || { message: 'Une erreur s\'est produite lors de la création du Evaluation.' });
            });
    };

    if (ajoutReussi) {
        return <Navigate to={`/AllEvaluationFournisseur/${id}/`}/>;
    }
    return (
        <div className="form-container">
            <div className="form-card">
                <h3>Ajouter Evaluation</h3>
                <form onSubmit={handleSubmit} className="form">
                <div className="form-group">
                    <label>Type de produit :</label>
                    <select value={type_produit} onChange={(e) => settype_produit(e.target.value)}>
                        <option value="">Sélectionner...</option>
                        {type_produits.map(type_produit => (
                            <option key={type_produit.id} value={type_produit.id}>{type_produit.nom}</option>
                        ))}
                    </select>
                    </div>
                    <div className="form-group">
                        <label>Critères:</label>
                        {errors.critere_evaluation && <p className="error-text">{errors.critere_evaluation}</p>}
                        <input type="text" name="critere_evaluation" value={critere_evaluation} onChange={(e) => setcritere_evaluation(e.target.value)} />

                    </div>
                    <div className="form-group">
                    <label>commentaires :</label>
                    {errors.commentaires && <p className="error-text">{errors.commentaires}</p>}
                    <input type="text" name="commentaires" value={commentaires} onChange={(e) => setsetcommentaires(e.target.value)} />
                    
                   </div>
                   <div className="form-group">
                    <label>Note sur 5 :</label>
                    {errors.notes && <p className="error-text">{errors.notes}</p>}
                    <input type="text" value={notes} onChange={(e) => setnotes(e.target.value)} />
                </div>
                    <div className="form-group">
                        <label>Pièces jointes :</label>
                        <input type="file" onChange={handleFileChange} />
                    </div>
                    <div className="button-group">
                        <button className="btn btn-success mt-3" type="submit">ajouter Evaluation</button>
                        <Link to={`/AllEvaluationFournisseur/${id}/`} className="btn btn-gray mt-3">Retour au tableau de bord</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddEvaluationFournisseur;
