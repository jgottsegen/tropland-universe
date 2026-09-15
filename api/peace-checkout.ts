import type { VercelRequest, VercelResponse } from '@vercel/node';
import { checkoutSelection,fetchCatalog } from '../server/peace-catalog.mjs';
export default async function handler(req: VercelRequest,res: VercelResponse) {
 res.setHeader('Cache-Control','no-store');
 if(req.method!=='POST') return res.status(405).json({error:'Method not allowed'});
 // Enable only after the domain, published shop and final product have been reviewed.
 if(process.env.PEACE_CHECKOUT_ENABLED!=='true') return res.status(409).json({code:'PREVIEW_ONLY',error:'Checkout is not open yet. Your selection has not been ordered.'});
 try {
  const catalog=await fetchCatalog();
  const result=checkoutSelection(catalog,req.body);
  return res.status(200).json({url:result.url});
 } catch(error) {
  return res.status(409).json({error:error instanceof Error?error.message:'Unable to start checkout. Please try again.'});
 }
}
