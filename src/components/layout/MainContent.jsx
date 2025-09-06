import React from 'react';
import Dashboard from '../dashboard/Dashboard';
import './MainContent.css';

export default function MainContent() {
  return (
    <div className="main-content">
      <Dashboard />
      {/* בהמשך נכניס כאן את הכותרת Week, כפתורי החצים, גרף עוגה וכו' */}
    </div>
  );
}
