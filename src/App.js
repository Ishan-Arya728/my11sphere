import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import Players from "./Players";
import TeamBuilder from "./TeamBuilder";
import Quiz from "./Quiz";

function App() {
  const wrapperStyle = { fontFamily: "'Georgia', 'Times New Roman', serif", backgroundColor: "#fdf1f1", minHeight: "100vh", margin: 0, padding: 0 };
  const navStyle = { background: "linear-gradient(90deg, #8b0000 0%, #cc0000 60%, #e63946 100%)", padding: "0 40px", display: "flex", alignItems: "stretch", height: "64px", boxShadow: "0 4px 12px rgba(139,0,0,0.35)" };
  const brandStyle = { display: "flex", alignItems: "center", gap: "10px", textDecoration: "none", marginRight: "auto" };
  const brandTextStyle = { color: "#ffffff", fontSize: "22px", fontWeight: "bold", letterSpacing: "1px" };
  const brandHighlightStyle = { color: "#ffd700", fontSize: "26px", fontWeight: "bold" };
  const linkStyle = { color: "#ffe8e8", textDecoration: "none", fontSize: "14px", fontWeight: "600", display: "flex", alignItems: "center", padding: "0 18px", borderBottom: "3px solid transparent", letterSpacing: "0.3px" };
  const contentStyle = { maxWidth: "1140px", margin: "0 auto", padding: "40px 32px 60px 32px" };
  const footerStyle = { background: "linear-gradient(90deg, #8b0000 0%, #cc0000 100%)", padding: "32px 40px", marginTop: "48px", borderTop: "3px solid #ffd700" };
  const footerRowStyle = { maxWidth: "1140px", margin: "0 auto", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "20px" };
  const footerColStyle = { color: "#ffe8e8", fontSize: "14px", lineHeight: "1.8" };
  const footerHeadStyle = { color: "#ffd700", fontWeight: "bold", fontSize: "15px", marginBottom: "8px" };
  const footerBottomStyle = { maxWidth: "1140px", margin: "20px auto 0 auto", borderTop: "1px solid rgba(255,255,255,0.2)", paddingTop: "16px", color: "#ffcccc", fontSize: "12px", textAlign: "center" };

  return (
    <BrowserRouter>
      <div style={wrapperStyle}>
        
        <nav style={navStyle}>
          <Link to="/" style={brandStyle}>
            <span style={{ fontSize: "28px" }}>🏏</span>
            <span style={brandTextStyle}>My<span style={brandHighlightStyle}>11</span>Sphere</span>
          </Link>
          <Link to="/" style={linkStyle}>Home</Link>
          <Link to="/players" style={linkStyle}>Players</Link>
          <Link to="/team" style={linkStyle}>Team Builder</Link>
          <Link to="/quiz" style={linkStyle}>Quiz Master</Link>
        </nav>

        <div style={contentStyle}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/players" element={<Players />} />
            <Route path="/team" element={<TeamBuilder />} />
            <Route path="/quiz" element={<Quiz />} />
          </Routes>
        </div>

        <footer style={footerStyle}>
          <div style={footerRowStyle}>
            <div style={footerColStyle}>
              <div style={footerHeadStyle}>🏏 My11Sphere</div>
              <div>Your ultimate IPL fantasy cricket platform.</div>
              <div>Build your Dream XI. Test your knowledge.</div>
            </div>
            <div style={footerColStyle}>
              <div style={footerHeadStyle}>Contact Us</div>
              <div>📧 support@my11sphere.com</div>
              <div>📞 +91 98765 43210</div>
              <div>📍 Chennai, Tamil Nadu, India</div>
            </div>
            <div style={footerColStyle}>
              <div style={footerHeadStyle}>Follow Us</div>
              <div>🐦 @My11Sphere</div>
              <div>📸 @My11Sphere.Official</div>
              <div>💼 My11Sphere on LinkedIn</div>
            </div>
          </div>
          <div style={footerBottomStyle}>
            © 2026 My11Sphere. All rights reserved. | Fantasy cricket is for entertainment purposes only. | This app uses IPL player statistics for educational use.
          </div>
        </footer>

      </div>
    </BrowserRouter>
  );
}

export default App;