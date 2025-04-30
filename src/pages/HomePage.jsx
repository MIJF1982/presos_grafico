import React from "react";
import LoginPage from "./LoginPage";
import Dashboard from "./Dashboard";

export default function HomePage({ user, auth }) {
  return (
    <div style={{ padding: 20 }}>
      <h1>Bem-vindo ao Presos Gráfico!</h1>
      {user ? <Dashboard user={user} /> : <LoginPage auth={auth} />}
    </div>
  );
}
