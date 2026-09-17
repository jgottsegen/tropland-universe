export const PEACE_PIXEL_ID = '1336886104966800';
export const PEACE_PRODUCT_ID = 'c3e99d89-7657-4db5-aa95-669da6f8e604';
export const CONSENT_KEY = 'tropland.peace.ads-consent.v1';
export type AdsConsent = 'allowed' | 'declined' | 'unset';
const CONSENT_LIFETIME = 180 * 24 * 60 * 60 * 1000;

export function readAdsConsent(storage: Pick<Storage, 'getItem'>, gpc: boolean, now = Date.now()): AdsConsent {
  if (gpc) return 'declined';
  try {
    const saved = JSON.parse(storage.getItem(CONSENT_KEY) || 'null');
    if (saved && (saved.choice === 'allowed' || saved.choice === 'declined') &&
        Number.isFinite(saved.expires) && saved.expires > now && saved.expires <= now + CONSENT_LIFETIME) return saved.choice;
  } catch { /* An unavailable or malformed preference never grants permission. */ }
  return 'unset';
}

export function saveAdsConsent(storage: Pick<Storage, 'setItem'>, choice: Exclude<AdsConsent, 'unset'>) {
  try { storage.setItem(CONSENT_KEY, JSON.stringify({choice, expires: Date.now() + CONSENT_LIFETIME})); } catch { /* Choice still applies to this page visit. */ }
}

export function checkoutWithAttribution(checkout: string, landing: string, allowAds: boolean): string {
  const destination = new URL(checkout);
  if (destination.origin !== 'https://checkout.troplanduniverse.com' || destination.pathname !== '/cart/checkout' || destination.username || destination.password) {
    throw new Error('Unexpected checkout destination.');
  }
  const source = new URL(landing);
  for (const key of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'utm_id']) {
    const value = source.searchParams.get(key);
    if (value && value.length <= 256 && !/[\u0000-\u001f\u007f]/.test(value)) destination.searchParams.set(key, value);
  }
  destination.searchParams.delete('fbclid');
  const clickId = source.searchParams.get('fbclid');
  if (allowAds && clickId && /^[A-Za-z0-9_-]{1,500}$/.test(clickId)) destination.searchParams.set('fbclid', clickId);
  return destination.href;
}

type Pixel = ((...args: any[]) => void) & {queue?: any[][]; callMethod?: (...args: any[]) => void; push?: Pixel; loaded?: boolean; version?: string};
type PixelWindow = {fbq?: Pixel; _fbq?: Pixel; location: {hostname: string}; navigator: Pick<Navigator, 'userAgent'> & {globalPrivacyControl?: boolean}};
const initializedPixels = new WeakSet<object>();

// This controller tracks only this product page. Fourthwall owns checkout and Purchase events.
export function createPeaceTracker(win: PixelWindow, doc: Pick<Document, 'createElement' | 'head'>, enabled = true) {
  let initialized = initializedPixels.has(win);
  let allowed = false;
  let pageSent = false;
  let contentSent = false;
  const isProduction = () => enabled && ['www.troplanduniverse.com', 'troplanduniverse.com'].includes(win.location.hostname);
  function consent(granted: boolean) {
    allowed = granted && !win.navigator.globalPrivacyControl && isProduction();
    if (!allowed) {
      if (initialized) {
        // If the library is still loading, discard unsent events after withdrawal.
        if (win.fbq?.queue && !win.fbq.callMethod) {
          if (win.fbq.queue.some(args => args[0] === 'trackSingle' && args[1] === PEACE_PIXEL_ID && args[2] === 'PageView')) pageSent = false;
          if (win.fbq.queue.some(args => args[0] === 'trackSingle' && args[1] === PEACE_PIXEL_ID && args[2] === 'ViewContent')) contentSent = false;
          win.fbq.queue = win.fbq.queue.filter(args => !(args[0] === 'trackSingle' && args[1] === PEACE_PIXEL_ID));
        }
        win.fbq?.('consent', 'revoke');
      }
      return;
    }
    if (!win.fbq) {
      const pixel: Pixel = (...args: any[]) => pixel.callMethod ? pixel.callMethod(...args) : pixel.queue!.push(args);
      pixel.queue = []; pixel.push = pixel; pixel.loaded = true; pixel.version = '2.0';
      win.fbq = pixel; win._fbq = pixel;
    }
    win.fbq('consent', 'grant');
    if (!initialized) {
      win.fbq('set', 'autoConfig', false, PEACE_PIXEL_ID);
      win.fbq('init', PEACE_PIXEL_ID);
      const script = doc.createElement('script');
      script.async = true; script.src = 'https://connect.facebook.net/en_US/fbevents.js';
      doc.head.appendChild(script);
      initialized = true;
      initializedPixels.add(win);
    }
  }
  function view(priceCents?: number) {
    if (!allowed || win.navigator.globalPrivacyControl || !isProduction()) { consent(false); return; }
    if (!pageSent) { win.fbq?.('trackSingle', PEACE_PIXEL_ID, 'PageView'); pageSent = true; }
    if (!contentSent && Number.isFinite(priceCents) && priceCents! > 0) {
      win.fbq?.('trackSingle', PEACE_PIXEL_ID, 'ViewContent', {
        content_ids: [PEACE_PRODUCT_ID], content_type: 'product', content_name: 'Peace Lion Tee', currency: 'USD', value: priceCents! / 100,
      });
      contentSent = true;
    }
  }
  return {consent, view};
}
