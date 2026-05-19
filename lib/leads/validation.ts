import {
  INTERESSE_OPTIONS,
  INGRESSO_OPTIONS,
  PATROCINIO_OPTIONS,
  type ExpositorLeadPayload,
  type IngressoValue,
  type InteresseValue,
  type PatrocinioValue,
} from './types';

const INTERESSE_VALUES = new Set(INTERESSE_OPTIONS.map((o) => o.value));
const PATROCINIO_VALUES = new Set(PATROCINIO_OPTIONS.map((o) => o.value));
const INGRESSO_VALUES = new Set(INGRESSO_OPTIONS.map((o) => o.value));

function digitsOnly(value: string): string {
  return value.replace(/\D/g, '');
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function parseExpositorLead(body: unknown): { data?: ExpositorLeadPayload; error?: string } {
  if (!body || typeof body !== 'object') {
    return { error: 'Dados inválidos.' };
  }

  const raw = body as Record<string, unknown>;
  const nome = String(raw.nome ?? '').trim();
  const email = String(raw.email ?? '').trim();
  const telefone = String(raw.telefone ?? '').trim();
  const interesse = String(raw.interesse ?? '').trim() as InteresseValue;
  const empresa = String(raw.empresa ?? '').trim();
  const tipoPatrocinio = String(raw.tipoPatrocinio ?? '').trim() as PatrocinioValue;
  const tipoIngresso = String(raw.tipoIngresso ?? '').trim() as IngressoValue;
  const mensagem = String(raw.mensagem ?? '').trim();

  if (nome.length < 2) {
    return { error: 'Informe seu nome completo.' };
  }

  if (!isValidEmail(email)) {
    return { error: 'Informe um e-mail válido.' };
  }

  if (digitsOnly(telefone).length < 10) {
    return { error: 'Informe um WhatsApp válido com DDD.' };
  }

  if (!INTERESSE_VALUES.has(interesse)) {
    return { error: 'Selecione um tipo de interesse.' };
  }

  if (interesse === 'expositor') {
    if (empresa.length < 2) {
      return { error: 'Informe o nome da empresa.' };
    }
    return {
      data: {
        interesse,
        nome,
        email,
        telefone,
        empresa,
        mensagem: mensagem || undefined,
      },
    };
  }

  if (interesse === 'patrocinador') {
    if (empresa.length < 2) {
      return { error: 'Informe o nome da empresa.' };
    }
    if (!PATROCINIO_VALUES.has(tipoPatrocinio)) {
      return { error: 'Selecione o tipo de patrocínio.' };
    }
    return {
      data: {
        interesse,
        nome,
        email,
        telefone,
        empresa,
        tipoPatrocinio,
        mensagem: mensagem || undefined,
      },
    };
  }

  if (!INGRESSO_VALUES.has(tipoIngresso)) {
    return { error: 'Selecione o tipo de ingresso.' };
  }

  return {
    data: {
      interesse,
      nome,
      email,
      telefone,
      tipoIngresso,
    },
  };
}
