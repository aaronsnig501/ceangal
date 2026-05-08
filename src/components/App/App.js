import React from "react";
import Header from "../Header";
import Game from "../Game";
import OnboardingFlow from "../OnboardingFlow";

import { Toaster } from "../ui/toaster";
import PuzzleDataProvider from "../../providers/PuzzleDataProvider";
import GameStatusProvider from "../../providers/GameStatusProvider";
import {
  loadHasSeenOnboardingFromLocalStorage,
  saveHasSeenOnboardingToLocalStorage,
} from "../../lib/local-storage";

function App() {
  const [hasSeenOnboarding, setHasSeenOnboarding] = React.useState(() =>
    loadHasSeenOnboardingFromLocalStorage()
  );
  const [isSplashOpen, setIsSplashOpen] = React.useState(!hasSeenOnboarding);
  const [isOnboardingOpen, setIsOnboardingOpen] = React.useState(false);

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
          <Header onHelpClick={() => setIsOnboardingOpen(true)} />
          <Game suppressEndGameModal={isSplashOpen || isOnboardingOpen} />
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
      </GameStatusProvider>
    </PuzzleDataProvider>
  );
}

export default App;
