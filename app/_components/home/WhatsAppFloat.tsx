import { getWhatsAppNumber } from '@/lib/leads/config';

export default function WhatsAppFloat() {
  const phone = getWhatsAppNumber();

  return (
    <a
      href={`https://wa.me/${phone}`}
      className="whatsapp-float"
      target="_blank"
      rel="noopener"
      aria-label="Falar no WhatsApp"
    >
      WA
    </a>
  );
}
