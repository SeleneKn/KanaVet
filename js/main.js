/* ============================================================
   main.js - Dra. Kana / kanavet
   ============================================================ */

// ---------- Estado Global ----------
let soundEnabled = true;

// ---------- Audio sintetizado (meow / click) ----------
function playCuteSound(type = 'click') {
  if (!soundEnabled) return;
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === 'meow') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(400, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(750, ctx.currentTime + 0.15);
      osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.35);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);
      osc.start(); osc.stop(ctx.currentTime + 0.35);
    } else {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(350, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);
      osc.start(); osc.stop(ctx.currentTime + 0.08);
    }
  } catch (e) {}
}

// ---------- Función para Cargar el Menú y el Footer ----------
function cargarComponente(rutaArchivo, idContainer, callback) {
  fetch(rutaArchivo)
    .then(respuesta => {
      if (!respuesta.ok) throw new Error(`No se pudo cargar: ${rutaArchivo}`);
      return respuesta.text();
    })
    .then(htmlContenido => {
      const contenedor = document.getElementById(idContainer);
      if (contenedor) {
        contenedor.outerHTML = htmlContenido;
        // Si hay una función de callback (como activar los botones), la ejecutamos
        if (callback) callback(); 
      }
    })
    .catch(error => console.error("Error al cargar componente:", error));
}

// ---------- Lógica de Botones (Sonido, Tema, etc.) ----------
function inicializarBotones() {
  const soundToggle = document.getElementById('soundToggle');
  const soundIcon = document.getElementById('soundIcon');
  const bgMusic = document.getElementById('bgMusic');
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');

  // 1. Música y Sonido
  if (soundToggle) {
    soundToggle.addEventListener('click', (e) => {
      e.stopPropagation(); 
      soundEnabled = !soundEnabled;
      
      if (soundEnabled) {
        soundIcon.className = 'fa-solid fa-volume-high';
        soundIcon.style.color = 'var(--pink-accent)';
        playCuteSound('meow');
        if (bgMusic) {
          bgMusic.volume = 0.5;
          bgMusic.play().catch(() => {});
        }
      } else {
        soundIcon.className = 'fa-solid fa-volume-xmark';
        soundIcon.style.color = '#9ca3af';
        if (bgMusic) bgMusic.pause();
      }
    });
  }

  // 2. Modo Oscuro
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isDark = !document.documentElement.classList.contains('dark');
      document.documentElement.classList.toggle('dark', isDark);
      document.body.classList.toggle('dark', isDark);
      
      themeIcon.className = isDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
      themeIcon.style.color = isDark ? '#facc15' : '#7c3aed';
      localStorage.setItem('michi-theme', isDark ? 'dark' : 'light');
      
      playCuteSound('click');
    });
  }

  // 3. Dropdown Sonido
  const toolsDropdown = document.querySelector('.nav-item.dropdown > .dropdown-toggle');
  if (toolsDropdown) {
    toolsDropdown.addEventListener('click', () => playCuteSound('click'));
  }
  
  // 4. Cerrar menú en móvil
  document.querySelectorAll('#navMain .nav-link-custom, #navMain .dropdown-item').forEach(link => {
    link.addEventListener('click', () => {
      const collapseEl = document.getElementById('navMain');
      if (collapseEl && collapseEl.classList.contains('show')) {
        const bsCollapse = bootstrap.Collapse.getInstance(collapseEl);
        bsCollapse && bsCollapse.hide();
      }
    });
  });
}

// ---------- Inicialización de la Página ----------
document.addEventListener("DOMContentLoaded", () => {
  
  // Cargar el menú y CUANDO termine, activar sus botones
  cargarComponente("../html/menu.html", "menuContainer", inicializarBotones);
  
  // Cargar el footer
  cargarComponente("../html/footer.html", "footerContainer");

  // Autoplay Música (Primer clic en cualquier lado)
  document.addEventListener('click', function iniciarMusica() {
    const bgMusic = document.getElementById('bgMusic');
    if (soundEnabled && bgMusic && bgMusic.paused) {
      bgMusic.volume = 0.5; 
      bgMusic.play().catch(() => {});
    }
  }, { once: true });

  // Cargar tema guardado en el navegador
  const savedTheme = localStorage.getItem('michi-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const isDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
  if (isDark) {
    document.documentElement.classList.add('dark');
    document.body.classList.add('dark');
  }

  // Partículas de patitas
  document.addEventListener('click', function (e) {
    const paw = document.createElement('div');
    paw.className = 'paw-particle';
    paw.innerHTML = '🐾';
    paw.style.left = `${e.clientX}px`;
    paw.style.top = `${e.clientY}px`;
    document.body.appendChild(paw);
    setTimeout(() => paw.remove(), 700);
  });

  // Formulario de contacto (Solo si estamos en el index)
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      playCuteSound('meow');
      const btn = contactForm.querySelector('button[type="submit"]');
      if (btn) {
        const original = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check"></i> ¡Enviado!';
        btn.style.backgroundColor = '#4ade80';
        setTimeout(() => {
          btn.innerHTML = original;
          btn.style.backgroundColor = '';
          contactForm.reset();
        }, 2200);
      }
    });
  }
});