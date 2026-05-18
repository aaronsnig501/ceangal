import React from "react";
import {
  BarChart3,
  BookOpen,
  Gamepad2,
  LayoutGrid,
  Settings2,
} from "lucide-react";

const navItems = [
  { key: "game", label: "Imirt", icon: Gamepad2 },
  { key: "help", label: "Conas", icon: BookOpen },
  { key: "browser", label: "Roġnaiġ", icon: LayoutGrid, isPrimary: true },
  { key: "stats", label: "Staitisticí", icon: BarChart3 },
  { key: "settings", label: "Socruithe", icon: Settings2 },
];

function BottomNav({ activeScreen = "game", onSelect }) {
  return (
    <nav className="bottom-nav" aria-label="Príomhloingseoireacht">
      <div className="bottom-nav-inner">
        {navItems.map(({ key, label, icon: Icon, isPrimary }) => {
          const isActive = activeScreen === key;

          return (
            <button
              key={key}
              type="button"
              className={isPrimary ? "nav-pill-button" : "nav-button"}
              data-active={isActive}
              aria-pressed={isActive}
              onClick={() => onSelect(key)}
            >
              <span className={isPrimary ? "nav-pill-icon" : "nav-icon"}>
                <Icon strokeWidth={1.85} size={isPrimary ? 22 : 18} />
              </span>
              <span className={isPrimary ? "nav-pill-label" : "nav-label"}>
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

export default BottomNav;
