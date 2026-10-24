/* ============================================================
   nutricion.js - Calculadora de Calorías Felinas
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  
  const btnCalcular = document.getElementById('btnCalcular');
  const pesoInput = document.getElementById('pesoGato');
  const estadoSelect = document.getElementById('estadoGato');
  const resultBox = document.getElementById('resultBox');
  const totalKcalDisplay = document.getElementById('totalKcal');
  const notaResultado = document.getElementById('notaResultado');

  if (btnCalcular) {
    btnCalcular.addEventListener('click', () => {
      const peso = parseFloat(pesoInput.value);
      const estado = estadoSelect.value;

      if (!peso || peso <= 0) {
        alert("Por favor, ingresa un peso válido para el michi 🐾");
        return;
      }

      // 1. Calcular RER (Resting Energy Requirement) - Fórmula universal
      // RER = 70 * (Peso en kg ^ 0.75)
      const rer = 70 * Math.pow(peso, 0.75);

      // 2. Aplicar Factor de Estado (DER - Daily Energy Requirement)
      let factor = 1.2; // Por defecto
      let nota = "";

      switch (estado) {
        case "esterilizado":
          factor = 1.2;
          nota = "Mantenimiento para gato esterilizado.";
          break;
        case "entero":
          factor = 1.4;
          nota = "Mantenimiento para gato no esterilizado.";
          break;
        case "obesidad":
          factor = 1.0; // 1.0 para bajar de peso
          nota = "Ración para promover la pérdida de peso.";
          break;
        case "perdida":
          factor = 1.1;
          nota = "Ración para ganar peso gradualmente.";
          break;
        case "cachorro":
          factor = 2.5; // Gatitos menores de 4 meses (puede variar)
          nota = "Alta energía requerida por crecimiento.";
          break;
        case "gestacion":
          factor = 2.0;
          nota = "Requiere energía extra por embarazo o lactancia.";
          break;
      }

      // 3. Calcular total diario
      const kcalDiarias = rer * factor;

      // 4. Mostrar resultados
      totalKcalDisplay.textContent = Math.round(kcalDiarias);
      notaResultado.textContent = nota;
      
      resultBox.style.display = 'block';
      
      // Sonido de confirmación
      playCuteSound('meow');
    });
  }
});