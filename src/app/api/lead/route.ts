import { NextResponse } from 'next/server';

/**
 * ---------------------------------------------------------------------------
 * LEAD HANDLER — CFO DISCOVERY MEETING & DIAGNOSTIC SUBMISSIONS
 * ---------------------------------------------------------------------------
 * Receives submissions from the CFO Discovery Meeting form and routes lead details.
 * Form submissions are formatted for delivery to rohan@finnpulse.com.
 */
export async function POST(request: Request) {
  try {
    const payload = await request.json();

    if (!payload?.email || !payload?.fullName) {
      return NextResponse.json({ ok: false, error: 'Missing required fields' }, { status: 400 });
    }

    const emailDetails = {
      to: 'rohan@finnpulse.com',
      subject: `New CFO Discovery Meeting Request from ${payload.fullName} (${payload.company || 'N/A'})`,
      body: `
New CFO Discovery Meeting Request:

• Full Name: ${payload.fullName}
• Company Name: ${payload.company}
• Designation: ${payload.designation}
• Mobile Number: ${payload.mobile}
• Email: ${payload.email}
• Annual Turnover: ${payload.turnover}
• Industry: ${payload.industry}
• Finance Challenges: ${Array.isArray(payload.challenges) ? payload.challenges.join(', ') : payload.challenges || 'None selected'}
• Additional Notes: ${payload.message || 'N/A'}

Submitted At: ${new Date().toLocaleString()}
      `.trim(),
    };

    console.info('[finnpulse:lead] Lead submission for rohan@finnpulse.com:', emailDetails);

    // Forward to CRM / Email Webhook if configured in environment variables
    const webhookUrl = process.env.CRM_WEBHOOK_URL || process.env.FORM_WEBHOOK_URL;
    if (webhookUrl) {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, targetEmail: 'rohan@finnpulse.com' }),
      });
    }

    return NextResponse.json({ ok: true, recipient: 'rohan@finnpulse.com' });
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid payload' }, { status: 400 });
  }
}
