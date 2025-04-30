import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import { firebaseConfig } from "./services/firebase";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function App() {
  const [user, setUser] = useState(null);
  useEffect(() => onAuthStateChanged(auth, u => setUser(u)), []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage user={user} auth={auth} />} />
        <Route path="/signup" element={<SignupPage auth={auth} />} />
      </Routes>
    </Router>
  );
}
export default App;
