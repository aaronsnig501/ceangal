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
