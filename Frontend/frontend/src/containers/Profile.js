import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/profile.css';
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UserProfile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editProfileData, setEditProfileData] = useState({});
  const [passwordData, setPasswordData] = useState({
    old_password: '',
    new_password: '',
  });

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

  const handleEditProfileChange = (e) => {
    setEditProfileData({
      ...editProfileData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditProfileSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/user/profile/`, editProfileData, {
        headers: {
          'Accept': '*/*',
          'X-CSRFToken': Cookies.get('csrftoken'),
        },
      });
      setUserData({ ...userData, ...editProfileData });
      setEditMode(false);
      toast.success('Profil mis à jour avec succès');
    } catch (error) {
      console.error('Erreur lors de la mise à jour du profil:', error);
      setError(error);
      toast.error('Erreur lors de la mise à jour du profil');
    }
  };

  const handleChangePasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`${process.env.REACT_APP_API_URL}/user/profile/`, passwordData, {
        headers: {
          'Accept': '*/*',
          'X-CSRFToken': Cookies.get('csrftoken'),
        },
      });
      toast.success('Mot de passe mis à jour avec succès');
      setPasswordData({
        old_password: '',
        new_password: '',
      });
    } catch (error) {
      console.error('Erreur lors de la mise à jour du mot de passe:', error);
      setError(error);
      toast.error('Erreur lors de la mise à jour du mot de passe');
    }
  };

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div>Erreur : {error.message}</div>;
  }

  return (
    <div className="user-profile-container">
      <ToastContainer />
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

          <button className="user-profile-button" onClick={() => setEditMode(true)}>Modifier Profil</button>

          {editMode && (
            <form onSubmit={handleEditProfileSubmit} className="edit-profile-form">
              <div className="form-group">
                <label>Prénom:</label>
                <input
                  type="text"
                  name="Prenom"
                  value={editProfileData.Prenom || ''}
                  onChange={handleEditProfileChange}
                />
              </div>
              <div className="form-group">
                <label>Nom:</label>
                <input
                  type="text"
                  name="nom"
                  value={editProfileData.nom || ''}
                  onChange={handleEditProfileChange}
                />
              </div>
              <div className="form-group">
                <label>E-mail:</label>
                <input
                  type="text"
                  name="username"
                  value={editProfileData.username || ''}
                  onChange={handleEditProfileChange}
                />
              </div>
              <button type="submit" className="btn btn-primary">Enregistrer</button>
              <button type="button" className="btn btn-secondary" onClick={() => setEditMode(false)}>Annuler</button>
            </form>
          )}

          <form onSubmit={handleChangePasswordSubmit} className="change-password-form">
            <div className="form-group">
              <label>Ancien mot de passe:</label>
              <input
                type="password"
                name="old_password"
                value={passwordData.old_password}
                onChange={handlePasswordChange}
              />
            </div>
            <div className="form-group">
              <label>Nouveau mot de passe:</label>
              <input
                type="password"
                name="new_password"
                value={passwordData.new_password}
                onChange={handlePasswordChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">Changer le mot de passe</button>
          </form>
        </div>
      ) : (
        <div className="user-profile-loading">Chargement...</div>
      )}
    </div>
  );
}

export default UserProfile;
