import React from "react";
import { Loader2, Settings2 } from "lucide-react";
import BaseModal from "../modals/BaseModal";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import packageJson from "../../../package.json";
import {
  canUseRevenueCat,
  initializePurchases,
  loadRemoveAdsProduct,
  purchaseRemoveAds,
  restoreRemoveAdsPurchases,
  userHasRemovedAds,
} from "../../lib/purchases";

const PRIVACY_URL = "https://ceangal.app/privacy/";
const MISNEACH_URL = "https://misneachabu.ie/";

function getPurchaseErrorMessage(error) {
  if (error?.userCancelled) {
    return {
      title: "Ceannaċ curṫa ar ceal",
      description: "Níor críoċnaíġ an ceannaċ an uair seo.",
    };
  }

  if (error?.code === "REMOVE_ADS_PRODUCT_UNAVAILABLE") {
    return {
      title: "Níl sé ar fáil fós",
      description:
        "Níor aimsíġ an tairiscint Bain Fógraí. Seiceáil an tairiscint default i RevenueCat.",
    };
  }

  return {
    title: "Ṫeip ar an gceannaċ",
    description:
      "Níor éiriġ linn Bain Fógraí a ċeannaċ anois. Bain triail eile as i gceann tamaill.",
  };
}

function RemoveAdsModal({
  initiallyOpen = false,
  showTrigger = true,
  onOpenChange,
  showEnglishTranslations = false,
  onToggleTranslations,
}) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);
  const [isNativePurchasesReady, setIsNativePurchasesReady] =
    React.useState(false);
  const [hasRemovedAdsState, setHasRemovedAdsState] = React.useState(false);
  const [removeAdsPackage, setRemoveAdsPackage] = React.useState(null);

  async function refreshPurchaseState() {
    const ready = await initializePurchases();
    setIsNativePurchasesReady(ready);

    if (!ready) {
      setRemoveAdsPackage(null);
      setHasRemovedAdsState(false);
      return;
    }

    const [nextHasRemovedAds, nextPackage] = await Promise.all([
      userHasRemovedAds(),
      loadRemoveAdsProduct(),
    ]);

    setHasRemovedAdsState(nextHasRemovedAds);
    setRemoveAdsPackage(nextPackage);
  }

  async function handlePurchase() {
    setIsLoading(true);

    try {
      const result = await purchaseRemoveAds();
      setHasRemovedAdsState(result.hasRemovedAds);
      toast({
        label: "Notification",
        title: "Fógraí bainte",
        description: "Tá Bain Fógraí gníoṁaċ anois ar an gcuntas seo.",
      });
    } catch (error) {
      const message = getPurchaseErrorMessage(error);
      toast({
        label: "Notification",
        title: message.title,
        description: message.description,
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleRestorePurchases() {
    setIsLoading(true);

    try {
      const restored = await restoreRemoveAdsPurchases();
      setHasRemovedAdsState(restored);
      toast({
        label: "Notification",
        title: restored ? "Ceannaċáin aṫċóiriṫe" : "Níor aimsíġ ceannaċán",
        description: restored
          ? "Tá Bain Fógraí curṫa ar ais ar an gcuntas seo."
          : "Níor aimsíġ ceannaċán Bain Fógraí le haṫċóiriú.",
      });
    } catch (error) {
      console.warn("Restore purchases failed", error);
      toast({
        label: "Notification",
        title: "Ṫeip ar an aṫċóiriú",
        description:
          "Níor éiriġ linn do ċeannaċáin a aṫċóiriú anois. Bain triail eile as.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <BaseModal
      title="Socruithe"
      trigger={
        showTrigger ? (
          <button
            type="button"
            className="icon-trigger"
            aria-label="Socruithe"
          >
            <Settings2 strokeWidth={1.75} />
          </button>
        ) : undefined
      }
      initiallyOpen={initiallyOpen}
      actionButtonText="Dún"
      contentClassName="top-auto bottom-0 translate-y-0 w-full max-w-[520px] rounded-b-none rounded-t-[18px] border-b-0 p-5 pb-[calc(1.25rem+env(safe-area-inset-bottom,0px))] data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom data-[state=closed]:slide-out-to-left-0 data-[state=open]:slide-in-from-left-0 data-[state=closed]:slide-out-to-top-0 data-[state=open]:slide-in-from-top-0"
      footerClassName="pt-1"
      onOpenChange={(open) => {
        if (open) {
          setIsLoading(true);
          refreshPurchaseState().finally(() => setIsLoading(false));
        }
        onOpenChange?.(open);
      }}
    >
      <div className="grid gap-4 text-left">
        <div className="grid gap-2 rounded-md border border-rule bg-surface p-3">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="font-display text-base font-bold text-char">
                GA→EN
              </p>
              <p className="text-sm text-text-soft">
                Taispeáin aistriúċáin Ḃéarla faoi na focail.
              </p>
            </div>
            <button
              type="button"
              className={`translation-toggle ${
                showEnglishTranslations ? "translation-toggle-active" : ""
              }`}
              onClick={onToggleTranslations}
              aria-pressed={showEnglishTranslations}
            >
              GA→EN{showEnglishTranslations ? " ✓" : ""}
            </button>
          </div>
        </div>

        <div className="grid gap-2 rounded-md border border-rule bg-surface p-3">
          <p className="font-display text-base font-bold text-char">
            Bain Fógraí
          </p>
          {!canUseRevenueCat() ? (
            <p className="text-sm text-text-soft">
              Tá Bain Fógraí ar fáil san aip ḋúċasaċ aṁáin nuair atá
              eochracha RevenueCat socraithe.
            </p>
          ) : hasRemovedAdsState ? (
            <p className="text-sm text-text-soft">
              Tá Bain Fógraí gníoṁaċ ċeana. Níor ċeart go ḃfeicfeá
              idirleaṫanaiġ fógraí a ṫuilleaḋ.
            </p>
          ) : (
            <>
              <p className="text-sm text-text-soft">
                Bain fógraí idirleaṫanaiġ den aip go buan le ceannaċ aon
                uaire.
              </p>
              <div className="rounded-md border border-rule bg-background p-3">
                <p className="font-display text-sm font-bold text-char">
                  {removeAdsPackage?.product?.title ?? "Bain Fógraí"}
                </p>
                <p className="mt-1 text-sm text-text-soft">
                  {removeAdsPackage?.product?.description ??
                    "Ceannaċ aon uaire ċun fógraí a ṁúċaḋ."}
                </p>
                <p className="mt-2 font-semibold text-vermil">
                  {removeAdsPackage?.product?.priceString ??
                    "Ag lódáil ṗraghais..."}
                </p>
              </div>
            </>
          )}
          <div className="grid gap-2 pt-1">
            <Button
              className="w-full"
              variant="submit"
              disabled={
                isLoading ||
                !isNativePurchasesReady ||
                hasRemovedAdsState ||
                !removeAdsPackage
              }
              onClick={handlePurchase}
            >
              {isLoading ? (
                <Loader2
                  className="mr-2 h-4 w-4 animate-spin"
                  strokeWidth={1.5}
                />
              ) : null}
              {hasRemovedAdsState ? "Bainte ċeana" : "Bain Fógraí"}
            </Button>
            <Button
              className="w-full"
              variant="secondary"
              disabled={isLoading || !isNativePurchasesReady}
              onClick={handleRestorePurchases}
            >
              Aṫċóirigh ceannaċáin
            </Button>
          </div>
        </div>

        <div className="grid gap-2 rounded-md border border-rule bg-surface p-3 text-sm">
          <a
            className="font-semibold text-char underline"
            href={PRIVACY_URL}
            target="_blank"
            rel="noreferrer"
          >
            Príobḃáideaċas
          </a>
          <p className="text-text-soft">Leagan {packageJson.version}</p>
          <p className="truncate text-text-soft">
            Made by the team behind{" "}
            <a
              className="underline"
              href={MISNEACH_URL}
              target="_blank"
              rel="noreferrer"
            >
              Misneach
            </a>
          </p>
        </div>
      </div>
    </BaseModal>
  );
}

export default RemoveAdsModal;
