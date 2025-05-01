// src/components/TradingViewChart.jsx
import { useEffect, useRef } from "react";

export default function TradingViewChart({ symbol }) {
  const containerRef = useRef();

  useEffect(() => {
    if (!window.TradingView) return;

    new window.TradingView.widget({
      container_id: containerRef.current.id,
      width: "100%",
      height: 600,
      symbol,
      interval: "D",
      timezone: "Europe/Lisbon",
      theme: "light",
      style: "1",
      locale: "pt",
      toolbar_bg: "#f1f3f6",
      enable_publishing: false,
      allow_symbol_change: true,
      hide_legend: false,
      withdateranges: true,
      details: true,
      studies: ["MACD@tv-basicstudies", "RSI@tv-basicstudies"],
    });
  }, [symbol]);

  return <div id="tv_chart_container" ref={containerRef}></div>;
}

