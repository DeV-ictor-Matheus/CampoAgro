/** Número só dígitos (DDI + DDD + número). Padrão: placeholder para testes locais. */
export function getWhatsAppNumber(): string {
  const raw = process.env.NEXT_PUBLIC_WHATSAPP_VENDAS ?? '5541999999999';
  return raw.replace(/\D/g, '');
}

export function getEmailFrom(): string {
  return process.env.LEADS_EMAIL_FROM ?? 'CampoAgro 2026 <onboarding@resend.dev>';
}

export const EVENT_LABEL = 'CampoAgro 2026 · 17 a 19 de julho · Campo do Tenente/PR';
