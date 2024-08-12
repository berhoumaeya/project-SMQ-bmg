import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/home.css';
const Home = () => (

  <div >

    <div className="">
      <header
        className="row align-items-center mb-5"
        style={{
          backgroundImage: 'url(/images/a.png)',
          backgroundSize: 'cover',
          opacity: '0.9',

        }}
      >
        <div className="col-lg-12 text-center text-white" style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)', padding: '150px' }}>
          <div className="  display-4 mb-4 ">
            <div className='-title'> Bienvenue dans notre ERP</div></div>
          <p className=" small-title">
            Où l'innovation rencontre la gestion de la qualité.
          </p>
          <hr className="my-4" />

          <p className="text-center">Cliquez sur le bouton ci-dessous pour vous connecter.</p>
          <div className="d-flex justify-content-center mb-3">
            <Link className="btn btn-primary btn-lg" to="/login">
              Se connecter
            </Link>
          </div>
          <p className="text-center">Ou</p>
          <div className="d-flex justify-content-center">
            <Link className="btn btn-secondary btn-lg" to="/guest">
              Continuer en tant que guest
            </Link>
          </div>
        </div>
        
      </header>

    </div>
    
  </div>
);

export default Home;
