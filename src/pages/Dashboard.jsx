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
