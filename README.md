### GitHub Actions deploy

The repo includes a GitHub Actions workflow at
`.github/workflows/deploy.yml` that deploys the built `dist/` folder to S3 on
pushes to `main`, then invalidates CloudFront.

Required GitHub repository secrets:

- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `CF_DISTRIBUTION_ID`

The workflow currently deploys to:

- S3 bucket: `ceangal.app`
- AWS region: `eu-west-1`
- Plausible domain env: `ceangal.app`

### Deploying with OpenTofu

There is an OpenTofu scaffold for S3 + CloudFront deployment in
`infra/opentofu`.

What it creates:

- a private S3 origin bucket with versioning enabled
- a CloudFront distribution using Origin Access Control
- an ACM certificate in `us-east-1` for CloudFront
- Route 53 DNS validation records for the certificate
- Route 53 alias `A` and `AAAA` records for the site domain
- SPA-friendly CloudFront behavior with:
  - default root object `index.html`
  - `404 -> /index.html` with HTTP `200`

Quick start:

```bash
cd infra/opentofu
cp tofu.tfvars.example tofu.tfvars
tofu init
tofu plan
tofu apply
```

### Native ads

AdMob interstitials are configured for native builds only. The web build never
initializes ads.

Relevant environment variables:

- `VITE_IS_DEV=true` to force Google test ads
- `VITE_ADMOB_ANDROID_INTERSTITIAL`
- `VITE_ADMOB_IOS_INTERSTITIAL`
- `VITE_ADMOB_REAL_ANDROID_INTERSTITIAL`
- `VITE_ADMOB_REAL_IOS_INTERSTITIAL`
- `VITE_RC_ANDROID_KEY`
- `VITE_RC_IOS_KEY`
- `VITE_RC_REMOVE_ADS_ENTITLEMENT`
- `VITE_MOBILE_APPS_URL` for the subtle web settings link to native apps

Android also needs an AdMob application ID in native resources. The repo is
currently wired with Google's sample Android app ID for development.

RevenueCat purchase UI is hidden on web. The browser version stays free and
ad-free, and the settings sheet shows a small link toward the native apps
instead.

### Capacitor build pipeline

Capacitor is configured with:

- `webDir: "dist"` in [capacitor.config.ts](capacitor.config.ts)
- Parcel output written to `dist/`

Useful commands:

```bash
npm run build
```

Builds the web app into `dist/`, including the privacy page and copied SEO
assets.

```bash
npm run build:app
```

Builds the web app and then runs:

```bash
npx cap sync
```

That updates the native platforms from the latest `dist/` output.

Platform copy checks:

```bash
npx cap copy android
```

Works in the current repo and copies web assets into the Android project.

```bash
npx cap copy ios
```

Works now that the iOS platform has been added. The generated iOS project is
configured with:

- Bundle ID `ie.misneach.ceangal`
- Display Name `Ceangal`
- native AdMob application ID in `Info.plist`
- `NSUserTrackingUsageDescription` for ATT / AdMob
- portrait-only orientation to match Android

Open in Xcode with:

```bash
npx cap open ios
```
