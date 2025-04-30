```jsx
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function LoginPage({ auth }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();
    try { await signInWithEmailAndPassword(auth, email, password); }
    catch { setError("Falha no login."); }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>
        <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required />
        <input type="password" placeholder="Senha" value={password} onChange={e=>setPassword(e.target.value)} required />
        {error && <p className="error">{error}</p>}
        <button type="submit">Continue to Dashboard</button>
      </form>
    </div>
  );
}
```
