import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './consulterindicateur.css';  
import { GrTrash } from 'react-icons/gr';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { CiSaveDown2 } from "react-icons/ci";

const Indicateur = () => {
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
        updated_at: null,
        updated_by: null,
        historique: [
            { date: '2024-07-28', action: 'Modification des détails', utilisateur: 'Admin' },
            { date: '2024-06-15', action: 'Ajout de la pièce jointe', utilisateur: 'User2' },
            { date: '2024-08-01', action: 'Création du fournisseur', utilisateur: 'user1' }
        ]
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setIndicateurs((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSave = () => {
        console.log('Indicateur data updated:', indicateurs);
    };

    return (
        <div className="container-indicateur px-4 mt-4">
            <nav className="nav-indicateur">
                <div className="nav-items-container">
                    <Link className="nav-item" to="#">Détails</Link>
                    <Link className="nav-item" to="/SuiviIndicateur/:id">Suivi</Link>
                </div>
                <Link className="nav-item-client" to={`/indicateurs`}><IoMdArrowRoundBack /> Retour</Link>
            </nav>
            <hr className="divider" />
            <div className="row">
                <div className="col-lg-4">
                    <div className="card-indicateur mb-4">
                        <div className="card-header-indicateur">Commentaire</div>
                        <div className="mb-3">
                            <input
                                className="form-control-fournisseur"
                                id="description"
                                name="description"
                                placeholder='Ecrire votre commentaire'
                            />
                        </div>
                    </div>
                    <div className="card-indicateur mb-4">
                        <div className="commentaire-card-header">Historique</div>
                        <div className="card-body-indicateur">
                            <ul className="list-group list-group-flush">
                                {indicateurs.historique.map((entry, index) => (
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
                                <div className="mb-3">
                                    <label className="form-label-indicateur mb-1" htmlFor="inputPieceJointe">Pièce Jointe</label>
                                    
                                    <input
                                        type="file"
                                        onChange={handleChange}
                                        className="form-control-indicateur"
                                    />
                               
                                </div>
                               
                                
                                <div className="d-flex justify-content-end">
                                    <button className="btn btn-save" type="button" onClick={handleSave}>
                                        <CiSaveDown2 /> Enregistrer
                                    </button>
                                    <button className="btn btn-delete ms-2" type="button">
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
