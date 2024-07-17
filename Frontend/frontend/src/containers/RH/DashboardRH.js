import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
function DashboardRH({ user }) {
  const gestionSections = [
    {
      title: 'Gérer les responsables formation', link: '/Dashboardresponsable', className: "bg-color1"
    },
    {
      title: 'Gérer JobPost', link: '/Dashboardposition', className: "bg-color2"
    },
    {
      title: 'Gérer les participants', link: '/Dashboardparticipant', className: "bg-color3"
    },
    {
      title: 'Gérer Employe', link: '/Dashboardemploye', className: "bg-color4"
    },
    {
      title: 'Gérer Fiche Employe', link: '/Dashboardfiche', className: "bg-color5"
    },
    {
      title: 'Gérer Formation', link: '/Dashboardformation', className: "bg-color6"
    },
    {
      title: 'Gérer Evaluation Chaud', link: '/DashboardEvaluationChaud', className: "bg-color7"
    },
    {
      title: 'Gérer Evaluation Froid', link: '/DashboardEvaluationFroid', className: "bg-color8"
    },
  ];

  const sectionGroups = [];
  for (let i = 0; i < gestionSections.length; i += 3) {
    sectionGroups.push(gestionSections.slice(i, i + 3));
  }

  // Define ModuleTile inline
  const ModuleTile = ({ title, link, className }) => (
    <div className={`module-card p-5 ${className}`}>
      <h4>{title}</h4>
      <div className="cta">
        <a href={link} className="cta-link hover-underline-animation" style={{ textDecoration: 'none', color: '#27296d' }}>Accéder</a>
        <svg
          id="arrow-horizontal"
          xmlns="http://www.w3.org/2000/svg"
          width="50"
          height="10"
          viewBox="0 0 46 16"
        >
          <path
            id="Path_10"
            data-name="Path 10"
            d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z"
            transform="translate(40)"
          ></path>
        </svg>
      </div>
    </div>
  );

  return (
    <main style={{ backgroundColor: '#eeeeee', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div className="dashboard-container" style={{ width: '100%', maxWidth: '1200px', padding: '20px' }}>
        <div className="container">
          {sectionGroups.map((group, index) => (
            <div className="row mb-4" key={index}>
              {group.map((section, idx) => (
                <div className="col-md-4 mb-4" key={idx}>
                  <ModuleTile title={section.title} link={section.link} className={section.className} />
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="dashboard-buttons" style={{ marginTop: '50px' }}>
          <Link to={`/Dashboard/`} className="btn btn-secondary">
            <FaArrowLeft style={{ marginRight: '10px' }} /> Retour
          </Link>
        </div>
      </div>
    </main>
  );
}

export default DashboardRH;
