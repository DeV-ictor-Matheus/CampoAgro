import { EVENT_LABEL, getEmailFrom } from './config';
import { appendLeadDemo, saveEmailPreview } from './demo-store';
import { buildWhatsAppUrl } from './whatsapp';
import type { ExpositorLeadPayload } from './types';
import { ingressoLabel, interesseLabel, patrocinioLabel } from './types';

function buildConfirmationHtml(lead: ExpositorLeadPayload, whatsappUrl: string): string {
  const rows: string[] = [
    row('Interesse', interesseLabel(lead.interesse)),
    row('Nome', lead.nome),
  ];

  if (lead.empresa) rows.push(row('Empresa', lead.empresa));
  if (lead.tipoPatrocinio) rows.push(row('Tipo de patrocínio', patrocinioLabel(lead.tipoPatrocinio)));
  if (lead.tipoIngresso) rows.push(row('Tipo de ingresso', ingressoLabel(lead.tipoIngresso)));

  rows.push(row('WhatsApp', lead.telefone), row('E-mail', lead.email));

  const mensagemBlock = lead.mensagem
    ? `<p style="margin:16px 0 0;color:#333;"><strong>Observação:</strong><br>${escapeHtml(lead.mensagem)}</p>`
    : '';

  return `<!DOCTYPE html>
<html lang="pt-BR">
<body style="font-family:system-ui,sans-serif;background:#f6f2ea;margin:0;padding:24px;">
  <div style="max-width:560px;margin:0 auto;background:#fff;border-radius:16px;padding:28px;border:1px solid #e8dfc8;">
    <p style="margin:0 0 8px;font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#8a7340;font-weight:700;">${escapeHtml(EVENT_LABEL)}</p>
    <h1 style="margin:0 0 12px;font-size:22px;color:#0d3d1f;">Recebemos seu interesse</h1>
    <p style="margin:0 0 20px;color:#444;line-height:1.6;">Olá, <strong>${escapeHtml(lead.nome)}</strong>! Recebemos seu contato pelo site. Nossa equipe já foi avisada e em breve fala com você pelo WhatsApp. Se a conversa não abriu ou você perdeu a conexão, use o botão abaixo — é o mesmo canal de atendimento.</p>
    <table style="width:100%;border-collapse:collapse;font-size:15px;">
      ${rows.join('')}
    </table>
    ${mensagemBlock}
    <p style="margin:28px 0 0;text-align:center;">
      <a href="${escapeHtml(whatsappUrl)}" style="display:inline-block;background:#0d3d1f;color:#fff;text-decoration:none;padding:14px 22px;border-radius:999px;font-weight:700;">Continuar no WhatsApp</a>
    </p>
    <p style="margin:20px 0 0;font-size:13px;color:#777;line-height:1.5;">Este e-mail é um comprovante do envio pelo site.</p>
  </div>
</body>
</html>`;
}

function row(label: string, value: string): string {
  return `<tr><td style="padding:8px 0;color:#666;">${escapeHtml(label)}</td><td style="padding:8px 0;">${escapeHtml(value)}</td></tr>`;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

async function sendViaResend(to: string, subject: string, html: string): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return false;

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: getEmailFrom(),
      to: [to],
      subject,
      html,
    }),
  });

  return response.ok;
}

export async function sendLeadConfirmationEmail(
  lead: ExpositorLeadPayload,
): Promise<{ sent: boolean; demo: boolean; previewPath?: string }> {
  const whatsappUrl = buildWhatsAppUrl(lead);
  const subject = `CampoAgro 2026 — recebemos seu interesse (${interesseLabel(lead.interesse)})`;
  const html = buildConfirmationHtml(lead, whatsappUrl);

  const sent = await sendViaResend(lead.email, subject, html);
  if (sent) {
    return { sent: true, demo: false };
  }

  const previewPath = await saveEmailPreview(lead.email, subject, html);
  return { sent: false, demo: true, previewPath };
}

