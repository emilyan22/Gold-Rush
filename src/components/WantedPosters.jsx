import React, { useState } from 'react';

const WantedPoster = ({ rank, name, budget, saved, crime }) => {
  const savingsPercentage = Math.round((saved / budget) * 100);
  
  return (
    <div className="wanted-poster">
      <div className="wanted-rank">#{rank}</div>
      <div className="wanted-title">WANTED</div>
      <div className="wanted-avatar">{name.charAt(0)}</div>
      <div className="wanted-name">{name}</div>
      <div className="wanted-bounty">REWARD: ${saved}</div>
      <div className="wanted-crime">{crime}</div>
      <div className="wanted-crime">Saved: {savingsPercentage}% of budget</div>
    </div>
  );
};

export default function WantedPosters({ outlaws, onAddOutlaw }) {
  const [name, setName] = useState('');
  const [budget, setBudget] = useState('2000');
  const [saved, setSaved] = useState('500');

  const handleAddOutlaw = () => {
    onAddOutlaw(name, budget, saved);
    setName('');
    setBudget('2000');
    setSaved('500');
  };

  const sortedOutlaws = [...outlaws].sort((a, b) => b.saved - a.saved);

  return (
    <div className="leaderboard-section">
      <h2>🔴 WANTED POSTERS - Top Savers 🔴</h2>
      <div className="leaderboard-grid">
        {sortedOutlaws.map((outlaw, idx) => (
          <WantedPoster 
            key={idx}
            rank={idx + 1}
            name={outlaw.name}
            budget={outlaw.budget}
            saved={outlaw.saved}
            crime={outlaw.crime}
          />
        ))}
      </div>

      <div className="add-outlaw-form">
        <h3 style={{ color: '#ffd700', marginBottom: '15px' }}>📋 Post a Wanted Notice</h3>
        <div className="form-row">
          <div className="form-group">
            <label>Outlaw Name</label>
            <input 
              type="text" 
              placeholder="e.g., Jesse James"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Monthly Budget ($)</label>
            <input 
              type="number" 
              placeholder="2000"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Amount Saved ($)</label>
            <input 
              type="number" 
              placeholder="500"
              value={saved}
              onChange={(e) => setSaved(e.target.value)}
            />
          </div>
          <button onClick={handleAddOutlaw} style={{ padding: '10px 20px' }}>
            Post
          </button>
        </div>
      </div>
    </div>
  );
}
