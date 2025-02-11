import React from 'react';
import Navbar from '../components/Navbar';
import './SaberMas.css';
import teamWorkingImg from '../img/team_working-min2.jpg'; // Imagen de personas trabajando
import happyPersonImg from '../img/happy_person-min2.jpg'; // Imagen de alguien feliz mirando al horizonte

const SaberMas = () => {
  return (
    <div className='saber_mas_general d-flex flex-column align-items-center'>
      <Navbar />
      <div className="saber-mas-container">
        <div className="saber-mas-content">
          <h2>Legislación</h2>
          <div className="saber-mas-section">
            <div className="saber-mas-text">
              <p>
                Nuestro sitio y servidor están diseñados para manejar inteligentemente rellenar con texto que tenga que ver con lo que hace la empresa jejejej,. bueno
              </p>
            </div>
            <div className="saber-mas-image">
              <img src={teamWorkingImg} alt="Equipo trabajando" className="img-responsive" />
            </div>
          </div>
          <div className="saber-mas-section reverse">
            <div className="saber-mas-text">
              <p>
                La aplicación fue desarrollada por el equipo de <strong>"E3 DIGITAL"</strong> en el año 2024.
              </p>
            </div>
            <div className="saber-mas-image">
              <img src={happyPersonImg} alt="Persona feliz" className="img-responsive" />
            </div>
          </div>
          <div className="saber-mas-footer">
            <p>
              Para más información técnica, podés acceder a la documentación del servidor en el siguiente enlace:
            </p>
            <a href="https://repomatic.onrender.com" target="_blank" rel="noopener noreferrer" className="btn-doc-link">
              Ver Documentación del Servidor
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SaberMas;
