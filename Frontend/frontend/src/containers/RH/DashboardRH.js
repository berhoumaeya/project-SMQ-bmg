import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function DashboardRH() {
  const gestionSections = [
    {
      title: 'Gérer les responsables formation', link: '/Dashboardresponsable', className: "bg-color1"
    },
    {
      title: 'Gérer JobPost', link: '/Dashboardposition', className: "bg-color1"
    },
    {
      title: 'Gérer les participants', link: '/Dashboardparticipant', className: "bg-color1"
    },
    {
      title: 'Gérer Employe', link: '/Dashboardemploye', className: "bg-color1"
    },
    {
      title: 'Gérer Fiche Employe', link: '/Dashboardfiche', className: "bg-color1"
    },
    {
      title: 'Gérer Formation', link: '/Dashboardformation', className: "bg-color1"
    },
    {
      title: 'Gérer Evaluation Chaud', link: '/DashboardEvaluationChaud', className: "bg-color1"
    },
    {
      title: 'Gérer Evaluation Froid', link: '/DashboardEvaluationFroid', className: "bg-color1"
    },
  ];

  const sectionGroups = [];
  for (let i = 0; i < gestionSections.length; i += 3) {
    sectionGroups.push(gestionSections.slice(i, i + 3));
  }

  // Define ModuleTile inline
  const ModuleTile = ({ title, link, className }) => (
    <Link to={link} className={`module-card p-5 ${className}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <h4>{title}</h4>
      <div className="cta">
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
    </Link>
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
          <Link to={`/Dashboard/`} className="btn btn-secondary" style={{backgroundColor : '#27296d'}}>
            <FaArrowLeft style={{ marginRight: '10px' }} /> Retour
          </Link>
        </div>
      </div>
    </main>
  );
}

export default DashboardRH;
