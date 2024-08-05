import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import './Home.css';
import Login from '../components/Login.jsx';
import reportImage from '../img/report_image-min2.jpg';
import updateImage from '../img/update_image-min2.jpg';
import apiImage from '../img/api_image-min2.jpg';
import upcomingImage from '../img/upcoming_image-min2.jpg';

const Home = () => {
    const token = localStorage.getItem('token');
    const name = localStorage.getItem('name');
    const navigate = useNavigate()

    return (
        <div className='total_home'>
            <Navbar />

            {token ? (
                <>
                    <div className='home-wrapper'>
                        <div className='home-content'>
                            <section className="section-welcome home-section">
                                <div className="welcome-image">
                                    <img src={reportImage} alt="Organización de reportes" />
                                    <div className="welcome-text">
                                        <h1>Bienvenido a Repomatic, {name}</h1>
                                        <h2>¡Una forma más fácil de organizar tus reportes!</h2>
                                    </div>
                                </div>
                            </section>
                            <section className="section-update home-section">
                                <div className="update-content home-text">
                                    <h2>¿Sabías que podés pedir actualización de tus reportes cuando quieras?</h2>
                                    <p>No dejes de visitar nuestra sección de reportes y mantener tus datos al día.</p>
                                    <h5 onClick={()=> navigate('./main')} className="btn-action">Ir a Reportes</h5>
                                </div>
                                <div className="update-image home-image">
                                    <img src={updateImage} alt="Actualización de reportes" />
                                </div>
                            </section>

                            <section className="section-api home-section reverse">
                                <div className="api-content home-text">
                                    <h2>¿Tenés dudas de cómo utilizar nuestra A.P.I?</h2>
                                    <p>Ya no más. Accedé a la documentación completa desde acá:</p>
                                    <a href="https://repomatic.onrender.com" target="_blank" rel="noopener noreferrer" className="btn-action">Ver Documentación de la API</a>
                                </div>
                                <div className="api-image home-image">
                                    <img src={apiImage} alt="Documentación API" />
                                </div>
                            </section>

                            <section className="section-upcoming home-section">
                                <div className="upcoming-content home-text">
                                    <h2>Lo que se viene</h2>
                                    <p>Próximamente podrás descargar los reportes directamente desde acá. Y si sos administrador, podrás gestionar usuarios, reportes, modificar accesos y mucho más.</p>
                                </div>
                                <div className="upcoming-image home-image">
                                    <img src={upcomingImage} alt="Futuras funcionalidades" />
                                </div>
                            </section>
                        </div>
                    </div>
                </>
            ) : (
                <Login />
            )}

        </div>
    );
}

export default Home;
