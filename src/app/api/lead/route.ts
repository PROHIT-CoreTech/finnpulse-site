import { NextResponse } from 'next/server';

/**
 * ---------------------------------------------------------------------------
 * LEAD HANDLER — STUB
 * ---------------------------------------------------------------------------
 * Receives submissions from the contact form and the CFO Readiness Test gate.
 * Currently logs the payload and returns 200 so the form is fully testable.
 *
 * TO GO LIVE, replace the body of POST() with one of:
 *   • a fetch() to the CRM webhook (Zoho / HubSpot / Salesforce)
 *   • a transactional email send (Resend / SendGrid / SES)
 *   • a write to your database
 *
 * Read the destination from an environment variable — never commit it:
 *   const url = process.env.CRM_WEBHOOK_URL;
 *
 * Before production also add: rate limiting, a honeypot or CAPTCHA check,
 * and server-side re-validation of every field.
 */
export async function POST(request: Request) {
  try {
    const payload = await request.json();

    // Minimal server-side guard — expand before go-live.
    if (!payload?.email) {
      return NextResponse.json({ ok: false, error: 'Missing email' }, { status: 400 });
    }

    console.info('[finnpulse:lead] received', {
      source: payload.source,
      email: payload.email,
      receivedAt: new Date().toISOString(),
    });

    // const url = process.env.CRM_WEBHOOK_URL;
    // if (url) await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid payload' }, { status: 400 });
  }
}
