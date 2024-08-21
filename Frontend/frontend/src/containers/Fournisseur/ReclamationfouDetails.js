import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { GrTrash } from 'react-icons/gr';
import { IoMdArrowRoundBack} from 'react-icons/io';
import { CiSaveDown2 } from "react-icons/ci";
import './consulterfou.css';

// Sample reclamations data, replace this with real API call in production
const sampleReclamations = [
    {
        id: 1,
        numero_sequentiel: '12345',
        date_reclamation: '2024-08-13',
        description: 'Description de la réclamation.',
        designation: 'Désignation',
        type_reclamation: 'Type A',
        gravite: 'Élevée',
        actions: 'Actions effectuées',
        reclamation_client: 'Client X',
        created_by: 'Utilisateur Y',
        created_at: '2024-08-10',
        updated_by: 'Utilisateur Z',
        updated_at: '2024-08-12',
        pieces_jointes: true,
    },
    // Add more static data as needed
];

const ReclamationfouDetails = () => {
    const { id } = useParams();
    const [reclamation, setReclamation] = useState(null);

    useEffect(() => {
        const fetchedReclamation = sampleReclamations.find(r => r.id === parseInt(id));
        setReclamation(fetchedReclamation);
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setReclamation((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
      
       const handleDelete = () => {
      //delete logique 
        alert("Réclamation supprimée");
        
    };

    if (!reclamation) {
        return <p>Loading...</p>;
    }

    return (
        <div className="container-fournisseur px-4 mt-4">
            <nav className="nav-fournisseur">

                <Link className="nav-item active ms-0" to="#">Réclamation</Link>
            </nav>
            <hr className="divider" />
            <div className="row">
                <div className="col-lg-4">
                    <div className="card-fournisseur mb-4">
                        <div className="card-header-fournisseur">Profile Picture</div>
                        <div className="card-body-fournisseur text-center">
                            <img className="img-fournisseur rounded-circle mb-2" src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="Reclamation" />
          
                        </div>
                    </div>
                </div>
                <div className="col-lg-8">
                    <div className="card-fournisseur mb-4">
                        <div className="card-header-fournisseur">Détails de la Réclamation</div>
                        <div className="card-body-fournisseur">
                            <form>
                                <div className="mb-3">
                                    <label className="form-label-fournisseur" htmlFor="numero_sequentiel">N° Réclamation</label>
                                    <input
                                        className="form-control-fournisseur"
                                        id="numero_sequentiel"
                                        name="numero_sequentiel"
                                        type="text"
                                        value={reclamation.numero_sequentiel}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label-fournisseur" htmlFor="date_reclamation">Date</label>
                                    <input
                                        className="form-control-fournisseur"
                                        id="date_reclamation"
                                        name="date_reclamation"
                                        type="date"
                                        value={reclamation.date_reclamation}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label-fournisseur" htmlFor="description">Description</label>
                                    <textarea
                                        className="form-control-fournisseur"
                                        id="description"
                                        name="description"
                                        value={reclamation.description}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label-fournisseur" htmlFor="designation">Désignation</label>
                                    <input
                                        className="form-control-fournisseur"
                                        id="designation"
                                        name="designation"
                                        type="text"
                                        value={reclamation.designation}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label-fournisseur" htmlFor="type_reclamation">Type</label>
                                    <input
                                        className="form-control-fournisseur"
                                        id="type_reclamation"
                                        name="type_reclamation"
                                        type="text"
                                        value={reclamation.type_reclamation}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label-fournisseur" htmlFor="gravite">Gravité</label>
                                    <input
                                        className="form-control-fournisseur"
                                        id="gravite"
                                        name="gravite"
                                        type="text"
                                        value={reclamation.gravite}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label-fournisseur" htmlFor="actions">Actions</label>
                                    <input
                                        className="form-control-fournisseur"
                                        id="actions"
                                        name="actions"
                                        type="text"
                                        value={reclamation.actions}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label-fournisseur" htmlFor="reclamation_client">Client</label>
                                    <input
                                        className="form-control-fournisseur"
                                        id="reclamation_client"
                                        name="reclamation_client"
                                        type="text"
                                        value={reclamation.reclamation_client}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="row gx-3 mb-3">
                                    <div className="col-md-6">
                                        <label className="form-label-fournisseur" htmlFor="created_by">Créé par</label>
                                        <input
                                            className="form-control-fournisseur"
                                            id="created_by"
                                            name="created_by"
                                            type="text"
                                            value={reclamation.created_by}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label-fournisseur" htmlFor="created_at">Créé à</label>
                                        <input
                                            className="form-control-fournisseur"
                                            id="created_at"
                                            name="created_at"
                                            type="date"
                                            value={reclamation.created_at}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="row gx-3 mb-3">
                                    <div className="col-md-6">
                                        <label className="form-label-fournisseur" htmlFor="updated_by">Modifié par</label>
                                        <input
                                            className="form-control-fournisseur"
                                            id="updated_by"
                                            name="updated_by"
                                            type="text"
                                            value={reclamation.updated_by}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label-fournisseur" htmlFor="updated_at">Modifié à</label>
                                        <input
                                            className="form-control-fournisseur"
                                            id="updated_at"
                                            name="updated_at"
                                            type="date"
                                            value={reclamation.updated_at}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label-fournisseur">Pièces jointes</label>
                                    <div className="form-check-fournisseur">
                                        <input
                                            className="form-check-input-fournisseur"
                                            id="pieces_jointes"
                                            name="pieces_jointes"
                                            type="checkbox"
                                            checked={reclamation.pieces_jointes}
                                            onChange={() => setReclamation((prevData) => ({ ...prevData, pieces_jointes: !prevData.pieces_jointes }))}
                                        />
                                        <label className="form-check-label-fournisseur" htmlFor="pieces_jointes">
                                            {reclamation.pieces_jointes ? "Consulter" : "Aucune"}
                                        </label>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-end mt-4">
                                <button className="btn-save-fournisseur" type="submit"> <CiSaveDown2 /> save </button>
                                <button className="btn-delete-fournisseur ms-2" type="button" onClick={handleDelete}>     <GrTrash /> Delete</button>
                                <Link to="/Clients" className="btn btn-secondary ms-2">  <IoMdArrowRoundBack />Retour 
                      </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReclamationfouDetails;
