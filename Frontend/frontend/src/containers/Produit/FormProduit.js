import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '..//Client/forms.css';

const FormProduit = () => {
    const [formData, setFormData] = useState({
        date_detection: '',
        designation_produit_non_conforme: '',
        reclamation_client: '',
        description_non_conformite: '',
        produits_non_conformes: '',
        type_non_conformite: '',
        source_non_conformite: '',
        niveau_gravite: '',
        created_by: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
    };

    return (
        <main style={{ backgroundColor: '#eeeeee', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div className="container ajout-form">
                <div className="contact-image">
                    <img src="/images/add.png" alt="add_produit" />
                    <div className="button-container">
                        <Link to="/allProduit">
                            <button className="retour">Retour au tableau de bord</button>
                        </Link>
                        <button type="submit" className="button-add" form="form-produit">Enregistrer</button>
                    </div>
                </div>
                <form id="form-produit" onSubmit={handleSubmit} className="row">
                    {Object.entries(formData).map(([key, value]) => (
                        <div className="col-md-6 form-label" key={key}>
                            <label className="form-label">
                                {key.replace(/_/g, ' ').toUpperCase()}:
                            </label>
                            {key === 'description_non_conformite' ? (
                                <textarea
                                    name={key}
                                    value={value}
                                    onChange={handleChange}
                                    className="form-control"
                                />
                            ) : (
                                <input
                                    type={key.includes('date') ? 'date' : 'text'}
                                    name={key}
                                    value={value}
                                    onChange={handleChange}
                                    className="form-control"
                                />
                            )}
                        </div>
                    ))}
                </form>
              
            </div>
        </main>
    );
};

export default FormProduit;
