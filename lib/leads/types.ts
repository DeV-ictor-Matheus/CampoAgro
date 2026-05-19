export const INTERESSE_OPTIONS = [
  { value: 'expositor', label: 'Expositor' },
  { value: 'patrocinador', label: 'Patrocinador' },
  { value: 'ingresso', label: 'Comprador' },
] as const;

export const PATROCINIO_OPTIONS = [
  { value: 'master', label: 'MASTER' },
  { value: 'diamante', label: 'DIAMANTE' },
  { value: 'ouro', label: 'OURO' },
] as const;

export const INGRESSO_OPTIONS = [
  { value: 'vip', label: 'VIP - Acesso à proximidades do palco' },
  { value: 'camarote', label: 'CAMAROTE - Acesso à lateral do palco' },
] as const;

export type InteresseValue = (typeof INTERESSE_OPTIONS)[number]['value'];
export type PatrocinioValue = (typeof PATROCINIO_OPTIONS)[number]['value'];
export type IngressoValue = (typeof INGRESSO_OPTIONS)[number]['value'];

export type ExpositorLeadPayload = {
  interesse: InteresseValue;
  nome: string;
  email: string;
  telefone: string;
  empresa?: string;
  tipoPatrocinio?: PatrocinioValue;
  tipoIngresso?: IngressoValue;
  mensagem?: string;
};

export type ExpositorLeadResponse = {
  ok: boolean;
  whatsappUrl: string;
  email: {
    sent: boolean;
    demo: boolean;
    previewPath?: string;
  };
  storage: {
    demo: boolean;
    sheets: boolean;
    path?: string;
  };
  error?: string;
};

export function patrocinioLabel(value: PatrocinioValue): string {
  return PATROCINIO_OPTIONS.find((o) => o.value === value)?.label ?? value;
}

export function ingressoLabel(value: IngressoValue): string {
  return INGRESSO_OPTIONS.find((o) => o.value === value)?.label ?? value;
}

export function interesseLabel(value: InteresseValue): string {
  return INTERESSE_OPTIONS.find((o) => o.value === value)?.label ?? value;
}
