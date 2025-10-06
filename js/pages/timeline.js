gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

window.addEventListener("load", () => {
  // === Scroll suave com GSAP ScrollSmoother ===
  const smoother = ScrollSmoother.create({
    wrapper: "#smooth-wrapper",
    content: "#smooth-content",
    smooth: 1.2,
    normalizeScroll: true,
    effects: true,
  });

  const items = gsap.utils.toArray(".timeline-item");

  // === Ativa o primeiro item no início ===
  gsap.set(items[0], { opacity: 1, scale: 1.1 });
  items[0].classList.add("active");

  // === Animação de entrada para cada card ===
  items.forEach((item, i) => {
    gsap.from(item, {
      opacity: 0,
      y: 100,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: item,
        scroller: smoother.wrapper(), // ESSENCIAL com ScrollSmoother
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });
  });

  // === Destaque conforme o scroll ===
  items.forEach((item) => {
    ScrollTrigger.create({
      trigger: item,
      scroller: smoother.wrapper(), // importante
      start: "center 75%",
      end: "bottom 50%",
      onEnter: () => activateItem(item),
      onEnterBack: () => activateItem(item),
    });
  });

  // === Função para destacar o item ativo ===
  function activateItem(activeItem) {
    items.forEach((item) => {
      const isActive = item === activeItem;
      gsap.to(item, {
        scale: isActive ? 1.1 : 0.85,
        opacity: isActive ? 1 : 0.3,
        boxShadow: isActive
          ? "0 0 60px rgba(0,255,150,0.4)"
          : "0 0 15px rgba(0,255,150,0.1)",
        duration: 0.6,
        ease: "power2.out",
      });
      item.classList.toggle("active", isActive);
    });
  }

  // === Recalibra tudo ao redimensionar ===
  ScrollTrigger.addEventListener("refresh", () => smoother.refresh());
  ScrollTrigger.refresh();
});
