import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import './Home.css';
import Login from '../components/Login.jsx';

const Home = () => {
    const token = localStorage.getItem('token');
    // const name = localStorage.getItem('name');
    const navigate = useNavigate()

    return (
       
        <div className='total_home'>
            <Navbar />

            {token ? (
                 <div className='backpage'>
                    <div className='container'>
                        <div className='formers'>
                           {/* <button className="login-button" onClick={()=>navigate("./estadistica")}>Estadística</button> */}
                           <button className="login-button" onClick={()=>navigate("./main")}>Cartografia</button>
                           <button className="login-button" onClick={()=>navigate("./utilidades")}>Afiliaciones</button>
                           <button className="login-button" onClick={()=>navigate("./legislacion")}>Legislación</button>
                        </div>
                    </div>
                </div>
            ) : (
                <Login />
            )}

        </div>
    );
}

export default Home;
