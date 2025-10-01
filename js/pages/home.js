// Seleciona elementos importantes
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('header nav a');
const sections = document.querySelectorAll('section');
const header = document.querySelector('.header');
const darkModeIcon = document.querySelector('#darkMode-icon');


// Cor da letra doo header
window.onload = () => {
  header.classList.add('sticky');
};

// Evento de clique no menu icon para abrir/fechar navbar
menuIcon.onclick = () => {
  menuIcon.classList.toggle('bx-x');
  navbar.classList.toggle('active');
};

// Evento de scroll para ativar links da navbar
window.onscroll = () => {
  let scrollY = window.scrollY;

  sections.forEach(section => {
    let offset = section.offsetTop - 150;
    let height = section.offsetHeight;
    let id = section.getAttribute('id');

    if (scrollY >= offset && scrollY < offset + height) {
        navLinks.forEach(link => link.classList.remove('active'));
        const activeLink = document.querySelector(`header nav a[href*="${id}"]`);
        if (activeLink) activeLink.classList.add('active');
    }
  });

  // Remove o efeito sticky se você não quiser que ele fique ativo durante o scroll
  // header.classList.toggle('sticky', scrollY > 1);  // Essa linha pode ser removida se não precisar mais.
};

// Fecha o menu ao clicar em qualquer link da navbar (útil para mobile)
navLinks.forEach(link => {
  link.onclick = () => {
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
  };
});

// Dark / Light mode toggle
darkModeIcon.onclick = () => {
  darkModeIcon.classList.toggle('bx-sun');
  document.body.classList.toggle('dark-mode');
};


document.querySelectorAll('.card-seta').forEach(seta => {
    seta.addEventListener('click', function() {
        const cardInfo = this.parentElement;
        cardInfo.classList.toggle('open');
    });
});


