// src/pages/SignupPage.jsx
import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

export default function SignupPage({ auth, firebaseApp }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const db = getFirestore(firebaseApp);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      // Cria usuário no Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const { user } = userCredential;

      // Inicializa watchlist vazia no Firestore
      await setDoc(doc(db, "users", user.uid), {
        watchlist: []
      });

      // Redireciona para dashboard
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Crie sua conta</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha (mínimo 6 caracteres)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength={6}
          required
        />
        {error && <p className="error">{error}</p>}
        <button type="submit">Cadastrar</button>
        <p>
          Já tem conta? <Link to="/">Faça login</Link>
        </p>
      </form>
    </div>
  );
}
