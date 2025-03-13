import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

interface LoginProps {
  setIsAuthenticated: (value: boolean) => void;
}

const Login: React.FC<LoginProps> = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    //Imprime en consola los valores de username y password
    console.log(username);
    console.log(password);
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:8000/api/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombreUsuario: username, contraseña: password })
      });
      if (response.ok) {
        localStorage.setItem("isAuthenticated", "true"); // Guardar sesión en localStorage
        setIsAuthenticated(true);
        navigate('/beneficiarios');
      } else {
        setMensaje("Credenciales incorrectas");
      }
    } catch (error) {
      setMensaje("Error de conexión a la API" + error);
    }
  };

  return (
    <div className="container-unp" style={{ maxWidth: '400px', margin: '50px auto' }}>
      <h2 className="title-unp" style={{ textAlign: 'center' }}>Iniciar Sesión</h2>
      {mensaje && <p className="alert-message" style={{ color: 'red', textAlign: 'center' }}>{mensaje}</p>}
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Usuario:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <button className="btn-unp" type="submit" style={{ width: '100%', marginTop: '10px' }}>
          Entrar
        </button>
      </form>
    </div>
  );  
};

export default Login;
