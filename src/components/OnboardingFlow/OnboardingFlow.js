import React from "react";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { MAX_MISTAKES } from "../../lib/constants";
import { Button } from "../ui/button";
import BaseModal from "../modals/BaseModal";

const demoWords = [
  "Caife",
  "Tae",
  "Cáca",
  "Arán",
  "Uisce",
  "Brioscaí",
  "Le do ṫoil",
  "Anseo",
  "Sú oráiste",
  "Cupán mór",
  "Go raiḃ maiṫ agat",
  "Bainne oats",
  "An féidir liom?",
  "Toirtín",
  "Le taḃairt leat",
  "An ḃfuil sé saor?",
];

const drinks = ["Caife", "Tae", "Uisce", "Sú oráiste"];

const categories = [
  { name: "Deoċanna", words: drinks, className: "bg-tier-1 text-tier-1-fg" },
  {
    name: "Bia",
    words: ["Toirtín", "Cáca", "Arán", "Brioscaí"],
    className: "bg-tier-2 text-tier-2-fg",
  },
  {
    name: "Frásaí",
    words: [
      "Le do ṫoil",
      "Go raiḃ maiṫ agat",
      "An féidir liom?",
      "An ḃfuil sé saor?",
    ],
    className: "bg-tier-3 text-tier-3-fg",
  },
  {
    name: "Ordú",
    words: ["Anseo", "Le taḃairt leat", "Cupán mór", "Bainne oats"],
    className: "bg-tier-4 text-tier-4-fg",
  },
];

const tiers = [
  { label: "Éasca", className: "bg-tier-1", textClassName: "text-tier-1-fg" },
  {
    label: "Measarṫa",
    className: "bg-tier-2",
    textClassName: "text-tier-2-fg",
  },
  { label: "Deacair", className: "bg-tier-3", textClassName: "text-tier-3-fg" },
  { label: "Casta", className: "bg-tier-4", textClassName: "text-tier-4-fg" },
];

const googlePlayUrl =
  "https://play.google.com/store/apps/details?id=ie.misneach.ceangal";

function Wordmark() {
  return (
    <h2 className="wordmark text-[2.75rem]" aria-label="Ceangal">
      <span className="wordmark-strong">CEAN</span>
      <span className="wordmark-light">gal</span>
    </h2>
  );
}

function GooglePlayIcon() {
  return (
    <svg
      aria-hidden="true"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M3.18 23.76c.32.18.68.24 1.06.14l13.04-7.53-2.83-2.83-11.27 10.22z"
        fill="#EA4335"
      />
      <path
        d="M20.82 10.13L17.6 8.27 14.48 11.4l3.12 3.12 3.23-1.87c.92-.53.92-1.99-.01-2.52z"
        fill="#FBBC05"
      />
      <path
        d="M4.24.1C3.86 0 3.5.06 3.18.24L14.48 11.4l2.83-2.83L4.24.1z"
        fill="#4285F4"
      />
      <path
        d="M3.18.24C2.46.65 2 1.43 2 2.4v19.2c0 .97.46 1.75 1.18 2.16l11.3-11.36L3.18.24z"
        fill="#34A853"
      />
    </svg>
  );
}

function AppStoreIcon() {
  return (
    <svg
      aria-hidden="true"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}

function StoreBadges() {
  return (
    <div className="store-badges-section" aria-label="Íoslódáil">
      <p className="store-label">Íoslódáil</p>
      <div className="store-badges">
        <div
          className="store-badge store-badge-unavailable"
          aria-disabled="true"
          data-store-url={googlePlayUrl}
        >
          <span className="store-badge-icon">
            <GooglePlayIcon />
          </span>
          <span className="store-badge-text">
            <span className="store-badge-sub">Ag teacht go luath ar</span>
            <span className="store-badge-name">Google Play</span>
          </span>
        </div>

        <div
          className="store-badge store-badge-unavailable"
          aria-disabled="true"
        >
          <span className="store-badge-icon store-badge-icon-muted">
            <AppStoreIcon />
          </span>
          <span className="store-badge-text">
            <span className="store-badge-sub">Ag teacht go luath ar</span>
            <span className="store-badge-name">App Store</span>
          </span>
        </div>
      </div>
    </div>
  );
}

function SplashScreen({ onStart, onSkip, showStoreBadges }) {
  return (
    <div className="fixed inset-0 z-[70] grid place-items-center bg-background px-6">
      <div className="grid w-full max-w-sm gap-8 text-center">
        <div className="grid gap-3">
          <Wordmark />
          <p className="font-serif italic text-text-soft">
            Cluiċe focal faoi ċeangail rúnda.
          </p>
        </div>
        <div className="grid gap-3">
          <Button onClick={onSkip}>Imirt díreaċ</Button>
          <Button variant="secondary" onClick={onStart}>
            Conas a imrítear
          </Button>
          {showStoreBadges && <StoreBadges />}
          <a
            className="text-sm text-text-soft underline"
            href="/privacy/index.html"
          >
            Príobḃáideaċas
          </a>
        </div>
      </div>
    </div>
  );
}

function StepShell({ kicker, title, children }) {
  return (
    <div className="grid gap-4">
      <div className="grid gap-1 text-center">
        <p className="font-sans text-xs font-semibold uppercase tracking-[0.12em] text-vermil">
          {kicker}
        </p>
        <h2 className="font-display text-2xl font-normal tracking-[0.02em] text-char">
          {title}
        </h2>
      </div>
      {children}
    </div>
  );
}

function DemoTile({ word, selected, correct, onClick, disabled = false }) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`grid min-h-[3.35rem] place-items-center rounded-md border px-1 text-center font-display text-sm font-normal leading-tight tracking-[0.02em] transition ${
        selected
          ? correct
            ? "border-tier-1 bg-tier-1 text-tier-1-fg"
            : "border-char bg-char text-cream"
          : "border-rule bg-surface text-char"
      }`}
    >
      {word}
    </button>
  );
}

