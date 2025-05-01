import React, { useState } from 'react';

export default function LoginForm({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '5rem' }}>
      <h2>Bem-vindo ao Presos Gráfico!</h2>
      <form onSubmit={handleSubmit} style={{ marginTop: '2rem' }}>
        <div>
          <label>Email:</label><br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ padding: '8px', width: '250px' }}
          />
        </div>
        <div style={{ marginTop: '1rem' }}>
          <label>Senha:</label><br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ padding: '8px', width: '250px' }}
          />
        </div>
        <button type="submit" style={{ marginTop: '2rem', padding: '10px 20px' }}>
          Entrar
        </button>
      </form>
    </div>
  );
}
