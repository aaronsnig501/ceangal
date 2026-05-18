import React from "react";
import { Capacitor } from "@capacitor/core";
import { Loader2 } from "lucide-react";
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

const MISNEACH_URL = "https://misneachabu.ie/";
const env = import.meta.env ?? {};
const MOBILE_APPS_URL = env.VITE_MOBILE_APPS_URL ?? "https://ceangal.app/";
const PRIVACY_URL = Capacitor.isNativePlatform()
  ? "https://ceangal.app/privacy/"
  : "/privacy/";

function SettingsToggle({ label, hint, checked, onToggle }) {
  return (
    <div className="settings-row">
      <div className="settings-copy">
        <p className="settings-label">{label}</p>
        <p className="settings-hint">{hint}</p>
      </div>
      <button
        type="button"
        className={`ios-toggle ${checked ? "ios-toggle-on" : ""}`}
        onClick={onToggle}
        aria-pressed={checked}
      >
        <span className="ios-toggle-thumb" />
      </button>
    </div>
  );
}

function SettingsAction({
  label,
  hint,
  onClick,
  disabled = false,
  loading = false,
  children,
}) {
  return (
    <button
      type="button"
      className="settings-row settings-row-button"
      onClick={onClick}
      disabled={disabled || loading}
    >
      <div className="settings-copy">
        <p className="settings-label">{label}</p>
        <p className="settings-hint">{hint}</p>
      </div>
      <div className="settings-trailing">
        {loading ? <Loader2 className="animate-spin" size={16} /> : children}
      </div>
    </button>
  );
}

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
  open = false,
  onOpenChange,
  showEnglishTranslations = false,
  onToggleTranslations,
  themePreference = "light",
  onToggleTheme,
}) {
  const { toast } = useToast();
  const isNativePlatform = Capacitor.isNativePlatform();
  const [isLoading, setIsLoading] = React.useState(false);
  const [hasRemovedAdsState, setHasRemovedAdsState] = React.useState(false);
  const [removeAdsPackage, setRemoveAdsPackage] = React.useState(null);

  async function refreshPurchaseState() {
    const ready = await initializePurchases();

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

  React.useEffect(() => {
    if (!open) {
      return;
    }

    setIsLoading(true);
    refreshPurchaseState().finally(() => setIsLoading(false));
  }, [open]);

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

  if (!open) {
    return null;
  }

  return (
    <section className="app-panel-screen" aria-label="Socruithe">
      <div className="panel-header">
        <div>
          <h2 className="panel-title">Socruithe</h2>
          <p className="panel-subtitle">Roghanna don aip ⁊ don imirt.</p>
        </div>
      </div>

      <div className="panel-scroll">
        <div className="panel-card-list">
          <div className="panel-card">
            <SettingsToggle
              label="GA→EN"
              hint="Taispeáin aistriúċáin Ḃéarla faoi na focail."
              checked={showEnglishTranslations}
              onToggle={onToggleTranslations}
            />
            <SettingsToggle
              label="Mód dorċa"
              hint="Athraigh an pailéad go téama oiċe níos boige."
              checked={themePreference === "dark"}
              onToggle={onToggleTheme}
            />
          </div>

          <div className="panel-card">
            {isNativePlatform ? (
              <>
                <SettingsAction
                  label="Bain fógráin"
                  hint={
                    hasRemovedAdsState
                      ? "Tá Bain Fógraí gníoṁaċ cheana ar an gcuntas seo."
                      : removeAdsPackage?.product?.priceString ??
                        "Ceannaċ aon uaire ċun fógraí a ṁúċaḋ."
                  }
                  onClick={handlePurchase}
                  disabled={!canUseRevenueCat() || hasRemovedAdsState}
                  loading={isLoading}
                >
                  {hasRemovedAdsState ? "Gníomhach" : "Ceannaigh"}
                </SettingsAction>
                <SettingsAction
                  label="Aisgaḃ ceannacáin"
                  hint="Aṫċóirigh ceannacáin roimhe seo ar an ngléas seo."
                  onClick={handleRestorePurchases}
                  disabled={!canUseRevenueCat()}
                  loading={isLoading}
                >
                  Aisgaḃ
                </SettingsAction>
              </>
            ) : (
              <>
                <div className="settings-row">
                  <div className="settings-copy">
                    <p className="settings-label">Bain fógráin</p>
                    <p className="settings-hint">
                      Tá an leagan gréasáin saor in aisce ⁊ gan fógraí.
                    </p>
                  </div>
                </div>
                <a
                  className="settings-inline-link"
                  href={MOBILE_APPS_URL}
                  target="_blank"
                  rel="noreferrer"
                >
                  Available on iOS and Android
                </a>
              </>
            )}
          </div>

          <div className="panel-card">
            <a className="settings-row settings-link-row" href={PRIVACY_URL}>
              <span className="settings-label">Príobḃáideaċas</span>
              <span className="settings-link-value">ceangal.app/privacy</span>
            </a>
          </div>
        </div>
      </div>

      <footer className="settings-footer">
        <a
          className="wordmark settings-footer-wordmark"
          href={MISNEACH_URL}
          target="_blank"
          rel="noreferrer"
        >
          <span className="wordmark-strong">CEAN</span>
          <span className="wordmark-light">gal</span>
        </a>
        <p className="settings-footer-copy">
          Déanta ag foireann Misneaċ · ceangal.app
        </p>
        <p className="settings-footer-version">v{packageJson.version}</p>
        <div className="settings-footer-actions">
          <Button variant="secondary" className="w-full" onClick={() => onOpenChange(false)}>
            Fill ar an imirt
          </Button>
        </div>
      </footer>
    </section>
  );
}

export default RemoveAdsModal;
