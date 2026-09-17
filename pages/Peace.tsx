import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import snapshot from '../config/peace-catalog.json';
import metadata from '../config/peace-metadata.json';
import PeaceAdsPrivacy, {hasPrivacySignal} from '../components/PeaceAdsPrivacy';
import {checkoutWithAttribution} from '../lib/peace-tracking';
import '../css/peace.css';

type Variant = {id:string;color:string;size:string;priceCents:number;available:boolean;image:string};
type Catalog = {colors:{name:string;swatch:string;image:string;localImage?:string;images?:{url:string;width:number;height:number}[]}[];sizes:string[];variants:Variant[];checkoutEnabled?:boolean;checkedAt:string};
const money=(cents:number)=>new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(cents/100);
const guide=[['S',28,18.5],['M',29.5,20.5],['L',31,22.25],['XL',32.25,24],['2XL',33,25.25],['3XL',33.5,26.75]];

export default function Peace({reviewMode=false,assetBase='/images/peace/'}:{reviewMode?:boolean;assetBase?:string}) {
 const [catalog,setCatalog]=useState<Catalog>(snapshot);
 const [color,setColor]=useState('Black'); const [size,setSize]=useState('');
 const [view,setView]=useState<'shirt'|'detail'>('shirt'); const [imageIndex,setImageIndex]=useState(0); const [qty,setQty]=useState(1);
 const adsAllowed=useRef(false);
 const setAdsAllowed=useCallback((allowed:boolean)=>{adsAllowed.current=allowed;},[]);
 const [busy,setBusy]=useState(false); const [error,setError]=useState('');
 const [liveState,setLiveState]=useState<'loading'|'ready'|'error'>(reviewMode?'ready':'loading');
 const [unit,setUnit]=useState<'in'|'cm'>('in');
 const sizeDialog=useRef<HTMLDialogElement>(null),checkoutDialog=useRef<HTMLDialogElement>(null);
 const sizeGroup=useRef<HTMLFieldSetElement>(null);
 const purchaseControls=useRef<HTMLDivElement>(null);
 const [showStickyBuy,setShowStickyBuy]=useState(false);
 useEffect(()=>{
  const controls=purchaseControls.current;if(!controls)return;
  const observer=new IntersectionObserver(([entry])=>setShowStickyBuy(entry.boundingClientRect.bottom<0),{threshold:0});
  observer.observe(controls);return()=>observer.disconnect();
 },[]);
 const selected=catalog.variants.find(v=>v.color===color&&v.size===size);
 const activeColor=catalog.colors.find(c=>c.name===color)||catalog.colors[0];
 const fromPrice=Math.min(...catalog.variants.filter(v=>v.color===color).map(v=>v.priceCents));
 const price=selected?.priceCents??fromPrice;
 const gallery=activeColor.images?.length?activeColor.images:[{url:activeColor.image,width:720,height:960}];
 const image=gallery[Math.min(imageIndex,gallery.length-1)].url;
 const isPreview=reviewMode;
 const checkoutPending=!reviewMode&&liveState==='ready'&&catalog.checkoutEnabled!==true;
 useEffect(()=>{
  if(reviewMode)return;
  const controller=new AbortController();
  fetch('/api/peace-product',{signal:controller.signal}).then(async response=>{
   if(!response.ok)throw new Error('Unable to load current options');
   const data=await response.json();
   if(!Array.isArray(data.variants)||!data.variants.length||!Array.isArray(data.colors)||!Array.isArray(data.sizes))throw new Error('Invalid catalog');
   setCatalog(data);setColor(current=>data.colors.some((c:any)=>c.name===current)?current:data.colors[0].name);setLiveState('ready');
  }).catch(e=>{if(e.name!=='AbortError')setLiveState('error');});
  return()=>controller.abort();
 },[reviewMode]);
 const chooseColor=(next:string)=>{setColor(next);setView('shirt');setImageIndex(0);setError('');if(size&&!catalog.variants.some(v=>v.color===next&&v.size===size&&v.available))setSize('');};
 async function buy(){
  if(!size||!selected){setError('Choose your size to continue.');sizeGroup.current?.scrollIntoView({behavior:'smooth',block:'center'});sizeGroup.current?.querySelector<HTMLButtonElement>('button:not(:disabled)')?.focus();return;}
  if(!selected.available){setError('This size and color is unavailable. Please choose another.');return;}
  if(liveState==='error'){setError('We couldn’t confirm current availability. Please reload and try again.');return;}
  if(isPreview){checkoutDialog.current?.showModal();return;}
  if(catalog.checkoutEnabled!==true){setError('Checkout is opening soon. Please check back shortly.');return;}
  setBusy(true);setError('');
  try{
   const response=await fetch('/api/peace-checkout',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({variantId:selected.id,quantity:qty,expectedPriceCents:selected.priceCents})});
   const data=await response.json();if(!response.ok)throw new Error(data.error||'Unable to open checkout.');
   const destination=checkoutWithAttribution(data.url,window.location.href,adsAllowed.current&&!hasPrivacySignal());
   window.location.assign(destination);
  }catch(e){setError(e instanceof Error?e.message:'Unable to open checkout. Please try again.');setBusy(false);}
 }
 useEffect(()=>{
  const context=(document as any).modelContext;if(!context?.registerTool)return;
  const lifecycle=new AbortController();
  const tools=[
   {name:'get_peace_lion_options',title:'Read Peace Lion options',description:'Read available colors, sizes, prices and current selection. Does not start checkout.',inputSchema:{type:'object',properties:{},additionalProperties:false},annotations:{readOnlyHint:true},execute:()=>({color,size,quantity:qty,preview:isPreview,variants:catalog.variants.map(({id,color,size,priceCents,available})=>({id,color,size,priceCents,available}))})},
   {name:'select_peace_lion',title:'Select a Peace Lion shirt',description:'Stage a color, size and quantity in the visible product form. Does not purchase or navigate.',inputSchema:{type:'object',properties:{color:{type:'string'},size:{type:'string'},quantity:{type:'integer',minimum:1,maximum:10}},required:['color','size','quantity'],additionalProperties:false},annotations:{readOnlyHint:false},execute:async(input:any)=>{
    const v=catalog.variants.find(v=>v.color===input?.color&&v.size===input?.size&&v.available);
    if(!v||!Number.isInteger(input?.quantity)||input.quantity<1||input.quantity>10)throw new Error('Choose an available color, size and quantity.');
    setColor(input.color);setSize(input.size);setQty(input.quantity);setView('shirt');setImageIndex(0);setError('');
    await new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));
    return {color:input.color,size:input.size,quantity:input.quantity,totalCents:v.priceCents*input.quantity};
   }}
  ];
  tools.forEach(tool=>{try{Promise.resolve(context.registerTool(tool,{signal:lifecycle.signal})).catch(()=>{});}catch{}});
  return()=>lifecycle.abort();
 },[catalog,color,size,qty,isPreview]);
 return <div className="peace-page">
  <Helmet>
   <title>{metadata.title}</title>
   <meta name="description" content={metadata.description}/>
   <meta name="robots" content={reviewMode?"noindex, nofollow":"index, follow"}/>
   <link rel="canonical" href={metadata.url}/>
   <meta property="og:site_name" content="Tropland Universe™"/>
   <meta property="og:type" content="website"/>
   <meta property="og:title" content={metadata.title}/>
   <meta property="og:description" content={metadata.description}/>
   <meta property="og:url" content={metadata.url}/>
   <meta property="og:image" content={metadata.image}/>
   <meta property="og:image:width" content={String(metadata.imageWidth)}/>
   <meta property="og:image:height" content={String(metadata.imageHeight)}/>
   <meta property="og:image:alt" content={metadata.imageAlt}/>
   <meta name="twitter:card" content="summary_large_image"/>
   <meta name="twitter:site" content="@troplanduniverse"/>
   <meta name="twitter:title" content={metadata.title}/>
   <meta name="twitter:description" content={metadata.description}/>
   <meta name="twitter:image" content={metadata.image}/>
   <meta name="twitter:image:alt" content={metadata.imageAlt}/>
  </Helmet>
  <a className="peace-skip" href="#peace-main">Skip to shirt</a>
  {reviewMode&&<div className="peace-review-note">Review preview <span>Explore colors, sizes and checkout. Purchases are not enabled.</span></div>}
  <header className="peace-header"><a href="https://www.troplanduniverse.com/" aria-label="Tropland Universe home"><img src={`${assetBase}tropland-horizontal-white.svg`} alt="Tropland Universe" width="310" height="53"/></a><span>The Digital Animal Kingdom</span><a className="peace-header-link" href="#peace-buy">Find your color <span aria-hidden="true">↘</span></a></header>
  <main id="peace-main">
   <div className="peace-mobile-heading"><p>A little wild.<br/><em>A lot of peace.</em></p></div>
   <section className="peace-hero" aria-labelledby="peace-title">
    <div className="peace-gallery">
     <div className="peace-image-wrap"><span className="peace-image-label">{view==='shirt'?`${color} / View ${imageIndex+1} of ${gallery.length}`:'The signed artwork'}</span>
      <img className={view==='shirt'?'peace-shirt-image':'peace-art-image'} src={view==='shirt'?image:`${assetBase}lion-signed-brown.webp`} alt={view==='shirt'?`Peace Lion Tee in ${color}, product mockup ${imageIndex+1} of ${gallery.length}`:'Close view of the original lion illustration and curved artist signature'} width={view==='shirt'?720:1400} height={view==='shirt'?960:1763} fetchPriority="high"/>
     </div>
     <div className="peace-gallery-bottom"><details className="peace-gallery-details"><summary>View all photos</summary><div className="peace-thumbnails">{gallery.map((photo,index)=><button type="button" key={photo.url} aria-label={`Show ${color} mockup ${index+1}`} aria-pressed={view==='shirt'&&imageIndex===index} onClick={()=>{setImageIndex(index);setView('shirt');}}><img src={photo.url} alt="" width="48" height="64" loading="lazy"/></button>)}<button type="button" aria-label="Show artwork detail" aria-pressed={view==='detail'} onClick={()=>setView('detail')}><img src={`${assetBase}lion-signed-brown.webp`} alt="" width="48" height="60"/></button></div></details><p>Screen colors may vary.</p></div>
    </div>
    <div className="peace-product" id="peace-buy">
     <p className="peace-eyebrow">Tropland Universe / Wearable art</p><h1 id="peace-title">Peace Lion Tee</h1><p className="peace-headline">A little wild.<br/><em>A lot of peace.</em></p>
     <div className="peace-price" aria-live="polite">{!size&&<span>From </span>}{money(price)} <small>USD</small></div>
     <p className="peace-description">The king of the jungle, keeping it peaceful. Golden detail and a subtle artist’s signature on an everyday cotton tee.</p>
     <ul className="peace-benefits"><li>100% combed cotton</li><li>Regular unisex fit</li><li>5.3 oz fabric</li></ul>
     <fieldset className="peace-colors"><legend>Color <strong>{color}</strong></legend><div className="peace-swatch-list">{catalog.colors.map(c=><button type="button" key={c.name} title={c.name} aria-label={c.name} aria-pressed={color===c.name} onClick={()=>chooseColor(c.name)} style={{'--swatch':c.swatch} as React.CSSProperties}><span/>{color===c.name&&<span className="peace-selected-dot"/>}</button>)}</div></fieldset>
     <fieldset className="peace-sizes" ref={sizeGroup}><legend>Size <strong>{size||'Select your size'}</strong></legend><button className="peace-size-guide" type="button" onClick={()=>sizeDialog.current?.showModal()}>Size guide</button><div className="peace-size-list">{catalog.sizes.map(s=>{const available=catalog.variants.some(v=>v.color===color&&v.size===s&&v.available);return <button type="button" key={s} disabled={!available} aria-pressed={size===s} aria-label={`Size ${s}${available?'':' unavailable'}`} onClick={()=>{setSize(s);setError('');}}>{s}</button>;})}</div></fieldset>
     <div className="peace-buy-row" ref={purchaseControls}><label className="peace-quantity">Qty<select aria-label="Quantity" value={qty} onChange={e=>setQty(Number(e.target.value))}>{Array.from({length:10},(_,i)=><option key={i+1} value={i+1}>{i+1}</option>)}</select></label><button type="button" className="peace-button" onClick={buy} disabled={busy||liveState==='loading'||checkoutPending}>{busy?'Opening checkout…':liveState==='loading'?'Checking availability…':checkoutPending?'Checkout opening soon':`Buy the Peace Lion${size?` · ${money(price*qty)}`:''}`}<span aria-hidden="true">↗︎</span></button></div>
     <p className="peace-form-error" role="alert">{error||(liveState==='error'?'Current options could not be refreshed. Reload before ordering.':'')}</p>
     <p className="peace-delivery">{checkoutPending&&<>Checkout is being connected. Please check back shortly.<br/></>}Made to order. Shipping and taxes calculated at checkout.</p><div className="peace-trust"><span>Secure checkout</span><span>Made to order</span></div>
    </div>
   </section>
   <section className="peace-story" aria-labelledby="peace-story-title"><div className="peace-story-art"><img src={`${assetBase}lion-signed-gold.webp`} alt="The golden lion peace illustration, with a small signature below its lower-right edge" width="1400" height="1763" loading="lazy"/></div><div><p className="peace-eyebrow">Art with a point of view</p><h2 id="peace-story-title">Serious face.<br/><em>Good intentions.</em></h2><p>A lion. A peace sign. A reminder to move through the world with a little more calm—and plenty of character.</p><p>Fine linework, warm gold and an artist’s signature make this a piece to look closer at. The AS Colour tee keeps the rest simple: combed cotton, a classic crew neck and a regular fit.</p><a href="#peace-buy">Choose your color <span aria-hidden="true">↑</span></a></div></section>
   <section className="peace-color-story" aria-labelledby="peace-color-title"><div className="peace-section-heading"><div><p className="peace-eyebrow">Make it yours</p><h2 id="peace-color-title">Same peace. Your color.</h2></div><span>{catalog.colors.length} ways to wear it</span></div><div className="peace-color-grid">{['Black','White','Army'].filter(name=>catalog.colors.some(c=>c.name===name)).map(name=><button type="button" key={name} onClick={()=>{chooseColor(name);document.getElementById('peace-buy')?.scrollIntoView({behavior:'smooth'});}}><img src={reviewMode?`${assetBase}mockup-${name.toLowerCase()}.jpg`:catalog.colors.find(c=>c.name===name)?.image} alt={`Peace Lion Tee in ${name}`} loading="lazy" width="720" height="960"/><span>{name}<span aria-hidden="true">↗︎</span></span></button>)}</div></section>
   <section className="peace-faq" aria-labelledby="peace-faq-title"><div><p className="peace-eyebrow">The details</p><h2 id="peace-faq-title">Good to know.</h2></div><div><details open><summary>How does it fit?</summary><p>The AS Colour 5001T has a regular, unisex fit, with a crew neck and side-seamed construction. Compare the garment measurements with a tee you already like. <button type="button" onClick={()=>sizeDialog.current?.showModal()}>Open the size guide</button>.</p></details><details><summary>What is the shirt made from?</summary><p>100% combed cotton in the listed colors, with 5.3 oz fabric. It is pre-shrunk, with a ribbed collar and double-needle stitching at the sleeves and hem.</p></details><details><summary>How is the artwork printed?</summary><p>The lion and curved signature are printed directly onto the garment using DTG printing. The mockup changes when you choose a color, so you can see the design against your selected shirt.</p></details><details><summary>When will my shirt arrive?</summary><p>Each shirt is made to order. Shipping choices, charges and the delivery estimate for your address are shown at checkout before you pay.</p></details></div></section>
  </main>
  <footer className="peace-footer"><img src={`${assetBase}tropland-horizontal-white.svg`} alt="Tropland Universe" width="270" height="46"/><span>The Digital Animal Kingdom</span><a href="https://www.troplanduniverse.com/">Explore the universe ↗︎</a><PeaceAdsPrivacy reviewMode={reviewMode} priceCents={liveState==='ready'?fromPrice:undefined} onConsent={setAdsAllowed}/></footer>
  <div className={`peace-mobile-buy${showStickyBuy?' is-visible':''}`}><div><strong>{money(price*qty)}</strong><span>{color}{size?` / ${size}`:' / Choose a size'}</span></div><button type="button" className="peace-button" disabled={busy||liveState==='loading'||checkoutPending} onClick={buy}>{busy?'Opening…':checkoutPending?'Opening soon':'Get yours'} <span aria-hidden="true">↗︎</span></button></div>
  <dialog className="peace-dialog" ref={sizeDialog} aria-labelledby="peace-size-title"><button className="peace-close" type="button" aria-label="Close size guide" onClick={()=>sizeDialog.current?.close()}>×</button><p className="peace-eyebrow">AS Colour 5001T</p><h2 id="peace-size-title">Find your fit.</h2><p>Measure a tee you already love, laid flat. Compare its length and width below.</p><div className="peace-unit-toggle"><button type="button" aria-pressed={unit==='in'} onClick={()=>setUnit('in')}>Inches</button><button type="button" aria-pressed={unit==='cm'} onClick={()=>setUnit('cm')}>Centimeters</button></div><table><thead><tr><th>Size</th><th>Length ({unit})</th><th>Width ({unit})</th></tr></thead><tbody>{guide.map(([s,l,w])=><tr key={s}><th>{s}</th><td>{unit==='in'?l:(Number(l)*2.54).toFixed(1)}</td><td>{unit==='in'?w:(Number(w)*2.54).toFixed(1)}</td></tr>)}</tbody></table><p className="peace-size-note">XS is available, but Fourthwall’s current size guide does not list its measurements. Garment measurements may vary by up to 2 in / 5 cm.</p><p className="peace-size-note"><strong>Length:</strong> highest point beside the collar to the hem.<br/><strong>Width:</strong> straight across, from underarm seam to underarm seam.</p></dialog>
  <dialog className="peace-dialog" ref={checkoutDialog} aria-labelledby="peace-checkout-title"><button className="peace-close" type="button" aria-label="Close checkout preview" onClick={()=>checkoutDialog.current?.close()}>×</button><p className="peace-eyebrow">Review preview</p><h2 id="peace-checkout-title">Your Peace Lion.</h2><div className="peace-order-preview"><img src={image} alt={`${color} shirt`} width="110" height="147"/><div><strong>Peace Lion Tee</strong><p>{color} / {size}<br/>Quantity {qty}</p><strong>{money(price*qty)} USD</strong></div></div><p>The selected shirt is ready for the checkout connection. No order has been placed.</p><p className="peace-checkout-address">Planned checkout<br/><strong>checkout.troplanduniverse.com</strong></p><p className="peace-size-note">Purchases open after the branded checkout domain and shop launch are confirmed. Shipping and taxes are calculated there.</p><button type="button" className="peace-button" onClick={()=>checkoutDialog.current?.close()}>Back to the shirt</button></dialog>
 </div>;
}
