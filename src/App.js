import React, { useState } from 'react';
import LoginForm from './LoginForm';
import Dashboard from './Dashboard';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (email, password) => {
    // Aqui pode-se adicionar autenticação real
    if (email && password) {
      setIsAuthenticated(true);
    }
  };

  return (
    <div>
      {!isAuthenticated ? (
        <LoginForm onLogin={handleLogin} />
      ) : (
        <Dashboard />
      )}
    </div>
  );
}

