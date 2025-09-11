import React from 'react';
import Dashboard from '../dashboard/Dashboard';
import './MainContent.css';

export default function MainContent() {
  return (
    <div className="main-content">
      <Dashboard />
      {/*Here will be graphs, arrows ect*/}
    </div>
  );
}
