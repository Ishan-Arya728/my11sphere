import React, { useState, useEffect } from "react";
import StatCard from "./StatCard";
import players from "./data";

function Home() {
  const [message, setMessage] = useState("");
  const [factIndex, setFactIndex] = useState(0);
  const [showFact, setShowFact] = useState(false);

  useEffect(() => {
    setMessage("Build your Dream XI. Master the Stats. Dominate the Fantasy League.");
  }, []);

  const facts = [
    "Virat Kohli is the all-time highest run scorer in IPL history with over 8000 runs.",
    "Yuzvendra Chahal is the highest wicket taker in IPL history with over 200 wickets.",
    "Sunil Narine became the fastest player to score 1000 IPL runs in 2024.",
    "Pat Cummins was bought for ₹20.5 Cr, making him one of the most expensive overseas players ever."
  ];

  const indianCount = players.filter((p) => p.nationality === "Indian").length;
  const foreignCount = players.filter((p) => p.nationality === "Foreign").length;
  const topScorer = players.reduce((best, p) => (p.runs > best.runs ? p : best), players[0]);
  const topWicketTaker = players.reduce((best, p) => (p.wickets > best.wickets ? p : best), players[0]);
  const topStrikeRate = players.filter((p) => p.matches > 30).reduce((best, p) => (p.strikeRate > best.strikeRate ? p : best), players[0]);

  const stats = [
    { id: 1, icon: "👥", label: "Total Players", value: players.length + " Players" },
    { id: 2, icon: "🇮🇳", label: "Indian Players", value: indianCount + " Players" },
    { id: 3, icon: "🌍", label: "Foreign Players", value: foreignCount + " Players" },
    { id: 4, icon: "🏆", label: "Top Run Scorer", value: topScorer.name },
    { id: 5, icon: "🎳", label: "Top Wicket Taker", value: topWicketTaker.name },
    { id: 6, icon: "⚡", label: "Best Strike Rate", value: topStrikeRate.name + " (" + topStrikeRate.strikeRate + ")" }
  ];

  const heroStyle = { background: "linear-gradient(135deg, #8b0000 0%, #cc0000 50%, #e63946 100%)", borderRadius: "20px", padding: "56px 48px", marginBottom: "48px", color: "#ffffff", boxShadow: "0 8px 32px rgba(139,0,0,0.30)", position: "relative", overflow: "hidden" };
  const heroDecorStyle = { position: "absolute", top: "-40px", right: "-40px", width: "200px", height: "200px", borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.08)", pointerEvents: "none" };
  const heroDecor2Style = { position: "absolute", bottom: "-60px", left: "30%", width: "300px", height: "300px", borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.04)", pointerEvents: "none" };
  const badgeStyle = { display: "inline-block", backgroundColor: "#ffd700", color: "#8b0000", fontSize: "12px", fontWeight: "bold", padding: "4px 14px", borderRadius: "20px", marginBottom: "16px", letterSpacing: "1px" };
  const heroHeadingStyle = { fontSize: "40px", fontWeight: "bold", marginBottom: "12px", lineHeight: "1.2" };
  const heroSubStyle = { fontSize: "17px", opacity: "0.88", marginBottom: "32px", lineHeight: "1.6", maxWidth: "560px" };
  const btnPrimaryStyle = { backgroundColor: "#ffffff", color: "#cc0000", border: "none", padding: "13px 30px", borderRadius: "8px", cursor: "pointer", fontWeight: "bold", fontSize: "14px", marginRight: "12px" };
  const btnSecStyle = { backgroundColor: "transparent", color: "#ffffff", border: "2px solid rgba(255,255,255,0.7)", padding: "13px 30px", borderRadius: "8px", cursor: "pointer", fontWeight: "bold", fontSize: "14px" };
  const factBoxStyle = { backgroundColor: "rgba(255,255,255,0.14)", borderRadius: "10px", padding: "18px 22px", marginTop: "22px", fontSize: "15px", lineHeight: "1.7", fontStyle: "italic", borderLeft: "3px solid rgba(255,215,0,0.7)" };
  const sectionHeadingStyle = { color: "#8b0000", fontSize: "22px", fontWeight: "bold", marginBottom: "20px", borderLeft: "4px solid #cc0000", paddingLeft: "14px" };
  const statsRowStyle = { display: "flex", flexWrap: "wrap", gap: "16px", marginBottom: "48px" };
  const featureRowStyle = { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px", marginBottom: "16px" };
  const featureCardStyle = { backgroundColor: "#ffffff", borderRadius: "14px", padding: "28px 24px", boxShadow: "0 4px 14px rgba(204,0,0,0.08)", borderBottom: "3px solid #e63946", textAlign: "center" };
  const featureIconStyle = { fontSize: "36px", marginBottom: "14px", display: "block" };
  const featureTitleStyle = { color: "#8b0000", fontSize: "17px", fontWeight: "bold", marginBottom: "8px" };
  const featureDescStyle = { color: "#777777", fontSize: "13px", lineHeight: "1.6" };

  return (
    <div>
      <div style={heroStyle}>
        <div style={heroDecorStyle}></div>
        <div style={heroDecor2Style}></div>
        <div style={badgeStyle}>🏆 IPL 2024 STATS</div>
        <div style={heroHeadingStyle}>
          Welcome to My<span style={{ color: "#ffd700" }}>11</span>Sphere
        </div>
        <div style={heroSubStyle}>{message}</div>
        <div>
          <button style={btnPrimaryStyle} onClick={() => setShowFact(!showFact)}>
            {showFact ? "Hide Fact" : "💡 Show IPL Fact"}
          </button>
          {showFact && (
            <button style={btnSecStyle} onClick={() => setFactIndex((factIndex + 1) % facts.length)}>
              Next Fact →
            </button>
          )}
        </div>
        {showFact && <div style={factBoxStyle}>💡 {facts[factIndex]}</div>}
      </div>

      <div style={sectionHeadingStyle}>IPL Dataset Overview</div>
      <div style={statsRowStyle}>
        {stats.map((stat) => (
          <StatCard key={stat.id} icon={stat.icon} label={stat.label} value={stat.value} />
        ))}
      </div>

      <div style={sectionHeadingStyle}>What Can You Do?</div>
      <div style={featureRowStyle}>
        <div style={featureCardStyle}>
          <span style={featureIconStyle}>👤</span>
          <div style={featureTitleStyle}>Browse Players</div>
          <div style={featureDescStyle}>
            Explore all 30 IPL players with photos, team details, and complete batting and bowling stats.
          </div>
        </div>
        <div style={featureCardStyle}>
          <span style={featureIconStyle}>🏗️</span>
          <div style={featureTitleStyle}>Build Your XI</div>
          <div style={featureDescStyle}>
            Pick 5 Batsmen, 3 All-Rounders, and 3 Bowlers within a ₹100 Cr purse. Max 4 foreign players allowed.
          </div>
        </div>
        <div style={featureCardStyle}>
          <span style={featureIconStyle}>🧠</span>
          <div style={featureTitleStyle}>Quiz Master</div>
          <div style={featureDescStyle}>
            Compare players head-to-head in stat-based challenges. Who has more runs? Who bowls better? Find out!
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;