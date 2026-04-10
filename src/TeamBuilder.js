import React, { useState } from "react";
import players from "./data";

function TeamBuilder() {
  const [selectedIds, setSelectedIds] = useState([]);
  const [filter, setFilter] = useState("All");

  const PURSE_LIMIT = 100;
  const FOREIGN_LIMIT = 4;
  const REQUIRED = { Batsman: 5, "All-rounder": 3, Bowler: 3 };

  const filteredPlayers = filter === "All" ? players : players.filter((p) => p.role === filter);
  const selectedPlayers = selectedIds.map((id) => players.find((p) => p.id === id));
  
  const totalSpent = selectedPlayers.reduce((sum, p) => sum + p.price, 0);
  const purseLeft = +(PURSE_LIMIT - totalSpent).toFixed(2);
  const foreignCount = selectedPlayers.filter((p) => p.nationality === "Foreign").length;

  const selectedBatsmen = selectedPlayers.filter((p) => p.role === "Batsman").length;
  const selectedAllRounders = selectedPlayers.filter((p) => p.role === "All-rounder").length;
  const selectedBowlers = selectedPlayers.filter((p) => p.role === "Bowler").length;

  const canAddRole = (role) => {
    if (role === "Batsman") return selectedBatsmen < REQUIRED["Batsman"];
    if (role === "All-rounder") return selectedAllRounders < REQUIRED["All-rounder"];
    if (role === "Bowler") return selectedBowlers < REQUIRED["Bowler"];
    return false;
  };

  const handleToggle = (player) => {
    if (selectedIds.includes(player.id)) {
      setSelectedIds(selectedIds.filter((id) => id !== player.id));
      return;
    }
    if (selectedIds.length >= 11) return;
    if (!canAddRole(player.role)) return;
    if (player.nationality === "Foreign" && foreignCount >= FOREIGN_LIMIT) return;
    if (player.price > purseLeft) return;
    setSelectedIds([...selectedIds, player.id]);
  };

  const handleReset = () => setSelectedIds([]);

  const isTeamComplete = selectedBatsmen === 5 && selectedAllRounders === 3 && selectedBowlers === 3;
  const byRole = (role) => selectedPlayers.filter((p) => p.role === role);

  const headingStyle = { color: "#8b0000", fontSize: "28px", fontWeight: "bold", marginBottom: "6px", borderLeft: "4px solid #cc0000", paddingLeft: "14px" };
  const subStyle = { color: "#888888", fontSize: "15px", marginBottom: "24px", paddingLeft: "18px" };
  const rulesBarStyle = { display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "24px" };
  const ruleChipStyle = { backgroundColor: "#ffffff", border: "1px solid #f0d0d0", borderRadius: "20px", padding: "6px 16px", color: "#8b0000", fontSize: "13px", fontWeight: "600", boxShadow: "0 1px 4px rgba(204,0,0,0.08)" };
  const layoutStyle = { display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: "24px", alignItems: "start" };
  const filterRowStyle = { display: "flex", gap: "8px", marginBottom: "16px", flexWrap: "wrap" };
  const getFilterBtnStyle = (value) => ({ padding: "7px 16px", borderRadius: "20px", border: "2px solid #cc0000", backgroundColor: filter === value ? "#cc0000" : "#ffffff", color: filter === value ? "#ffffff" : "#cc0000", cursor: "pointer", fontWeight: "600", fontSize: "12px" });
  const listStyle = { maxHeight: "640px", overflowY: "auto", paddingRight: "4px" };
  
  const getRowStyle = (player) => {
    const isSelected = selectedIds.includes(player.id);
    const isDisabled = (!canAddRole(player.role) && !isSelected) || (player.nationality === "Foreign" && foreignCount >= FOREIGN_LIMIT && !isSelected) || (player.price > purseLeft && !isSelected);
    return { display: "flex", alignItems: "center", gap: "12px", padding: "12px 14px", backgroundColor: isSelected ? "#fff5f5" : "#ffffff", border: isSelected ? "2px solid #cc0000" : "2px solid #f0e0e0", borderRadius: "12px", marginBottom: "8px", opacity: isDisabled ? 0.38 : 1, cursor: isDisabled ? "not-allowed" : "pointer", boxShadow: isSelected ? "0 3px 10px rgba(204,0,0,0.12)" : "none" };
  };

  const rowImgStyle = { width: "44px", height: "52px", objectFit: "cover", objectPosition: "top", borderRadius: "8px", border: "1px solid #f0d0d0", flexShrink: 0 };
  const rowNameStyle = { fontWeight: "700", color: "#1a1a1a", fontSize: "14px" };
  const rowMetaStyle = { color: "#aaaaaa", fontSize: "11px", marginTop: "2px" };
  const rowPriceStyle = { marginLeft: "auto", color: "#8b0000", fontWeight: "bold", fontSize: "14px", flexShrink: 0 };
  const teamPanelStyle = { backgroundColor: "#ffffff", borderRadius: "16px", overflow: "hidden", boxShadow: "0 6px 20px rgba(204,0,0,0.10)", position: "sticky", top: "20px" };
  const panelHeaderStyle = { background: "linear-gradient(90deg, #8b0000, #cc0000)", padding: "18px 22px" };
  const purseBarContainerStyle = { backgroundColor: "rgba(255,255,255,0.2)", borderRadius: "10px", height: "8px", marginTop: "10px", overflow: "hidden" };
  const purseFillStyle = { height: "100%", width: Math.min((totalSpent / PURSE_LIMIT) * 100, 100) + "%", backgroundColor: totalSpent > PURSE_LIMIT * 0.85 ? "#ffd700" : "#ffffff", borderRadius: "10px", transition: "width 0.3s" };
  const panelBodyStyle = { padding: "20px" };
  const roleSectionStyle = { marginBottom: "18px" };
  const getBadgeStyle = (current, required) => ({ backgroundColor: current === required ? "#22aa55" : "#ff9900", color: "#ffffff", borderRadius: "10px", padding: "2px 8px", fontSize: "11px", fontWeight: "bold", marginLeft: "8px" });
  const getSlotStyle = (filled) => ({ padding: "8px 12px", borderRadius: "8px", marginBottom: "6px", backgroundColor: filled ? "#fff5f5" : "#fafafa", border: filled ? "1px solid #ffcccc" : "1px dashed #e0e0e0", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "13px", color: filled ? "#1a1a1a" : "#cccccc", fontWeight: filled ? "600" : "400" });
  const resetBtnStyle = { width: "100%", backgroundColor: "#ffffff", color: "#cc0000", border: "2px solid #cc0000", borderRadius: "8px", padding: "11px 0", cursor: "pointer", fontWeight: "bold", fontSize: "14px", marginTop: "8px" };

  return (
    <div>
      <h2 style={headingStyle}>Team Builder 🏗️</h2>
      <p style={subStyle}>Pick your Dream XI within the ₹100 Cr purse. Max 4 foreign players allowed.</p>

      <div style={rulesBarStyle}>
        <span style={ruleChipStyle}>🏏 5 Batsmen Required</span>
        <span style={ruleChipStyle}>⚡ 3 All-Rounders Required</span>
        <span style={ruleChipStyle}>🎯 3 Bowlers Required</span>
        <span style={ruleChipStyle}>🌍 Max 4 Foreign Players</span>
        <span style={ruleChipStyle}>💰 ₹100 Cr Purse Limit</span>
      </div>

      <div style={layoutStyle}>
        <div>
          <div style={filterRowStyle}>
            {["All", "Batsman", "All-rounder", "Bowler"].map((v) => (
              <button key={v} style={getFilterBtnStyle(v)} onClick={() => setFilter(v)}>{v}</button>
            ))}
          </div>

          <div style={listStyle}>
            {filteredPlayers.map((player) => {
              const isSelected = selectedIds.includes(player.id);
              return (
                <div key={player.id} style={getRowStyle(player)} onClick={() => handleToggle(player)}>
                  <img src={player.image} alt={player.name} style={rowImgStyle} onError={(e) => { e.target.style.display = "none"; }} />
                  <div style={{ flex: 1 }}>
                    <div style={rowNameStyle}>{player.name}</div>
                    <div style={rowMetaStyle}>{player.team} · {player.role} · {player.nationality === "Foreign" ? "🌍 Foreign" : "🇮🇳 Indian"}</div>
                  </div>
                  <div style={rowPriceStyle}>₹{player.price} Cr</div>
                  <div style={{ backgroundColor: isSelected ? "#cc0000" : "#f0e0e0", color: isSelected ? "#ffffff" : "#cc0000", borderRadius: "6px", padding: "5px 10px", fontSize: "12px", fontWeight: "bold", flexShrink: 0 }}>
                    {isSelected ? "✕" : "+"}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div style={teamPanelStyle}>
          <div style={panelHeaderStyle}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ color: "#ffffff", fontWeight: "bold", fontSize: "16px" }}>Your XI ({selectedIds.length}/11)</span>
              <span style={{ color: "#ffd700", fontWeight: "bold", fontSize: "15px" }}>₹{purseLeft} Cr Left</span>
            </div>
            <div style={purseBarContainerStyle}>
              <div style={purseFillStyle}></div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "6px" }}>
              <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "11px" }}>₹{totalSpent} Cr spent</span>
              <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "11px" }}>🌍 {foreignCount}/{FOREIGN_LIMIT} Foreign</span>
            </div>
          </div>

          <div style={panelBodyStyle}>
            {isTeamComplete && (
              <div style={{ backgroundColor: "#f0fff4", border: "2px solid #22aa55", borderRadius: "10px", padding: "12px 16px", color: "#166534", fontWeight: "bold", fontSize: "14px", textAlign: "center", marginBottom: "16px" }}>
                ✅ Dream XI Complete!
              </div>
            )}
            {["Batsman", "All-rounder", "Bowler"].map((role) => (
              <div key={role} style={roleSectionStyle}>
                <div style={{ fontSize: "12px", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "1px", color: "#888", marginBottom: "8px", display: "flex", alignItems: "center" }}>
                  {role === "Batsman" ? "🏏" : role === "Bowler" ? "🎯" : "⚡"} {role}s
                  <span style={getBadgeStyle(byRole(role).length, REQUIRED[role])}>{byRole(role).length}/{REQUIRED[role]}</span>
                </div>
                {Array.from({ length: REQUIRED[role] }).map((_, i) => (
                  <div key={i} style={getSlotStyle(!!byRole(role)[i])}>
                    <span>{byRole(role)[i] ? byRole(role)[i].name : "Empty slot"}</span>
                    {byRole(role)[i] && <span style={{ color: "#cc0000", fontSize: "12px" }}>₹{byRole(role)[i].price} Cr</span>}
                  </div>
                ))}
              </div>
            ))}
            <button style={resetBtnStyle} onClick={handleReset}>Reset Team</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeamBuilder;