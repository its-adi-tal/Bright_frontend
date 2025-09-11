import React from 'react';
import './Header.css';
import UserMenu from './UserMenu/UserMenu'

export default function Header() {
  return (
    <header className="header">
      <div className="header-left">
        <h1 className="logo">Bright.</h1>
      </div>
      <div className="header-center">
        {/* Possiable to have here menu in the future */}
      </div>
      <div className="header-right">
        <div className="ml-auto mr-4">
        <UserMenu />
    </div>
      </div>
    </header>
  );
}
