'use client';

import { FormEvent, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';

import {
  INGRESSO_OPTIONS,
  PATROCINIO_OPTIONS,
  type ExpositorLeadResponse,
  type IngressoValue,
  type InteresseValue,
  type PatrocinioValue,
} from '@/lib/leads/types';

import InterestPicker from './InterestPicker';

type FormState = {
  interesse: InteresseValue | '';
  nome: string;
  email: string;
  telefone: string;
  empresa: string;
  tipoPatrocinio: PatrocinioValue | '';
  tipoIngresso: IngressoValue | '';
  mensagem: string;
};

const INITIAL: FormState = {
  interesse: '',
  nome: '',
  email: '',
  telefone: '',
  empresa: '',
  tipoPatrocinio: '',
  tipoIngresso: '',
  mensagem: '',
};

const FORM_HINTS: Record<InteresseValue, string> = {
  expositor: 'Conte-nos sobre sua empresa. Detalhes do stand combinamos no WhatsApp.',
  patrocinador: 'Escolha a cota de patrocínio. Valores e contrapartidas alinhamos no WhatsApp.',
  ingresso: 'Escolha o tipo de ingresso. Pagamento e confirmação fechamos no WhatsApp.',
};

function isInteresseValue(value: string | null): value is InteresseValue {
  return value === 'expositor' || value === 'patrocinador' || value === 'ingresso';
}

function buildSuccessFeedback(
  payload: ExpositorLeadResponse,
  submittedEmail: string,
): string {
  let message = 'Registramos seu interesse na participação do evento CampoAgro 2026.';

  if (payload.email.sent) {
    message += ` Enviamos um e-mail de confirmação para ${submittedEmail}.`;
  }

  return message;
}

function buildPayload(form: FormState & { interesse: InteresseValue }) {
  const base = {
    interesse: form.interesse,
    nome: form.nome,
    email: form.email,
    telefone: form.telefone,
  };

  if (form.interesse === 'expositor') {
    return { ...base, empresa: form.empresa, mensagem: form.mensagem || undefined };
  }

  if (form.interesse === 'patrocinador') {
    return {
      ...base,
      empresa: form.empresa,
      tipoPatrocinio: form.tipoPatrocinio,
      mensagem: form.mensagem || undefined,
    };
  }

  return { ...base, tipoIngresso: form.tipoIngresso };
}

export default function ExpositoresForm() {
  const searchParams = useSearchParams();
  const [form, setForm] = useState<FormState>(INITIAL);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [feedback, setFeedback] = useState('');
  const [manualWhatsAppUrl, setManualWhatsAppUrl] = useState<string | null>(null);

  useEffect(() => {
    const fromQuery = searchParams.get('interesse');
    if (!isInteresseValue(fromQuery)) return;

    setForm((current) => {
      const next = { ...current, interesse: fromQuery };
      if (fromQuery === 'ingresso') {
        next.empresa = '';
        next.tipoPatrocinio = '';
        next.mensagem = '';
        next.tipoIngresso = next.tipoIngresso || INGRESSO_OPTIONS[0].value;
      } else if (fromQuery === 'patrocinador') {
        next.tipoIngresso = '';
        next.tipoPatrocinio = next.tipoPatrocinio || PATROCINIO_OPTIONS[0].value;
      } else {
        next.tipoPatrocinio = '';
        next.tipoIngresso = '';
      }
      return next;
    });
  }, [searchParams]);

  const hasInteresse = form.interesse !== '';
  const showEmpresa = form.interesse === 'expositor' || form.interesse === 'patrocinador';
  const showPatrocinio = form.interesse === 'patrocinador';
  const showIngresso = form.interesse === 'ingresso';
  const showMensagem = form.interesse !== '' && form.interesse !== 'ingresso';

  const submitLabel = useMemo(() => {
    if (status === 'loading') return 'Salvando…';
    return 'Enviar e continuar no WhatsApp';
  }, [status]);

  function resetFormAfterSubmit() {
    const fromQuery = searchParams.get('interesse');
    if (!isInteresseValue(fromQuery)) {
      setForm(INITIAL);
      return;
    }

    const next: FormState = { ...INITIAL, interesse: fromQuery };
    if (fromQuery === 'ingresso') {
      next.tipoIngresso = INGRESSO_OPTIONS[0].value;
    } else if (fromQuery === 'patrocinador') {
      next.tipoPatrocinio = PATROCINIO_OPTIONS[0].value;
    }
    setForm(next);
  }

  function updateField<K extends keyof FormState>(name: K, value: FormState[K]) {
    if (status === 'success') {
      setStatus('idle');
      setFeedback('');
      setManualWhatsAppUrl(null);
    }

    setForm((current) => {
      const next = { ...current, [name]: value };
      if (name === 'interesse') {
        const interesse = value as InteresseValue;
        if (interesse === 'ingresso') {
          next.empresa = '';
          next.tipoPatrocinio = '';
          next.mensagem = '';
          if (!next.tipoIngresso) next.tipoIngresso = INGRESSO_OPTIONS[0].value;
        } else if (interesse === 'patrocinador') {
          next.tipoIngresso = '';
          if (!next.tipoPatrocinio) next.tipoPatrocinio = PATROCINIO_OPTIONS[0].value;
        } else {
          next.tipoPatrocinio = '';
          next.tipoIngresso = '';
        }
      }
      return next;
    });
  }

  function selectInteresse(interesse: InteresseValue) {
    updateField('interesse', interesse);
  }

  function renderFormStatus(visible: boolean) {
    if (!visible || !feedback) return null;

    return (
      <p
        className={`form-status ${status === 'error' ? 'form-status--error' : 'form-status--success'}`}
        role="status"
      >
        {feedback}
        {status === 'success' && manualWhatsAppUrl ? (
          <>
            {' '}
            <a href={manualWhatsAppUrl} target="_blank" rel="noopener noreferrer">
              Clique aqui para entrar em contato
            </a>
            .
          </>
        ) : null}
      </p>
    );
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!form.interesse) {
      setStatus('error');
      setFeedback('Selecione seu interesse para continuar.');
      return;
    }

    setStatus('loading');
    setFeedback('');
    setManualWhatsAppUrl(null);

    try {
      const response = await fetch('/api/leads/expositor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(buildPayload({ ...form, interesse: form.interesse })),
      });

      const payload = (await response.json()) as ExpositorLeadResponse & { error?: string };

      if (!response.ok || !payload.ok) {
        throw new Error(payload.error ?? 'Não foi possível enviar. Tente novamente.');
      }

      const submittedEmail = form.email;

      resetFormAfterSubmit();
      setStatus('success');
      setFeedback(buildSuccessFeedback(payload, submittedEmail));
      setManualWhatsAppUrl(payload.whatsappUrl);

      window.open(payload.whatsappUrl, '_blank', 'noopener,noreferrer');
    } catch (error) {
      setStatus('error');
      setFeedback(error instanceof Error ? error.message : 'Erro ao enviar. Tente novamente.');
    }
  }

  return (
    <form
      className="premium-form premium-form--lead reveal"
      aria-label="Formulário de interesse para expositores, patrocínio e ingressos"
      onSubmit={onSubmit}
      noValidate
    >
      <div className="form-stack">
        <InterestPicker value={form.interesse} onChange={selectInteresse} />

        {renderFormStatus(!hasInteresse)}

        {hasInteresse ? (
          <>
            <p className="form-hint">{FORM_HINTS[form.interesse as InteresseValue]}</p>

            <div className="form-row form-row--2">
          <label className="form-group">
            <span>Nome</span>
            <input
              type="text"
              name="nome"
              placeholder="Seu nome"
              required
              autoComplete="name"
              value={form.nome}
              onChange={(event) => updateField('nome', event.target.value)}
            />
          </label>

          <label className="form-group">
            <span>E-mail</span>
            <input
              type="email"
              name="email"
              placeholder="seu@email.com"
              required
              autoComplete="email"
              value={form.email}
              onChange={(event) => updateField('email', event.target.value)}
            />
          </label>
        </div>

        <label className="form-group">
          <span>WhatsApp</span>
          <input
            type="tel"
            name="telefone"
            placeholder="(00) 00000-0000"
            required
            autoComplete="tel"
            value={form.telefone}
            onChange={(event) => updateField('telefone', event.target.value)}
          />
        </label>

        {showEmpresa ? (
          <label className="form-group">
            <span>Empresa</span>
            <input
              type="text"
              name="empresa"
              placeholder="Nome da empresa"
              required
              value={form.empresa}
              onChange={(event) => updateField('empresa', event.target.value)}
            />
          </label>
        ) : null}

        {showPatrocinio ? (
          <label className="form-group">
            <span>Tipo de patrocínio</span>
            <select
              name="tipoPatrocinio"
              required
              value={form.tipoPatrocinio}
              onChange={(event) => updateField('tipoPatrocinio', event.target.value as PatrocinioValue)}
            >
              <option value="" disabled>
                Selecione a cota
              </option>
              {PATROCINIO_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        ) : null}

        {showIngresso ? (
          <label className="form-group">
            <span>Tipo de ingresso</span>
            <select
              name="tipoIngresso"
              required
              value={form.tipoIngresso}
              onChange={(event) => updateField('tipoIngresso', event.target.value as IngressoValue)}
            >
              <option value="" disabled>
                Selecione o ingresso
              </option>
              {INGRESSO_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        ) : null}

        {showMensagem ? (
          <label className="form-group">
            <span>Observação (opcional)</span>
            <textarea
              name="mensagem"
              rows={3}
              placeholder="Algo rápido que devemos saber"
              value={form.mensagem}
              onChange={(event) => updateField('mensagem', event.target.value)}
            />
          </label>
        ) : null}

            <p className="form-legal">
              Ao enviar, você concorda em ser contatado sobre o CampoAgro 2026 com os dados informados.
            </p>

            {renderFormStatus(hasInteresse)}

            <button
              className="btn-primary form-submit"
              type="submit"
              disabled={status === 'loading' || status === 'success'}
            >
              {submitLabel}
            </button>
          </>
        ) : null}
      </div>
    </form>
  );
}
