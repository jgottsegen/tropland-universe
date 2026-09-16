// Messaging crawlers read the initial HTML without running React/Helmet.
// Keep the same app assets, but serve Peace's metadata before JavaScript runs.
import { readFile, writeFile, access } from 'node:fs/promises';
const metadata = JSON.parse(await readFile(new URL('../config/peace-metadata.json', import.meta.url), 'utf8'));
const dist = new URL('../dist/', import.meta.url);
const escape = value => String(value).replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const meta = (attribute, key, value) => `  <meta data-rh="true" ${attribute}="${key}" content="${escape(value)}" />`;
let html = await readFile(new URL('index.html', dist), 'utf8');
html = html.replace(/<title>[^<]*<\/title>/, `<title>${escape(metadata.title)}</title>`)
  .replace(/\s*<meta\b[^>]*(?:name="(?:description|twitter:[^"]+)"|property="og:[^"]+")[^>]*>/g, '');
const tags = [
  meta('name', 'description', metadata.description),
  `  <link data-rh="true" rel="canonical" href="${escape(metadata.url)}" />`,
  ...Object.entries({ 'site_name':'Tropland Universe™', type:'website', title:metadata.title, description:metadata.description, url:metadata.url, image:metadata.image, 'image:width':metadata.imageWidth, 'image:height':metadata.imageHeight, 'image:alt':metadata.imageAlt }).map(([key,value])=>meta('property',`og:${key}`,value)),
  ...Object.entries({card:'summary_large_image',site:'@troplanduniverse',title:metadata.title,description:metadata.description,image:metadata.image,'image:alt':metadata.imageAlt}).map(([key,value])=>meta('name',`twitter:${key}`,value))
].join('\n');
html = html.replace('</head>', `${tags}\n</head>`);
await access(new URL(`.${new URL(metadata.image).pathname}`, dist));
await writeFile(new URL('peace.html', dist), html);
console.log('Built Peace HTML with crawler-readable title, description and shirt image.');
