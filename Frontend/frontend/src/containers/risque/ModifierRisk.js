
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import '../Fournisseur/consulterfou.css'; 
import { GrTrash } from 'react-icons/gr';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { CiSaveDown2 } from 'react-icons/ci';

const ModifierRisk = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        nom_risk: 'Risque de sécurité',
        date_declaration: '2024-08-20',
        declencheur: 'Faille de sécurité dans le système',
        liste_concernee: 'Département IT',
        type_risque: 'MENACE',
        criteres: [
            { nom: 'Probabilité occurrence', note: 5 },
            { nom: 'Impact', note: 7 }
        ],
        methode_calcul: 'Calcul basé sur l’impact et la probabilité',
        historique: [
            { date: '2024-01-01', action: 'Création ', utilisateur: 'User 1' },
            { date: '2024-02-01', action: 'Modification ', utilisateur: 'John Doe' },
            
        ]
    });

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    // Handle criterion changes
    const handleCriterionChange = (index, e) => {
        const { name, value } = e.target;
        const updatedCriteres = [...formData.criteres];
        updatedCriteres[index] = { ...updatedCriteres[index], [name]: value };
        setFormData((prevData) => ({
            ...prevData,
            criteres: updatedCriteres
        }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form data:', formData);
        navigate('/AllRisque');
    };

    const handleDelete = () => {

        if (window.confirm('Êtes-vous sûr de vouloir supprimer ce risque ?')) {
            
            console.log('Risque supprimé');
            navigate('/AllRisque'); 
        }
    };

    return (
        <div className="container-fournisseur px-4 mt-4">
            <nav className="nav-fournisseur">
                <div className="nav-items-container">
                    <Link className="nav-item active" to="#">Modifier risque</Link>
                </div>
                <Link className="nav-item-client" to={`/AllRisque`}><IoMdArrowRoundBack /> Retour</Link>
            </nav>
            <hr className="divider" />
            <div className="row">
                <div className="col-lg-4">
                    <div className="card-fournisseur mb-4">
                        <div className="card-header-fournisseur">Commentaire</div>
                        <div className="commentaire-card-body">
                        <input
                                className="form-control-fournisseur"
                                placeholder="Ajouter un commentaire"
                            />
                        </div>
                    </div>
                    <div className="commentaire-section">
                        <div className="commentaire-card-header">Historique</div>
                        <div className="card-body-fournisseur ">
                           
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
                        <div className="card-header-fournisseur">Modifier Risque</div>
                        <div className="card-body-fournisseur">
                            <form onSubmit={handleSubmit}>
                                <div className="row gx-3 mb-3">
                                    <div className="col-md-6">
                                        <label className="form-label-fournisseur mb-1" htmlFor="inputNomRisk">Nom du Risque</label>
                                        <input
                                            className="form-control-fournisseur"
                                            id="inputNomRisk"
                                            name="nom_risk"
                                            type="text"
                                            value={formData.nom_risk}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label-fournisseur mb-1" htmlFor="inputDateDeclaration">Date de Déclaration</label>
                                        <input
                                            className="form-control-fournisseur"
                                            id="inputDateDeclaration"
                                            name="date_declaration"
                                            type="date"
                                            value={formData.date_declaration}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="row gx-3 mb-3">
                                    <div className="col-md-6">
                                        <label className="form-label-fournisseur mb-1" htmlFor="inputDeclencheur">Déclencheur</label>
                                        <select
                                            className="form-control-fournisseur"
                                            id="inputDeclencheur"
                                            name="declencheur"
                                            value={formData.declencheur}
                                            onChange={handleChange}
                                        >
                                            <option value="Faille de sécurité dans le système">Faille de sécurité dans le système</option>
                                            <option value="Attaque de phishing">Attaque de phishing</option>
                                            <option value="Panne équipement">Panne équipement</option>
                                            <option value="Erreur humaine">Erreur humaine</option>
                                        </select>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label-fournisseur mb-1" htmlFor="inputListeConcernee">Liste Concernée</label>
                                        <select
                                            className="form-control-fournisseur"
                                            id="inputListeConcernee"
                                            name="liste_concernee"
                                            value={formData.liste_concernee}
                                            onChange={handleChange}
                                        >
                                            <option value="Département IT">Département IT</option>
                                            <option value="Équipe de production">Équipe de production</option>
                                            <option value="Clients">Clients</option>
                                            <option value="Fournisseurs">Fournisseurs</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="row gx-3 mb-3">
                                    <div className="col-md-6">
                                        <label className="form-label-fournisseur mb-1" htmlFor="inputTypeRisque">Type Risque</label>
                                        <select
                                            className="form-control-fournisseur"
                                            id="inputTypeRisque"
                                            name="type_risque"
                                            value={formData.type_risque}
                                            onChange={handleChange}
                                        >
                                            <option value="MENACE">Menace</option>
                                            <option value="OPPORTUNITE">Opportunité</option>
                                        </select>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label-fournisseur mb-1" htmlFor="inputMethodeCalcul">Méthode de Calcul</label>
                                        <input
                                            className="form-control-fournisseur"
                                            id="inputMethodeCalcul"
                                            name="methode_calcul"
                                            type="text"
                                            value={formData.methode_calcul}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                {formData.criteres.map((critere, index) => (
                                    <div key={index} className="row gx-3 mb-3">
                                        <div className="col-md-6">
                                            <label className="form-label-fournisseur mb-1">Critère {index + 1}</label>
                                            <select
                                                className="form-control-fournisseur"
                                                name="nom"
                                                value={critere.nom}
                                                onChange={(e) => handleCriterionChange(index, e)}
                                            >
                                                <option value="Probabilité occurrence">Probabilité occurrence</option>
                                                <option value="Impact">Impact</option>
                                                <option value="Vulnérabilité">Vulnérabilité</option>
                                                <option value="Mesures de contrôle existantes">Mesures de contrôle existantes</option>
                                                <option value="Capacité de détection">Capacité de détection</option>
                                                <option value="Tendance">Tendance</option>
                                            </select>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label-fournisseur mb-1">Note</label>
                                            <input
                                                className="form-control-fournisseur"
                                                type="number"
                                                name="note"
                                                value={critere.note}
                                                onChange={(e) => handleCriterionChange(index, e)}
                                                min="1"
                                                max="10"
                                            />
                                            {index > 0 && (
                                                <FontAwesomeIcon
                                                    icon={faMinus}
                                                    style={{ cursor: 'pointer', marginLeft: '10px' }}
                                                />
                                            )}
                                        </div>
                                    </div>
                                ))}
                                <FontAwesomeIcon
                                    icon={faPlus}
                                    style={{ cursor: 'pointer', marginTop: '10px' }}
                                />
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

export default ModifierRisk;
