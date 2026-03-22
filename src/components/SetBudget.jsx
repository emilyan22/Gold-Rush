import React, { useState, useEffect } from 'react';
import NumericInput from './NumericInput';

const CATEGORIES = ['Homestead', 'Provisions', 'Saloon & Fun', 'Transport', 'Other'];

const CATEGORY_EMOJI = {
  Homestead:      '🏠',
  Provisions:     '🍽️',
  'Saloon & Fun': '🎪',
  Transport:      '🚗',
  Other:          '💼',
};

export default function SetBudget({ budgetLimits, onSaveBudget }) {
  const [form, setForm] = useState(() =>
    Object.fromEntries(CATEGORIES.map(cat => [cat, budgetLimits[cat] ?? 0]))
  );
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setForm(Object.fromEntries(CATEGORIES.map(cat => [cat, budgetLimits[cat] ?? 0])));
  }, [budgetLimits]);

  const total = CATEGORIES.reduce((sum, cat) => sum + (parseFloat(form[cat]) || 0), 0);

  const handleChange = (cat, value) => {
    setForm(prev => ({ ...prev, [cat]: value }));
    setSaved(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    for (const cat of CATEGORIES) {
      const parsed = parseFloat(form[cat]);
      if (form[cat] === '' || isNaN(parsed) || parsed < 0) {
        alert(`⚠️ Please enter a valid amount for "${cat}".`);
        return;
      }
    }
    onSaveBudget(Object.fromEntries(CATEGORIES.map(cat => [cat, parseFloat(form[cat]) || 0])));
    setSaved(true);
  };

  return (
    <div className="set-budget-section">
      <h2>🗺️ Stake Your Claims</h2>
      <p className="budget-subtitle">Set how much gold you're willing to spend each month per category.</p>

      <form onSubmit={handleSubmit} className="budget-form">
        <div className="budget-total-display">
          Total Budget: <strong>${total.toFixed(2)}</strong>
        </div>

        <div className="budget-categories">
          <h3>Your Claims</h3>
          {CATEGORIES.map(cat => (
            <div key={cat} className="form-group">
              <label>{CATEGORY_EMOJI[cat]} {cat}</label>
              <div className="budget-dollar-wrap">
                <span className="budget-dollar-sign">$</span>
                <NumericInput
                  value={form[cat]}
                  onChange={(raw) => handleChange(cat, raw)}
                  placeholder="0.00"
                  allowDecimal={true}
                  style={{ textAlign: 'center' }}
                />
              </div>
            </div>
          ))}
        </div>

        <button type="submit" className="primary-btn budget-save-btn">
          💾 Save Budget
        </button>

        {saved && (
          <p className="budget-saved-msg">✅ Budget saved! Head to Home to see it reflected.</p>
        )}
      </form>
    </div>
  );
}
