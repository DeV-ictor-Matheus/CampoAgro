export default function HomeLanding() {
  return (
    <>
      <div id="loading" aria-label="Carregando CampoAgro">
        <img
          className="loading-logo"
          src="/assets/img/logo-campoagro.png"
          alt="CampoAgro Campo do Tenente"
        />
        <div className="loading-bar-wrap">
          <div className="loading-bar" />
        </div>
        <p>Campo do Tenente · PR · 2026</p>
      </div>

      <a
        href="https://wa.me/5541999999999"
        className="whatsapp-float"
        target="_blank"
        rel="noopener"
        aria-label="Falar no WhatsApp"
      >
        WA
      </a>

      <nav id="navbar" aria-label="Navegação principal">
        <a href="#home" className="nav-brand" aria-label="CampoAgro 2026 - início">
          <img src="/assets/img/logo-campoagro.png" alt="CampoAgro Campo do Tenente" />
        </a>
        <ul className="nav-links">
          <li>
            <a href="#sobre">Evento</a>
          </li>
          <li>
            <a href="#programacao">Programação</a>
          </li>
          <li>
            <a href="#areas">Áreas</a>
          </li>
          <li>
            <a href="#memorias">Galeria</a>
          </li>
          <li>
            <a href="#tratoraco">Tratoraço</a>
          </li>
          <li>
            <a href="#patrocinadores">Parceiros</a>
          </li>
          <li>
            <a href="#expositores">Expositores</a>
          </li>
          <li>
            <a href="https://www.instagram.com/campoagrooficial/" className="nav-cta" target="_blank" rel="noopener">
              Instagram
            </a>
          </li>
        </ul>
        <button className="hamburger" id="hamburger" aria-label="Abrir menu" type="button">
          <span />
          <span />
          <span />
        </button>
      </nav>

      <main>
        <section className="hero hero-v5" id="home" aria-label="CampoAgro 2026">
          <div className="hero-bg" />
          <div className="hero-grid" />
          <div className="hero-particles" id="particles" />
          <div className="hero-light hero-light-one" />
          <div className="hero-light hero-light-two" />
          <div className="hero-content reveal">
            <div className="hero-badge">17 a 19 de julho de 2026 · Campo do Tenente · PR</div>
            <h1 className="hero-title">
              <span className="year">3ª edição</span>
              CAMPO<span className="gold">AGRO</span> 2026
            </h1>
            <p className="hero-tagline">Plantando na terra, a semente do futuro.</p>
            <p className="hero-sub">
              O maior encontro do agronegócio, inovação rural e entretenimento do sul do Paraná.
            </p>
            <div className="hero-buttons">
              <a href="#programacao" className="btn-primary">
                Ver Programação
              </a>
              <a href="https://www.instagram.com/campoagrooficial/" className="btn-outline" target="_blank" rel="noopener">
                Comprar Ingresso
              </a>
            </div>
          </div>
          <div className="hero-proof reveal" aria-label="Resumo do evento">
            <span>Feira agro</span>
            <strong>Negócios · Tecnologia · Shows · Tratoraço</strong>
          </div>
          <div className="hero-scroll" aria-hidden="true">
            <span className="scroll-text">Role para baixo</span>
            <div className="scroll-line" />
          </div>
        </section>

        <section className="countdown-section premium-band" aria-label="Contagem regressiva">
          <div className="container countdown-shell reveal">
            <div>
              <p className="eyebrow">Contagem regressiva</p>
              <h2>O agro se encontra em Campo do Tenente</h2>
            </div>
            <div className="countdown-grid">
              <div className="count-item">
                <div className="count-num" id="cd-days">
                  0
                </div>
                <span className="count-label">Dias</span>
              </div>
              <div className="count-item">
                <div className="count-num" id="cd-hours">
                  00
                </div>
                <span className="count-label">Horas</span>
              </div>
              <div className="count-item">
                <div className="count-num" id="cd-mins">
                  00
                </div>
                <span className="count-label">Minutos</span>
              </div>
              <div className="count-item">
                <div className="count-num" id="cd-secs">
                  00
                </div>
                <span className="count-label">Segundos</span>
              </div>
            </div>
          </div>
        </section>

        <section className="sobre editorial-section" id="sobre">
          <div className="container editorial-grid">
            <div className="editorial-copy reveal">
              <div className="section-badge">Sobre o evento</div>
              <h2 className="section-title">
                Uma vitrine premium para a força do <span className="highlight">agro brasileiro</span>
              </h2>
              <p>
                O CampoAgro 2026 conecta produtores, empresas, famílias, tecnologia, cultura rural e entretenimento em
                uma experiência de alto impacto para Campo do Tenente e toda a região.
              </p>
              <p>
                A proposta é unir feira de negócios, exposição agropecuária, máquinas, agricultura familiar,
                gastronomia, conteúdo técnico e shows em um fluxo organizado, elegante e fácil de navegar.
              </p>
              <div className="editorial-tags" aria-label="Pilares do evento">
                <span>Negócios</span>
                <span>Tecnologia</span>
                <span>Agricultura familiar</span>
                <span>Máquinas</span>
                <span>Shows</span>
                <span>Gastronomia</span>
              </div>
            </div>
            <div className="editorial-visual reveal">
              <img
                src="/assets/img/banner15.png"
                alt="Família plantando uma muda no campo ao pôr do sol"
                loading="lazy"
              />
              <div className="visual-caption">
                <span>Campo do Tenente</span>
                <strong>Tradição rural com visão de futuro</strong>
              </div>
            </div>
          </div>
        </section>

        <section className="numbers-section" id="numeros" aria-label="Números do evento">
          <div className="container">
            <div className="numbers-grid reveal">
              <article className="stat-card">
                <div className="stat-num">+50 mil</div>
                <div className="stat-desc">visitantes esperados</div>
              </article>
              <article className="stat-card">
                <div className="stat-num">+200</div>
                <div className="stat-desc">marcas e expositores</div>
              </article>
              <article className="stat-card">
                <div className="stat-num">3 dias</div>
                <div className="stat-desc">de programação oficial</div>
              </article>
              <article className="stat-card">
                <div className="stat-num">+30</div>
                <div className="stat-desc">atrações, ativações e experiências</div>
              </article>
            </div>
          </div>
        </section>

        <section className="programacao" id="programacao">
          <div className="container">
            <div className="section-head reveal">
              <div className="section-badge">Agenda oficial</div>
              <h2 className="section-title">
                Programação <span className="highlight">2026</span>
              </h2>
              <p>Uma agenda clara para acompanhar feira, arena, experiências, Tratoraço e grandes atrações.</p>
            </div>
            <div className="prog-tabs reveal" role="tablist" aria-label="Dias da programação">
              <button type="button" className="prog-tab active" data-tab="prog-sexta">
                Sexta · 17/07
              </button>
              <button type="button" className="prog-tab" data-tab="prog-sabado">
                Sábado · 18/07
              </button>
              <button type="button" className="prog-tab" data-tab="prog-domingo">
                Domingo · 19/07
              </button>
            </div>
            <div id="prog-sexta" className="prog-content active">
              <div className="timeline">
                <article className="tl-item reveal">
                  <div className="tl-time">14h</div>
                  <div>
                    <h3 className="tl-title">Abertura da feira e visitação aos estandes</h3>
                    <p className="tl-desc">
                      Expositores, máquinas, agricultura familiar, gastronomia e ativações de parceiros.
                    </p>
                  </div>
                  <span className="tl-badge">Feira</span>
                </article>
                <article className="tl-item reveal">
                  <div className="tl-time">19h</div>
                  <div>
                    <h3 className="tl-title">Cerimônia oficial CAMPOAGRO 2026</h3>
                    <p className="tl-desc">
                      Abertura institucional com autoridades, patrocinadores e lideranças do agro regional.
                    </p>
                  </div>
                  <span className="tl-badge">Oficial</span>
                </article>
                <article className="tl-item reveal">
                  <div className="tl-time">22h</div>
                  <div>
                    <h3 className="tl-title">Palco principal · atração a confirmar</h3>
                    <p className="tl-desc">Novidades serão publicadas nos canais oficiais do evento.</p>
                  </div>
                  <span className="tl-badge">Show</span>
                </article>
              </div>
            </div>
            <div id="prog-sabado" className="prog-content">
              <div className="timeline">
                <article className="tl-item reveal">
                  <div className="tl-time">10h</div>
                  <div>
                    <h3 className="tl-title">Exposição agropecuária e feira de negócios</h3>
                    <p className="tl-desc">
                      Demonstrações, networking, estandes comerciais e experiências para toda a família.
                    </p>
                  </div>
                  <span className="tl-badge">Negócios</span>
                </article>
                <article className="tl-item reveal">
                  <div className="tl-time">16h</div>
                  <div>
                    <h3 className="tl-title">Tratoraço CampoAgro</h3>
                    <p className="tl-desc">
                      Desfile de tratores, produtores e famílias celebrando a identidade rural da região.
                    </p>
                  </div>
                  <span className="tl-badge">Tradição</span>
                </article>
                <article className="tl-item reveal">
                  <div className="tl-time">22h</div>
                  <div>
                    <h3 className="tl-title">João Nelore e Texano</h3>
                    <p className="tl-desc">Embaixadores do evento no palco principal.</p>
                  </div>
                  <span className="tl-badge">Show confirmado</span>
                </article>
              </div>
            </div>
            <div id="prog-domingo" className="prog-content">
              <div className="timeline">
                <article className="tl-item reveal">
                  <div className="tl-time">09h</div>
                  <div>
                    <h3 className="tl-title">Programação familiar e experiências do campo</h3>
                    <p className="tl-desc">
                      Conteúdos, praça gastronômica, áreas temáticas e visitação aos expositores.
                    </p>
                  </div>
                  <span className="tl-badge">Família</span>
                </article>
                <article className="tl-item reveal">
                  <div className="tl-time">18h</div>
                  <div>
                    <h3 className="tl-title">Encerramento institucional</h3>
                    <p className="tl-desc">
                      Celebração dos parceiros, expositores e produtores que fazem o CampoAgro acontecer.
                    </p>
                  </div>
                  <span className="tl-badge">Oficial</span>
                </article>
                <article className="tl-item reveal">
                  <div className="tl-time">21h</div>
                  <div>
                    <h3 className="tl-title">Luan Pereira</h3>
                    <p className="tl-desc">
                      Show de encerramento com um dos grandes nomes do agronejo nacional.
                    </p>
                  </div>
                  <span className="tl-badge">Show confirmado</span>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section className="areas" id="areas">
          <div className="container">
            <div className="section-head reveal">
              <div className="section-badge">Áreas do evento</div>
              <h2 className="section-title">
                Estrutura completa para viver o <span className="highlight">CampoAgro</span>
              </h2>
            </div>
            <div className="areas-grid">
              <article className="area-card reveal">
                <span className="area-icon">01</span>
                <h3 className="area-title">Exposição agropecuária</h3>
                <p className="area-desc">Animais, genética, produtores e experiências ligadas à força rural.</p>
              </article>
              <article className="area-card reveal">
                <span className="area-icon">02</span>
                <h3 className="area-title">Máquinas agrícolas</h3>
                <p className="area-desc">Tratores, implementos, equipamentos e tecnologia para o campo.</p>
              </article>
              <article className="area-card reveal">
                <span className="area-icon">03</span>
                <h3 className="area-title">Feira de negócios</h3>
                <p className="area-desc">Ambiente premium para marcas, vendas, relacionamento e oportunidades.</p>
              </article>
              <article className="area-card reveal">
                <span className="area-icon">04</span>
                <h3 className="area-title">Arena de shows</h3>
                <p className="area-desc">
                  Palco principal com experiência visual, som, praça de alimentação e ativações.
                </p>
              </article>
              <article className="area-card reveal">
                <span className="area-icon">05</span>
                <h3 className="area-title">Agricultura familiar</h3>
                <p className="area-desc">Produtos locais, cooperativas, associações e valorização regional.</p>
              </article>
              <article className="area-card reveal">
                <span className="area-icon">06</span>
                <h3 className="area-title">Gastronomia</h3>
                <p className="area-desc">Sabores do Paraná, operação organizada e áreas de convivência.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="memorias-section" id="memorias">
          <div className="container">
            <div className="section-head reveal">
              <div className="section-badge">Galeria e memórias</div>
              <h2 className="section-title">
                Momentos que contam a história do <span className="highlight">CampoAgro</span>
              </h2>
            </div>
            <div className="masonry-gallery">
              <button
                className="memory-card tall reveal"
                type="button"
                data-media-type="image"
                data-src="/assets/img/banner15.png"
                data-title="Semente do futuro"
                data-category="CAMPOAGRO 2026"
              >
                <img src="/assets/img/banner15.png" alt="Família plantando no campo" loading="lazy" />
                <span>Semente do futuro</span>
              </button>
              <button
                className="memory-card reveal"
                type="button"
                data-media-type="image"
                data-src="/assets/img/joao-nelore-texano.jpg"
                data-title="João Nelore e Texano"
                data-category="Shows"
              >
                <img src="/assets/img/joao-nelore-texano.jpg" alt="João Nelore e Texano" loading="lazy" />
                <span>Shows nacionais</span>
              </button>
              <button
                className="memory-card reveal"
                type="button"
                data-media-type="image"
                data-src="/assets/img/luan-pereira-tvz-2024.png"
                data-title="Luan Pereira"
                data-category="Palco CampoAgro"
              >
                <img src="/assets/img/luan-pereira-tvz-2024.png" alt="Luan Pereira" loading="lazy" />
                <span>Arena principal</span>
              </button>
              <button
                className="memory-card wide reveal"
                type="button"
                data-media-type="image"
                data-src="/assets/img/tratoraco/tratoraco-01.png"
                data-title="Tratoraço"
                data-category="Tradição rural"
              >
                <img src="/assets/img/tratoraco/tratoraco-01.png" alt="Tratoraço CampoAgro" loading="lazy" />
                <span>Tradição em movimento</span>
              </button>
            </div>
          </div>
        </section>

        <section className="tratoraco-section" id="tratoraco">
          <div className="container tratoraco-layout">
            <div className="tratoraco-copy reveal">
              <div className="section-badge">Tratoraço</div>
              <h2 className="section-title">A tradição rural toma a avenida</h2>
              <p>
                O Tratoraço celebra produtores, famílias e máquinas que movem a economia do campo. Uma experiência
                visual forte, popular e simbólica dentro do CampoAgro.
              </p>
              <div className="tratoraco-stats">
                <div className="tratoraco-stat">
                  <strong>+100</strong>
                  <span>tratores esperados</span>
                </div>
                <div className="tratoraco-stat">
                  <strong>100%</strong>
                  <span>identidade rural</span>
                </div>
              </div>
            </div>
            <div className="tratoraco-carousel reveal" data-tratoraco-track>
              <img src="/assets/img/tratoraco/tratoraco-01.png" alt="Tratoraço 1" loading="lazy" />
              <img src="/assets/img/tratoraco/tratoraco-02.png" alt="Tratoraço 2" loading="lazy" />
              <img src="/assets/img/tratoraco/tratoraco-03.png" alt="Tratoraço 3" loading="lazy" />
              <img src="/assets/img/tratoraco/tratoraco-04.png" alt="Tratoraço 4" loading="lazy" />
            </div>
          </div>
        </section>

        <section className="patrocinadores" id="patrocinadores">
          <div className="container">
            <div className="partners-hero reveal">
              <div>
                <div className="section-badge">Parceiros oficiais</div>
                <h2 className="section-title">Marcas que fortalecem o maior evento agro da região</h2>
              </div>
              <a href="#expositores" className="btn-primary">
                Ver cotas de patrocínio
              </a>
            </div>
            <div className="sponsor-tier sponsor-tier-featured reveal">
              <div className="sponsor-track">
                <div className="sponsor-row sponsor-logo-row">
                  <div className="sponsor-logo-strip">
                    <img
                      src="/assets/img/campoagro-patrocinadores.png"
                      alt="Patrocinadores e apoiadores oficiais do CampoAgro"
                      loading="lazy"
                    />
                  </div>
                  <div className="sponsor-logo-strip" aria-hidden="true">
                    <img src="/assets/img/campoagro-patrocinadores.png" alt="" loading="lazy" />
                  </div>
                </div>
              </div>
            </div>
            <p className="partners-cta reveal">Associe sua marca ao maior evento agro da região.</p>
          </div>
        </section>

        <section className="expositor-section" id="expositores">
          <div className="container expositor-grid">
            <div className="reveal">
              <div className="section-badge">Expositores</div>
              <h2 className="section-title">Sua marca no centro dos negócios do agro</h2>
              <p className="section-lead">
                Espaços comerciais para empresas que querem vender, ativar marca, captar clientes e se posicionar em
                uma feira com público qualificado.
              </p>
              <div className="expo-benefits">
                <span>Stands comerciais</span>
                <span>Ativações de marca</span>
                <span>Networking regional</span>
                <span>Visibilidade institucional</span>
              </div>
            </div>
            <form className="premium-form reveal" aria-label="Formulário de interesse para expositores">
              <label className="form-group">
                <span>Nome</span>
                <input type="text" name="nome" placeholder="Seu nome" />
              </label>
              <label className="form-group">
                <span>Empresa</span>
                <input type="text" name="empresa" placeholder="Nome da empresa" />
              </label>
              <label className="form-group">
                <span>Contato</span>
                <input type="tel" name="telefone" placeholder="WhatsApp" />
              </label>
              <label className="form-group">
                <span>Interesse</span>
                <select name="interesse">
                  <option>Quero ser expositor</option>
                  <option>Quero patrocinar</option>
                  <option>Quero saber sobre ingressos</option>
                </select>
              </label>
              <label className="form-group full">
                <span>Mensagem</span>
                <textarea name="mensagem" rows={4} placeholder="Conte rapidamente o que você procura" />
              </label>
              <button className="btn-primary" type="button">
                Enviar interesse
              </button>
            </form>
          </div>
        </section>

        <section className="mapa-section" id="mapa">
          <div className="container mapa-layout">
            <div className="section-head reveal">
              <div className="section-badge">Mapa do evento</div>
              <h2 className="section-title">Percurso claro, setores organizados e experiência fluida</h2>
            </div>
            <div className="mapa-premium reveal">
              <div className="map-zone zone-main">
                <strong>Arena de Shows</strong>
                <span>Palco, praça e ativações</span>
              </div>
              <div className="map-zone zone-agro">
                <strong>Feira Agro</strong>
                <span>Máquinas e negócios</span>
              </div>
              <div className="map-zone zone-food">
                <strong>Gastronomia</strong>
                <span>Convivência e sabores</span>
              </div>
              <div className="map-zone zone-family">
                <strong>Família</strong>
                <span>Kids e agricultura familiar</span>
              </div>
              <div className="map-path" />
            </div>
          </div>
        </section>

        <section className="noticias-section" id="noticias">
          <div className="container">
            <div className="section-head reveal">
              <div className="section-badge">Últimas notícias</div>
              <h2 className="section-title">Acompanhe os comunicados oficiais</h2>
            </div>
            <div className="news-grid">
              <article className="news-card news-card-featured reveal">
                <span>CAMPOAGRO 2026</span>
                <h3>Nova edição reforça inovação, tradição rural e entretenimento no sul do Paraná.</h3>
                <p>
                  O evento reúne feira, negócios, Tratoraço, experiências e shows em uma programação pensada para toda a
                  região.
                </p>
                <a href="https://www.instagram.com/campoagrooficial/" target="_blank" rel="noopener">
                  Ver no Instagram
                </a>
              </article>
              <article className="news-card reveal">
                <span>Shows</span>
                <h3>João Nelore e Texano confirmados como embaixadores do evento.</h3>
                <a href="#programacao">Ver programação</a>
              </article>
              <article className="news-card reveal">
                <span>Expositores</span>
                <h3>Espaços comerciais preparados para marcas do agro, varejo e serviços.</h3>
                <a href="#expositores">Quero participar</a>
              </article>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="container footer-grid">
          <div className="footer-brand">
            <img className="footer-logo" src="/assets/img/logo-campoagro.png" alt="CampoAgro Campo do Tenente" loading="lazy" />
            <p>Evento oficial do agro, inovação rural e entretenimento em Campo do Tenente, Paraná.</p>
          </div>
          <div>
            <h3>Evento</h3>
            <a href="#sobre">Sobre</a>
            <a href="#programacao">Programação</a>
            <a href="#areas">Áreas</a>
            <a href="#mapa">Mapa</a>
          </div>
          <div>
            <h3>Participe</h3>
            <a href="#patrocinadores">Patrocinadores</a>
            <a href="#expositores">Expositores</a>
            <a href="https://www.instagram.com/campoagrooficial/" target="_blank" rel="noopener">
              Instagram oficial
            </a>
          </div>
          <div>
            <h3>CAMPOAGRO 2026</h3>
            <p>
              17 a 19 de julho de 2026
              <br />
              Campo do Tenente · PR
            </p>
          </div>
        </div>
        <div className="footer-bottom">© 2026 CampoAgro. Todos os direitos reservados.</div>
      </footer>

      <div className="media-modal" data-media-modal aria-hidden="true">
        <div className="media-modal-panel" role="dialog" aria-modal="true" aria-label="Visualização de mídia">
          <button type="button" className="media-modal-close" data-media-close aria-label="Fechar">
            ×
          </button>
          <div className="media-modal-content" data-media-content />
          <div className="media-modal-meta">
            <span data-media-category />
            <strong data-media-title />
          </div>
        </div>
      </div>
    </>
  );
}
