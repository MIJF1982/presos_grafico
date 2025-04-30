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
