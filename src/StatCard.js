import React from "react";
import PropTypes from "prop-types";

function StatCard(props) {
  const cardStyle = { backgroundColor: "#ffffff", borderRadius: "14px", padding: "24px 20px", flex: "1", minWidth: "160px", borderTop: "4px solid #cc0000", boxShadow: "0 4px 14px rgba(204,0,0,0.10)", textAlign: "center" };
  const iconStyle = { fontSize: "28px", marginBottom: "10px", display: "block" };
  const labelStyle = { color: "#999999", fontSize: "11px", textTransform: "uppercase", letterSpacing: "1.2px", marginBottom: "8px", display: "block" };
  const valueStyle = { color: "#8b0000", fontSize: "18px", fontWeight: "bold", display: "block" };

  return (
    <div style={cardStyle}>
      <span style={iconStyle}>{props.icon}</span>
      <span style={labelStyle}>{props.label}</span>
      <span style={valueStyle}>{props.value}</span>
    </div>
  );
}

StatCard.propTypes = {
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
};

export default StatCard;