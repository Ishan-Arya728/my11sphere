import React, { useState } from "react";
import PropTypes from "prop-types";

function PlayerCard(props) {
  const [imgError, setImgError] = useState(false);

  const cardStyle = { backgroundColor: props.isSelected ? "#fff5f5" : "#ffffff", border: props.isSelected ? "2px solid #cc0000" : "2px solid #f0e0e0", borderRadius: "14px", padding: "0", cursor: "pointer", marginBottom: "14px", boxShadow: props.isSelected ? "0 6px 18px rgba(204,0,0,0.18)" : "0 2px 8px rgba(0,0,0,0.07)", overflow: "hidden", transition: "all 0.2s" };
  const imageAreaStyle = { height: "120px", backgroundColor: "#fdf1f1", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", position: "relative" };
  const teamBadgeStyle = { position: "absolute", top: "8px", right: "10px", backgroundColor: "#8b0000", color: "#ffd700", fontSize: "10px", fontWeight: "bold", padding: "3px 8px", borderRadius: "10px", letterSpacing: "0.5px" };
  const natBadgeStyle = { position: "absolute", top: "8px", left: "10px", backgroundColor: props.player.nationality === "Indian" ? "#006400" : "#00008b", color: "#ffffff", fontSize: "10px", fontWeight: "bold", padding: "3px 8px", borderRadius: "10px" };
  const imgStyle = { width: "80px", height: "100px", objectFit: "cover", objectPosition: "top", borderRadius: "8px", border: "2px solid #e0c0c0" };
  const fallbackStyle = { width: "80px", height: "100px", backgroundColor: "#f0d0d0", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "32px" };
  const infoStyle = { padding: "14px 16px" };
  const nameStyle = { color: "#1a1a1a", fontSize: "15px", fontWeight: "bold", marginBottom: "8px" };
  const badgeRowStyle = { display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "10px" };
  const getRoleBadgeStyle = () => ({ fontSize: "11px", padding: "3px 10px", borderRadius: "20px", fontWeight: "600", backgroundColor: props.player.role === "Batsman" ? "#fff0f0" : props.player.role === "Bowler" ? "#f0f0ff" : "#fffbe0", color: props.player.role === "Batsman" ? "#cc0000" : props.player.role === "Bowler" ? "#0044cc" : "#886600" });
  const priceRowStyle = { display: "flex", justifyContent: "space-between", alignItems: "center" };
  const priceLabelStyle = { color: "#aaaaaa", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.5px" };
  const priceValueStyle = { color: "#8b0000", fontWeight: "bold", fontSize: "15px" };

  return (
    <div style={cardStyle} onClick={() => props.onSelect(props.player)}>
      <div style={imageAreaStyle}>
        {imgError ? (
          <div style={fallbackStyle}>🏏</div>
        ) : (
          <img src={props.player.image} alt={props.player.name} style={imgStyle} onError={() => setImgError(true)} />
        )}
        <div style={teamBadgeStyle}>{props.player.team}</div>
        <div style={natBadgeStyle}>{props.player.nationality === "Indian" ? "🇮🇳 IND" : "🌍 FOR"}</div>
      </div>
      <div style={infoStyle}>
        <div style={nameStyle}>{props.player.name}</div>
        <div style={badgeRowStyle}>
          <span style={getRoleBadgeStyle()}>{props.player.role}</span>
          <span style={{ ...getRoleBadgeStyle(), backgroundColor: "#f5f5f5", color: "#555555" }}>{props.player.matches} Matches</span>
        </div>
        <div style={priceRowStyle}>
          <span style={priceLabelStyle}>IPL Price</span>
          <span style={priceValueStyle}>₹{props.player.price} Cr</span>
        </div>
      </div>
    </div>
  );
}

PlayerCard.propTypes = {
  player: PropTypes.object.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired
};

export default PlayerCard;