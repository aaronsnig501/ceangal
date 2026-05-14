import React from "react";
import { BarChart3 } from "lucide-react";
import { loadStatsFromLocalStorage } from "../../lib/local-storage";
import BaseModal from "../modals/BaseModal";
import { Button } from "../ui/button";

function StatBlock({ label, value }) {
  return (
    <div className="rounded-md border border-rule bg-surface p-3 text-center">
      <p className="font-display text-2xl font-bold text-char">{value}</p>
      <p className="text-xs font-semibold text-text-soft">{label}</p>
    </div>
  );
}

function GuessDistribution({ distribution }) {
  const maxValue = Math.max(1, ...Object.values(distribution));

  return (
    <div className="grid gap-2">
      {[1, 2, 3, 4].map((mistakeCount) => {
        const value = distribution[mistakeCount] ?? 0;
        const width = `${Math.max(
          value === 0 ? 0 : 8,
          (value / maxValue) * 100
        )}%`;

        return (
          <div
            key={mistakeCount}
            className="grid grid-cols-[2rem_1fr_2rem] items-center gap-2"
          >
            <span className="font-semibold text-text-soft">{mistakeCount}</span>
            <span className="h-7 overflow-hidden rounded-md bg-surface">
              <span
                className="block h-full rounded-md bg-vermil transition-all"
                style={{ width }}
              />
            </span>
            <span className="text-right font-semibold text-text-soft">
              {value}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function StatisticsModal({
  trigger,
  showTrigger = true,
  initiallyOpen = false,
  actionButtonText = "Dún",
  onOpenChange,
}) {
  const [stats, setStats] = React.useState(() => loadStatsFromLocalStorage());
  const winPercentage =
    stats.gamesPlayed === 0
      ? 0
      : Math.round((stats.gamesWon / stats.gamesPlayed) * 100);

  function refreshStats() {
    setStats(loadStatsFromLocalStorage());
  }

  return (
    <BaseModal
      title="Staitisticí"
      trigger={
        showTrigger
          ? trigger ?? (
              <Button variant="secondary" className="w-full">
                Staitisticí
              </Button>
            )
          : undefined
      }
      initiallyOpen={initiallyOpen}
      actionButtonText={actionButtonText}
      onOpenChange={(open) => {
        if (open) {
          refreshStats();
        }
        onOpenChange?.(open);
      }}
    >
      <div className="grid gap-5">
        <div className="grid grid-cols-2 gap-2">
          <StatBlock label="Imearṫa" value={stats.gamesPlayed} />
          <StatBlock label="Buaite %" value={winPercentage} />
          <StatBlock label="Sraiṫ reaṫa" value={stats.currentStreak} />
          <StatBlock label="Sraith is fearr" value={stats.maxStreak} />
        </div>

        <div className="grid gap-3">
          <div className="flex items-center gap-2">
            <BarChart3 size={18} className="text-vermil" strokeWidth={1.75} />
            <h3 className="font-display text-lg font-bold text-char">
              Dáileaḋ botún
            </h3>
          </div>
          <GuessDistribution distribution={stats.guessDistribution} />
          <p className="font-serif text-sm italic text-text-soft">
            Taispeánann na barraí buaite de réir líon na mḃotún, ó 1 go 4.
          </p>
        </div>
      </div>
    </BaseModal>
  );
}

export default StatisticsModal;
