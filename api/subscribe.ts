import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const AUDIENCE_NAME = 'Tropland Kingdom';
let cachedAudienceId: string | null = null;

/* Find-or-create the audience by name so no new env var is needed. */
async function getAudienceId(): Promise<string | null> {
  if (cachedAudienceId) return cachedAudienceId;
  const list = await resend.audiences.list();
  const existing = list.data?.data?.find((a) => a.name === AUDIENCE_NAME);
  if (existing) {
    cachedAudienceId = existing.id;
    return cachedAudienceId;
  }
  const created = await resend.audiences.create({ name: AUDIENCE_NAME });
  cachedAudienceId = created.data?.id ?? null;
  return cachedAudienceId;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body ?? {};
  if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Valid email required' });
  }

  try {
    const audienceId = await getAudienceId();
    if (!audienceId) throw new Error('audience unavailable');

    await resend.contacts.create({ audienceId, email, unsubscribed: false });

    // Welcome email with the pack, so the wallpapers survive the browser tab.
    await resend.emails.send({
      from: 'Tropland Universe <noreply@troplanduniverse.com>',
      to: email,
      subject: 'Welcome to the Kingdom. Your wallpapers are inside.',
      html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#111009;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#111009;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
        <tr><td style="padding:0 0 28px 0;">
          <p style="margin:0;font-size:11px;font-weight:700;letter-spacing:0.25em;text-transform:uppercase;color:#FF4D1C;">Tropland Universe</p>
        </td></tr>
        <tr><td style="padding:0 0 24px 0;">
          <h1 style="margin:0;font-size:30px;font-weight:400;color:#F2EEE6;line-height:1.25;">Welcome to the <em style="color:#FF4D1C;">Kingdom.</em></h1>
        </td></tr>
        <tr><td style="padding:0 0 28px 0;">
          <p style="margin:0;font-size:15px;line-height:1.7;color:#B8B2A6;">
            Six wallpapers from the world's favorite moments: the peace sign, the heart,
            the pride at golden hour, and three from the Circus, including the lion
            in the center ring. Save them straight to your phone.
          </p>
        </td></tr>
        <tr><td style="padding:0 0 36px 0;">
          <a href="https://troplanduniverse.com/wallpapers/tropland-wallpaper-pack.zip"
             style="display:inline-block;background:#FF4D1C;color:#111009;font-size:14px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;text-decoration:none;padding:16px 32px;">
            Download the pack
          </a>
        </td></tr>
        <tr><td style="padding:28px 0;border-top:1px solid #2A2620;">
          <p style="margin:0 0 6px 0;font-size:11px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:#FF4D1C;">This was a taste</p>
          <p style="margin:0 0 16px 0;font-size:14px;line-height:1.7;color:#B8B2A6;">
            The Inner Kingdom drops a new wallpaper pack every week, keeps the
            Lost Acts the feed never sees, and votes on which Circus act goes public next.
          </p>
          <a href="https://patreon.com/troplanduniverse" style="display:inline-block;border:1px solid #FF4D1C;color:#FF4D1C;font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;text-decoration:none;padding:12px 24px;">
            Enter the Inner Kingdom
          </a>
        </td></tr>
        <tr><td style="padding:24px 0 0 0;border-top:1px solid #2A2620;">
          <p style="margin:0;font-size:12px;line-height:1.7;color:#6E695E;">
            You are on the list for new drops before the feed gets them.
            The feed never sleeps: <a href="https://instagram.com/troplanduniverse" style="color:#FF4D1C;text-decoration:none;">@troplanduniverse</a>
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`,
    });

    // Signup ping to the studio; fire-and-forget so it never blocks the fan.
    resend.emails
      .send({
        from: 'Tropland Universe <noreply@troplanduniverse.com>',
        to: 'partnerships@troplanduniverse.com',
        subject: `New Kingdom member: ${email}`,
        text: `${email} joined the Tropland Kingdom list.\n\nFull list: https://resend.com/audiences`,
      })
      .catch(() => {});

    return res.status(200).json({ ok: true });
  } catch (err) {
    // Duplicate contacts are a success from the visitor's point of view.
    const msg = err instanceof Error ? err.message : '';
    if (msg.toLowerCase().includes('already')) {
      return res.status(200).json({ ok: true });
    }
    return res.status(500).json({ error: 'Subscription failed' });
  }
}
