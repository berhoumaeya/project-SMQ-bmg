import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './consulterindicateur.css';  
import { GrTrash } from 'react-icons/gr';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { CiSaveDown2 } from 'react-icons/ci';

const Indicateur = () => {
    // Initialisez les données statiques
    const [indicateurs, setIndicateurs] = useState({
        Libelle: 'Exemple Libelle',
        type_indicateur: 'Exemple Type',
        processus_lie: 'Exemple Processus',
        axe_politique_qualite: 'Exemple Axe',
        type_resultat_attendu: 'Exemple Type Résultat',
        date_debut: '2024-01-01',
        periodicite_indicateur: 'Exemple Périodicité',
        type_suivi: 'Exemple Type Suivi',
        valeur_cible: 'Exemple Valeur',
        limite_critique: 'Exemple Limite',
        piece_jointe: 'example.pdf',
        created_by: 'User1',
        created_at: '2024-08-01',
        updated_at: '',
        updated_by: '',
    });

    // Fonction de gestion des changements
    const handleChange = (e) => {
        const { name, value } = e.target;
        setIndicateurs((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Fonction de sauvegarde
    const handleSave = () => {
        console.log('Indicateur data updated:', indicateurs);
    };

    return (
        <div className="container-indicateur px-4 mt-4">
            <nav className="nav-indicateur">
                <Link className="nav-item active ms-0" to="#">Détails</Link>
            </nav>
            <hr className="divider" />
            <div className="row">
                <div className="col-lg-12">
                    <div className="card-indicateur mb-4">
                        <div className="card-header-indicateur">Détails de l'Indicateur</div>
                        <div className="card-body-indicateur">
                            <form onSubmit={(e) => e.preventDefault()}>
                                <div className="row gx-3 mb-3">
                                    <div className="col-md-6">
                                        <label className="form-label-indicateur mb-1" htmlFor="inputLibelle">Libelle</label>
                                        <input
                                            className="form-control-indicateur"
                                            id="inputLibelle"
                                            name="Libelle"
                                            type="text"
                                            value={indicateurs.Libelle}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label-indicateur mb-1" htmlFor="inputTypeIndicateur">Type Indicateur</label>
                                        <input
                                            className="form-control-indicateur"
                                            id="inputTypeIndicateur"
                                            name="type_indicateur"
                                            type="text"
                                            value={indicateurs.type_indicateur}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="row gx-3 mb-3">
                                    <div className="col-md-6">
                                        <label className="form-label-indicateur mb-1" htmlFor="inputProcessusLie">Processus Lié</label>
                                        <input
                                            className="form-control-indicateur"
                                            id="inputProcessusLie"
                                            name="processus_lie"
                                            type="text"
                                            value={indicateurs.processus_lie}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label-indicateur mb-1" htmlFor="inputAxePolitiqueQualite">Axe Politique Qualité</label>
                                        <input
                                            className="form-control-indicateur"
                                            id="inputAxePolitiqueQualite"
                                            name="axe_politique_qualite"
                                            type="text"
                                            value={indicateurs.axe_politique_qualite}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="row gx-3 mb-3">
                                    <div className="col-md-6">
                                        <label className="form-label-indicateur mb-1" htmlFor="inputTypeResultatAttendu">Type Résultat Attendu</label>
                                        <input
                                            className="form-control-indicateur"
                                            id="inputTypeResultatAttendu"
                                            name="type_resultat_attendu"
                                            type="text"
                                            value={indicateurs.type_resultat_attendu}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label-indicateur mb-1" htmlFor="inputDateDebut">Date Début</label>
                                        <input
                                            className="form-control-indicateur"
                                            id="inputDateDebut"
                                            name="date_debut"
                                            type="date"
                                            value={indicateurs.date_debut}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="row gx-3 mb-3">
                                    <div className="col-md-6">
                                        <label className="form-label-indicateur mb-1" htmlFor="inputPeriodiciteIndicateur">Périodicité Indicateur</label>
                                        <input
                                            className="form-control-indicateur"
                                            id="inputPeriodiciteIndicateur"
                                            name="periodicite_indicateur"
                                            type="text"
                                            value={indicateurs.periodicite_indicateur}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label-indicateur mb-1" htmlFor="inputTypeSuivi">Type Suivi</label>
                                        <input
                                            className="form-control-indicateur"
                                            id="inputTypeSuivi"
                                            name="type_suivi"
                                            type="text"
                                            value={indicateurs.type_suivi}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="row gx-3 mb-3">
                                    <div className="col-md-6">
                                        <label className="form-label-indicateur mb-1" htmlFor="inputValeurCible">Valeur Cible</label>
                                        <input
                                            className="form-control-indicateur"
                                            id="inputValeurCible"
                                            name="valeur_cible"
                                            type="text"
                                            value={indicateurs.valeur_cible}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label-indicateur mb-1" htmlFor="inputLimiteCritique">Limite Critique</label>
                                        <input
                                            className="form-control-indicateur"
                                            id="inputLimiteCritique"
                                            name="limite_critique"
                                            type="text"
                                            value={indicateurs.limite_critique}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="row gx-3 mb-3">
                                    <div className="col-md-6">
                                        <label className="form-label-indicateur mb-1" htmlFor="inputPieceJointe">Pièce Jointe</label>
                                        <input
                                            className="form-control-indicateur"
                                            id="inputPieceJointe"
                                            name="piece_jointe"
                                            type="text"
                                            value={indicateurs.piece_jointe}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label-indicateur mb-1" htmlFor="inputCreatedBy">Créé Par</label>
                                        <input
                                            className="form-control-indicateur"
                                            id="inputCreatedBy"
                                            name="created_by"
                                            type="text"
                                            value={indicateurs.created_by}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="row gx-3 mb-3">
                                    <div className="col-md-6">
                                        <label className="form-label-indicateur mb-1" htmlFor="inputCreatedAt">Créé Le</label>
                                        <input
                                            className="form-control-indicateur"
                                            id="inputCreatedAt"
                                            name="created_at"
                                            type="text"
                                            value={indicateurs.created_at}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label-indicateur mb-1" htmlFor="inputUpdatedAt">Mis à Jour Le</label>
                                        <input
                                            className="form-control-indicateur"
                                            id="inputUpdatedAt"
                                            name="updated_at"
                                            type="text"
                                            value={indicateurs.updated_at}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="row gx-3 mb-3">
                                    <div className="col-md-6">
                                        <label className="form-label-indicateur mb-1" htmlFor="inputUpdatedBy">Mis à Jour Par</label>
                                        <input
                                            className="form-control-indicateur"
                                            id="inputUpdatedBy"
                                            name="updated_by"
                                            type="text"
                                            value={indicateurs.updated_by}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="d-flex justify-content-end mt-4">
                                    <button type="button" className="btn btn-secondary me-2" onClick={() => { /* logic for returning */ }}>
                                        <IoMdArrowRoundBack /> Retour
                                    </button>
                                    <button type="button" className="btn btn-primary me-2" onClick={handleSave}>
                                        <CiSaveDown2 /> Sauvegarder
                                    </button>
                                    <button type="button" className="btn btn-danger">
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

export default Indicateur;
