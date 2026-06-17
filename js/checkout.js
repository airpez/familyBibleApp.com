(function () {
  'use strict';

  var config = window.STRIPE_CONFIG;
  if (!config) return;

  var params = new URLSearchParams(window.location.search);
  var planKey = params.get('plan') || 'legacy';
  var plan = config.plans[planKey];

  var els = {
    planName: document.getElementById('checkout-plan-name'),
    planPrice: document.getElementById('checkout-plan-price'),
    planPeriod: document.getElementById('checkout-plan-period'),
    email: document.getElementById('checkout-email'),
    form: document.getElementById('checkout-form'),
    submit: document.getElementById('checkout-submit'),
    error: document.getElementById('checkout-error'),
    loading: document.getElementById('checkout-loading'),
  };

  if (!plan) {
    window.location.href = 'pricing.html';
    return;
  }

  if (els.planName) els.planName.textContent = plan.name;
  if (els.planPrice) els.planPrice.textContent = plan.price;
  if (els.planPeriod) els.planPeriod.textContent = plan.period;

  function showError(msg) {
    if (!els.error) return;
    els.error.textContent = msg;
    els.error.hidden = false;
  }

  function setLoading(loading) {
    if (els.submit) els.submit.disabled = loading;
    if (els.loading) els.loading.hidden = !loading;
  }

  if (els.form) {
    els.form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (els.error) els.error.hidden = true;
      setLoading(true);

      var email = els.email ? els.email.value.trim() : '';

      fetch(config.checkoutFunctionUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          plan: planKey,
          productId: plan.productId,
          email: email || undefined,
          successUrl: config.successUrl,
          cancelUrl: config.cancelUrl,
        }),
      })
        .then(function (res) {
          return res.json().then(function (data) {
            if (!res.ok) throw new Error(data.error || 'Checkout failed');
            return data;
          });
        })
        .then(function (data) {
          if (data.url) {
            window.location.href = data.url;
          } else {
            throw new Error('No checkout URL returned');
          }
        })
        .catch(function (err) {
          showError(err.message || 'Something went wrong. Please try again.');
          setLoading(false);
        });
    });
  }
})();
