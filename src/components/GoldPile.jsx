import React from 'react';

export default function GoldPile({ goldAmount, monthlyBudget, percentage, onConnectBank }) {
  return (
    <div className="gold-section">
      <h2>Your Gold Vein</h2>
      <div className="gold-pile-container">
        <svg 
          id="goldPile" 
          width="200" 
          height="250" 
          viewBox="0 0 200 250"
          style={{
            opacity: (percentage / 100) * 0.8 + 0.2,
            transform: `scaleY(${percentage / 100})`,
            transition: 'all 0.3s ease'
          }}
        >
          {/* Base nuggets */}
          <ellipse cx="100" cy="200" rx="90" ry="30" fill="#3d3320" opacity="0.8"/>
          <ellipse cx="70" cy="190" rx="35" ry="25" fill="#6b5d47" opacity="0.7"/>
          <ellipse cx="130" cy="190" rx="35" ry="25" fill="#6b5d47" opacity="0.7"/>

          {/* Main pile layers */}
          <ellipse cx="100" cy="160" rx="80" ry="35" fill="#8b7355"/>
          <ellipse cx="100" cy="130" rx="70" ry="35" fill="#a68a5f"/>
          <ellipse cx="100" cy="100" rx="60" ry="35" fill="#c4a747"/>
          <ellipse cx="100" cy="70" rx="50" ry="33" fill="#d4b860"/>
          <ellipse cx="100" cy="45" rx="35" ry="30" fill="#dbc47d"/>

          {/* Highlight at top */}
          <ellipse cx="100" cy="30" rx="25" ry="18" fill="#ffd700" opacity="0.9"/>
          <circle cx="88" cy="25" r="8" fill="#ffed4e" opacity="0.7"/>
          <circle cx="115" cy="28" r="6" fill="#ffed4e" opacity="0.6"/>

          {/* Scattered nuggets */}
          <circle cx="35" cy="170" r="12" fill="#b8956a" opacity="0.8"/>
          <circle cx="165" cy="175" r="10" fill="#b8956a" opacity="0.8"/>
          <circle cx="50" cy="150" r="8" fill="#c4a747" opacity="0.7"/>
          <circle cx="155" cy="155" r="9" fill="#c4a747" opacity="0.7"/>
        </svg>
        <div className="percentage-label">{percentage}%</div>
      </div>
      <h3 style={{ color: '#d4af37', marginBottom: '20px' }}>
        Monthly Budget: ${monthlyBudget}
      </h3>
      <p style={{ marginBottom: '20px' }}>${goldAmount} Remaining</p>
      <button onClick={onConnectBank} className="primary-btn">
        🏦 Connect Your Bank via Plaid
      </button>
    </div>
  );
}
