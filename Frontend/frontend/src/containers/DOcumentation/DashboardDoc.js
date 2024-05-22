import React from 'react';

function DashboardDoc({ user }) {
  const gestionSections = [
    { title: 'Gérer les Documents internes', link: '/dashboard_internes' },
    { title: 'Gérer les Documents externes', link: '/dashboard_externes' },
    { title: 'Liste des demandes', link: '/ListeDemande' },
    { title: 'Créer demande', link: '/CréerDemande' },
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
    </div>
  );
}

export default DashboardDoc;
