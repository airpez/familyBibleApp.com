/**
 * Stripe configuration — live mode
 * Add your publishable key from Stripe Dashboard → Developers → API keys
 */
window.STRIPE_CONFIG = {
  // pk_live_... — safe to expose on the marketing site
  publishableKey: 'pk_live_REPLACE_WITH_YOUR_KEY',

  // Update after: firebase deploy --only functions:createCheckoutSession
  checkoutFunctionUrl:
    'https://us-central1-familybibleapp.cloudfunctions.net/createCheckoutSession',

  successUrl: 'https://familybibleapp.web.app/dashboard?checkout=success',
  cancelUrl: 'https://familybibleapp.com/pricing.html?checkout=cancelled',

  plans: {
    free: {
      productId: 'prod_Uir0GW7xQ4Zo65',
      name: 'Family Bible Free',
      price: '$0',
      period: '/ year',
    },
    legacy: {
      productId: 'prod_Uir1IOgnFdBCCs',
      name: 'Family Legacy',
      price: '$89',
      period: '/ year',
    },
    plus: {
      productId: 'prod_Uir2BQ8lOOOTRF',
      name: 'Family Plus',
      price: '$149',
      period: '/ year',
    },
  },
};
