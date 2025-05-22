import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/home";
import AlumniPage from "./pages/alumni";
import ContactPage from "./pages/contact";
import Members from "./pages/members";
import "./pages/global.css";
function App() {
  return (
    <Router>
      <nav>
         <Link to="/">Home</Link>
         <Link to="/contact">Contact</Link>
         <Link to="/members">Members</Link>
         <Link to="/alumni">Alumni</Link>
      </nav>

      <div className="p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/alumni" element={<AlumniPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/members" element={<Members />} />
          <Route path="*" element={<h1>404 - Not Found</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
