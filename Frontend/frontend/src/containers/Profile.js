import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/profile.css'

function UserProfile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/user/profile/`, {
          headers: {
            'Accept': '*/*',
          },
        });
        setUserData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des données de utilisateur:', error);
        setError(error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div>Erreur : {error.message}</div>;
  }

  return (
    <div className="user-profile-container">
    {userData ? (
      <div className="user-profile-card">
        <h1 className="user-profile-header">Profil Utilisateur</h1>
        <p>E-mail: <span className="user-profile-bold">{userData.username}</span></p>
        <p>Prénom: <span className="user-profile-bold">{userData.Prenom}</span></p>
        <p>Nom: <span className="user-profile-bold">{userData.nom}</span></p>

        <h2 className="user-profile-section-header">Notifications</h2>
        <ul>
          {userData.notifications.map((notification, index) => (
            <li key={index} className="user-profile-notification">
              <p>Expéditeur: <span className="user-profile-bold">{notification.sender}</span></p>
              <p>Message: {notification.message}</p>
              <p>Reçu le: {notification.created_at}</p>
            </li>
          ))}
        </ul>

        <h2 className="user-profile-section-header">Demandes</h2>
        <ul>
          {userData.Demandes.map((demande, index) => (
            <li key={index} className="user-profile-demande">
              <p>Type: <span className="user-profile-bold">{demande.Type}</span></p>
              <p>Objet du document: {demande.document_object}</p>
              <p>Statut: {demande.Statut ? 'Validé' : 'Non validé'}</p>
              <p>Créé le: {demande.created_at}</p>
            </li>
          ))}
        </ul>

        <button className="user-profile-button">Modifier Profil</button>
      </div>
    ) : (
      <p className="user-profile-loading">Chargement...</p>
    )}
  </div>
);
}
export default UserProfile;
