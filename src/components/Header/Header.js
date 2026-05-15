import React from "react";

import { BarChart3, HelpCircle, List, Settings2 } from "lucide-react";

function Header({
  showEnglishTranslations,
  onToggleTranslations,
  onHelpClick,
  onPuzzleBrowserClick,
  onStatsClick,
  onSettingsClick,
  onLogoClick,
}) {
  return (
    <header>
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
      <div className="flex items-center gap-1.5">
        <button
          type="button"
          className="icon-trigger"
          onClick={onPuzzleBrowserClick}
          aria-label="Roġnaiġ imirt"
        >
          <List strokeWidth={1.75} />
        </button>
        <button
          type="button"
          className="icon-trigger"
          onClick={onStatsClick}
          aria-label="Staitisticí"
        >
          <BarChart3 strokeWidth={1.75} />
        </button>
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
          onClick={onSettingsClick}
          aria-label="Socruithe"
        >
          <Settings2 strokeWidth={1.75} />
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
