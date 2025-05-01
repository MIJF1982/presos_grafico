import React from 'react';
import TradingViewChart from '../components/TradingViewChart';

export default function Dashboard() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ textAlign: 'center' }}>Dashboard de Ações</h1>
      <TradingViewChart />
    </div>
  );
}

