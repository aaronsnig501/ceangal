# Connections (React, Tailwind, Shadcn/ui)

This is a clone of the [NYT Connections Game](https://www.nytimes.com/games/connections). Which itself seems to be an unacknowledged clone of the British game [`Only Connect`](https://kotaku.com/new-york-times-connections-only-connect-puzzle-wordle-1850553072).

Anyways..

### [Click Here To Try Out The Demo](https://blackconnections.andcomputers.io/)

![Gif of Connections Gameplay](/docs/instructions-gif-connections.gif)

## To Run Locally:

```
cd react-connections-game
npm install
npm run dev
```

### Plausible analytics

Plausible analytics is optional and disabled unless you provide a site domain.

Environment variables:

- `PLAUSIBLE_DOMAIN`: the domain configured in Plausible, for example `ceangal.app`
- `PLAUSIBLE_API_HOST` (optional): alternate Plausible host for self-hosting or proxying. Defaults to `https://plausible.io`
- `PLAUSIBLE_SCRIPT_SRC` (optional): full script URL override if you want to serve a custom snippet path

Example:

```bash
PLAUSIBLE_DOMAIN=ceangal.app npm run build
```

Tracked events:

- `App Open`
- `Puzzle Start`
- `Puzzle Complete`
- `Share Result`
- `Puzzle Browser Open`
- `Puzzle Browser Select`

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

Notes:

- `domain_name` is intentionally configurable so you can use `ceangal.app`,
  `ceangal.ie`, or another final domain without editing the module.
- The ACM certificate is created with an aliased AWS provider in `us-east-1`,
  because CloudFront requires it there.
- This scaffold handles infrastructure only. Uploading the built `dist/`
  folder and wiring CI/CD can be added separately.

### Technology

- [React 18](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Spring](https://www.react-spring.dev/) for a few animations
- [Shadcn/ui](https://ui.shadcn.com/) for primitive components
- Copied a number of utility functions from a [React Wordle Clone - cwackerfuss/react-wordle](https://github.com/cwackerfuss/react-wordle)
- Built with [Parcel](https://parceljs.org/)

### Code Organization

- Global state (game status, guesses, etc.) is handled using React's Context API. The provider components are in `src/providers`
- Components are in `src/components`
  - Primitive components imported from `shadcn/ui` library and lightly edited are in `src/components/ui`
  - The `Sparkles` component is taken from [Josh Comeau's article on creating animated sparkles in React.](https://www.joshwcomeau.com/react/animated-sparkles-in-react/).
- Helper functions for local storage, game statistics, and constants are in `src/lib`
  - The actual puzzle data for changing the content of each puzzle is in `src/lib/data.js`
- Custom hooks are in `src/hooks`
  - Both of these are code snippets taken from [Josh Comeau's Blog](https://www.joshwcomeau.com/snippets/)

#### Similar Projects

- [PuzzGrid](https://puzzgrid.com/about) which allows you to create your own games/puzzles, no code required.
- [Connections Generator by swellgarfo](https://www.reddit.com/r/NYTSpellingBee/comments/152i5cx/for_those_playing_nyt_connections_i_created_a/) which also allows you to create your own games/puzzles, no code required.

### Contributing

- Please fork and submit a PR if you'd like!

### Projects Built Using This Repo:

- _your fork here!_

_Want to add one to the list? Please make a pull request._

#### If you found this helpful or entertaining feel free to check out our other work!

- [Writings & Thoughts](https://andcomputers.io)
- [Black Wordle](https://blackwords.andcomputers.io)

##### If you'd like to support financially

- [One-Time Contribution via Stripe](https://buy.stripe.com/7sIg1Udac6xZegodQR)
