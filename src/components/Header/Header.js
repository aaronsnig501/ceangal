import React from "react";

import { BarChart3, HelpCircle, List, Moon, Settings2, Sun } from "lucide-react";

function Header({
  themePreference,
  onToggleTheme,
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
          className={`icon-trigger ${
            themePreference === "dark" ? "theme-toggle-active" : ""
          }`}
          onClick={onToggleTheme}
          aria-label={
            themePreference === "dark" ? "Athraigh go mód geal" : "Athraigh go mód dorċa"
          }
          aria-pressed={themePreference === "dark"}
        >
          {themePreference === "dark" ? (
            <Sun strokeWidth={1.75} />
          ) : (
            <Moon strokeWidth={1.75} />
          )}
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
