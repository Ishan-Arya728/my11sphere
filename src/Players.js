import React, { useState } from "react";
import PlayerCard from "./PlayerCard";
import players from "./data";

function Players() {
  const [roleFilter, setRoleFilter] = useState("All");
  const [natFilter, setNatFilter] = useState("All");
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const filteredPlayers = players.filter((p) => {
    const roleMatch = roleFilter === "All" || p.role === roleFilter;
    const natMatch = natFilter === "All" || p.nationality === natFilter;
    return roleMatch && natMatch;
  });

  const handleSelect = (player) => {
    setSelectedPlayer(player);
  };

  const headingStyle = { color: "#8b0000", fontSize: "28px", fontWeight: "bold", marginBottom: "6px", borderLeft: "4px solid #cc0000", paddingLeft: "14px" };
  const subStyle = { color: "#888888", fontSize: "15px", marginBottom: "24px", paddingLeft: "18px" };
  const filterAreaStyle = { backgroundColor: "#ffffff", borderRadius: "12px", padding: "18px 22px", marginBottom: "24px", boxShadow: "0 2px 8px rgba(204,0,0,0.08)", display: "flex", gap: "24px", flexWrap: "wrap", alignItems: "center" };
  const filterGroupLabelStyle = { color: "#8b0000", fontSize: "12px", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "1px", marginRight: "8px" };
  const getFilterBtnStyle = (value, activeValue) => ({ padding: "7px 16px", borderRadius: "20px", border: "2px solid #cc0000", backgroundColor: activeValue === value ? "#cc0000" : "#ffffff", color: activeValue === value ? "#ffffff" : "#cc0000", cursor: "pointer", fontWeight: "600", fontSize: "12px", transition: "all 0.2s", marginRight: "6px" });
  const layoutStyle = { display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: "24px", alignItems: "start" };
  const gridStyle = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 14px" };
  const countStyle = { color: "#999999", fontSize: "13px", marginBottom: "14px" };
  const detailPanelStyle = { backgroundColor: "#ffffff", borderRadius: "16px", padding: "0", boxShadow: "0 6px 20px rgba(204,0,0,0.10)", overflow: "hidden", position: "sticky", top: "20px" };
  const detailImageAreaStyle = { background: "linear-gradient(135deg, #8b0000, #e63946)", height: "160px", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" };
  const detailImgStyle = { height: "140px", width: "110px", objectFit: "cover", objectPosition: "top", borderRadius: "10px", border: "3px solid rgba(255,255,255,0.6)" };
  const detailInfoStyle = { padding: "24px" };
  const detailNameStyle = { color: "#8b0000", fontSize: "22px", fontWeight: "bold", marginBottom: "4px" };
  const detailSubStyle = { color: "#aaaaaa", fontSize: "13px", marginBottom: "20px" };
  const detailGridStyle = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" };
  const detailCellStyle = { backgroundColor: "#fdf1f1", borderRadius: "10px", padding: "12px 14px", textAlign: "center", borderBottom: "2px solid #cc0000" };
  const priceBoxStyle = { background: "linear-gradient(90deg, #8b0000, #cc0000)", borderRadius: "10px", padding: "14px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "16px" };
  const placeholderStyle = { backgroundColor: "#ffffff", borderRadius: "16px", padding: "60px 28px", textAlign: "center", color: "#ccbbbb", fontSize: "15px", boxShadow: "0 4px 16px rgba(204,0,0,0.06)", border: "2px dashed #f0d0d0" };

  return (
    <div>
      <h2 style={headingStyle}>IPL Players</h2>
      <p style={subStyle}>Browse all 30 IPL players. Click any card to view their full profile.</p>

      <div style={filterAreaStyle}>
        <div>
          <span style={filterGroupLabelStyle}>Role:</span>
          {["All", "Batsman", "All-rounder", "Bowler"].map((v) => (
            <button key={v} style={getFilterBtnStyle(v, roleFilter)} onClick={() => { setRoleFilter(v); setSelectedPlayer(null); }}>{v}</button>
          ))}
        </div>
        <div>
          <span style={filterGroupLabelStyle}>Nationality:</span>
          {["All", "Indian", "Foreign"].map((v) => (
            <button key={v} style={getFilterBtnStyle(v, natFilter)} onClick={() => { setNatFilter(v); setSelectedPlayer(null); }}>{v}</button>
          ))}
        </div>
      </div>

      <div style={layoutStyle}>
        <div>
          <div style={countStyle}>{filteredPlayers.length} player{filteredPlayers.length !== 1 ? "s" : ""} found</div>
          <div style={gridStyle}>
            {filteredPlayers.map((player) => (
              <PlayerCard key={player.id} player={player} isSelected={selectedPlayer && selectedPlayer.id === player.id} onSelect={handleSelect} />
            ))}
          </div>
        </div>

        <div>
          {selectedPlayer ? (
            <div style={detailPanelStyle}>
              <div style={detailImageAreaStyle}>
                <img src={selectedPlayer.image} alt={selectedPlayer.name} style={detailImgStyle} onError={(e) => { e.target.style.display = "none"; }} />
                <div style={{ position: "absolute", top: "10px", right: "12px", backgroundColor: "#ffd700", color: "#8b0000", fontSize: "11px", fontWeight: "bold", padding: "4px 10px", borderRadius: "10px" }}>{selectedPlayer.team}</div>
              </div>
              <div style={detailInfoStyle}>
                <div style={detailNameStyle}>{selectedPlayer.name}</div>
                <div style={detailSubStyle}>{selectedPlayer.team} · {selectedPlayer.nationality === "Indian" ? "🇮🇳 Indian" : "🌍 Foreign"} · {selectedPlayer.role}</div>
                <div style={detailGridStyle}>
                  {[
                    { label: "Matches", value: selectedPlayer.matches },
                    { label: "Runs", value: selectedPlayer.runs.toLocaleString() },
                    { label: "Average", value: selectedPlayer.average },
                    { label: "Strike Rate", value: selectedPlayer.strikeRate },
                    { label: "Centuries", value: selectedPlayer.centuries },
                    { label: "Wickets", value: selectedPlayer.wickets },
                    { label: "Economy", value: selectedPlayer.economy || "N/A" }
                  ].map((stat) => (
                    <div key={stat.label} style={detailCellStyle}>
                      <div style={{ color: "#aaaaaa", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: "4px" }}>{stat.label}</div>
                      <div style={{ color: "#8b0000", fontWeight: "bold", fontSize: "18px" }}>{stat.value}</div>
                    </div>
                  ))}
                </div>
                <div style={priceBoxStyle}>
                  <span style={{ color: "#ffe8e8", fontSize: "13px", fontWeight: "600" }}>IPL Auction Price</span>
                  <span style={{ color: "#ffd700", fontSize: "22px", fontWeight: "bold" }}>₹{selectedPlayer.price} Cr</span>
                </div>
              </div>
            </div>
          ) : (
            <div style={placeholderStyle}>
              <div style={{ fontSize: "48px", marginBottom: "16px" }}>👆</div>
              <div style={{ fontWeight: "bold", marginBottom: "8px", color: "#cc9999" }}>Select a Player</div>
              Click any player card on the left to view their full IPL profile here.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Players;