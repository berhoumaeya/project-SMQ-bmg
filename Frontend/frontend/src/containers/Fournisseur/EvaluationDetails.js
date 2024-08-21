import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { GrTrash } from 'react-icons/gr';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { CiSaveDown2 } from "react-icons/ci";
import './consulterfou.css';
const EvaluationDetails = () => {
    const { id } = useParams();

    // Static evaluations data
    const evaluations = [
        {
            id: 1,
            type_produit: "Type A",
            critere_evaluation: "Critère 1",
            notes: "8/10",
            commentaires: "Bon produit",
            periodicite_evaluation: "Annuel",
            pieces_jointes: true,
        },
        {
            id: 2,
            type_produit: "Type B",
            critere_evaluation: "Critère 2",
            notes: "7/10",
            commentaires: "Satisfaisant",
            periodicite_evaluation: "Semestriel",
            pieces_jointes: false,
        },
    ];

    const [evaluation, setEvaluation] = useState(null);

    useEffect(() => {
        const fetchedEvaluation = evaluations.find(e => e.id === parseInt(id));
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
        // Implement delete logic here
        alert("Évaluation supprimée");
    };

    if (!evaluation) {
        return <p>Loading...</p>;
    }

    return (
        <div className="container-fournisseur px-4 mt-4">
            <nav className="nav-fournisseur">
                <Link className="nav-item active ms-0" to="#">Évaluation</Link>
            </nav>
            <hr className="divider" />
            <div className="row">
                <div className="col-lg-4">
                    <div className="card-fournisseur mb-4">
                        <div className="card-header-fournisseur">Profile Picture</div>
                        <div className="card-body-fournisseur text-center">
                            <img className="img-fournisseur rounded-circle mb-2" src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="Evaluation" />
                        </div>
                    </div>
                </div>
                <div className="col-lg-8">
                    <div className="card-fournisseur mb-4">
                        <div className="card-header-fournisseur">Détails de l'Évaluation</div>
                        <div className="card-body-fournisseur">
                            <form>
                                <div className="mb-3">
                                    <label className="form-label-fournisseur" htmlFor="type_produit">Type produit</label>
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
                                    <label className="form-label-fournisseur" htmlFor="commentaires">Commentaires</label>
                                    <textarea
                                        className="form-control-fournisseur"
                                        id="commentaires"
                                        name="commentaires"
                                        value={evaluation.commentaires}
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
                                <div className="d-flex justify-content-end mt-4">
                                    <button className="btn-save-fournisseur" type="submit"> <CiSaveDown2 /> Save</button>
                                    <button className="btn-delete-fournisseur ms-2" type="button" onClick={handleDelete}> <GrTrash /> Delete</button>
                                    <Link to="/AllEvaluationFournisseur/:id" className="btn btn-secondary ms-2"> <IoMdArrowRoundBack /> Retour</Link>
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
