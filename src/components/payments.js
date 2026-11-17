// src/components/payments.js
//
// Single place where the "Pay Now" button hands off to a payment provider.
//
// ⚠️ SHOWCASE ONLY – no real payment happens yet. startCheckout() always
// answers { status: 'coming_soon' } and the modal shows a "coming soon" screen.
//
// To go live with Stripe later:
//   1. Create a small backend endpoint, e.g. POST /api/create-checkout-session,
//      that uses your Stripe SECRET key to create a Checkout Session for
//      { amount, currency, invoice } and returns { url }.
//      (Never put the secret key in this React app.)
//   2. Replace the body of startCheckout() with:
//        const res = await fetch('/api/create-checkout-session', {
//          method: 'POST',
//          headers: { 'Content-Type': 'application/json' },
//          body: JSON.stringify(payment),
//        });
//        const { url } = await res.json();
//        window.location.href = url;          // go to Stripe's secure checkout
//        return { status: 'redirecting' };
//   3. Set PAYMENTS_LIVE = true.

export const PAYMENTS_LIVE = false;

export const CURRENCIES = {
  USD: { symbol: '$', locale: 'en-US', quick: [100, 250, 500, 1000], min: 1, max: 50000 },
  // Add more currencies here later if needed – the currency switch in the
  // Pay Now window appears automatically when there is more than one.
};

export const formatMoney = (amount, currency) =>
  new Intl.NumberFormat(CURRENCIES[currency].locale, {
    style: 'currency',
    currency,
    currencyDisplay: 'narrowSymbol', // "$" and "Rs" instead of "USD"/"NPR"
    maximumFractionDigits: 2,
  }).format(amount || 0);

export async function startCheckout(payment) {
  // Small delay so the "processing" state is visible in the showcase
  await new Promise((r) => setTimeout(r, 1100));
  // (Stripe redirect goes here once PAYMENTS_LIVE is true – see the steps above)
  return { status: 'coming_soon', payment };
}
