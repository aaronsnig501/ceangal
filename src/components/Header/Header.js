import React from "react";

import { HelpCircle } from "lucide-react";

function Header({ onHelpClick }) {
  return (
    <header>
      <h1 className="wordmark" aria-label="Ceangal">
        <span className="wordmark-strong">CEAN</span>
        <span className="wordmark-light">gal</span>
      </h1>
      <button
        type="button"
        className="icon-trigger"
        onClick={onHelpClick}
        aria-label="Conas a imrítear"
      >
        <HelpCircle strokeWidth={1.75} />
      </button>
    </header>
  );
}

export default Header;
