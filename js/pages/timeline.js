document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

  const wrapper = document.querySelector(".timeline-wrapper");
  const items = gsap.utils.toArray(".timeline-item");
  const path = document.querySelector(".timeline-path path");

  // === Scroll horizontal controlado pelo scroll vertical ===
  const horizontalScroll = gsap.to(wrapper, {
    x: () => -(wrapper.scrollWidth - window.innerWidth),
    ease: "none",
    scrollTrigger: {
      trigger: ".timeline-horizontal-section",
      start: "top top",
      end: () => "+=" + (wrapper.scrollWidth - window.innerWidth),
      scrub: 1.5,
      pin: true,
      anticipatePin: 1,
    },
  });

  // === Linha SVG interativa sincronizada com o scroll ===
  const pathLength = path.getTotalLength();
  path.style.strokeDasharray = pathLength;
  path.style.strokeDashoffset = pathLength;

  gsap.to(path, {
    strokeDashoffset: 0,
    ease: "none",
    scrollTrigger: {
      trigger: ".timeline-horizontal-section",
      start: "top top",
      end: () => "+=" + (wrapper.scrollWidth - window.innerWidth),
      scrub: 1.5,
    },
  });

  // === Cards com destaque em foco ===
  items.forEach((item) => {
    ScrollTrigger.create({
      trigger: item,
      containerAnimation: horizontalScroll.scrollTrigger,
      start: "center center",
      end: "center center",
      onEnter: () => activateItem(item),
      onEnterBack: () => activateItem(item),
    });
  });

  function activateItem(activeItem) {
    items.forEach((item) => {
      const isActive = item === activeItem;
      gsap.to(item, {
        scale: isActive ? 1.1 : 0.9,
        opacity: isActive ? 1 : 0.4,
        duration: 0.6,
        ease: "power3.out",
      });
      item.classList.toggle("active", isActive);
    });
  }
});
