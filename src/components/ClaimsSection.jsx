import React from 'react';

const Claim = ({ name, emoji, percentage, current, max, isWarning }) => (
  <div className="claim">
    <div className="claim-name">{emoji} {name}</div>
    <div className="claim-bar-wrapper">
      <div 
        className="claim-bar" 
        style={{ width: `${percentage}%` }}
      >
        {percentage}%
      </div>
    </div>
    <div className="claim-amount">${current} / ${max}</div>
    {isWarning && (
      <div className="warning">⚠️ Overmined! You're ${current - max} over budget.</div>
    )}
  </div>
);

export default function ClaimsSection() {
  const claims = [
    { name: 'Homestead (Rent/Housing)', emoji: '🏠', percentage: 50, current: 1000, max: 1000, isWarning: false },
    { name: 'Provisions (Groceries)', emoji: '🍽️', percentage: 60, current: 300, max: 500, isWarning: false },
    { name: 'Saloon & Fun (Entertainment)', emoji: '🎪', percentage: 85, current: 170, max: 200, isWarning: true },
    { name: 'Transport (Gas/Transit)', emoji: '🚗', percentage: 40, current: 60, max: 150, isWarning: false },
  ];

  return (
    <div className="claims-section">
      <h2>Your Claims</h2>
      {claims.map((claim, idx) => (
        <Claim key={idx} {...claim} />
      ))}
    </div>
  );
}
