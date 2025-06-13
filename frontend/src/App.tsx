import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import { ValidRoutes } from "../../backend/src/shared/ValidRoutes";
import Home from "./pages/home";
import AlumniPage from "./pages/alumni";
import ContactPage from "./pages/contact";
import Members from "./pages/members";
import Login from "./pages/login";
import "./pages/global.css";

const App: React.FC = () => {

  const [authToken, setAuthToken] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleSuccess = (token: string) => {
    setIsAuthenticated(true);
    setAuthToken(token);
    localStorage.setItem("isAuthenticated", JSON.stringify(true));
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
          <Route path={ValidRoutes.LOGIN} element={<Login handleSuccess={handleSuccess}/>} />
          <Route
            path={ValidRoutes.HOME}
            element={isAuthenticated ? <Home authToken={authToken} /> : <Navigate to={ValidRoutes.LOGIN} replace />}
          />
          <Route
            path={ValidRoutes.ALUMNI}
            element={isAuthenticated ? <AlumniPage authToken={authToken} /> : <Navigate to={ValidRoutes.LOGIN} replace />}
          />
          <Route
            path={ValidRoutes.CONTACT}
            element={isAuthenticated ? <ContactPage authToken={authToken} /> : <Navigate to={ValidRoutes.LOGIN} replace />}
          />
          <Route
            path={ValidRoutes.MEMBERS}
            element={isAuthenticated ? <Members authToken={authToken}/> : <Navigate to={ValidRoutes.LOGIN} replace />}
          />
          <Route path="*" element={<h1>404 - Not Found</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
