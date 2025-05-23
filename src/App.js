import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/home";
import AlumniPage from "./pages/alumni";
import ContactPage from "./pages/contact";
import Members from "./pages/members";
import Login from "./pages/login";
import "./pages/global.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <Router>
      {isAuthenticated && (
        <nav>
          <Link to="/">Home</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/members">Members</Link>
          <Link to="/alumni">Alumni</Link>
        </nav>
      )}

      <div className="p-6">
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route
            path="/"
            element={isAuthenticated ? <Home /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/alumni"
            element={isAuthenticated ? <AlumniPage /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/contact"
            element={isAuthenticated ? <ContactPage /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/members"
            element={isAuthenticated ? <Members /> : <Navigate to="/login" replace />}
          />
          <Route path="*" element={<h1>404 - Not Found</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
