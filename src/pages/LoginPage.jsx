import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && pass) {
      localStorage.setItem('auth', 'true');
      navigate('/dashboard');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Bem-vindo ao Presos Gráfico!</h1>
      <form onSubmit={handleLogin} style={{ marginTop: '2rem' }}>
        <label>Email:</label><br />
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /><br /><br />
        <label>Password:</label><br />
        <input type="password" value={pass} onChange={(e) => setPass(e.target.value)} required /><br /><br />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default Login;
