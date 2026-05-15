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
  loadThemePreferenceFromLocalStorage,
  saveHasSeenOnboardingToLocalStorage,
  saveShowEnglishTranslationsToLocalStorage,
  saveThemePreferenceToLocalStorage,
} from "../../lib/local-storage";
import { initializeAdMob } from "../../lib/admob";
import { initializePlausible, trackEvent } from "../../lib/analytics";
import { initializePurchases } from "../../lib/purchases";
import { puzzleId, puzzleIndex, puzzleTitle } from "../../lib/time-utils";

function getInitialThemePreference() {
  const storedThemePreference = loadThemePreferenceFromLocalStorage();

  if (storedThemePreference) {
    return storedThemePreference;
  }

  if (
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    return "dark";
  }

  return "light";
}

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
  const [themePreference, setThemePreference] = React.useState(
    getInitialThemePreference
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

  React.useEffect(() => {
    const rootElement = document.documentElement;
    const themeColorMeta = document.querySelector('meta[name="theme-color"]');
    const isDarkTheme = themePreference === "dark";

    rootElement.classList.toggle("dark", isDarkTheme);

    if (themeColorMeta) {
      themeColorMeta.setAttribute(
        "content",
        isDarkTheme ? "#171410" : "#f4f0e6"
      );
    }
  }, [themePreference]);

  function toggleEnglishTranslations() {
    setShowEnglishTranslations((currentValue) => {
      const nextValue = !currentValue;
      saveShowEnglishTranslationsToLocalStorage(nextValue);
      return nextValue;
    });
  }

  function toggleThemePreference() {
    setThemePreference((currentTheme) => {
      const nextTheme = currentTheme === "dark" ? "light" : "dark";
      saveThemePreferenceToLocalStorage(nextTheme);
      return nextTheme;
    });
  }

  function completeFirstRun() {
    saveHasSeenOnboardingToLocalStorage();
    setHasSeenOnboarding(true);
    setIsSplashOpen(false);
    setIsOnboardingOpen(false);
  }

  function dismissSplash() {
    setIsSplashOpen(false);
    setIsOnboardingOpen(false);
  }

  function startOnboarding() {
    setIsSplashOpen(false);
    setIsOnboardingOpen(true);
  }

  function handleSplashSkip() {
    if (hasSeenOnboarding) {
      dismissSplash();
      return;
    }

    completeFirstRun();
  }

  function handleSkip() {
    if (hasSeenOnboarding) {
      setIsOnboardingOpen(false);
      return;
    }

    completeFirstRun();
  }

  function handleReturnToSplash() {
    setIsSettingsOpen(false);
    setIsPuzzleBrowserOpen(false);
    setIsStatsOpen(false);
    setIsOnboardingOpen(false);
    setShowResetPrompt(false);
    setIsSplashOpen(true);
  }

  return (
    <PuzzleDataProvider>
      <GameStatusProvider>
        <div className="wrapper">
          <Toaster />
          <Header
            themePreference={themePreference}
            onToggleTheme={toggleThemePreference}
            onLogoClick={handleReturnToSplash}
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
          onSplashSkip={handleSplashSkip}
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
          themePreference={themePreference}
          onToggleTheme={toggleThemePreference}
        />
      </GameStatusProvider>
    </PuzzleDataProvider>
  );
}

export default App;
