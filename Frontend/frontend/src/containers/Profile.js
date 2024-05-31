import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/profile.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

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
        console.error('Erreur lors de la récupération des données de l\'utilisateur:', error);
        setError(error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleDeleteNotification = (index) => {
    const updatedNotifications = userData.notifications.filter((_, i) => i !== index);
    setUserData({ ...userData, notifications: updatedNotifications });
  };

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
          <div className="user-profile-details">
            <p><span className="user-profile-label">E-mail:</span> {userData.username}</p>
            <p><span className="user-profile-label">Prénom:</span> {userData.Prenom}</p>
            <p><span className="user-profile-label">Nom:</span> {userData.nom}</p>
          </div>

          <div className="user-profile-section">
            <h2 className="user-profile-section-header">Notifications</h2>
            <ul>
              {userData.notifications.map((notification, index) => (
                <li key={index} className="user-profile-notification">
                  <div className="notification-content">
                    <p><span className="user-profile-label">Expéditeur:</span> <span className="user-profile-bold">{notification.sender}</span></p>
                    <p><span className="user-profile-label">Message:</span> {notification.message}</p>
                    <p><span className="user-profile-label">Reçu le:</span> {notification.created_at}</p>
                  </div>
                  <button className="delete-button" onClick={() => handleDeleteNotification(index)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="user-profile-section">
            <h2 className="user-profile-section-header">Demandes</h2>
            <ul>
              {userData.Demandes.map((demande, index) => (
                <li key={index} className="user-profile-demande">
                  <p><span className="user-profile-label">Demande N°:</span> {demande.id}</p>
                  <p><span className="user-profile-label">Type:</span> {demande.Type}</p>
                  <p><span className="user-profile-label">Objet du document:</span> {demande.document_object}</p>
                  <p><span className="user-profile-label">Statut:</span> {demande.statut}</p>
                  <p><span className="user-profile-label">Créé le:</span> {demande.created_at}</p>
                </li>
              ))}
            </ul>
          </div>

          <button className="user-profile-button">Modifier Profil</button>
        </div>
      ) : (
        <div className="user-profile-loading">Chargement...</div>
      )}
    </div>
  );
}

export default UserProfile;
