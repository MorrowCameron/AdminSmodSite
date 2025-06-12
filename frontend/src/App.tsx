import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import { ValidRoutes } from "../../backend/src/shared/ValidRoutes";
import Home from "./pages/home";
import AlumniPage from "./pages/alumni";
import ContactPage from "./pages/contact";
import Members from "./pages/members";
import Login from "./pages/login";
import "./pages/global.css";

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

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
          <Route path={ValidRoutes.LOGIN} element={<Login onLogin={handleLogin} />} />
          <Route
            path={ValidRoutes.HOME}
            element={isAuthenticated ? <Home /> : <Navigate to={ValidRoutes.LOGIN} replace />}
          />
          <Route
            path={ValidRoutes.ALUMNI}
            element={isAuthenticated ? <AlumniPage /> : <Navigate to={ValidRoutes.LOGIN} replace />}
          />
          <Route
            path={ValidRoutes.CONTACT}
            element={isAuthenticated ? <ContactPage /> : <Navigate to={ValidRoutes.LOGIN} replace />}
          />
          <Route
            path={ValidRoutes.MEMBERS}
            element={isAuthenticated ? <Members /> : <Navigate to={ValidRoutes.LOGIN} replace />}
          />
          <Route path="*" element={<h1>404 - Not Found</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
