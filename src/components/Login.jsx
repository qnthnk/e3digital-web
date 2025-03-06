import React, { useState, useContext, useEffect } from 'react';
import { Context } from '../js/store/appContext.js';
import './Login.css';
import { FaUser, FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import gifLoading from '../img/Loading_2.gif';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const { store, actions } = useContext(Context);

  const handlerLogin = async () => {
    try {
      setIsLoading(true);
      const info = {
        email: email,
        password: pass,
      };
      await actions.login(info);
      if (store.userName !== '' && store.userName !== undefined) {
        actions.wrongPass(false);
        navigate('/');
      } else {
        actions.wrongPass(true);
        setEmail('');
        setPass('');
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handlerSetEmail = (text) => {
    setEmail(text);
    actions.wrongPass(false);
    if (rememberMe) {
      localStorage.setItem('inputEmail', text);
    } else {
      localStorage.removeItem('inputEmail');
    }
  };

  const handleRememberMeChange = (e) => {
    const isChecked = e.target.checked;
    setRememberMe(isChecked);

    // Si se desactiva el checkbox, borrar el email del localStorage
    if (!isChecked) {
      localStorage.removeItem('inputEmail');
    } else {
      // Si se activa, guardar el email actual
      localStorage.setItem('inputEmail', email);
    }
  };

  const handlerSetPass = (text) => {
    setPass(text);
    actions.wrongPass(false);
  };

  useEffect(() => {
    // Leer el email del localStorage cuando carga la página
    const savedEmail = localStorage.getItem('inputEmail');
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);  // Marcar el checkbox si hay un email guardado
    }
  }, []);

  return (
    <div className='backpage'> 
    <div className='container'>
      <form className='forms'
        onSubmit={(e) => {
          e.preventDefault();
          handlerLogin();
        }}
      >
        <h1 className='heading'>Login</h1>
        <div >
          <div>
          <input
            type='email'
            placeholder='E-mail'
            id='email'
            value={email}
            className='input'
            autoComplete='email'
            onChange={(e) => handlerSetEmail(e.target.value)}
            required
          />
          </div>
        </div>
        <div>
          <input
            type='password'
            placeholder='Contraseña'
            id='password'
            value={pass}
            className='input'
            autoComplete='current-password'
            onChange={(e) => handlerSetPass(e.target.value)}
            required
          />
        </div>
        <br/>
        {store.wrongPass && (
          <p style={{ color: 'white', fontSize: '18px' }}>Credencial/es incorrecta/s</p>
        )}
        <div className='rememberme'>
          <label>
            <input type='checkbox'
              name='rememberMe'
              checked={rememberMe}
              onChange={handleRememberMeChange} />
            Recordame en este dispositivo
          </label>
          {/* <p>Olvidaste tu contraseña?</p> */}
        </div>
        <button className="login-button" type='submit'>{isLoading ? (
          <img
            src={gifLoading}
            alt='gift de carga'
            style={{ width: '30vh', height: '5vh' }}
          />
        ) : (<h5>Login</h5>)}</button>

        {/* <div className='register-link'>
          <p>No tienes cuenta? <span onClick={() => navigate('/loginregister')} style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}>Registrate acá</span></p>
        </div> */}
      </form>
    </div>
    </div>
  );
};

export default Login;
