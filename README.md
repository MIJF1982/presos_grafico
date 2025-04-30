# Estrutura e instruções passo-a-passo (GitHub Web)

A seguir, cada passo explica como criar **um arquivo** de cada vez no GitHub Web. Não cole tudo de uma vez — faça um arquivo por vez.

---

## Passo 1: vercel.json
1. No GitHub, na raiz do repositório, clique em **Add file** ▶ **Create new file**.
2. No campo "Name your file", digite `vercel.json`.
3. No editor, cole apenas **isto**:
// ========== vercel.json ==========
{
  "version": 2,
  "builds": [
    { "src": "package.json", "use": "@vercel/static-build", "config": { "distDir": "build" } }
  ],
  "routes": [
    { "src": "^/(.*)$", "dest": "/index.html" }
  ]
}

4. Role para baixo, em **Commit new file**, deixe a mensagem padrão e clique em **Commit new file**.

---

## Passo 2: package.json
1. Clique em **Add file** ▶ **Create new file**.
2. Nomeie o arquivo como `package.json`.
3. Cole **isto**:
{
  "name": "simulador-trading",
  "version": "1.0.0",
  "private": true,
  "dependencies": {
    "firebase": "^9.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.11.1",
    "react-scripts": "5.0.1",
    "lightweight-charts": "^4.0.0"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  }
}
4. **Commit new file**.

---

## Passo 3: src/index.js
1. Clique em **Add file** ▶ **Create new file**.
2. No nome, digite `src/index.js` (o GitHub criará a pasta `src`).
3. Cole:
```js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
```
4. **Commit new file**.

---

## Passo 4: src/App.js
1. **Add file** ▶ **Create new file** ▶ nome `src/App.js`.
2. Cole:
```js
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import { firebaseConfig } from "./firebaseConfig";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function App() {
  const [user, setUser] = useState(null);
  useEffect(() => onAuthStateChanged(auth, u => setUser(u)), []);
  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <Navigate to="/dashboard" /> : <LoginPage auth={auth} />} />
        <Route path="/dashboard" element={user ? <Dashboard user={user} /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}
export default App;
```
3. **Commit new file**.

---

## Passo 5: src/firebaseConfig.js
1. **Add file** ▶ **Create new file** ▶ nome `src/firebaseConfig.js`.
2. Cole:
```js
export const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};
```
3. **Commit new file**.

---

## Passo 6: src/components/RealTimeChart.jsx
1. **Add file** ▶ **Create new file** ▶ nome `src/components/RealTimeChart.jsx` (github criará pasta components).
2. Cole:
```jsx
import React, { useEffect, useRef } from "react";
import { createChart } from "lightweight-charts";

export default function RealTimeChart({ symbol }) {
  const containerRef = useRef();
  const chartRef = useRef();
  const seriesRef = useRef();

  useEffect(() => {
    chartRef.current = createChart(containerRef.current, {
      width: containerRef.current.clientWidth,
      height: 300,
      layout: { backgroundColor: '#131722', textColor: '#d1d4dc' },
      grid: { vertLines: { color: '#2B2B43' }, horzLines: { color: '#363C4E' } }
    });
    seriesRef.current = chartRef.current.addCandlestickSeries({ upColor: '#4bffb5', downColor: '#ff4976' });

    const socket = new WebSocket(
      `wss://ws.twelvedata.com/v1/quotes/price?apikey=${process.env.REACT_APP_TWELVE_DATA_API_KEY}&symbol=${symbol}`
    );
    socket.onmessage = e => {
      const msg = JSON.parse(e.data);
      if (msg.price) {
        const time = Math.floor(Date.now() / 1000);
        seriesRef.current.update({ time, open: msg.price, high: msg.price, low: msg.price, close: msg.price });
      }
    };

    const onResize = () => chartRef.current.applyOptions({ width: containerRef.current.clientWidth });
    window.addEventListener("resize", onResize);
    return () => { window.removeEventListener("resize", onResize); socket.close(); };
  }, [symbol]);

  return <div ref={containerRef} />;
}
```
3. **Commit new file**.

---

## Passo 7: src/pages/LoginPage.jsx
1. **Add file** ▶ **Create new file** ▶ nome `src/pages/LoginPage.jsx`.
2. Cole:
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
3. **Commit new file**.

---

## Passo 8: src/pages/Dashboard.jsx
1. **Add file** ▶ **Create new file** ▶ nome `src/pages/Dashboard.jsx`.
2. Cole:
```jsx
import React from "react";
import RealTimeChart from "../components/RealTimeChart";

export default function Dashboard({ user }) {
  return (
    <div style={{ padding: 20 }}>
      <h1>Bem-vindo, {user.email}</h1>
      <h2>Gráfico em Tempo Real: AAPL</h2>
      <RealTimeChart symbol="AAPL" />
    </div>
  );
}
```
3. **Commit new file**.

---

## Passo 9: README.md
1. No GitHub Web, clique no arquivo **README.md** na raiz.
2. Clique no ícone de lápis (✏️) para editar.
3. Substitua o conteúdo (ou acrescente ao final) com este texto:

```markdown
# Simulador Trading 212

Bem-vindo ao seu simulador de trading 212! Este projeto é uma aplicação React com autenticação Firebase e gráficos em tempo real.

## Funcionalidades
- Login multiusuário (Firebase Auth)
- Gráficos de candle em tempo real (Twelve Data WebSocket)
- Navegação com React Router

## Como rodar localmente
1. Crie um arquivo `.env.local` na raiz com suas chaves:
```
REACT_APP_FIREBASE_API_KEY=...
REACT_APP_FIREBASE_AUTH_DOMAIN=...
REACT_APP_FIREBASE_PROJECT_ID=...
REACT_APP_FIREBASE_STORAGE_BUCKET=...
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=...
REACT_APP_FIREBASE_APP_ID=...
REACT_APP_TWELVE_DATA_API_KEY=...
```
2. Instale dependências:
```
npm install
```
3. Inicie em modo de desenvolvimento:
```
npm start
```
4. Acesse `http://localhost:3000`, faça login e depois abra `/dashboard`.

## Deploy no Vercel
1. Faça commit de todas as mudanças no GitHub.
2. No Vercel, importe o repositório.
3. Em **Settings > Environment Variables**, adicione as mesmas variáveis do `.env.local`.
4. Clique em **Deploy**.
5. Seu site ficará disponível em `https://<seu-projeto>.vercel.app`.
```
4. Role para baixo e clique em **Commit changes**.

---

Após isso, seu README estará atualizado com instruções claras de uso e deploy.
