import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Política de Privacidade | CampoAgro 2026',
  description: 'Como o CampoAgro coleta, usa e protege seus dados conforme a LGPD.',
};

export default function PrivacidadePage() {
  return (
    <main style={{ background: 'var(--preto-fosco)', color: 'var(--branco)', minHeight: '100vh', padding: '6rem 1.5rem 4rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto', fontFamily: 'Barlow, sans-serif', lineHeight: 1.7 }}>
        <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(2rem, 5vw, 3rem)', color: 'var(--dourado)', marginBottom: '0.5rem' }}>
          Política de Privacidade
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', marginBottom: '2.5rem' }}>
          Última atualização: maio de 2026
        </p>

        <Section title="1. Quem somos">
          <p>
            O <strong>CampoAgro 2026</strong> é um evento de agronegócio realizado em Campo do Tenente – PR.
            Para dúvidas ou exercício de direitos, entre em contato pelo e-mail{' '}
            <a href="mailto:[EMAIL_DO_FESTIVAL]" style={{ color: 'var(--dourado)' }}>
              [EMAIL_DO_FESTIVAL]
            </a>
            .
          </p>
        </Section>

        <Section title="2. Dados coletados via Microsoft Clarity">
          <p>Ao navegar no site, podemos coletar — <strong>somente após seu consentimento</strong>:</p>
          <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
            <li>Cliques, movimentos de mouse e rolagem de página</li>
            <li>Gravações anônimas de sessão (sem dados pessoais visíveis)</li>
            <li>IP aproximado (truncado — cidade/estado, sem identificação individual)</li>
            <li>Tipo de dispositivo, navegador e sistema operacional</li>
            <li>Páginas visitadas e tempo de permanência</li>
          </ul>
          <p style={{ marginTop: '1rem' }}>
            <strong>Não coletamos</strong> nome, CPF, e-mail, telefone ou qualquer dado sensível
            por meio desta ferramenta de analytics.
          </p>
        </Section>

        <Section title="3. Finalidade do tratamento">
          <p>
            Os dados coletados são usados para:
          </p>
          <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
            <li>Analisar o comportamento dos visitantes e melhorar a experiência do site</li>
            <li>Produzir relatórios agregados e anônimos de audiência para apresentação a patrocinadores do evento</li>
          </ul>
          <p style={{ marginTop: '1rem' }}>
            Base legal: <strong>consentimento do titular</strong> (art. 7º, I da LGPD).
          </p>
        </Section>

        <Section title="4. Microsoft Clarity como operador">
          <p>
            Utilizamos o{' '}
            <a href="https://clarity.microsoft.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--dourado)' }}>
              Microsoft Clarity
            </a>{' '}
            como ferramenta de analytics. A Microsoft atua como operadora dos dados coletados por essa ferramenta.
            Consulte a{' '}
            <a href="https://privacy.microsoft.com/pt-br/privacystatement" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--dourado)' }}>
              Política de Privacidade da Microsoft
            </a>{' '}
            para entender como eles tratam esses dados.
          </p>
        </Section>

        <Section title="5. Seus direitos (LGPD)">
          <p>Como titular, você tem direito a:</p>
          <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
            <li><strong>Confirmação</strong> do tratamento de seus dados</li>
            <li><strong>Acesso</strong> aos dados coletados</li>
            <li><strong>Correção</strong> de dados incompletos ou desatualizados</li>
            <li><strong>Exclusão</strong> dos dados tratados com base em consentimento</li>
            <li><strong>Revogação do consentimento</strong> a qualquer momento, sem custo</li>
            <li><strong>Portabilidade</strong> e <strong>informação</strong> sobre compartilhamento</li>
          </ul>
          <p style={{ marginTop: '1rem' }}>
            Para exercer esses direitos, envie um e-mail para{' '}
            <a href="mailto:[EMAIL_DO_FESTIVAL]" style={{ color: 'var(--dourado)' }}>
              [EMAIL_DO_FESTIVAL]
            </a>
            .
          </p>
        </Section>

        <Section title="6. Como revogar o consentimento">
          <p>
            Você pode alterar ou revogar sua escolha a qualquer momento clicando em{' '}
            <strong>&quot;Preferências de cookies&quot;</strong> no rodapé do site. Após revogar, o Clarity
            não receberá novos dados de sua sessão.
          </p>
          <p style={{ marginTop: '0.75rem' }}>
            Você também pode limpar o localStorage do navegador — a chave armazenada é{' '}
            <code style={{ background: 'rgba(255,255,255,0.08)', padding: '0.1em 0.4em', borderRadius: 4, fontSize: '0.85em' }}>
              campoagro_consent
            </code>
            .
          </p>
        </Section>

        <Section title="7. Retenção dos dados">
          <p>
            Os dados de analytics ficam retidos nos servidores da Microsoft conforme os termos do Clarity
            (atualmente até 13 meses). Após esse período, são excluídos automaticamente.
          </p>
        </Section>

        <Section title="8. Contato do controlador">
          <p>
            <strong>CampoAgro – Organização do Evento</strong><br />
            Campo do Tenente – Paraná – Brasil<br />
            E-mail:{' '}
            <a href="mailto:[EMAIL_DO_FESTIVAL]" style={{ color: 'var(--dourado)' }}>
              [EMAIL_DO_FESTIVAL]
            </a>
          </p>
        </Section>

        <div style={{ marginTop: '3rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem' }}>
          <a href="/" style={{ color: 'var(--dourado)' }}>← Voltar ao site</a>
        </div>
      </div>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: '2rem' }}>
      <h2 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: '1.2rem', fontWeight: 700, color: 'var(--dourado-claro)', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
        {title}
      </h2>
      <div style={{ color: 'rgba(255,255,255,0.82)' }}>{children}</div>
    </section>
  );
}
