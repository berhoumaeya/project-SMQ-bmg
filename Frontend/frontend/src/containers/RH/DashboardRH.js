import React from 'react';

function DashboardRH({ user }) {
  const gestionSections = [
    { title: 'Gérer les responsables formation', link: '/dashboard_responsable' },
    { title: 'Gérer JobPost', link: '/dashboard' },
    { title: 'Gérer les participants', link: '/Dashboardparticipant' },
    { title: 'Gérer Employe', link: '/Dashboardemploye' },
    { title: 'Gérer Fiche Employe', link: '/dashboard_fiche_employe' },
    { title: 'Gérer Formation', link: '/Dashboardformation' },
    { title: 'Gérer Evaluation Chaud', link: '/evaluation_chaud' },
    { title: 'Gérer Evaluation Froid', link: '/evaluation_froid' },
    { title: 'Gérer Compétences', link: '/gerer_competences' },
    { title: 'Gérer Evaluation Compétences', link: '/evaluation_competences' },
    { title: 'Gérer Adresse', link: '/gerer_adresse' },
    { title: 'Gérer Département', link: '/dashboard_department' },
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

export default DashboardRH;
