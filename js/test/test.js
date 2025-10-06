//   gsap.registerPlugin(ScrollTrigger);

//   // Zoom no conteúdo dentro da fechadura
//   gsap.to(".intro", {
//     scrollTrigger: {
//       trigger: ".wrapper",
//       start: "top top",
//       end: "bottom center",
//       scrub: true
//     },
//     scale: 3,
//     ease: "power2.out"
//   });

//   // Expansão da máscara (buraco da fechadura)
//   gsap.to(".mask-container", {
//     scrollTrigger: {
//       trigger: ".wrapper",
//       start: "top top",
//       end: "bottom center",
//       scrub: true
//     },
//     clipPath: "circle(150% at 50% 50%)",
//     ease: "power2.out"
//   });


gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

window.addEventListener("load", () => {
  const wrapper = document.querySelector(".wrapper");
  const content = document.querySelector(".content");
  const heroSection = document.querySelector(".hero-section");

  // Bloqueia o scroll manual inicialmente
  document.body.style.overflow = "hidden";

  // === Timeline da intro ===
  const tl = gsap.timeline({ paused: true });

  tl.to(".image-container img", {
    scale: 12,
    z: 250,
    transformOrigin: "center center",
    duration: 3.5
  })
    .to(".mask-container", {
      clipPath: "circle(60% at 50% 50%)",
      ease: "power2.out",
      duration: 2
    }, "<")
    .to(".intro", {
      scale: 1.0,
      ease: "power2.out",
      duration: 1.5
    }, "<")
    .to(".section.hero-section", {
      scale: 1.2,
      boxShadow: `10000px 0 0 0 rgba(0,0,0,0.5) inset`,
      transformOrigin: "center center",
      clipPath: "circle(70% at 50% 50%)",
      duration: 2
    }, "<")
    .to(".image-container", {
      autoAlpha: 0,
      duration: 1
    })
    .to([".section.hero-section", ".intro"], {
      height: 600,
      duration: 1.5
    });

  let isAnimating = false;
  let currentState = "top"; // "top" (wrapper) ou "hero"

  function autoScrollTo(target, reverse = false) {
    if (isAnimating) return;
    isAnimating = true;
    document.body.style.overflow = "hidden";

    gsap.to(window, {
      scrollTo: target,
      duration: 1.5,
      ease: "power2.inOut",
      onStart: () => {
        if (reverse) tl.reverse();
        else tl.play();
      },
      onComplete: () => {
        isAnimating = false;
        document.body.style.overflow = "auto";
        currentState = reverse ? "top" : "hero";
      }
    });
  }

  // === Evento do mouse ===
  window.addEventListener(
    "wheel",
    (e) => {
      if (isAnimating) {
        e.preventDefault();
        return;
      }

      const heroBounds = heroSection.getBoundingClientRect();
      const heroVisible =
        heroBounds.bottom > window.innerHeight * 0.2 &&
        heroBounds.top < window.innerHeight * 0.8;

      // Empurrão pra baixo — só se estiver no topo (wrapper)
      if (e.deltaY > 25 && currentState === "top") {
        e.preventDefault();
        autoScrollTo(content, false);
      }

      // Empurrão pra cima — só se estiver na hero-section e ela ainda visível
      else if (e.deltaY < -80 & currentState === "hero" && heroVisible) {
        e.preventDefault();
        autoScrollTo(wrapper, true);
      }
    },
    { passive: false }
  );

  // === Atualiza estado via ScrollTrigger pra sincronizar com rolagem ===
  ScrollTrigger.create({
    trigger: ".hero-section",
    start: "top top",
    end: "bottom top",
    onEnter: () => (currentState = "hero"),
    onLeaveBack: () => (currentState = "top")
  });
  
});
