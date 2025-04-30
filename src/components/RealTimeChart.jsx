import React, { useEffect, useRef } from "react";
import { createChart } from "lightweight-charts";
import { TD_WEBSOCKET_URL } from "../services/twelvedata";

export default function RealTimeChart({ symbol }) {
  const ref = useRef();
  const chartRef = useRef();
  const seriesRef = useRef();

  useEffect(() => {
    chartRef.current = createChart(ref.current, { width: ref.current.clientWidth, height: 300 });
    seriesRef.current = chartRef.current.addCandlestickSeries();

    const socket = new WebSocket(TD_WEBSOCKET_URL(symbol));
    socket.onmessage = e => {
      const msg = JSON.parse(e.data);
      if (msg.price) {
        const time = Math.floor(Date.now() / 1000);
        seriesRef.current.update({ time, open: msg.price, high: msg.price, low: msg.price, close: msg.price });
      }
    };

    const onResize = () => chartRef.current.applyOptions({ width: ref.current.clientWidth });
    window.addEventListener("resize", onResize);
    return () => { window.removeEventListener("resize", onResize); socket.close(); };
  }, [symbol]);

  return <div ref={ref} />;
}
