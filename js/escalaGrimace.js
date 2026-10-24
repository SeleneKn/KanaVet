/* ============================================================
   grimace.js - Escala Grimace Felina
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  
  const btnEvaluar = document.getElementById('btnEvaluar');
  const orejasSelect = document.getElementById('orejas');
  const ojosSelect = document.getElementById('ojos');
  const hocicoSelect = document.getElementById('hocico');
  
  const resultBox = document.getElementById('resultBox');
  const totalPuntosDisplay = document.getElementById('totalPuntos');
  const alertaDolor = document.getElementById('alertaDolor');

  if (btnEvaluar) {
    btnEvaluar.addEventListener('click', () => {
      
      // 1. Obtener los valores (se convierten a número)
      const puntosOrejas = parseInt(orejasSelect.value);
      const puntosOjos = parseInt(ojosSelect.value);
      const puntosHocico = parseInt(hocicoSelect.value);

      // 2. Sumar el total
      const total = puntosOrejas + puntosOjos + puntosHocico;

      // 3. Mostrar el puntaje
      totalPuntosDisplay.textContent = total;
      resultBox.style.display = 'block';

      // 4. Evaluar según la escala oficial
      alertaDolor.className = 'alert-message'; // Resetear clases
      
      if (total === 0) {
        alertaDolor.textContent = "✅ Sin dolor evidente. El michi está relajado.";
        alertaDolor.classList.add('alert-green');
        playCuteSound('meow');
      } 
      else if (total >= 1 && total <= 3) {
        alertaDolor.textContent = "⚠️ Dolor leve a moderado. Considerar analgesia.";
        alertaDolor.classList.add('alert-yellow');
        playCuteSound('click');
      } 
      else if (total >= 4) {
        alertaDolor.textContent = "🚨 Dolor severo. Requiere intervención analgésica urgente.";
        alertaDolor.classList.add('alert-red');
        playCuteSound('click');
      }
      
    });
  }
});