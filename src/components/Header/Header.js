import React from "react";
import NumberOfMistakesDisplay from "../NumberOfMistakesDisplay";

function Header({ onLogoClick }) {
  return (
    <header className="app-header">
      <h1 className="wordmark">
        <button
          type="button"
          className="logo-trigger"
          aria-label="Ceangal"
          onClick={onLogoClick}
        >
          <span className="wordmark-strong">CEAN</span>
          <span className="wordmark-light">gal</span>
        </button>
      </h1>
      <div className="header-mistakes" aria-label="Botúin fágtha">
        <NumberOfMistakesDisplay compact />
      </div>
    </header>
  );
}

export default Header;
