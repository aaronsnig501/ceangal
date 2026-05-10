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
  "Le do thoil",
  "Anseo",
  "Sú oráiste",
  "Cupán mór",
  "Go raibh maith agat",
  "Bainne oats",
  "An féidir liom?",
  "Toirtín",
  "Le tabhairt leat",
  "An bhfuil sé saor?",
];

const drinks = ["Caife", "Tae", "Uisce", "Sú oráiste"];

const categories = [
  { name: "Deochanna", words: drinks, className: "bg-tier-1 text-tier-1-fg" },
  {
    name: "Bia",
    words: ["Toirtín", "Cáca", "Arán", "Brioscaí"],
    className: "bg-tier-2 text-tier-2-fg",
  },
  {
    name: "Frásaí",
    words: ["Le do thoil", "Go raibh maith agat", "An féidir liom?", "An bhfuil sé saor?"],
    className: "bg-tier-3 text-tier-3-fg",
  },
  {
    name: "Ordú",
    words: ["Anseo", "Le tabhairt leat", "Cupán mór", "Bainne oats"],
    className: "bg-tier-4 text-tier-4-fg",
  },
];

const tiers = [
  { label: "Éasca", className: "bg-tier-1", textClassName: "text-tier-1-fg" },
  { label: "Measartha", className: "bg-tier-2", textClassName: "text-tier-2-fg" },
  { label: "Deacair", className: "bg-tier-3", textClassName: "text-tier-3-fg" },
  { label: "Casta", className: "bg-tier-4", textClassName: "text-tier-4-fg" },
];

function Wordmark() {
  return (
    <h2 className="wordmark text-[2.75rem]" aria-label="Ceangal">
      <span className="wordmark-strong">CEAN</span>
      <span className="wordmark-light">gal</span>
    </h2>
  );
}

function SplashScreen({ onStart, onSkip }) {
  return (
    <div className="fixed inset-0 z-[70] grid place-items-center bg-background px-6">
      <div className="grid w-full max-w-sm gap-8 text-center">
        <div className="grid gap-3">
          <Wordmark />
          <p className="font-serif italic text-text-soft">
            Cluiche focal faoi cheangail rúnda.
          </p>
        </div>
        <div className="grid gap-3">
          <Button onClick={onSkip}>
            Imirt díreach
          </Button>
          <Button variant="secondary" onClick={onStart}>
            Conas a imrítear
          </Button>
          <a className="text-sm text-text-soft underline" href="/privacy/">
            Príobháideachas
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
        <p className="text-xs font-semibold uppercase text-vermil">
          {kicker}
        </p>
        <h2 className="font-display text-2xl font-bold text-char">{title}</h2>
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
      className={`grid min-h-[3.35rem] place-items-center rounded-md border px-1 text-center text-sm font-semibold leading-tight transition ${
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
        Tosaíonn gach cluiche le 16 fhocal. Tá ceithre ghrúpa i bhfolach iontu.
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
        Nuair a aimsíonn tú ceithre fhocal a bhaineann le chéile, nochtar an chatagóir.
      </p>
      <div className="grid gap-2">
        {categories.map((category) => (
          <div key={category.name} className={`rounded-md p-3 text-center ${category.className}`}>
            <p className="text-xs font-semibold uppercase">Sampla</p>
            <p className="font-display text-lg font-bold">{category.name}</p>
            <p className="text-sm">{category.words.join(", ")}</p>
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
    <StepShell kicker="3 as 5" title="Roghnaigh tíleanna">
      <p className="text-center font-serif italic text-text-soft">
        Roghnaigh an grúpa deochanna: Caife, Tae, Uisce agus Sú oráiste.
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
        <Button onClick={checkSelection} disabled={selectedWords.length !== 4 || isSolved}>
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
            Beagnach. Cuardaigh na ceithre dheoch sa chaife.
          </p>
        )}
      </div>
    </StepShell>
  );
}

function ColoursStep() {
  return (
    <StepShell kicker="4 as 5" title="Na dathanna">
      <p className="text-center font-serif italic text-text-soft">
        Léiríonn dath gach grúpa a leibhéal deacrachta.
      </p>
      <div className="grid gap-2">
        {tiers.map((tier, index) => (
          <div key={tier.label} className="flex items-center gap-3 rounded-md border border-rule bg-surface p-3">
            <span className={`h-8 w-8 rounded ${tier.className}`} aria-hidden="true" />
            <div>
              <p className={`font-semibold ${tier.textClassName}`}>Leibhéal {index + 1}</p>
              <p className="text-sm text-text-soft">{tier.label}</p>
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
        Tá ceithre bhotún agat. Líontar ponc nuair a dhéanann tú rogha mhícheart.
        Is féidir GA→EN a chasadh air sa cheanntásc má theastaíonn aistriúchán Béarla uait.
      </p>
      <div className="grid place-items-center gap-4 rounded-md border border-rule bg-surface p-6">
        <p className="font-serif italic text-sm text-text-soft">Botúin fágtha</p>
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
  open,
  isFirstRun,
  onStart,
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
      {showSplash && <SplashScreen onStart={onStart} onSkip={onSkip} />}
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
                  currentStep === 0 ? onSkip() : setCurrentStep((step) => step - 1)
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
                  isFirstRun ? "Tosaigh" : "Déanta"
                ) : (
                  <span className="inline-flex items-center gap-2">
                    Ar aghaidh <ChevronRight size={18} />
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
