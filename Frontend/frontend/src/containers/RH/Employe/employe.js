import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { GrEdit, GrTrash } from 'react-icons/gr';
import { IoMdArrowRoundBack } from 'react-icons/io';
import axios from 'axios';
import Cookies from 'js-cookie';
import '../Detail.css';
import SubNavbarRH from '../../../components/SubNavbarRH';
import SidebarRH from '../../../components/SidebarRH';

// Sample data
const sampleEmployes = [
    {
        id: 1,
        nom: 'Doe',
        prenom: 'John',
        username: 'jdoe',
        email: 'john.doe@example.com',
        is_user: true,
        created_at: '2024-01-01',
        created_by: 'Admin',
        updated_by: 'Admin',
        updated_at: '2024-01-10',
        pieces_jointes: true
    },
    {
        id: 2,
        nom: 'Smith',
        prenom: 'Jane',
        username: 'jsmith',
        email: 'jane.smith@example.com',
        is_user: false,
        created_at: '2024-01-01',
        created_by: 'Admin',
        updated_by: 'Admin',
        updated_at: '2024-01-10',
        pieces_jointes: false
    },
    {
        id: 3,
        nom: 'Johnson',
        prenom: 'Emily',
        username: 'ejohnson',
        email: 'emily.johnson@example.com',
        is_user: true,
        created_at: '2024-02-01',
        created_by: 'Admin',
        updated_by: 'Admin',
        updated_at: '2024-02-10',
        pieces_jointes: true
    }
];

