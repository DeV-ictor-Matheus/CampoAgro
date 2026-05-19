import type { ExpositorLeadPayload } from './types';
import { ingressoLabel, interesseLabel, patrocinioLabel } from './types';
import { getWhatsAppNumber } from './config';

export function buildWhatsAppMessage(lead: ExpositorLeadPayload): string {
  const lines = [
    'Olá, equipe CampoAgro 2026! Vim pelo site.',
    '',
    `*Interesse:* ${interesseLabel(lead.interesse)}`,
    `*Nome:* ${lead.nome}`,
  ];

  if (lead.empresa) {
    lines.push(`*Empresa:* ${lead.empresa}`);
  }

  if (lead.tipoPatrocinio) {
    lines.push(`*Tipo de patrocínio:* ${patrocinioLabel(lead.tipoPatrocinio)}`);
  }

  if (lead.tipoIngresso) {
    lines.push(`*Tipo de ingresso:* ${ingressoLabel(lead.tipoIngresso)}`);
  }

  lines.push(`*E-mail:* ${lead.email}`, `*WhatsApp:* ${lead.telefone}`);

  if (lead.mensagem) {
    lines.push('', `*Observação:* ${lead.mensagem}`);
  }

  lines.push('', 'Aguardo o retorno de vocês. Obrigado(a)!');

  return lines.join('\n');
}

export function buildWhatsAppUrl(lead: ExpositorLeadPayload): string {
  const phone = getWhatsAppNumber();
  const text = encodeURIComponent(buildWhatsAppMessage(lead));
  return `https://wa.me/${phone}?text=${text}`;
}
