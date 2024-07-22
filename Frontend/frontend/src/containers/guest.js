import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
function ModuleTile({ title, link, className }) {
  return (
    <div className={`module-card p-5 ${className}`}>
      <h4 className="icon-wrapper" style={{ textAlign: 'center', color: '#6c476e' }}>
        {title}
      </h4>
      <div className="cta">
        <a href={link} className="cta-link hover-underline-animation" style={{ textDecoration: 'none', color: '#4d3664' }}>Accéder</a>
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
            transform="translate(30)"
          ></path>
        </svg>
      </div>
    </div>
  );
}

function DashboardGuest({ user }) {
  const gestionSections = [
    {
      title: 'Consulter document', link: '/Documentguest', className: "bg-color-5"
    },
    {
      title: 'Accèder à une réunion ', link: '/Reunionguest', className: "bg-color-5"
    },
  ];

  const sectionGroups = [];
  for (let i = 0; i < gestionSections.length; i += 3) {
    sectionGroups.push(gestionSections.slice(i, i + 3));
  }

  return (
    <main style={{ backgroundColor: '#eeeeee', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div className="dashboard-container" style={{ width: '100%', maxWidth: '1200px', padding: '20px' }}>
        <div className="container">
          {sectionGroups.map((group, index) => (
            <div className="row mb-4" key={index}>
              {group.map((section, idx) => (
                <div className="col-md-6 mb-6" key={idx}>
                  <ModuleTile title={section.title} link={section.link} className={section.className} />
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="dashboard-buttons" style={{ marginTop: '200px' }}>
          <Link to={`/`} className="btn btn-secondary">
            <FaArrowLeft style={{ marginRight: '10px' }} /> Retour
          </Link>
        </div>
      </div>
    </main>
  );
}

export default DashboardGuest;
