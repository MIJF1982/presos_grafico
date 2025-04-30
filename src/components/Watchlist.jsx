import React, { useState } from "react";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "../services/firebase";

export default function Watchlist({ symbols, user }) {
  const [input, setInput] = useState("");

  const addSymbol = async () => {
    if (!input) return;
    await updateDoc(doc(db, "users", user.uid), { watchlist: arrayUnion(input.toUpperCase()) });
    setInput("");
  };

  const removeSymbol = async sym => {
    await updateDoc(doc(db, "users", user.uid), { watchlist: arrayRemove(sym) });
  };

  return (
    <div>
      <h3>Minha Watchlist</h3>
      <input value={input} onChange={e => setInput(e.target.value)} placeholder="Símbolo (ex: AAPL)" />
      <button onClick={addSymbol}>Adicionar</button>
      <ul>
        {symbols.map(sym => (
          <li key={sym}>
            {sym} <button onClick={() => removeSymbol(sym)}>Remover</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
