import React from 'react';

function DashboardFournisseur({ user }) {
  const gestionSections = [
    { title: 'Gérer les fournisseurs', link: '/dashboard_fournisseurs' },
    { title: 'Gérer les réclamations fournisseurs', link: '/dashboard_reclamation_fournisseurs' },
    { title: 'Gérer Evaluations fournisseurs', link: '/dashboard_evaluation_fournisseur' },
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

export default DashboardFournisseur;
