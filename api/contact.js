// Vercel serverless function — emails contact-form submissions via Resend.
// Requires the environment variable RESEND_API_KEY (set in the Vercel dashboard).

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch (e) { body = {}; }
  }
  body = body || {};

  const clean = (v) => (v == null ? '' : String(v)).trim();
  const fullName = clean(body.fullName);
  const phone = clean(body.phone);
  const email = clean(body.email);
  const mcdot = clean(body.mcdot);
  const equipment = clean(body.equipment);
  const notes = clean(body.notes);

  if (!fullName || !phone) {
    return res.status(400).json({ error: 'Name and phone are required.' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Email service is not configured.' });
  }

  const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const row = (label, val) => val
    ? `<tr><td style="padding:6px 16px 6px 0;font-weight:700;color:#0a1526;white-space:nowrap;">${label}</td><td style="padding:6px 0;color:#333;">${esc(val)}</td></tr>`
    : '';

  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;">
      <h2 style="color:#cf1f2e;margin:0 0 4px;">New Dispatch Sign-Up</h2>
      <p style="color:#555;margin:0 0 18px;">A new lead came in from usafreightdispatch.com</p>
      <table style="border-collapse:collapse;font-size:15px;">
        ${row('Name', fullName)}
        ${row('Phone', phone)}
        ${row('Email', email)}
        ${row('MC / DOT', mcdot)}
        ${row('Equipment', equipment)}
        ${row('Notes', notes)}
      </table>
    </div>`;

  const text = [
    'New Dispatch Sign-Up',
    'Name: ' + fullName,
    'Phone: ' + phone,
    email ? 'Email: ' + email : null,
    mcdot ? 'MC / DOT: ' + mcdot : null,
    equipment ? 'Equipment: ' + equipment : null,
    notes ? 'Notes: ' + notes : null,
  ].filter(Boolean).join('\n');

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'USA Freight Dispatch <dispatch@usafreightdispatch.com>',
        to: ['chad.lamothe@gmail.com'],
        reply_to: email || undefined,
        subject: 'New sign-up: ' + fullName,
        html: html,
        text: text,
      }),
    });

    if (!r.ok) {
      const detail = await r.text();
      return res.status(502).json({ error: 'Failed to send email.', detail: detail });
    }
    return res.status(200).json({ ok: true });
  } catch (e) {
    return res.status(500).json({ error: 'Failed to send email.' });
  }
}
