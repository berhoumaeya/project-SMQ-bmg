
import React, { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import '../Fournisseur/consulterfou.css'; 
import { GrTrash } from 'react-icons/gr';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { CiSaveDown2 } from 'react-icons/ci';

const ModifierConformite = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // Initialize formData with static data
    const [formData, setFormData] = useState({
        nom: 'Conformité A',
        type_fiche: 'Sécurité',
        sources: [
            { id: 1, designation: 'Source 1' },
            { id: 2, designation: 'Source 2' }
        ],
        source: '1',
        type_decideur: 'Manager',
        exigence_dec: true,
        nom_reglementation: 'ISO 9001',
        applicable: true,
        plan_actions: [
            { id: 1, nom_action: 'Plan A' },
            { id: 2, nom_action: 'Plan B' }
        ],
        plan_action: '1',
        pieces_jointes: null,
        
        historique: [
            { date: '2024-01-01', action: 'Création ', utilisateur: 'User 1' },
            { date: '2024-02-01', action: 'Modification ', utilisateur: 'John Doe' },
            
        ]
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        setFormData(prevData => ({
            ...prevData,
            pieces_jointes: e.target.files[0]
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Basic validation example
        const newErrors = {};
        if (!formData.type_fiche) newErrors.type_fiche = 'Type fiche is required';
        if (!formData.source) newErrors.source = 'Source is required';
        if (formData.exigence_dec && !formData.nom_reglementation) newErrors.nom_reglementation = 'Nom régulation is required';
        if (formData.exigence_dec && !formData.plan_action) newErrors.plan_action = 'Plan action is required';
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        console.log('Form data:', formData);
        navigate('/AllConformite');
    };

    const handleDelete = () => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer cette conformité ?')) {
            console.log('Conformité supprimée');
            navigate('/AllConformite');
        }
    };

    return (
        <div className="container-fournisseur px-4 mt-4">
            <nav className="nav-fournisseur">
                <div className="nav-items-container">
                    <Link className="nav-item active" to="#">Modifier conformité</Link>
                </div>
                <Link className="nav-item-client" to={`/AllConformite`}><IoMdArrowRoundBack /> Retour</Link>
            </nav>
            <hr className="divider" />
            <div className="row">
                <div className="col-lg-4">
                    <div className="card-fournisseur mb-4">
                        <div className="card-header-fournisseur">commentaire </div>
                        <div className="card-body-fournisseur text-center">
                           
                            <div className="mt-3">
                              
                            <input
                                className="form-control-fournisseur"
                                placeholder="Ajouter un commentaire"
                            />
                            </div>
                        </div>
                    </div>
                    <div className="commentaire-section">
                        <div className="commentaire-card-header">Historique</div>
                        <div className="commentaire-card-body">

                        <ul className="list-group list-group-flush">
                                {formData.historique.map((entry, index) => (
                                    <li key={index} className="list-group-item">
                                        <div>
                                            <strong>{entry.action}</strong><br />
                                            <small>{entry.date} - {entry.utilisateur}</small>
                                        </div>
                                    </li>
                                ))}
                            </ul>

                        </div>
                    </div>
                </div>

                <div className="col-lg-8">
                    <div className="card-fournisseur mb-4">
                        <div className="card-header-fournisseur">Modifier Conformité</div>
                        <div className="card-body-fournisseur">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label>Type fiche:</label>
                                    {errors.type_fiche && <p className="error-text">{errors.type_fiche}</p>}
                                    <select
                                        name="type_fiche"
                                        value={formData.type_fiche}
                                        onChange={handleChange}
                                        className="form-control-fournisseur"
                                    >
                                        <option value="">Sélectionner...</option>
                                        <option value="Sécurité">Sécurité</option>
                                        <option value="Environnement">Environnement</option>
                                        <option value="Qualité">Qualité</option>
                                        <option value="Autre">Autre</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label>Source:</label>
                                    {errors.source && <p className="error-text">{errors.source}</p>}
                                    <select
                                        name="source"
                                        value={formData.source}
                                        onChange={handleChange}
                                        className="form-control-fournisseur"
                                    >
                                        <option value="">Sélectionner...</option>
                                        {formData.sources.map(source => (
                                            <option key={source.id} value={source.id}>{source.designation}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label>Exigence :</label>
                                    <input
                                        type="checkbox"
                                        name="exigence_dec"
                                        checked={formData.exigence_dec}
                                        onChange={(e) => setFormData(prevData => ({
                                            ...prevData,
                                            exigence_dec: e.target.checked
                                        }))}
                                    />
                                </div>

                                {formData.exigence_dec && (
                                    <>
                                        <div className="form-group">
                                            <label>Nom régulation:</label>
                                            {errors.nom_reglementation && <p className="error-text">{errors.nom_reglementation}</p>}
                                            <input
                                                type="text"
                                                name="nom_reglementation"
                                                value={formData.nom_reglementation}
                                                onChange={handleChange}
                                                className="form-control-fournisseur"
                                                required
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label>Applicable ? :</label>
                                            <input
                                                type="checkbox"
                                                name="applicable"
                                                checked={formData.applicable}
                                                onChange={(e) => setFormData(prevData => ({
                                                    ...prevData,
                                                    applicable: e.target.checked
                                                }))}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label>Plan Actions:</label>
                                            {errors.plan_action && <p className="error-text">{errors.plan_action}</p>}
                                            <select
                                                name="plan_action"
                                                value={formData.plan_action}
                                                onChange={handleChange}
                                                className="form-control-fournisseur"
                                            >
                                                <option value="">Sélectionner...</option>
                                                {formData.plan_actions.map(plan_action => (
                                                    <option key={plan_action.id} value={plan_action.id}>{plan_action.nom_action}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </>
                                )}
                                    <div className="form-group">
                                    <label>Pièces jointes :</label>
                                    <input
                                        type="file"
                                        onChange={handleFileChange}
                                        className="form-control-file"
                                    />
                                </div>

                                <div className="text-end">
                                    <button type="submit" className="btn btn-primary">
                                        <CiSaveDown2 /> Sauvegarder
                                    </button>
                                    <button type="button" className="btn btn-danger ms-2" onClick={handleDelete}>
                                        <GrTrash /> Supprimer
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModifierConformite;
