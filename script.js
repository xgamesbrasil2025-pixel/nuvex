(() => {
  const WHATSAPP_NUMBER = "5575981463437";

  const header = document.querySelector(".site-header");
  const menuButton = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".main-nav");

  const closeMenu = () => {
    menu.classList.remove("open");
    document.body.classList.remove("menu-open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Abrir menu");
    menuButton.querySelector("use").setAttribute("href", "#i-menu");
  };

  menuButton.addEventListener("click", () => {
    const open = !menu.classList.contains("open");
    menu.classList.toggle("open", open);
    document.body.classList.toggle("menu-open", open);
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    menuButton.querySelector("use").setAttribute("href", open ? "#i-close" : "#i-menu");
  });

  menu.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMenu));
  window.addEventListener("scroll", () => header.classList.toggle("scrolled", window.scrollY > 28), { passive: true });

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("in-view");
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: .12, rootMargin: "0px 0px -30px" });

  document.querySelectorAll(".reveal").forEach(el => {
    if (el.dataset.delay) el.style.setProperty("--delay", `${el.dataset.delay}ms`);
    revealObserver.observe(el);
  });

  const heroVisual = document.querySelector(".hero-visual");
  if (heroVisual && matchMedia("(pointer:fine)").matches && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    heroVisual.addEventListener("pointermove", event => {
      const rect = heroVisual.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - .5;
      const y = (event.clientY - rect.top) / rect.height - .5;
      heroVisual.style.setProperty("--mx", `${x * 4}deg`);
      heroVisual.style.setProperty("--my", `${y * -4}deg`);
    });
    heroVisual.addEventListener("pointerleave", () => {
      heroVisual.style.setProperty("--mx", "0deg");
      heroVisual.style.setProperty("--my", "0deg");
    });
  }

  const segmentContent = {
    lojas: {
      index: "01",
      title: "Uma vitrine digital que trabalha pelo seu negócio.",
      text: "Apresente produtos com clareza, conecte campanhas a páginas rápidas e organize cada novo contato desde a primeira mensagem.",
      bullets: ["Catálogo e ofertas em destaque", "Páginas para campanhas", "Leads organizados no CRM"],
      label: "Solução para lojas",
      accent: "#f50087",
      desktopImage: "assets/decor-premium-desktop.png",
      desktopAlt: "Exemplo da loja Decor Premium na versão para computador",
      desktopSize: [1413, 776],
      mobileImage: "assets/decor-premium-mobile.png",
      mobileAlt: "Exemplo da loja Decor Premium na versão para celular",
      mobileSize: [307, 682]
    },
    clinicas: {
      index: "02",
      title: "Confiança antes mesmo da primeira consulta.",
      text: "Mostre especialidades, facilite pedidos de agendamento e crie uma experiência acolhedora em cada tela.",
      bullets: ["Serviços apresentados com clareza", "Agendamento direcionado", "Relacionamento organizado"],
      label: "Solução para clínicas",
      accent: "#ff67b5",
      desktopImage: "assets/clinic-gloventu-desktop.png",
      desktopAlt: "Exemplo de site para clínica de estética na versão para computador",
      desktopSize: [1405, 770],
      mobileImage: "assets/clinic-beauty-mobile.png",
      mobileAlt: "Exemplo de site para clínica de estética na versão para celular",
      mobileSize: [305, 682]
    },
    advocacia: {
      index: "03",
      title: "Presença sóbria, clara e profissional.",
      text: "Apresente áreas de atuação com credibilidade e organize o contato inicial de potenciais clientes.",
      bullets: ["Posicionamento institucional", "Conteúdo de fácil navegação", "Gestão de oportunidades"],
      label: "Solução para advocacia",
      accent: "#b91c76",
      desktopImage: "assets/advocacia-jdw-desktop.png",
      desktopAlt: "Exemplo de site institucional para escritório de advocacia na versão para computador",
      desktopSize: [1418, 768],
      mobileImage: "assets/advocacia-vagner-mobile.png",
      mobileAlt: "Exemplo de site institucional para escritório de advocacia na versão para celular",
      mobileSize: [296, 673]
    },
    servicos: {
      index: "04",
      title: "Seu serviço explicado do jeito certo.",
      text: "Conecte proposta de valor, portfólio e contato em uma jornada simples para quem precisa decidir.",
      bullets: ["Landing pages objetivas", "Portfólio e diferenciais", "Automação do atendimento"],
      label: "Solução para serviços",
      accent: "#f50087",
      desktopImage: "assets/crm-atelie-vera-desktop.png",
      desktopAlt: "Exemplo de CRM para gestão comercial na versão para computador",
      desktopSize: [1695, 928],
      mobileImage: "assets/crm-solaris-mobile.png",
      mobileAlt: "Exemplo de CRM imobiliário na versão para celular",
      mobileSize: [839, 1875]
    },
    empresas: {
      index: "05",
      title: "Uma base digital pronta para evoluir.",
      text: "Integre presença institucional, processos internos e novas ferramentas em uma solução coerente com a operação.",
      bullets: ["Site institucional", "Sistemas sob medida", "Integrações e automações"],
      label: "Solução para empresas",
      accent: "#151b2b",
      desktopImage: "assets/empresa-norte-logistica-desktop.png",
      desktopAlt: "Exemplo de sistema empresarial de logística na versão para computador",
      desktopSize: [1694, 929],
      mobileImage: "assets/empresa-vertice-mobile.png",
      mobileAlt: "Exemplo de sistema empresarial para colaboradores na versão para celular",
      mobileSize: [839, 1875]
    }
  };

  const panel = document.querySelector(".segment-panel");
  const tabs = document.querySelectorAll(".segment-tab");
  const preview = panel.querySelector(".segment-preview");
  const desktopPreview = panel.querySelector(".store-laptop-display img");
  const mobilePreview = panel.querySelector(".store-phone-display img");
  const renderSegment = key => {
    const data = segmentContent[key];
    const copy = panel.querySelector(".segment-copy");
    const deviceStage = panel.querySelector(".store-device-stage");
    copy.style.opacity = "0";
    copy.style.transform = "translateY(8px)";
    deviceStage.classList.add("is-switching");
    setTimeout(() => {
      copy.querySelector(".segment-index b").textContent = data.index;
      copy.querySelector("h3").textContent = data.title;
      copy.querySelector(":scope > p").textContent = data.text;
      copy.querySelector("ul").innerHTML = data.bullets.map(item => `<li><svg><use href="#i-check"></use></svg>${item}</li>`).join("");
      const link = copy.querySelector(".text-link");
      link.dataset.service = data.label;
      panel.style.setProperty("--segment-accent", data.accent);
      preview.setAttribute("aria-label", `Exemplos demonstrativos para ${data.label.toLowerCase()}`);
      desktopPreview.src = data.desktopImage;
      desktopPreview.alt = data.desktopAlt;
      desktopPreview.width = data.desktopSize[0];
      desktopPreview.height = data.desktopSize[1];
      mobilePreview.src = data.mobileImage;
      mobilePreview.alt = data.mobileAlt;
      mobilePreview.width = data.mobileSize[0];
      mobilePreview.height = data.mobileSize[1];
      copy.style.opacity = "1";
      copy.style.transform = "translateY(0)";
      deviceStage.classList.remove("is-switching");
    }, 140);
  };

  tabs.forEach(tab => tab.addEventListener("click", () => {
    tabs.forEach(item => { item.classList.toggle("active", item === tab); item.setAttribute("aria-selected", String(item === tab)); });
    renderSegment(tab.dataset.segment);
  }));

  document.querySelectorAll("[data-service]").forEach(link => link.addEventListener("click", () => {
    const select = document.querySelector("select[name='solucao']");
    const requested = link.dataset.service;
    const matching = [...select.options].find(option => requested.toLowerCase().includes(option.value.toLowerCase()) || option.value.toLowerCase().includes(requested.toLowerCase()));
    if (matching) select.value = matching.value;
  }));

  document.querySelectorAll(".faq-list details").forEach(detail => detail.addEventListener("toggle", () => {
    if (!detail.open) return;
    document.querySelectorAll(".faq-list details").forEach(other => { if (other !== detail) other.open = false; });
  }));

  document.getElementById("quote-form").addEventListener("submit", event => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const nome = String(data.get("nome") || "").trim();
    const empresa = String(data.get("empresa") || "").trim();
    const solucao = String(data.get("solucao") || "").trim();
    const detalhes = String(data.get("mensagem") || "").trim();
    const apresentacao = empresa
      ? `Meu nome é *${nome}* e falo em nome da empresa/negócio *${empresa}*.`
      : `Meu nome é *${nome}*.`;
    const message = [
      "Olá, NUVEX! Tudo bem?",
      "",
      apresentacao,
      `Tenho interesse em desenvolver: *${solucao}*.`,
      "",
      `Sobre o projeto: ${detalhes || "Prefiro explicar melhor durante a conversa."}`,
      "",
      "Gostaria de entender os próximos passos e receber uma proposta."
    ].join("\n");
    const base = WHATSAPP_NUMBER ? `https://wa.me/${WHATSAPP_NUMBER}` : "https://wa.me/";
    window.open(`${base}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
    event.currentTarget.querySelector(".form-status").textContent = WHATSAPP_NUMBER ? "Abrindo o WhatsApp..." : "WhatsApp aberto com a mensagem pronta. Adicione o número comercial no arquivo script.js para direcionamento automático.";
  });

  document.getElementById("year").textContent = new Date().getFullYear();
})();
