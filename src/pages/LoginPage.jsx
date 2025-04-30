import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";

export default function LoginPage({ auth }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError("Falha no login: " + err.message);
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Login</h2>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="Senha" value={password} onChange={e => setPassword(e.target.value)} required />
        {error && <p className="error">{error}</p>}
        <button type="submit">Entrar</button>
        <p>
          Não tem conta? <Link to="/signup">Cadastre-se</Link>
        </p>
      </form>
    </div>
  );
}
