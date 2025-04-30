import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Dashboard from "./pages/Dashboard";
import { firebaseConfig } from "./services/firebase";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function App() {
  const [user, setUser] = useState(null);
  useEffect(() => onAuthStateChanged(auth, u => setUser(u)), []);
  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <Navigate to="/dashboard" /> : <LoginPage auth={auth} />} />
        <Route path="/signup" element={user ? <Navigate to="/dashboard" /> : <SignupPage auth={auth} firebaseApp={app}/>} />
        <Route path="/dashboard" element={user ? <Dashboard user={user} /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}
export default App;
