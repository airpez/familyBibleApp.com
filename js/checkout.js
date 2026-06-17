(function () {
  'use strict';

  var config = window.STRIPE_CONFIG;

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

  function getPlanFromUrl() {
    var planKey = new URLSearchParams(window.location.search).get('plan') || 'legacy';
    if (!config || !config.plans || !config.plans[planKey]) {
      return null;
    }
    return { planKey: planKey, plan: config.plans[planKey] };
  }

  function applyPlan() {
    if (!config) {
      showError('Checkout configuration failed to load. Hard refresh and try again.');
      return false;
    }

    var selected = getPlanFromUrl();
    if (!selected) {
      window.location.replace('pricing.html');
      return false;
    }

    if (els.planName) els.planName.textContent = selected.plan.name;
    if (els.planPrice) els.planPrice.textContent = selected.plan.price;
    if (els.planPeriod) els.planPeriod.textContent = selected.plan.period;

    if (els.error && els.error.textContent.indexOf('configuration') === -1) {
      els.error.hidden = true;
    }
    setLoading(false);

    return true;
  }

  function showError(msg) {
    if (!els.error) return;
    els.error.textContent = msg;
    els.error.hidden = false;
  }

  function setLoading(loading) {
    if (els.submit) els.submit.disabled = loading;
    if (els.loading) els.loading.hidden = !loading;
  }

  // Run on every show — fixes back/forward cache keeping the first plan
  function init() {
    applyPlan();
  }

  init();

  window.addEventListener('pageshow', function (event) {
    if (event.persisted) {
      init();
    }
  });

  if (els.form) {
    els.form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (els.error) els.error.hidden = true;

      var selected = getPlanFromUrl();
      if (!selected) {
        showError('Invalid plan. Please choose again from the pricing page.');
        return;
      }

      setLoading(true);

      var email = els.email ? els.email.value.trim() : '';

      fetch(config.checkoutFunctionUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          plan: selected.planKey,
          productId: selected.plan.productId,
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
