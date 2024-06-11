import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <div className="container mt-5">
    <div className="card p-5 shadow">
      <h1 className="display-4 text-center mb-4">Bienvenue dans notre ERP</h1>
      <p className="lead text-center">
        Système de Qualité
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
  </div>
);

export default Home;
