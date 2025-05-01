import React from 'react';

export default function Dashboard() {
  return (
    <div>
      <h1 style={{ textAlign: 'center', marginTop: '2rem' }}>Dashboard de Ações (como Trading 212)</h1>
      {/* Aqui você pode colocar seu gráfico, lista de ações, etc */}
      <div style={{ margin: '2rem', textAlign: 'center' }}>
        <iframe
          title="TradingView Widget"
          src="https://s.tradingview.com/embed-widget/symbol-overview/?locale=br#%7B%7D"
          width="100%"
          height="500"
          frameBorder="0"
          allowtransparency="true"
          scrolling="no"
        ></iframe>
      </div>
    </div>
  );
}
