import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "ie.misneach.ceangal",
  appName: "Ceangal",
  webDir: "dist",
  plugins: {
    SplashScreen: {
      launchAutoHide: false,
      backgroundColor: "#1e1c18",
      showSpinner: false,
    },
    StatusBar: {
      style: "Dark",
      backgroundColor: "#1e1c18",
    },
  },
};

export default config;
