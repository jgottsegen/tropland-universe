/** Public catalog adapter: official Fourthwall Merchant Center feed, no secrets. */
export const SHOP_ORIGIN = 'https://josh-wdt-shop.fourthwall.com';
export const PRODUCT_PATH = '/products/lion-peace-sign-tee-2';
export const PRODUCT_ID = 'c3e99d89-7657-4db5-aa95-669da6f8e604';
export const CHECKOUT_ORIGIN = 'https://checkout.troplanduniverse.com';
export const FEED_URL = `${SHOP_ORIGIN}/.well-known/merchant-center/rss.xml`;
const UUID = /^[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}$/i;
export const COLOR_MAP = {Black:'#181818',White:'#f4f4f2',Army:'#646045',Navy:'#252b38',Charcoal:'#4e5050',Coal:'#343635',Bone:'#ded8c9',Ecru:'#e5ddc6',Natural:'#efe8d4','Petrol Blue':'#34505a'};
const sizes = ['XS','S','M','L','XL','2XL','3XL'];
const decode = s => s.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1').replace(/&(?:amp|lt|gt|quot|apos|#\d+|#x[\da-f]+);/gi, e => {
 const known = {'&amp;':'&','&lt;':'<','&gt;':'>','&quot;':'"','&apos;':"'"};
 if(known[e]) return known[e];
 const n = e.startsWith('&#x') ? parseInt(e.slice(3,-1),16) : parseInt(e.slice(2,-1),10);
 return Number.isFinite(n) && n>0 && n<=0x10ffff ? String.fromCodePoint(n) : '';
}).trim();
const field = (xml,key) => decode(xml.match(new RegExp(`<g:${key}>([\\s\\S]*?)<\\/g:${key}>`))?.[1] || '');
export function parseCatalog(xml, now = new Date().toISOString()) {
 if(typeof xml!=='string'||xml.length>2_000_000||/<!DOCTYPE|<!ENTITY/i.test(xml)||!xml.includes('<rss')) throw new Error('Invalid catalog response');
 const variants=[];
 for(const match of xml.matchAll(/<item>([\s\S]*?)<\/item>/g)) {
  const item=match[1]; if(field(item,'item_group_id')!==PRODUCT_ID) continue;
  const id=field(item,'id'),color=field(item,'color'),size=field(item,'size');
  const amount=field(item,'price').match(/^(\d+)\.(\d{2}) USD$/);
  const image=field(item,'image_link'), link=field(item,'link');
  if(!UUID.test(id)||!Object.hasOwn(COLOR_MAP,color)||!sizes.includes(size)||!amount) throw new Error('Unexpected product variant');
  const imageUrl=new URL(image);
  if(imageUrl.protocol!=='https:'||imageUrl.hostname!=='imgproxy.fourthwall.dev'||![SHOP_ORIGIN+PRODUCT_PATH,CHECKOUT_ORIGIN+PRODUCT_PATH].includes(link)) throw new Error('Unexpected product destination');
  const priceCents=Number(amount[1])*100+Number(amount[2]);
  if(priceCents<=0||priceCents>100000) throw new Error('Unexpected product price');
  if(variants.some(v=>v.id===id||(v.color===color&&v.size===size))) throw new Error('Duplicate product variant');
  variants.push({id,color,size,priceCents,currency:'USD',available:field(item,'availability')==='in stock',image});
 }
 if(!variants.length) throw new Error('The Peace Lion Shirt is unavailable');
 const colors=Object.entries(COLOR_MAP).filter(([name])=>variants.some(v=>v.color===name)).map(([name,swatch])=>({name,swatch,image:variants.find(v=>v.color===name).image}));
 return {productId:PRODUCT_ID,productPath:PRODUCT_PATH,productName:'Peace Lion Tee',checkedAt:now,colors,sizes:sizes.filter(size=>variants.some(v=>v.size===size)),variants};
}
// Public storefront token: read-only catalog access, designed for storefront use.
const storefrontToken=()=>process.env.FOURTHWALL_STOREFRONT_TOKEN;
export function parseStorefront(product,now=new Date().toISOString()) {
 if(product?.id!==PRODUCT_ID||product?.access?.type!=='PUBLIC'||!Array.isArray(product.variants))throw new Error('Unexpected product');
 const variants=product.variants.map(v=>{
  const color=v.attributes?.color?.name,size=v.attributes?.size?.name;
  const priceCents=Math.round(v.unitPrice?.value*100);
  if(!UUID.test(v.id)||!Object.hasOwn(COLOR_MAP,color)||!sizes.includes(size)||v.unitPrice?.currency!=='USD'||!Number.isSafeInteger(priceCents)||priceCents<=0||priceCents>100000)throw new Error('Unexpected product variant');
  const images=(v.images||[]).map(image=>{
   const url=new URL(image.url);
   if(url.protocol!=='https:'||url.hostname!=='imgproxy.fourthwall.dev')throw new Error('Unexpected image destination');
   return {url:url.href,width:image.width,height:image.height};
  });
  if(!images.length)throw new Error('Missing product mockups');
  return {id:v.id,color,size,priceCents,currency:'USD',available:product.state?.type==='AVAILABLE'&&(v.stock?.type==='UNLIMITED'||v.stock?.type==='LIMITED'&&v.stock.inStock>0),image:images[0].url,images};
 });
 if(!variants.length||new Set(variants.map(v=>v.id)).size!==variants.length)throw new Error('Invalid product variants');
 const colors=Object.entries(COLOR_MAP).filter(([name])=>variants.some(v=>v.color===name)).map(([name,swatch])=>{const v=variants.find(v=>v.color===name);return {name,swatch,image:v.image,images:v.images};});
 return {productId:PRODUCT_ID,productPath:PRODUCT_PATH,productName:'Peace Lion Tee',checkedAt:now,colors,sizes:sizes.filter(size=>variants.some(v=>v.size===size)),variants:variants.map(({images,...variant})=>variant)};
}
export async function fetchCatalog(fetcher=fetch) {
 if(!storefrontToken())throw new Error('Storefront connection is not configured');
 const response=await fetcher(`https://storefront-api.fourthwall.com/v1/products/lion-peace-sign-tee-2?storefront_token=${encodeURIComponent(storefrontToken())}`,{signal:AbortSignal.timeout(10000),headers:{Accept:'application/json'}});
 if(!response.ok)throw new Error('The shop catalog is unavailable');
 return parseStorefront(await response.json());
}
export function checkoutSelection(catalog,input) {
 if(!input||typeof input.variantId!=='string'||!UUID.test(input.variantId)) throw new Error('Choose a size and color.');
 if(!Number.isInteger(input.quantity)||input.quantity<1||input.quantity>10) throw new Error('Choose a quantity from 1 to 10.');
 const variant=catalog.variants.find(v=>v.id===input.variantId&&v.available);
 if(!variant) throw new Error('That size and color is no longer available.');
 if(input.expectedPriceCents!==variant.priceCents) throw new Error('The price changed. Refresh the page and review the new price.');
 const url=new URL('/cart/checkout',CHECKOUT_ORIGIN);
 url.searchParams.set('products',`${variant.id}:${input.quantity}`);url.searchParams.set('currency','USD');
 return {url:url.href,variant,quantity:input.quantity,totalCents:variant.priceCents*input.quantity};
}
