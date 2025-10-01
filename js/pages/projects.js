// 🧠 Mapeamento de ícones Font Awesome para cada tecnologia
const techIconMap = {
  "JavaScript": "fab fa-js",
  "Python": "fab fa-python",
  "Flask": "bx bxl-flask",
  "HTML": "fab fa-html5",
  "CSS": "fab fa-css3-alt",
  "Node.js": "fab fa-node-js",
  "React.js": "fab fa-react",
  "MongoDB": "fas fa-database",
  "AWS S3": "fab fa-aws",
  "Chatbot IA": "fas fa-robot",
  "OTP por Email": "fas fa-envelope",
  "Vue.js": "fab fa-vuejs",
  "Supabase": "fas fa-database",
  "TailwindCSS": "fas fa-wind",
  "Dark Mode": "fas fa-adjust"
};

// 🎨 Mapeamento de cores personalizadas para cada tecnologia 
const techColorMap = { 
  "Node.js": "#68a063", 
  "React.js": "#61dafb", 
  "MongoDB": "#47a248", 
  "AWS S3": "#ff9900", 
  "Chatbot IA": "#9f7aea", 
  "OTP por Email": "#f59e0b", 
  "Vue.js": "#403f80ff", 
  "Supabase": "#3ecf8e", 
  "TailwindCSS": "#38bdf8", 
  "Dark Mode": "#ffffffff",
  "JavaScript": "#f7df1e",
  "Python": "#3776ab",
  "Flask": "#000000",
  "HTML": "#e34f26",
  "CSS": "#1572b6"
};


// 🎨 Mapeamento de cores personalizadas para cada projeto
const projectColorMap = {
  "Clima": "#560BAD",           // Vermelho
  "Cardápio Digital": "#550000", // Verde
  "Portfolio": "#03045E",        // Cinza
  "Android": "#38B000",          // Amarelo
  "Login": "#3B0A45",            // Azul
  "Social": "#6F4518"            // Rosa
};

// 🔍 Seleciona todos os elementos de projeto na página
const projects = document.querySelectorAll('.project_container');

// 🎯 Seleciona os elementos onde os dados do projeto serão exibidos
const titleEl = document.getElementById('projectTitle');
const paragraphEl = document.getElementById('projectParagraph');
const iconsEl = document.getElementById('projectIcons');

// 👁️ Cria um observer para detectar quando um projeto entra na tela
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const title = entry.target.getAttribute('data-title');
      const paragraph = entry.target.getAttribute('data-paragraph');
      const tools = entry.target.getAttribute('data-tools');

      // Atualize o JavaScript para aplicar o link
      const link = entry.target.getAttribute('data-link');
      const siteButton = document.querySelector('.site_button_project a');
      if (siteButton) {
        siteButton.href = link;
        siteButton.target = "_blank";
      }

      // 📝 Atualiza título e parágrafo
      titleEl.textContent = title;
      paragraphEl.textContent = paragraph;

      // 🎨 Aplica cor ao título com base no nome do projeto
      const titleColor = projectColorMap[title] || '#ffffff'; // Branco como fallback
      titleEl.style.color = titleColor;

      // 🧹 Limpa ícones anteriores
      iconsEl.innerHTML = '';

      // 🔄 Para cada tecnologia, cria um ícone com cor personalizada
      tools.split(',').forEach(tool => {
        const tech = tool.trim(); // Remove espaços extras
        const iconClass = techIconMap[tech] || 'fas fa-tools'; // Ícone padrão se não encontrado
        const iconColor = techColorMap[tech] || '#00ffcc';// Cor padrão se não encontrado

        const iconDiv = document.createElement('div');
        Object.assign(iconDiv.style, {
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          backgroundColor: '#374151',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 10px rgba(0,0,0,0.3)',
          margin: '5px'
        });

        const icon = document.createElement('i');
        icon.className = iconClass;
        icon.style.color = iconColor;
        icon.style.fontSize = '22px';

        iconDiv.appendChild(icon);
        iconsEl.appendChild(iconDiv);
      });
    }
  });
}, {
  threshold: 0.65
});

// 📡 Ativa o observer para cada projeto
projects.forEach(project => observer.observe(project));


