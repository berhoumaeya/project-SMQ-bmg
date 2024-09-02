import React from 'react';
import { FaArrowLeft, FaBook, FaGavel } from 'react-icons/fa';
import { Link } from 'react-router-dom';
function ModuleTile({ title, link, className ,icon}) {
  return (
    <a href={link} className={`module-card ${className}`}>
    <div className="icon-wrapper">
        <div className="icon-main">{icon}</div>
    </div>
    <h4 className="module-title">{title}</h4>
</a>
  );
}
function DashboardGuest({ user }) {
  const gestionSections = [
    {
      title: 'Consulter document', link: '/Documentguest', icon: <FaBook />, className: "bg-color-5"
    },
    {
      title: 'Accèder à une réunion', link: '/Reunionguest',icon: <FaGavel /> ,className: "bg-color-5"
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
            <div className="row mb-4" key={index} style={{marginLeft :'200px'}}>
              {group.map((section, idx) => (
                <div className="col-md-4" key={idx} >
                  <ModuleTile title={section.title} link={section.link} icon={section.icon} className={section.className} />
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="dashboard-buttons" style={{ marginTop: '150px' }}>
          <Link to={`/`} className="btn btn-secondary">
            <FaArrowLeft style={{ marginRight: '10px' }} /> Retour
          </Link>
        </div>
      </div>
    </main>
  );
}

export default DashboardGuest;