const EmployeDetail = () => {
    const { id } = useParams();
    const [employe, setEmploye] = useState(null);
    const [deleteReussi, setDeleteReussi] = useState(false);
    const [updateReussi, setUpdateReussi] = useState(false);
    const [piecesJointes, setPiecesJointes] = useState(null);
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [is_user, setIsUser] = useState(false);

    useEffect(() => {
        const fetchedEmploye = sampleEmployes.find(e => e.id === parseInt(id));
        setEmploye(fetchedEmploye);

        if (fetchedEmploye) {
            setNom(fetchedEmploye.nom);
            setPrenom(fetchedEmploye.prenom);
            setEmail(fetchedEmploye.email);
            setUsername(fetchedEmploye.username);
            setIsUser(fetchedEmploye.is_user);
        }
    }, [id]);

    const handleDelete = async () => {
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/RH/delete_employe/${id}/`, {
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json',
                    'X-CSRFToken': Cookies.get('csrftoken'),
                }
            });
            setDeleteReussi(true);
        } catch (error) {
            console.error('Erreur lors de la suppression de l\'employé:', error);
        }
    };

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setPiecesJointes(selectedFile);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('nom', nom);
        formData.append('prenom', prenom);
        formData.append('email', email);
        formData.append('username', username);
        formData.append('is_user', is_user ? 'True' : 'False');
        if (piecesJointes) {
            formData.append('pieces_jointes', piecesJointes);
        }

        const headers = {
            'Accept': '*/*',
            'Content-Type': 'multipart/form-data',
            'X-CSRFToken': Cookies.get('csrftoken')
        };

        axios.put(`${process.env.REACT_APP_API_URL}/RH/update_employe/${id}/`, formData, { headers: headers })
            .then(response => {
                console.log('Employé mis à jour avec succès :', response.data);
                setUpdateReussi(true);
            })
            .catch(error => {
                console.error('Erreur lors de la mise à jour de l\'employé:', error);
            });
    };

    if (deleteReussi) {
        return <Navigate to="/DashboardEmploye" />;
    }

    if (updateReussi) {
        return <Navigate to={`/employe/${id}`} />;
    }
    return (
        <>
            <SubNavbarRH />
            <main style={{ display: 'flex', minHeight: '100vh' , backgroundColor :'white'}}>
                <SidebarRH />
                <div className="container-xl px-4 mt-4">
                    <div className="row">
                        <div className="col-xl-4">
                            <div className="card mb-4 mb-xl-0">
                                <div className="card-header-">Profile Picture</div>
                                <div className="card-body text-center">
                                    <div className="img-container mb-2">
                                        <img
                                            className="img-account-profile rounded-circle"
                                            src={piecesJointes ? URL.createObjectURL(piecesJointes) : "http://bootdey.com/img/Content/avatar/avatar1.png"}
                                            alt="Profile"
                                            style={{ width: '150px', height: '150px' }}
                                        />
                                    </div>
                                    <div className="small font-italic text-muted mb-4">
                                        JPG or PNG no larger than 5 MB
                                    </div>
                                    <input
                                        type="file"
                                        className="form-control mb-2"
                                        onChange={handleFileChange}
                                        accept=".jpg, .png"
                                    />
                                </div>
                            </div>
                            <br />
                            <div className="card mb-4">
                                <div className="card-header-">Historique</div>
                                <div className="card-body">
                                    <ul className="list-group list-group-flush">
                                        {employe ? (
                                            <>
                                                <li className="list-group-item d-flex justify-content-between align-items-center">
                                                    <div>
                                                        <strong>Date de mise à jour</strong><br />
                                                        <small>{employe.updated_at} - {employe.updated_by}</small>
                                                    </div>
                                                </li>
                                                <li className="list-group-item d-flex justify-content-between align-items-center">
                                                    <div> <strong>Date de création</strong><br />
                                                        <small>{employe.created_at} - {employe.created_by}</small>
                                                    </div>

                                                </li>
                                            </>
                                        ) : (<div>Chargement...</div>)}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-8">
                            <div className="card mb-4">
                                <div className="card-header-">Account Details</div>
                                <div className="card-body">
                                    {employe ? (
                                        <form onSubmit={handleSubmit} className="row">
                                            <div className="row gx-3 mb-3">
                                                <div className="col-md-6">
                                                    <label className="small mb-1">Nom employé</label>
                                                    <input className="form-control" type="text" value={nom} onChange={(e) => setNom(e.target.value)} />
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="small mb-1">Prénom employé</label>
                                                    <input className="form-control" type="text" value={prenom} onChange={(e) => setPrenom(e.target.value)} />
                                                </div>
                                            </div>
                                            <div className="row gx-3 mb-3">
                                                <div className="col-md-6">
                                                    <label className="small mb-1">Nom d'utilisateur</label>
                                                    <input className="form-control" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="small mb-1">Email</label>
                                                    <input className="form-control" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                                </div>
                                            </div>
                                            <div className="mb-3">
                                                <label className="small mb-1">Est un utilisateur</label>
                                                <input
                                                    type="checkbox"
                                                    checked={is_user}
                                                    onChange={(e) => setIsUser(e.target.checked)}
                                                />
                                            </div>
                                            <div className="row gx-3 mb-3">
                                                <div className="col-md-6">
                                                    <label className="small mb-1">Date de création</label>
                                                    <input className="form-control" type="text" value={employe.created_at} readOnly />
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="small mb-1">Créé par</label>
                                                    <input className="form-control" type="text" value={employe.created_by} readOnly />
                                                </div>
                                            </div>
                                            <div className="row gx-3 mb-3">
                                                <div className="col-md-6">
                                                    <label className="small mb-1">Date de mise à jour</label>
                                                    <input className="form-control" type="text" value={employe.updated_at} readOnly />
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="small mb-1">Mis à jour par</label>
                                                    <input className="form-control" type="text" value={employe.updated_by} readOnly />
                                                </div>
                                            </div>
                                            <div className="mb-3">
                                                <label className="small mb-1">Pièces jointes</label>
                                                {employe.pieces_jointes ? <a className="form-control" href="/" target="_blank" rel="noopener noreferrer">Consulter</a> : 'Aucune'}
                                            </div>
                                            <div className="d-flex justify-content-end mt-3">
                                                <Link to="/Dashboardemploye" className="btn btn-secondary me-2">
                                                    <IoMdArrowRoundBack /> Retour
                                                </Link>
                                                <button type="submit" className="btn btn-primary me-2">
                                                    <GrEdit /> Modifier
                                                </button>
                                                <button type="button" className="btn btn-danger me-2" onClick={handleDelete}>
                                                    <GrTrash /> Supprimer
                                                </button>
                                            </div>
                                        </form>
                                    ) : (
                                        <p>Chargement ...</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default EmployeDetail;
