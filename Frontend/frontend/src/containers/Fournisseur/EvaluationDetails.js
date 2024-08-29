import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { GrTrash } from 'react-icons/gr';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { CiSaveDown2 } from "react-icons/ci";
import './consulterfou.css';

const sampleEvaluations = [
    {
        id: 1,
        type_produit: 'Type A',
        critere_evaluation: 'Critère 1',
        notes: '8/10',
      
        periodicite_evaluation: 'Annuel',
        pieces_jointes: true,
        description: 'Bon produit',
        historique: [
            { date: '2024-08-10', action: 'Création de l\'évaluation', utilisateur: 'Utilisateur Y' },
            { date: '2024-08-12', action: 'Modification de l\'évaluation', utilisateur: 'Utilisateur Z' },
            { date: '2024-06-15', action: 'Ajout de la pièce jointe', utilisateur: 'User2' },
        ]
    },
];

const EvaluationDetails = () => {
    const { id } = useParams();
    const [evaluation, setEvaluation] = useState(null);

    useEffect(() => {
        const fetchedEvaluation = sampleEvaluations.find(e => e.id === parseInt(id));
        setEvaluation(fetchedEvaluation);
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEvaluation((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleDelete = () => {
        alert("Évaluation supprimée");
    };

    if (!evaluation) {
        return <p>Loading...</p>;
    }

    return (
        <div className="container-fournisseur px-4 mt-4">
            <nav className="nav-fournisseur">
                <div className="nav-items-container">
                    <Link className="nav-item active ms-0" to="#">Evaluation</Link>
                </div>
                <Link className="btn btn-return" to={`/AllEvaluationFournisseur/:id`}><IoMdArrowRoundBack /> Retour</Link>
            </nav>

            <hr className="divider" />
            <div className="row">

                <div className="col-lg-4">
                    <div className="card-fournisseur mb-4">
                        <div className="card-header-fournisseur">Description</div>
                        <div className="card-body-fournisseur">
                            <div className="mb-3">
                                <input
                                    className="form-control-fournisseur"
                                    id="description"
                                    name="description"
                                    value={evaluation.description}
                                        placeholder="Ajouter une description "
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>
                    
                    <div className="card-fournisseur mb-4">
                    <div className="commentaire-card-header">Historique</div>
                        <div className="card-body-fournisseur">
                            <ul className="list-group list-group-flush">
                                {evaluation.historique.map((entry, index) => (
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
                        <div className="card-header-fournisseur">Détails de l'Évaluation</div>
                        <div className="card-body-fournisseur">
                            <form>
                                <div className="row gx-3 mb-3">
                                    <label className="form-label-fournisseur mb-1" htmlFor="type_produit">Type produit</label>
                                    <input
                                        className="form-control-fournisseur"
                                        id="type_produit"
                                        name="type_produit"
                                        type="text"
                                        value={evaluation.type_produit}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label-fournisseur" htmlFor="critere_evaluation">Critère évaluation</label>
                                    <input
                                        className="form-control-fournisseur"
                                        id="critere_evaluation"
                                        name="critere_evaluation"
                                        type="text"
                                        value={evaluation.critere_evaluation}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label-fournisseur" htmlFor="notes">Notes</label>
                                    <input
                                        className="form-control-fournisseur"
                                        id="notes"
                                        name="notes"
                                        type="text"
                                        value={evaluation.notes}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label-fournisseur" htmlFor="periodicite_evaluation">Périodicité évaluation</label>
                                    <input
                                        className="form-control-fournisseur"
                                        id="periodicite_evaluation"
                                        name="periodicite_evaluation"
                                        type="text"
                                        value={evaluation.periodicite_evaluation}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label-fournisseur">Pièces jointes</label>
                                    <div className="form-check-fournisseur">
                                        <input
                                            className="form-check-input-fournisseur"
                                            id="pieces_jointes"
                                            name="pieces_jointes"
                                            type="checkbox"
                                            checked={evaluation.pieces_jointes}
                                            onChange={() => setEvaluation((prevData) => ({ ...prevData, pieces_jointes: !prevData.pieces_jointes }))}
                                        />
                                        <label className="form-check-label-fournisseur" htmlFor="pieces_jointes">
                                            {evaluation.pieces_jointes ? "Consulter" : "Aucune"}
                                        </label>
                                    </div>
                                </div>
                                <div className="text-end">
                                    <button type="submit" className="btn btn-primary"><CiSaveDown2 /> Sauvgarder</button>
                                    <button type="button" className="btn btn-danger ms-2" onClick={handleDelete}><GrTrash /> Supprimer</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EvaluationDetails;