function GridStep() {
  return (
    <StepShell kicker="1 as 5" title="An eangach">
      <p className="text-center font-serif italic text-text-soft">
        Tosaíonn gaċ cluiche le 16 focal. Tá ceiṫre gṙúpa i ḃfolaċ iontu.
      </p>
      <div className="grid grid-cols-4 gap-1.5">
        {demoWords.map((word) => (
          <DemoTile key={word} word={word} disabled />
        ))}
      </div>
    </StepShell>
  );
}

function GroupsStep() {
  return (
    <StepShell kicker="2 as 5" title="Na grúpaí">
      <p className="text-center font-serif italic text-text-soft">
        Nuair a aimsíonn tú ceiṫre focail a ḃaineann le ċéile, noċtar an
        ċatagóir.
      </p>
      <div className="grid gap-2">
        {categories.map((category) => (
          <div
            key={category.name}
            className={`rounded-md p-3 text-center ${category.className}`}
          >
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.1em]">
              Sampla
            </p>
            <p className="font-display text-lg font-normal tracking-[0.02em]">
              {category.name}
            </p>
            <p className="font-serif text-sm italic">
              {category.words.join(", ")}
            </p>
          </div>
        ))}
      </div>
    </StepShell>
  );
}

function SelectTilesStep({ isSolved, setIsSolved }) {
  const [selectedWords, setSelectedWords] = React.useState([]);
  const [showHint, setShowHint] = React.useState(false);

  function toggleWord(word) {
    setShowHint(false);
    setSelectedWords((current) => {
      if (current.includes(word)) {
        return current.filter((item) => item !== word);
      }
      if (current.length === 4) {
        return current;
      }
      return [...current, word];
    });
  }

  function checkSelection() {
    const isCorrect =
      selectedWords.length === drinks.length &&
      drinks.every((word) => selectedWords.includes(word));

    setIsSolved(isCorrect);
    setShowHint(!isCorrect);
  }

  return (
    <StepShell kicker="3 as 5" title="Roġnaiġ tíleanna">
      <p className="text-center font-serif italic text-text-soft">
        Roġnaiġ an gṙúpa deoċanna: Caife, Tae, Uisce ⁊ Sú oráiste.
      </p>
      <div className="grid grid-cols-4 gap-1.5">
        {demoWords.slice(0, 12).map((word) => (
          <DemoTile
            key={word}
            word={word}
            selected={selectedWords.includes(word)}
            correct={isSolved && drinks.includes(word)}
            onClick={() => toggleWord(word)}
          />
        ))}
      </div>
      <div className="grid gap-2">
        <Button
          onClick={checkSelection}
          disabled={selectedWords.length !== 4 || isSolved}
        >
          {isSolved ? (
            <span className="inline-flex items-center gap-2">
              <Check size={16} /> Ceart
            </span>
          ) : (
            "Seiceáil"
          )}
        </Button>
        {showHint && (
          <p className="text-center text-sm text-vermil">
            Beagnaċ. Cuardaiġ na ceiṫre ḋeoċ sa ċaife.
          </p>
        )}
      </div>
    </StepShell>
  );
}

function ColoursStep() {
  return (
    <StepShell kicker="4 as 5" title="Na daṫanna">
      <p className="text-center font-serif italic text-text-soft">
        Léiríonn daṫ gaċ gṙúpa a leibḣéal deacraċta.
      </p>
      <div className="grid gap-2">
        {tiers.map((tier, index) => (
          <div
            key={tier.label}
            className="flex items-center gap-3 rounded-md border border-rule bg-surface p-3"
          >
            <span
              className={`h-8 w-8 rounded ${tier.className}`}
              aria-hidden="true"
            />
            <div>
              <p
                className={`font-sans text-sm font-semibold ${tier.textClassName}`}
              >
                Leibḣéal {index + 1}
              </p>
              <p className="font-serif text-sm italic text-text-soft">
                {tier.label}
              </p>
            </div>
          </div>
        ))}
      </div>
    </StepShell>
  );
}

