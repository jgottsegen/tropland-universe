import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, message, source = 'Contact Page' } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    await resend.emails.send({
      from: 'Tropland Universe <noreply@troplanduniverse.com>',
      to: 'partnerships@troplanduniverse.com',
      replyTo: email,
      subject: `New inquiry from ${name} — Tropland Universe`,
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background:#0D0A1A;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0D0A1A;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="padding:0 0 32px 0;">
              <p style="margin:0;font-size:11px;font-weight:700;letter-spacing:0.25em;text-transform:uppercase;color:#E85D3A;">
                Tropland Universe
              </p>
            </td>
          </tr>

          <!-- Title -->
          <tr>
            <td style="padding:0 0 32px 0;border-bottom:1px solid #2A2040;">
              <h1 style="margin:0;font-size:32px;font-weight:400;color:#F0ECE4;line-height:1.2;">
                New inquiry from <em style="color:#E85D3A;">${name}</em>
              </h1>
              <p style="margin:12px 0 0;font-size:13px;color:#888;letter-spacing:0.05em;">
                Via ${source} · troplanduniverse.com
              </p>
            </td>
          </tr>

          <!-- Details -->
          <tr>
            <td style="padding:32px 0;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:0 0 20px 0;">
                    <p style="margin:0 0 6px;font-size:10px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:#666;">From</p>
                    <p style="margin:0;font-size:15px;color:#F0ECE4;">${name}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:0 0 20px 0;">
                    <p style="margin:0 0 6px;font-size:10px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:#666;">Reply To</p>
                    <a href="mailto:${email}" style="margin:0;font-size:15px;color:#E85D3A;text-decoration:none;">${email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding:0 0 8px 0;">
                    <p style="margin:0 0 12px;font-size:10px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:#666;">Message</p>
                    <div style="background:#1B0E36;border-left:3px solid #E85D3A;border-radius:4px;padding:20px 24px;">
                      <p style="margin:0;font-size:15px;color:#F0ECE4;line-height:1.7;white-space:pre-wrap;">${message}</p>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td style="padding:0 0 40px 0;">
              <a href="mailto:${email}" style="display:inline-block;background:#E85D3A;color:#fff;text-decoration:none;font-size:13px;font-weight:700;letter-spacing:0.08em;padding:14px 28px;border-radius:100px;">
                Reply to ${name}
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:24px 0 0;border-top:1px solid #2A2040;">
              <p style="margin:0;font-size:11px;color:#444;line-height:1.6;">
                This message was submitted through troplanduniverse.com
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Resend error:', error);
    return res.status(500).json({ error: 'Failed to send email' });
  }
}
