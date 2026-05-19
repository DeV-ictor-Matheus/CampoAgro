import { NextResponse } from 'next/server';

import { sendLeadConfirmationEmail } from '@/lib/leads/email';
import { persistLead } from '@/lib/leads/persist-lead';
import { parseExpositorLead } from '@/lib/leads/validation';
import { buildWhatsAppUrl } from '@/lib/leads/whatsapp';
import type { ExpositorLeadResponse } from '@/lib/leads/types';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = parseExpositorLead(body);

    if (!parsed.data) {
      return NextResponse.json({ ok: false, error: parsed.error }, { status: 400 });
    }

    const lead = parsed.data;
    const storage = await persistLead(lead);
    const emailResult = await sendLeadConfirmationEmail(lead);
    const whatsappUrl = buildWhatsAppUrl(lead);

    const response: ExpositorLeadResponse = {
      ok: true,
      whatsappUrl,
      email: emailResult,
      storage,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('[leads/expositor]', error);
    return NextResponse.json(
      { ok: false, error: 'Não foi possível registrar seu interesse. Tente novamente.' },
      { status: 500 },
    );
  }
}
