// --- Variables del Contador ---
let pulseCount = 0;
let startTime = null;
let timerInterval = null;
let isMeasuring = false;

// --- Elementos del DOM ---
const pulseBtn = document.getElementById('pulseBtn');
const pulseCountDisplay = document.getElementById('pulseCount');
const resetBtn = document.getElementById('resetBtn');
const timerDisplay = document.getElementById('timerDisplay');
const bpmDisplay = document.getElementById('bpmDisplay');

// --- Funciones ---
function updateDisplay() {
  pulseCountDisplay.textContent = pulseCount;
}

// Formatear el tiempo en MM:SS
function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
  const seconds = (totalSeconds % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
}

// Actualizar el reloj en tiempo real
function updateTimer() {
  if (!startTime) return;
  const elapsed = Date.now() - startTime;
  
  // 1. Mostrar tiempo en el reloj (MM:SS)
  timerDisplay.textContent = formatTime(elapsed);

  // 2. Método Veterinario de 15 segundos
  if (elapsed > 15000) {
    // Si ya pasaron los 15 segundos, se detiene la medición automáticamente
    clearInterval(timerInterval);
    isMeasuring = false;
    
    // Cálculo final: Latidos contados * 4 = PPM
    const finalBpm = pulseCount * 4;
    bpmDisplay.textContent = `${finalBpm} PPM`;
    
    // Cambiar color según si está sano o no
    if (finalBpm >= 120 && finalBpm <= 220) {
      bpmDisplay.style.color = '#4ade80'; // Verde (Normal)
    } else {
      bpmDisplay.style.color = '#f87171'; // Rojo (Alerta)
    }

    // Deshabilitar el botón (opcional, para que ya no cuenten más)
    // pulseBtn.disabled = true;
    
  } else if (elapsed > 0 && isMeasuring) {
    // Mientras corre el tiempo (0 a 15 seg), calcular el estimado en tiempo real
    // Fórmula: (pulsos / segundos transcurridos) * 60
    const elapsedSeconds = elapsed / 1000;
    const currentBpm = Math.round((pulseCount / elapsedSeconds) * 60);
    
    bpmDisplay.textContent = `${currentBpm} PPM (Midiendo...)`;
    bpmDisplay.style.color = '#FF8CA3'; // Color rosa normal
  }
}

// --- Lógica al hacer clic en el corazón ---
if (pulseBtn) {
  pulseBtn.addEventListener('click', (e) => {
    e.stopPropagation();

    // Si ya pasaron los 15 segundos, no dejamos que siga sumando
    if (!isMeasuring && startTime !== null) {
       return; 
    }
    
    // Si es el primer clic, iniciar el cronómetro
    if (pulseCount === 0) {
      startTime = Date.now();
      isMeasuring = true;
      timerInterval = setInterval(updateTimer, 1000); // Actualiza cada segundo
      
      // Reiniciamos estilos por si acaso
      bpmDisplay.style.color = '#FF8CA3';
    }

    // Aumentar contador
    pulseCount++;
    updateDisplay();

    // Sonido y animación
    playCuteSound('meow');
    pulseBtn.classList.add('beat');
    createParticle(e.clientX, e.clientY);

    setTimeout(() => pulseBtn.classList.remove('beat'), 600);
  });
}

// --- Lógica para reiniciar ---
if (resetBtn) {
  resetBtn.addEventListener('click', () => {
    // Reiniciar valores
    pulseCount = 0;
    startTime = null;
    isMeasuring = false;
    clearInterval(timerInterval);
    
    // Reiniciar pantalla
    updateDisplay();
    timerDisplay.textContent = '00:00';
    bpmDisplay.textContent = '0 PPM';
    bpmDisplay.style.color = '#FF8CA3';
    
    playCuteSound('click');
  });
}

// Partículas
function createParticle(x, y) {
  const particle = document.createElement('div');
  particle.className = 'paw-particle';
  particle.innerHTML = '💖';
  const randomX = x + (Math.random() - 0.5) * 100;
  const randomY = y + (Math.random() - 0.5) * 100;
  particle.style.left = `${randomX}px`;
  particle.style.top = `${randomY}px`;
  document.body.appendChild(particle);
  setTimeout(() => particle.remove(), 700);
}

// Inicializar
document.addEventListener("DOMContentLoaded", () => {
  updateDisplay();
});