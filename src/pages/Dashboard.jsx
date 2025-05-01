// src/pages/Dashboard.jsx
import { useState } from "react";
import TradingViewChart from "../components/TradingViewChart";

export default function Dashboard() {
  const [symbol, setSymbol] = useState("EURONEXT:GALP");

  return (
    <div>
      <h2>Bem-vindo ao Presos Gráfico</h2>
      <label>Escolha a ação: </label>
      <input
        type="text"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value)}
        placeholder="Ex: EURONEXT:GALP"
      />
      <TradingViewChart symbol={symbol} />
    </div>
  );
}
