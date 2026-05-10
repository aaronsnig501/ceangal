import React from "react";
import Header from "../Header";
import Game from "../Game";
import OnboardingFlow from "../OnboardingFlow";
import PuzzleBrowser from "../PuzzleBrowser";
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

function App() {
  const [hasSeenOnboarding, setHasSeenOnboarding] = React.useState(() =>
    loadHasSeenOnboardingFromLocalStorage()
  );
  const [isSplashOpen, setIsSplashOpen] = React.useState(!hasSeenOnboarding);
  const [isOnboardingOpen, setIsOnboardingOpen] = React.useState(false);
  const [isPuzzleBrowserOpen, setIsPuzzleBrowserOpen] = React.useState(false);
  const [isStatsOpen, setIsStatsOpen] = React.useState(false);
  const [showResetPrompt, setShowResetPrompt] = React.useState(
    allPuzzlesCompletedOnBoot
  );
  const [showEnglishTranslations, setShowEnglishTranslations] = React.useState(
    () => loadShowEnglishTranslationsFromLocalStorage()
  );

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
            onPuzzleBrowserClick={() => setIsPuzzleBrowserOpen(true)}
            onStatsClick={() => setIsStatsOpen(true)}
          />
          {showResetPrompt && (
            <div className="rounded-md border border-rule bg-surface p-4 text-center">
              <p className="font-display text-lg font-bold text-char">
                Tá gach puzal críochnaithe agat
              </p>
              <p className="mt-1 font-serif text-sm italic text-text-soft">
                Táimid tar éis filleadh ar phuzal 1. Is féidir leat imirt
                arís nó puzal eile a roghnú.
              </p>
              <Button
                className="mt-3 w-full"
                variant="secondary"
                onClick={() => setIsPuzzleBrowserOpen(true)}
              >
                Roghnaigh puzal
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
          />
          <footer className="pb-3 text-center text-sm">
            <a className="text-text-soft underline" href="/privacy/">
              Príobháideachas
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
      </GameStatusProvider>
    </PuzzleDataProvider>
  );
}

export default App;
