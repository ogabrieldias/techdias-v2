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


gsap.registerPlugin(ScrollTrigger);

window.addEventListener("load", () => {
    gsap
        .timeline({
            scrollTrigger: {
                trigger: ".wrapper",
                start: "top top",
                end: "+=1000%",
                pin: true,
                scrub: true,
            },
        })
        .to(".image-container img", {
            scale: 10,
            z: 250,
            transformOrigin: "center center",
        })
        .to(".mask-container", {
            clipPath: "circle(80% at 50% 50%)",
            ease: "power2.out"
        }, "<")
        .to(".intro", {
            scale: 1.7,
            ease: "power2.out"
        }, "<")
        .to(".section.hero-section", {
            scale: 1.4,
            boxShadow: `10000px 0 0 0 rgba(0,0,0,0.5) inset`,
            transformOrigin: "center center",
            clipPath: "circle(85% at 50% 50%)",
        }, "<")
        .to(".image-container", {
            autoAlpha: 0
        })
        .to([".section.hero-section", ".intro"], {
            height: 400
        });
});
