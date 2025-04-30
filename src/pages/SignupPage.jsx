import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import { db } from "../services/firebase";

export default function SignupPage({ auth }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "users", userCred.user.uid), { watchlist: [] });
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: 300 }}>
      <label>Email:</label>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
      <label>Senha:</label>
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} minLength={6} required />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button type="submit">Cadastrar</button>
      <p>Já tem conta? <Link to="/">Login</Link></p>
    </form>
}
