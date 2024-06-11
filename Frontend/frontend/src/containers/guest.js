import React from 'react';
import {Link } from 'react-router-dom';


function DashboardGuest({ user }) {
  const gestionSections = [
    { title: 'Consulter document', link: '/Documentguest' },
    { title: 'Accèder à une réunion ', link: '/Reunionguest' },
  ];

  const sectionGroups = [];
  for (let i = 0; i < gestionSections.length; i += 3) {
    sectionGroups.push(gestionSections.slice(i, i + 3));
  }

  return (
    <div className="mt-5 pb-5">
      <div className="container">
        {sectionGroups.map((group, index) => (
          <div className="row mb-4" key={index}>
            {group.map((section, idx) => (
              <div className="col-md-4" key={idx}>
                <div className="card">
                  <div className="card-body">
                    <h4>{section.title}</h4>
                    <a href={section.link} className="btn btn-primary btn-lg">Accéder</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="dashboard-buttons">
                <Link to={`/`} className="btn btn-secondary">Retour</Link>
            </div>
    </div>
  );
}

export default DashboardGuest;
