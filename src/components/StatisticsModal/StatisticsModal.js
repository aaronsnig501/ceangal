import React from "react";
import { BarChart3 } from "lucide-react";
import { loadStatsFromLocalStorage } from "../../lib/local-storage";

function StatBlock({ label, value }) {
  return (
    <div className="stats-block">
      <p className="stats-block-value">{value}</p>
      <p className="stats-block-label">{label}</p>
    </div>
  );
}

function GuessDistribution({ distribution }) {
  const rows = [
    { key: "0", label: "0" },
    { key: "1", label: "1" },
    { key: "2", label: "2" },
    { key: "3", label: "3" },
    { key: "x", label: "✕" },
  ];
  const maxValue = Math.max(
    1,
    ...rows.map(({ key }) => distribution[key] ?? distribution[String(key)] ?? 0)
  );

  return (
    <div className="stats-chart">
      {rows.map(({ key, label }) => {
        const value = distribution[key] ?? distribution[String(key)] ?? 0;
        const width = `${Math.max(value === 0 ? 0 : 8, (value / maxValue) * 100)}%`;

        return (
          <div key={key} className="stats-chart-row">
            <span className="stats-chart-label">{label}</span>
            <span className="stats-chart-track">
              <span className="stats-chart-fill" style={{ width }} />
            </span>
            <span className="stats-chart-value">{value}</span>
          </div>
        );
      })}
    </div>
  );
}

function StatisticsModal({ open = false, onOpenChange }) {
  const [stats, setStats] = React.useState(() => loadStatsFromLocalStorage());

  React.useEffect(() => {
    if (open) {
      setStats(loadStatsFromLocalStorage());
    }
  }, [open]);

  if (!open) {
    return null;
  }

  return (
    <section className="app-panel-screen" aria-label="Staitisticí">
      <div className="panel-header">
        <div>
          <h2 className="panel-title">Staitisticí</h2>
          <p className="panel-subtitle">Do ghnás, do shraiṫ ⁊ do dháileaḋ botún.</p>
        </div>
      </div>

      <div className="panel-scroll">
        <div className="grid gap-5">
          <div className="stats-grid">
            <StatBlock label="Imearṫa" value={stats.gamesPlayed} />
            <StatBlock label="Buaite" value={stats.gamesWon} />
            <StatBlock label="Sraiṫ" value={stats.currentStreak} />
            <StatBlock label="Is fearr" value={stats.maxStreak} />
          </div>

          <div className="panel-card">
            <div className="stats-heading">
              <BarChart3 size={18} className="text-vermil" strokeWidth={1.75} />
              <h3 className="font-display text-lg font-normal tracking-[0.02em] text-char">
                Dáileaḋ botún
              </h3>
            </div>
            <GuessDistribution distribution={stats.guessDistribution} />
          </div>
        </div>
      </div>

      <div className="panel-footer-bar">
        <button
          type="button"
          className="panel-secondary-button"
          onClick={() => onOpenChange(false)}
        >
          Fill ar an imirt
        </button>
      </div>
    </section>
  );
}

export default StatisticsModal;
