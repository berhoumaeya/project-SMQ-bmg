import React from 'react';

function DashboardClient({ user }) {
  const gestionSections = [
    { title: 'Gérer les Clients', link: '/dashboard_Clients' },
    { title: 'Gérer les réclamations clients', link: '/dashboard_reclamation_client' },
    { title: 'Gérer les Enquete clients', link: '/dashboard_enquete_client' },
    { title: 'Gérer les suggestions clients', link: '/dashboard_suggestion_client' },
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

export default DashboardClient;
