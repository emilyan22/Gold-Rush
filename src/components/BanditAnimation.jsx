import React from 'react';

const Bandit = ({ side }) => (
  <div className={`bandit ${side}`}>
    <svg width="30" height="40" viewBox="0 0 30 40" style={{ width: '100%', height: '100%' }}>
      <rect x="10" y="5" width="10" height="8" fill="#333"/>
      <circle cx="15" cy="4" r="3" fill="#d4a574"/>
      <rect x="8" y="14" width="14" height="10" fill="#333"/>
      <rect x="10" y="18" width="3" height="8" fill="#d4a574"/>
      <rect x="17" y="18" width="3" height="8" fill="#d4a574"/>
      <rect x="9" y="25" width="4" height="10" fill="#222"/>
      <rect x="17" y="25" width="4" height="10" fill="#222"/>
      <polygon points="12,5 18,5 20,3 10,3" fill="#666"/>
    </svg>
  </div>
);

export default function BanditAnimation({ amount, show }) {
  return (
    <>
      {show && (
        <div className="stolen-notification">
          ⚠️ BANDITS STOLE ${amount}! ⚠️
        </div>
      )}
      <div className="bandit-container">
        <Bandit side="left" />
        <Bandit side="right" />
      </div>
    </>
  );
}
