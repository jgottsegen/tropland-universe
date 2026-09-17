import test from 'node:test';
import assert from 'node:assert/strict';
import {CONSENT_KEY, readAdsConsent, saveAdsConsent, checkoutWithAttribution, createPeaceTracker, PEACE_PIXEL_ID, PEACE_PRODUCT_ID} from '../lib/peace-tracking.ts';

const checkout = 'https://checkout.troplanduniverse.com/cart/checkout?products=shirt%3A2&currency=USD';
test('checkout preserves selection and encodes only allowlisted attribution', () => {
  const result = new URL(checkoutWithAttribution(checkout, 'https://www.troplanduniverse.com/peace?utm_source=facebook&utm_content=art%20%26%20lion&fbclid=Abc_12-3&products=bad&currency=EUR&email=private&redirect=https://evil.test', true));
  assert.equal(result.searchParams.get('products'), 'shirt:2');
  assert.equal(result.searchParams.get('currency'), 'USD');
  assert.equal(result.searchParams.get('utm_content'), 'art & lion');
  assert.equal(result.searchParams.get('fbclid'), 'Abc_12-3');
  assert.equal(result.searchParams.has('email'), false);
  assert.equal(result.searchParams.has('redirect'), false);
});
test('declining strips a click ID even if a destination already contains one', () => {
  const result = new URL(checkoutWithAttribution(checkout+'&fbclid=old', 'https://www.troplanduniverse.com/peace?fbclid=new&utm_source=facebook', false));
  assert.equal(result.searchParams.has('fbclid'), false);
  assert.equal(result.searchParams.get('utm_source'), 'facebook');
});
test('rejects unsafe checkout origins and paths and malformed attribution', () => {
  for (const url of ['https://evil.test/cart/checkout','http://checkout.troplanduniverse.com/cart/checkout','https://checkout.troplanduniverse.com/checkout','https://u:p@checkout.troplanduniverse.com/cart/checkout']) {
    assert.throws(() => checkoutWithAttribution(url,'https://www.troplanduniverse.com/peace',true));
  }
  const result = new URL(checkoutWithAttribution(checkout, 'https://www.troplanduniverse.com/peace?utm_source=bad%0aheader&utm_content='+ 'a'.repeat(257)+'&fbclid=bad%20id',true));
  assert.equal(result.searchParams.has('utm_source'),false);
  assert.equal(result.searchParams.has('utm_content'),false);
  assert.equal(result.searchParams.has('fbclid'),false);
});
test('consent storage fails closed, expires, and is overridden by GPC', () => {
  const store = new Map<string,string>();
  const storage = {getItem: (k:string) => store.get(k) || null, setItem: (k:string,v:string) => {store.set(k,v);}};
  assert.equal(readAdsConsent(storage,false),'unset');
  saveAdsConsent(storage,'allowed');
  assert.equal(readAdsConsent(storage,false),'allowed');
  assert.equal(readAdsConsent(storage,true),'declined');
  assert.equal(readAdsConsent(storage,false,Date.now()+181*86400000),'unset');
  store.set(CONSENT_KEY,'{malformed'); assert.equal(readAdsConsent(storage,false),'unset');
  assert.equal(readAdsConsent({getItem:()=>{throw new Error('blocked');}},false),'unset');
});
function harness(hostname = 'www.troplanduniverse.com', gpc = false, enabled = true) {
  const win:any = {location:{hostname},navigator:{globalPrivacyControl:gpc}};
  const scripts:any[]=[];
  const doc:any={createElement:()=>({}),head:{appendChild:(script:any)=>scripts.push(script)}};
  const tracker=createPeaceTracker(win,doc,enabled);
  return {win,doc,scripts,tracker,events:()=> (win.fbq?.queue||[]).filter((a:any[])=>a[0]==='trackSingle')};
}
test('unset, declined, GPC, review and preview hosts never load Meta', () => {
  for (const h of [harness(),harness('www.troplanduniverse.com',true),harness('preview.vercel.app'),harness('www.troplanduniverse.com',false,false)]) {
    h.tracker.view(2499); h.tracker.consent(false); h.tracker.view(2499);
    assert.equal(h.scripts.length,0); assert.equal(h.win.fbq,undefined);
  }
  for (const h of [harness('www.troplanduniverse.com',true),harness('localhost'),harness('www.troplanduniverse.com',false,false)]) {
    h.tracker.consent(true); h.tracker.view(2499); assert.equal(h.scripts.length,0);
  }
});
test('allowed view waits for price and sends exactly one product view per visit', () => {
  const h=harness(); h.tracker.consent(true); h.tracker.view();
  assert.equal(h.events().length,1);
  h.tracker.view(2499); h.tracker.view(2699); h.tracker.consent(true); h.tracker.view(2499);
  assert.equal(h.scripts.length,1); assert.equal(h.events().length,2);
  assert.deepEqual(h.events()[1],['trackSingle',PEACE_PIXEL_ID,'ViewContent',{content_ids:[PEACE_PRODUCT_ID],content_type:'product',content_name:'Peace Lion Tee',currency:'USD',value:24.99}]);
  assert.deepEqual(h.events().map((a:any[])=>a[2]),['PageView','ViewContent']);
});
test('withdrawal removes queued unsent events and a new GPC blocks sends', () => {
  const h=harness(); h.tracker.consent(true); h.tracker.view(2499); h.tracker.consent(false);
  assert.equal(h.events().length,0); h.tracker.view(2499); assert.equal(h.events().length,0);
  const g=harness(); g.tracker.consent(true); g.win.navigator.globalPrivacyControl=true; g.tracker.view(2499); assert.equal(g.events().length,0);
});
test('returning to the page does not inject or initialize the library twice', () => {
  const h=harness(); h.tracker.consent(true); h.tracker.consent(false);
  const second=createPeaceTracker(h.win,h.doc); second.consent(true); second.view(2499);
  assert.equal(h.scripts.length,1); assert.equal(h.win.fbq.queue.filter((a:any[])=>a[0]==='init').length,1);
});
test('StrictMode cleanup before the script loads does not lose allowed events', () => {
  const h=harness(); h.tracker.consent(true); h.tracker.view(2499);
  h.tracker.consent(false); h.tracker.consent(true); h.tracker.view(2499);
  assert.equal(h.scripts.length,1);
  assert.deepEqual(h.events().map((a:any[])=>a[2]),['PageView','ViewContent']);
});
