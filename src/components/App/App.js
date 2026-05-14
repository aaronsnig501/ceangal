import React from "react";
import { Capacitor } from "@capacitor/core";
import Header from "../Header";
import Game from "../Game";
import OnboardingFlow from "../OnboardingFlow";
import PuzzleBrowser from "../PuzzleBrowser";
import RemoveAdsModal from "../RemoveAdsModal";
import StatisticsModal from "../StatisticsModal";
import { allPuzzlesCompletedOnBoot } from "../../lib/time-utils";

import { Toaster } from "../ui/toaster";
import { Button } from "../ui/button";
import PuzzleDataProvider from "../../providers/PuzzleDataProvider";
import GameStatusProvider from "../../providers/GameStatusProvider";
import {
  loadHasSeenOnboardingFromLocalStorage,
  loadShowEnglishTranslationsFromLocalStorage,
  saveHasSeenOnboardingToLocalStorage,
  saveShowEnglishTranslationsToLocalStorage,
} from "../../lib/local-storage";
import { initializeAdMob } from "../../lib/admob";
import { initializePlausible, trackEvent } from "../../lib/analytics";
import { initializePurchases } from "../../lib/purchases";
import { puzzleId, puzzleIndex, puzzleTitle } from "../../lib/time-utils";

function App() {
  const [hasSeenOnboarding, setHasSeenOnboarding] = React.useState(() =>
    loadHasSeenOnboardingFromLocalStorage()
  );
  const [isSplashOpen, setIsSplashOpen] = React.useState(!hasSeenOnboarding);
  const [isOnboardingOpen, setIsOnboardingOpen] = React.useState(false);
  const [isPuzzleBrowserOpen, setIsPuzzleBrowserOpen] = React.useState(false);
  const [isStatsOpen, setIsStatsOpen] = React.useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = React.useState(false);
  const [showResetPrompt, setShowResetPrompt] = React.useState(
    allPuzzlesCompletedOnBoot
  );
  const [showEnglishTranslations, setShowEnglishTranslations] = React.useState(
    () => loadShowEnglishTranslationsFromLocalStorage()
  );

  React.useEffect(() => {
    initializePlausible();
    if (Capacitor.isNativePlatform()) {
      void initializePurchases();
      void initializeAdMob();
    }
    trackEvent("App Open", {
      props: {
        puzzle_id: String(puzzleId),
        puzzle_index: String(puzzleIndex),
        puzzle_title: puzzleTitle,
      },
      interactive: false,
    });
  }, []);

  function toggleEnglishTranslations() {
    setShowEnglishTranslations((currentValue) => {
      const nextValue = !currentValue;
      saveShowEnglishTranslationsToLocalStorage(nextValue);
      return nextValue;
    });
  }

  function completeFirstRun() {
    saveHasSeenOnboardingToLocalStorage();
    setHasSeenOnboarding(true);
    setIsSplashOpen(false);
    setIsOnboardingOpen(false);
  }

  function startOnboarding() {
    setIsSplashOpen(false);
    setIsOnboardingOpen(true);
  }

  function handleSkip() {
    if (hasSeenOnboarding) {
      setIsOnboardingOpen(false);
      return;
    }

    completeFirstRun();
  }

  return (
    <PuzzleDataProvider>
      <GameStatusProvider>
        <div className="wrapper">
          <Toaster />
          <Header
            showEnglishTranslations={showEnglishTranslations}
            onToggleTranslations={toggleEnglishTranslations}
            onHelpClick={() => setIsOnboardingOpen(true)}
            onPuzzleBrowserClick={() => {
              trackEvent("Puzzle Browser Open", {
                props: {
                  puzzle_id: String(puzzleId),
                  puzzle_index: String(puzzleIndex),
                },
              });
              setIsPuzzleBrowserOpen(true);
            }}
            onStatsClick={() => setIsStatsOpen(true)}
            onSettingsClick={() => setIsSettingsOpen(true)}
          />
          {showResetPrompt && (
            <div className="rounded-md border border-rule bg-surface p-4 text-center">
              <p className="font-display text-lg font-bold text-char">
                Tá gaċ puzal críoċnaiṫe agat
              </p>
              <p className="mt-1 font-serif text-sm italic text-text-soft">
                Táimid tar éis filleaḋ ar ṗuzal 1. Is féidir leat imirt
                arís nó puzal eile a roġnú.
              </p>
              <Button
                className="mt-3 w-full"
                variant="secondary"
                onClick={() => {
                  trackEvent("Puzzle Browser Open", {
                    props: {
                      puzzle_id: String(puzzleId),
                      puzzle_index: String(puzzleIndex),
                      source: "reset_prompt",
                    },
                  });
                  setIsPuzzleBrowserOpen(true);
                }}
              >
                Roġnaiġ puzal
              </Button>
              <button
                type="button"
                className="mt-3 text-sm text-text-soft underline"
                onClick={() => setShowResetPrompt(false)}
              >
                Dún
              </button>
            </div>
          )}
          <Game
            showEnglishTranslations={showEnglishTranslations}
            suppressEndGameModal={isSplashOpen || isOnboardingOpen}
            suppressAds={isSplashOpen || isOnboardingOpen}
          />
          <footer className="pb-3 text-center text-sm">
            <a className="text-text-soft underline" href="/privacy/">
              Príobḃáideaċas
            </a>
          </footer>
        </div>
        <OnboardingFlow
          showSplash={isSplashOpen}
          open={isOnboardingOpen}
          isFirstRun={!hasSeenOnboarding}
          onStart={startOnboarding}
          onSkip={handleSkip}
          onComplete={completeFirstRun}
          onOpenChange={setIsOnboardingOpen}
        />
        <PuzzleBrowser
          open={isPuzzleBrowserOpen}
          onOpenChange={setIsPuzzleBrowserOpen}
        />
        <StatisticsModal
          showTrigger={false}
          initiallyOpen={isStatsOpen}
          onOpenChange={setIsStatsOpen}
        />
        <RemoveAdsModal
          showTrigger={false}
          initiallyOpen={isSettingsOpen}
          onOpenChange={setIsSettingsOpen}
          showEnglishTranslations={showEnglishTranslations}
          onToggleTranslations={toggleEnglishTranslations}
        />
      </GameStatusProvider>
    </PuzzleDataProvider>
  );
}

export default App;
