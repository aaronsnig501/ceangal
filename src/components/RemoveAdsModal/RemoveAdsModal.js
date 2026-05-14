import React from "react";
import { Loader2, Settings2 } from "lucide-react";
import BaseModal from "../modals/BaseModal";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import {
  canUseRevenueCat,
  initializePurchases,
  loadRemoveAdsProduct,
  purchaseRemoveAds,
  restoreRemoveAdsPurchases,
  userHasRemovedAds,
} from "../../lib/purchases";

function getPurchaseErrorMessage(error) {
  if (error?.userCancelled) {
    return {
      title: "Ceannach curtha ar ceal",
      description: "Níor críochnaíodh an ceannach an uair seo.",
    };
  }

  if (error?.code === "REMOVE_ADS_PRODUCT_UNAVAILABLE") {
    return {
      title: "Níl sé ar fáil fós",
      description:
        "Níor aimsíodh an tairiscint Bain Fógraí. Seiceáil an tairiscint default i RevenueCat.",
    };
  }

  return {
    title: "Theip ar an gceannach",
    description:
      "Níor éirigh linn Bain Fógraí a cheannach anois. Bain triail eile as i gceann tamaill.",
  };
}

function RemoveAdsModal({
  initiallyOpen = false,
  showTrigger = true,
  onOpenChange,
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
        description: "Tá Bain Fógraí gníomhach anois ar an gcuntas seo.",
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
        title: restored ? "Ceannacháin athchóirithe" : "Níor aimsíodh ceannachán",
        description: restored
          ? "Tá Bain Fógraí curtha ar ais ar an gcuntas seo."
          : "Níor aimsíodh ceannachán Bain Fógraí le hathchóiriú.",
      });
    } catch (error) {
      console.warn("Restore purchases failed", error);
      toast({
        label: "Notification",
        title: "Theip ar an athchóiriú",
        description:
          "Níor éirigh linn do cheannacháin a athchóiriú anois. Bain triail eile as.",
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
      showActionButton={false}
      footerClassName="flex-col gap-2 sm:flex-col"
      footerElements={
        <>
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
              <Loader2 className="mr-2 h-4 w-4 animate-spin" strokeWidth={1.5} />
            ) : null}
            {hasRemovedAdsState ? "Bainte cheana" : "Bain Fógraí"}
          </Button>
          <Button
            className="w-full"
            variant="secondary"
            disabled={isLoading || !isNativePurchasesReady}
            onClick={handleRestorePurchases}
          >
            Athchóirigh ceannacháin
          </Button>
        </>
      }
      onOpenChange={(open) => {
        if (open) {
          setIsLoading(true);
          refreshPurchaseState().finally(() => setIsLoading(false));
        }
        onOpenChange?.(open);
      }}
    >
      <div className="grid gap-3 text-left">
        {!canUseRevenueCat() ? (
          <p className="font-serif italic text-sm text-text-soft">
            Tá Bain Fógraí ar fáil san aip dhúchasach amháin nuair atá eochracha
            RevenueCat socraithe.
          </p>
        ) : hasRemovedAdsState ? (
          <p className="font-serif italic text-sm text-text-soft">
            Tá Bain Fógraí gníomhach cheana. Níor cheart go bhfeicfeá
            idirleathanaigh fógraí a thuilleadh.
          </p>
        ) : (
          <>
            <p className="font-serif italic text-sm text-text-soft">
              Bain fógraí idirleathanaigh den aip go buan le ceannach aon uaire.
            </p>
            <div className="rounded-md border border-rule bg-surface p-3">
              <p className="font-display text-base font-bold text-char">
                {removeAdsPackage?.product?.title ?? "Bain Fógraí"}
              </p>
              <p className="mt-1 text-sm text-text-soft">
                {removeAdsPackage?.product?.description ??
                  "Ceannach aon uaire chun fógraí a mhúchadh."}
              </p>
              <p className="mt-2 font-semibold text-vermil">
                {removeAdsPackage?.product?.priceString ?? "Ag lódáil praghais..."}
              </p>
            </div>
          </>
        )}
      </div>
    </BaseModal>
  );
}

export default RemoveAdsModal;
