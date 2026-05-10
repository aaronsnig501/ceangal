import React from "react";
import Header from "../Header";
import Game from "../Game";
import OnboardingFlow from "../OnboardingFlow";
import PuzzleBrowser from "../PuzzleBrowser";

import { Toaster } from "../ui/toaster";
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
          />
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
      </GameStatusProvider>
    </PuzzleDataProvider>
  );
}

export default App;
