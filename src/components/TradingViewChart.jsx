import React, { useEffect } from 'react';

export default function TradingViewChart() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/tv.js';
    script.async = true;
    script.onload = () => {
      new window.TradingView.widget({
        autosize: true,
        symbol: 'EURONEXT:GALP', // símbolo inicial
        interval: 'D',
        timezone: 'Etc/UTC',
        theme: 'light',
        style: '1',
        locale: 'en',
        toolbar_bg: '#f1f3f6',
        enable_publishing: false,
        allow_symbol_change: true,
        container_id: 'tradingview_container',
        withdateranges: true,
        hide_side_toolbar: false,
        details: true,
        studies: [
          "MACD@tv-basicstudies",
          "RSI@tv-basicstudies"
        ]
      });
    };

    document.getElementById('tradingview_container')?.appendChild(script);
  }, []);

  return (
    <div style={{ height: '600px' }}>
      <div id="tradingview_container" style={{ height: '100%' }} />
    </div>
  );
}
