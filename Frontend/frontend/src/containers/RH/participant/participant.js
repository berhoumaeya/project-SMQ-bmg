import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { GrEdit, GrTrash } from 'react-icons/gr';
import { IoMdArrowRoundBack } from 'react-icons/io';
import '../Detail.css';

const sampleParticipants = [
    {
        id: 1,
        nom: 'Dupont',
        prenom: 'Jean',
        username: 'jdupont',
        email: 'jean.dupont@example.com',
        formations_concernees: [1, 2],
        is_user: true,
        created_at: '2024-01-01',
        created_by: 'Admin',
        updated_by: 'Admin',
        updated_at: '2024-01-10',
        pieces_jointes: true
    },
    {
        id: 2,
        nom: 'Martin',
        prenom: 'Marie',
        username: 'mmartin',
        email: 'marie.martin@example.com',
        formations_concernees: [1],
        is_user: false,
        created_at: '2024-02-01',
        created_by: 'Admin',
        updated_by: 'Admin',
        updated_at: '2024-02-10',
        pieces_jointes: false
    },
    {
        id: 3,
        nom: 'Durand',
        prenom: 'Paul',
        username: 'pdurand',
        email: 'paul.durand@example.com',
        formations_concernees: [2],
        is_user: true,
        created_at: '2024-03-01',
        created_by: 'Admin',
        updated_by: 'Admin',
        updated_at: '2024-03-10',
        pieces_jointes: true
    }
];

const sampleFormations = [
    { id: 1, intitule_formation: 'Formation React' },
    { id: 2, intitule_formation: 'Formation Node.js' }
];

const sampleEmployes = [
    { id: 1, username: 'admin' },
    { id: 2, username: 'user1' },
    { id: 3, username: 'user2' }
];

const ParticipantDetail = () => {
    const { id } = useParams();
    const [participant, setParticipant] = useState(null);
    const [deleteReussi, setDeleteReussi] = useState(false);
    const [formationsnames, setFormationsNames] = useState([]);
    const [piecesJointes, setPiecesJointes] = useState(null);
    const [employes] = useState(sampleEmployes);
    const [employe_concerneID, setEmployeConcerneID] = useState('');
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [is_user, setIsUser] = useState(false);
    const [updateReussi, setUpdateReussi] = useState(false);

    useEffect(() => {
        const foundParticipant = sampleParticipants.find(p => p.id === parseInt(id));
        setParticipant(foundParticipant);
        if (foundParticipant) {

            const formationsDetails = sampleFormations
                .filter(formation => foundParticipant.formations_concernees.includes(formation.id))
                .map(formation => formation.intitule_formation);

            setFormationsNames(formationsDetails);
            setNom(foundParticipant.nom);
            setPrenom(foundParticipant.prenom);
            setEmail(foundParticipant.email);
            setUsername(foundParticipant.username);
            setIsUser(foundParticipant.is_user);
            setEmployeConcerneID(foundParticipant.employe_concerne);
        }
    }, [id]);


    const handleDelete = async () => {
        const headers = {
            'Accept': '*/*',
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken')
        };
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/RH/delete_participant/${id}/`, { headers });
            setDeleteReussi(true);
        } catch (error) {
            console.error('Erreur lors de la suppression de participant:', error);
        }
    };

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setPiecesJointes(selectedFile);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('nom', nom);
        formData.append('prenom', prenom);
        formData.append('email', email);
        formData.append('username', username);
        formData.append('is_user', is_user ? 'True' : 'False');
        formData.append('employe_concerne', employe_concerneID);
        if (piecesJointes) {
            formData.append('pieces_jointes', piecesJointes);
        }

        const headers = {
            'Accept': '*/*',
            'Content-Type': 'multipart/form-data',
            'X-CSRFToken': Cookies.get('csrftoken')
        };
        try {
            await axios.put(`${process.env.REACT_APP_API_URL}/RH/update_participant/${id}/`, formData, { headers });
            setUpdateReussi(true);
        } catch (error) {
            console.error('Erreur lors de la mise à jour de participant:', error);
        }
    };

    if (deleteReussi) {
        return <Navigate to="/Dashboardparticipant" />;
    }

    if (updateReussi) {
        return <Navigate to={`/participant/${id}`} />;
    }

    return (
        <main style={{ backgroundColor: '#eeeeee', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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
                    </div>
                    <div className="col-xl-8">
                        <div className="card mb-4">
                            <div className="card-header-">Account Details</div>
                            <div className="card-body">
                                {participant ? (
                                    <form onSubmit={handleSubmit} className="row">

                                        <div className="row gx-3 mb-3">
                                            <div className="col-md-6">
                                                <label className="small mb-1">Nom participant</label>
                                                <input className="form-control" type="text" value={nom} onChange={(e) => setNom(e.target.value)} />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="small mb-1">Prénom participant</label>
                                                <input className="form-control" type="text" value={prenom} onChange={(e) => setPrenom(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className="row gx-3 mb-3">
                                            <div className="col-md-6">
                                                <label className="small mb-1">Nom d'utilisateur participant</label>
                                                <input className="form-control" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="small mb-1">Email de participant</label>
                                                <input className="form-control" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <label className="small mb-1">Formations concernées</label>
                                            <input className="form-control" type="text" value={formationsnames.join(', ')} readOnly />
                                        </div>
                                        <div className="mb-3">
                                            <label className="small mb-1">Date de création</label>
                                            <input className="form-control" type="text" value={participant.created_at} readOnly />
                                        </div>
                                        <div className="mb-3">
                                            <label className="small mb-1">Date de mise à jour</label>
                                            <input className="form-control" type="text" value={participant.updated_at} readOnly />
                                        </div>
                                        <div className="mb-3">
                                            <label className="small mb-1">Est un utilisateur</label>
                                            <input
                                                type="checkbox"
                                                checked={is_user}
                                                onChange={(e) => setIsUser(e.target.checked)}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="small mb-1">Employé concerné</label>
                                            <select
                                                className="form-control"
                                                value={employe_concerneID}
                                                onChange={(e) => setEmployeConcerneID(e.target.value)}
                                            >
                                                <option value="">--Select Employé--</option>
                                                {employes.map(emp => (
                                                    <option key={emp.id} value={emp.id}>{emp.username}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="d-flex justify-content-end mt-3">
                                            <Link to={`/DashboardParticipant`} className="btn btn-secondary me-2">
                                                <IoMdArrowRoundBack /> Retour
                                            </Link>
                                            <button type="submit" className="btn btn-primary me-2">
                                                <GrEdit /> Modifier
                                            </button>
                                            <button
                                                type="button"
                                                className="btn btn-danger"
                                                onClick={handleDelete}
                                            >
                                                <GrTrash /> Supprimer
                                            </button>
                                        </div>
                                    </form>
                                ) : (
                                    <p>Loading...</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default ParticipantDetail;
