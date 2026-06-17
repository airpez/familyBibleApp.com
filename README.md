# Family Bible App — Marketing Site

Static marketing site for [familybibleapp.com](https://familybibleapp.com).

The live app runs separately at [familybibleapp.web.app](https://familybibleapp.web.app).

## Structure

```
├── index.html          Homepage
├── pricing.html        Plans & pricing
├── checkout.html       Stripe checkout (email → Stripe)
├── css/styles.css
├── js/
│   ├── main.js
│   ├── stripe-config.js
│   └── checkout.js
└── images/
```

## Local preview

```bash
python3 -m http.server 8085
```

Open [http://localhost:8085](http://localhost:8085)

## Deploy to SiteGround

Upload contents to `public_html`, or connect SiteGround Git to this repo and deploy.

See [DEPLOY.md](DEPLOY.md) for details.

## Stripe

See [STRIPE_SETUP.md](STRIPE_SETUP.md) for live-mode checkout setup.
