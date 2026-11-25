// Seiten-Code für die Wix-Seite „zahlen“ (z. B. https://abhofgrafinger.at/zahlen?b=1250)
// Leitet sofort zum Stripe-Zahlungslink weiter und füllt den Betrag vor.
// b = Betrag in Cent (1250 = 12,50 €).

import wixLocationFrontend from 'wix-location-frontend';

const STRIPE_PAY_LINK = 'https://buy.stripe.com/aFa9AT40J4SvfdTf7R1B603';

$w.onReady(function () {
  const cents = parseInt(wixLocationFrontend.query.b, 10);
  // Nur sinnvolle Beträge übernehmen (1 € bis 1.000 €), sonst gibt der Kunde den Betrag selbst ein
  const ok = cents >= 100 && cents <= 100000;
  wixLocationFrontend.to(ok ? STRIPE_PAY_LINK + '?prefilled_amount=' + cents : STRIPE_PAY_LINK);
});
