# Stripe — Live Mode Setup

## Your products (configured)

| Plan | Product ID |
|------|------------|
| Family Bible Free | `prod_Uir0GW7xQ4Zo65` |
| Family Legacy | `prod_Uir1IOgnFdBCCs` |
| Family Plus | `prod_Uir2BQ8lOOOTRF` |

The Firebase function looks up each product's active yearly price automatically.

---

## Deploy checklist

### 1. Set Stripe secrets (terminal, project root)

```bash
firebase functions:secrets:set STRIPE_SECRET_KEY
# Paste your sk_live_... key when prompted

firebase functions:secrets:set STRIPE_WEBHOOK_SECRET
# Paste whsec_... after step 3
```

### 2. Add publishable key to marketing site

Edit `site/js/stripe-config.js`:

```javascript
publishableKey: 'pk_live_YOUR_KEY_HERE',
```

### 3. Deploy Firebase functions

```bash
cd functions
npm run build
cd ..
firebase deploy --only functions:createCheckoutSession,functions:stripeWebhook
```

Copy the **createCheckoutSession** URL from the deploy output. If it differs from the default in `stripe-config.js`, update `checkoutFunctionUrl`.

### 4. Stripe webhook

Stripe Dashboard → **Developers** → **Webhooks** → **Add endpoint**

- URL: `https://us-central1-familybibleapp.cloudfunctions.net/stripeWebhook`
- Events:
  - `checkout.session.completed`
  - `customer.subscription.updated`
  - `customer.subscription.deleted`

Copy the signing secret → `firebase functions:secrets:set STRIPE_WEBHOOK_SECRET` → redeploy webhook function.

### 5. Upload marketing site to SiteGround

Upload to `public_html`:

- `pricing.html`
- `checkout.html` (new)
- `css/styles.css`
- `js/stripe-config.js` (new)
- `js/checkout.js` (new)

---

## Flow

1. User clicks plan on **pricing.html**
2. **checkout.html** — enters email
3. Firebase **createCheckoutSession** → Stripe Checkout (card entry on Stripe)
4. Success → **familybibleapp.web.app/dashboard**
5. Webhook updates Firestore user record if email matches

---

## Test on live

Use a real card in live mode, or switch Stripe to test mode and use test keys + `4242 4242 4242 4242`.

---

## Still need from you

- **Publishable key** (`pk_live_...`) for `stripe-config.js`
- Confirm **secret key** is set via Firebase secrets (do not commit to git)
