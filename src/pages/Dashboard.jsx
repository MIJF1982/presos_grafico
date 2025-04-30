import React, { useEffect, useState } from "react";
import RealTimeChart from "../components/RealTimeChart";
import Watchlist from "../components/Watchlist";
import { db } from "../services/firebase";
import { doc, onSnapshot } from "firebase/firestore";

export default function Dashboard({ user }) {
  const [symbols, setSymbols] = useState([]);
  useEffect(() => {
    const unsub = onSnapshot(doc(db, "users", user.uid), snap => {
      setSymbols(snap.data()?.watchlist || []);
    });
    return unsub;
  }, [user.uid]);

  return (
    <div>
      <Watchlist symbols={symbols} user={user} />
      {symbols.map(sym => (
        <div key={sym} style={{ marginTop: 20 }}>
          <h2>{sym}</h2>
          <RealTimeChart symbol={sym} />
        </div>
      ))}
    </div>
  );
}
