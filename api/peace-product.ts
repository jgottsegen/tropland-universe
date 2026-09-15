import type { VercelRequest, VercelResponse } from '@vercel/node';
import { fetchCatalog } from '../server/peace-catalog.mjs';
export default async function handler(req: VercelRequest,res: VercelResponse) {
 if(req.method!=='GET') return res.status(405).json({error:'Method not allowed'});
 try {
  const catalog=await fetchCatalog();
  res.setHeader('Cache-Control','public, s-maxage=60, stale-while-revalidate=60');
  return res.status(200).json({...catalog,checkoutEnabled:process.env.PEACE_CHECKOUT_ENABLED==='true'});
 } catch {res.setHeader('Cache-Control','no-store');return res.status(503).json({error:'Current options are temporarily unavailable. Please try again.'});}
}
