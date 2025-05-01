import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Simples verificação (podes ligar a uma API real depois)
    if (email && pass) {
      localStorage.setItem('auth', 'true');
      navigate('/dashboard');
    } else {
      alert('Preenche o email e a palavra-passe');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '5rem' }}>
      <h1>Bem-vindo ao Presos Gráfico!</h1>
      <form onSubmit={handleLogin} style={{ marginTop: '2rem' }}>
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ padding: '0.5rem', marginBottom: '1rem', width: '200px' }}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Palavra-passe"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            required
            style={{ padding: '0.5rem', width: '200px' }}
          />
        </div>
        <button type="submit" style={{ marginTop: '1rem', padding: '0.5rem 1rem' }}>
          Entrar
        </button>
      </form>
    </div>
  );
}
