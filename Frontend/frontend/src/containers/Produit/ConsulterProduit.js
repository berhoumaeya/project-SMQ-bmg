import React, { useState } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import '../Fournisseur/consulterfou.css';
import { GrTrash } from 'react-icons/gr';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { CiSaveDown2 } from 'react-icons/ci';

const ConsulterProduit = () => {
    const { id } = useParams();
    const [productData, setProductData] = useState({
        id: 1,
        date_detection: '2024-01-01',
        designation_produit_non_conforme: 'Produit 1',
        reclamation_client: 'Client 1',
        description_non_conformite: 'Description 1',
        produits_non_conformes: 'Produit 1',
        type_non_conformite: 'Type 1',
        source_non_conformite: 'Source 1',
        niveau_gravite: 'Grave',
        created_by: 'User 1',
        created_at: '2024-01-01',
        updated_by: 'User 2',
        updated_at: '2024-02-01'
    });
    const [deleteReussi, setDeleteReussi] = useState(false);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleDelete = () => {
        setDeleteReussi(true);
    };

    const validateForm = () => {
        const newErrors = {};
        if (!productData.designation_produit_non_conforme) newErrors.designation_produit_non_conforme = "La désignation est requise";
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        console.log('Produit data updated:', productData);
    };

    if (deleteReussi) {
        return <Navigate to="/allProduit" />;
    }

    return (
        <div className="container-fournisseur px-4 mt-4">
            <nav className="nav-fournisseur">
                <div className="nav-items-container">
                    <Link className="nav-item active" to="#">Produit non conforme</Link>
                </div>
                <Link className="btn btn-return" to={`/DashboardProduit`}><IoMdArrowRoundBack /> Retour</Link>
            </nav>
            <hr className="divider" />
            <div className="row">
                <div className="col-lg-4">
                    <div className="card-fournisseur mb-4">
                        <div className="card-header-fournisseur">Image du produit</div>
                        <div className="card-body-fournisseur text-center">
                            <img className="img-fournisseur rounded-circle mb-2" src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="Produit" />
                        </div>
                    </div>
                    <div className="commentaire-section">
                        <div className="commentaire-card-header">Commentaires</div>
                        <div className="commentaire-card-body">
                            <textarea
                                className="form-control-fournisseur"
                                placeholder="Ajouter un commentaire"
                            />
                        </div>
                    </div>
                </div>
                <div className="col-lg-8">
                    <div className="card-fournisseur mb-4">
                        <div className="card-header-fournisseur">Détails du produit</div>
                        <div className="card-body-fournisseur">
                            <form onSubmit={handleSubmit}>
                                <div className="row gx-3 mb-3">
                                    <div className="col-md-6">
                                        <label className="form-label-fournisseur mb-1" htmlFor="inputDesignationProduit">Désignation du produit non conforme</label>
                                        <input
                                            className={`form-control-fournisseur ${errors.designation_produit_non_conforme ? 'is-invalid' : ''}`}
                                            id="inputDesignationProduit"
                                            name="designation_produit_non_conforme"
                                            type="text"
                                            value={productData.designation_produit_non_conforme}
                                            onChange={handleChange}
                                        />
                                        {errors.designation_produit_non_conforme && <div className="invalid-feedback">{errors.designation_produit_non_conforme}</div>}
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label-fournisseur mb-1" htmlFor="inputDateDetection">Date de détection</label>
                                        <input
                                            className="form-control-fournisseur"
                                            id="inputDateDetection"
                                            name="date_detection"
                                            type="date"
                                            value={productData.date_detection}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="row gx-3 mb-3">
                                    <div className="col-md-6">
                                        <label className="form-label-fournisseur mb-1" htmlFor="inputReclamationClient">Réclamation client</label>
                                        <input
                                            className="form-control-fournisseur"
                                            id="inputReclamationClient"
                                            name="reclamation_client"
                                            type="text"
                                            value={productData.reclamation_client}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label-fournisseur mb-1" htmlFor="inputDescriptionNonConformite">Description non-conformité</label>
                                        <input
                                            className="form-control-fournisseur"
                                            id="inputDescriptionNonConformite"
                                            name="description_non_conformite"
                                            type="text"
                                            value={productData.description_non_conformite}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="row gx-3 mb-3">
                                    <div className="col-md-6">
                                        <label className="form-label-fournisseur mb-1" htmlFor="inputProduitsNonConformes">Produits non conformes</label>
                                        <input
                                            className="form-control-fournisseur"
                                            id="inputProduitsNonConformes"
                                            name="produits_non_conformes"
                                            type="text"
                                            value={productData.produits_non_conformes}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label-fournisseur mb-1" htmlFor="inputTypeNonConformite">Type non-conformité</label>
                                        <input
                                            className="form-control-fournisseur"
                                            id="inputTypeNonConformite"
                                            name="type_non_conformite"
                                            type="text"
                                            value={productData.type_non_conformite}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="row gx-3 mb-3">
                                    <div className="col-md-6">
                                        <label className="form-label-fournisseur mb-1" htmlFor="inputSourceNonConformite">Source non-conformité</label>
                                        <input
                                            className="form-control-fournisseur"
                                            id="inputSourceNonConformite"
                                            name="source_non_conformite"
                                            type="text"
                                            value={productData.source_non_conformite}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label-fournisseur mb-1" htmlFor="inputNiveauGravite">Niveau de gravité</label>
                                        <input
                                            className="form-control-fournisseur"
                                            id="inputNiveauGravite"
                                            name="niveau_gravite"
                                            type="text"
                                            value={productData.niveau_gravite}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="row gx-3 mb-3">
                                    <div className="col-md-6">
                                        <label className="form-label-fournisseur mb-1" htmlFor="inputCreatedBy">Créé par</label>
                                        <input
                                            className="form-control-fournisseur"
                                            id="inputCreatedBy"
                                            name="created_by"
                                            type="text"
                                            value={productData.created_by}
                                            readOnly
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label-fournisseur mb-1" htmlFor="inputCreatedAt">Créé le</label>
                                        <input
                                            className="form-control-fournisseur"
                                            id="inputCreatedAt"
                                            name="created_at"
                                            type="text"
                                            value={productData.created_at}
                                            readOnly
                                        />
                                    </div>
                                </div>
                                <div className="row gx-3 mb-3">
                                    <div className="col-md-6">
                                        <label className="form-label-fournisseur mb-1" htmlFor="inputUpdatedBy">Mis à jour par</label>
                                        <input
                                            className="form-control-fournisseur"
                                            id="inputUpdatedBy"
                                            name="updated_by"
                                            type="text"
                                            value={productData.updated_by}
                                            readOnly
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label-fournisseur mb-1" htmlFor="inputUpdatedAt">Mis à jour le</label>
                                        <input
                                            className="form-control-fournisseur"
                                            id="inputUpdatedAt"
                                            name="updated_at"
                                            type="text"
                                            value={productData.updated_at}
                                            readOnly
                                        />
                                    </div>
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

export default ConsulterProduit;
