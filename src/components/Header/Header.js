import React from "react";

import { HelpCircle } from "lucide-react";

function Header({
  showEnglishTranslations,
  onToggleTranslations,
  onHelpClick,
}) {
  return (
    <header>
      <h1 className="wordmark" aria-label="Ceangal">
        <span className="wordmark-strong">CEAN</span>
        <span className="wordmark-light">gal</span>
      </h1>
      <div className="flex items-center gap-1.5">
        <button
          type="button"
          className={`translation-toggle ${
            showEnglishTranslations ? "translation-toggle-active" : ""
          }`}
          onClick={onToggleTranslations}
          aria-pressed={showEnglishTranslations}
        >
          GA→EN{showEnglishTranslations ? " ✓" : ""}
        </button>
        <button
          type="button"
          className="icon-trigger"
          onClick={onHelpClick}
          aria-label="Conas a imrítear"
        >
          <HelpCircle strokeWidth={1.75} />
        </button>
      </div>
    </header>
  );
}

export default Header;
