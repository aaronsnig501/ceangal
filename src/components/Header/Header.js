import React from "react";

import InfoModal from "../modals/InfoModal";

function Header() {
  return (
    <header>
      <h1 className="wordmark" aria-label="Ceangal">
        <span className="wordmark-strong">CEAN</span>
        <span className="wordmark-light">gal</span>
      </h1>
      <InfoModal />
    </header>
  );
}

export default Header;
