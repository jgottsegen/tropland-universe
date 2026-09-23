export type PeaceFunnelEvent = 'choose_size' | 'select_color' | 'select_size' | 'checkout_click' | 'checkout_redirect' | 'checkout_error';
type Selection = {color: string; size: string; quantity: number; priceCents: number};
type Context = Selection & {source: 'product' | 'mobile'; reason?: 'size_required' | 'unavailable' | 'catalog_unavailable' | 'checkout_disabled' | 'request_failed'};
type AnalyticsSink = (name: string, properties: Record<string, string | number>) => void;

// Cookieless site analytics. Fourthwall remains responsible for Purchase events.
// QA has separate event names so test checkouts cannot inflate shopper counts.
export function recordPeaceFunnel(sink: AnalyticsSink, event: PeaceFunnelEvent, context: Context, landing: string, reviewMode = false) {
 try {
  const url = new URL(landing);
  if (reviewMode || !['troplanduniverse.com', 'www.troplanduniverse.com'].includes(url.hostname)) return;
  const qa = url.searchParams.get('utm_source') === 'qa';
  const data: Record<string, string | number> = {
   color: context.color, size: context.size || 'unselected', quantity: context.quantity,
   source: context.source,
  };
  if (event.startsWith('checkout_')) {
   data.value = context.priceCents * context.quantity / 100;
   data.currency = 'USD';
  }
  if (context.reason) data.reason = context.reason;
  sink(`${qa ? 'qa_' : ''}peace_${event}`, data);
 } catch { /* Measurement must never prevent selecting a shirt or opening checkout. */ }
}