function MistakesStep() {
  const [usedCount, setUsedCount] = React.useState(0);

  React.useEffect(() => {
    const interval = window.setInterval(() => {
      setUsedCount((current) => (current + 1) % (MAX_MISTAKES + 1));
    }, 700);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <StepShell kicker="5 as 5" title="Botúin">
      <p className="text-center font-serif italic text-text-soft">
        Tá ceiṫre ḃotún agat. Líontar ponc nuair a ḋéanann tú roġa ṁíċeart. Is
        féidir GA→EN a ċasaḋ air sa ċeanntásc má ṫeastaíonn aistriúċán Béarla
        uait.
      </p>
      <div className="grid place-items-center gap-4 rounded-md border border-rule bg-surface p-6">
        <p className="font-serif italic text-sm text-text-soft">Botúin fágṫa</p>
        <div className="flex gap-3">
          {Array.from({ length: MAX_MISTAKES }).map((_, index) => (
            <span
              key={index}
              className={`h-4 w-4 rounded-full border transition-all duration-300 ${
                index < usedCount
                  ? "scale-110 border-char bg-char"
                  : "border-rule bg-transparent"
              }`}
              aria-hidden="true"
            />
          ))}
        </div>
      </div>
    </StepShell>
  );
}

function OnboardingFlow({
  showSplash,
  showStoreBadges = false,
  open,
  isFirstRun,
  onStart,
  onSplashSkip,
  onSkip,
  onComplete,
  onOpenChange,
}) {
  const [currentStep, setCurrentStep] = React.useState(0);
  const [hasSolvedDemo, setHasSolvedDemo] = React.useState(false);
  const isLastStep = currentStep === 4;
  const isDemoStepBlocked = currentStep === 2 && !hasSolvedDemo;

  React.useEffect(() => {
    if (open) {
      setCurrentStep(0);
      setHasSolvedDemo(false);
    }
  }, [open]);

  const steps = [
    <GridStep />,
    <GroupsStep />,
    <SelectTilesStep isSolved={hasSolvedDemo} setIsSolved={setHasSolvedDemo} />,
    <ColoursStep />,
    <MistakesStep />,
  ];

  function handleOpenChange(nextOpen) {
    onOpenChange(nextOpen);
  }

  function handleNext() {
    if (isLastStep) {
      onComplete();
      return;
    }
    setCurrentStep((step) => step + 1);
  }

  return (
    <>
      {showSplash && (
        <SplashScreen
          onStart={onStart}
          onSkip={onSplashSkip}
          showStoreBadges={showStoreBadges}
        />
      )}
      <BaseModal
        title=""
        initiallyOpen={open}
        onOpenChange={handleOpenChange}
        contentClassName="top-auto bottom-0 translate-y-0 w-full max-w-[520px] rounded-b-none rounded-t-[18px] border-b-0 p-5 pb-[calc(1.25rem+env(safe-area-inset-bottom,0px))] data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom data-[state=closed]:slide-out-to-left-0 data-[state=open]:slide-in-from-left-0 data-[state=closed]:slide-out-to-top-0 data-[state=open]:slide-in-from-top-0"
        footerClassName="flex-col gap-2 sm:flex-col"
        footerElements={
          <div className="grid w-full gap-3">
            <div className="flex justify-center gap-2" aria-hidden="true">
              {steps.map((_, index) => (
                <span
                  key={index}
                  className={`h-1.5 rounded-full transition-all ${
                    index === currentStep ? "w-6 bg-vermil" : "w-1.5 bg-rule"
                  }`}
                />
              ))}
            </div>
            <div className="grid grid-cols-[1fr_1.4fr] gap-2">
              <Button
                type="button"
                variant="secondary"
                onClick={() =>
                  currentStep === 0
                    ? onSkip()
                    : setCurrentStep((step) => step - 1)
                }
              >
                {currentStep === 0 ? "Scipeáil" : <ChevronLeft size={18} />}
              </Button>
              <Button
                type="button"
                onClick={handleNext}
                disabled={isDemoStepBlocked}
              >
                {isLastStep ? (
                  isFirstRun ? (
                    "Tosaiġ"
                  ) : (
                    "Déanta"
                  )
                ) : (
                  <span className="inline-flex items-center gap-2">
                    Ar aġaiḋ <ChevronRight size={18} />
                  </span>
                )}
              </Button>
            </div>
            {currentStep > 0 && (
              <Button type="button" variant="ghost" onClick={onSkip}>
                Scipeáil
              </Button>
            )}
          </div>
        }
        showActionButton={false}
      >
        {steps[currentStep]}
      </BaseModal>
    </>
  );
}

export default OnboardingFlow;
