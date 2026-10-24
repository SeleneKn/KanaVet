/* ============================================================
   recetas.js - Generador de Recetas
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  
  // Elementos del DOM
  const nombreGatoInput = document.getElementById('nombreGato');
  const nombreTutorInput = document.getElementById('nombreTutor');
  const indicacionesInput = document.getElementById('indicaciones');
  
  const btnImprimir = document.getElementById('btnImprimir');
  const btnWhatsapp = document.getElementById('btnWhatsapp');
  const btnCorreo = document.getElementById('btnCorreo');

  // Función para validar que los campos estén llenos
  function validarFormulario() {
    if (!nombreGatoInput.value.trim() || !nombreTutorInput.value.trim() || !indicacionesInput.value.trim()) {
      alert("Por favor, llena todos los campos antes de continuar 🐾");
      return false;
    }
    return true;
  }

  // --- 1. FUNCIÓN IMPRIMIR ---
  if (btnImprimir) {
    btnImprimir.addEventListener('click', () => {
      if (!validarFormulario()) return;
      
      playCuteSound('click');
      // window.print() abre el diálogo de impresión usando los estilos @media print
      window.print();
    });
  }

  // --- 2. FUNCIÓN ENVIAR POR WHATSAPP ---
  if (btnWhatsapp) {
    btnWhatsapp.addEventListener('click', () => {
      if (!validarFormulario()) return;
      
      playCuteSound('meow');
      
      const gato = nombreGatoInput.value.trim();
      const tutor = nombreTutorInput.value.trim();
      const indicaciones = indicacionesInput.value.trim();
      
      // Construir el mensaje con formato de WhatsApp (*negritas*)
      const mensaje = `*🐾 Dra. Araceli Kanagusico` +
                      `*Paciente:* ${gato}%0A` +
                      `*Tutor:* ${tutor}%0A%0A` +
                      `*Indicaciones y Medicamentos:*%0A${indicaciones}%0A%0A` +
                      `_Por favor, sigue las instrucciones al pie de la letra. ¡Miau!_`;
      
      // Abrir WhatsApp Web / App
      // Nota: Si tuvieras el número del tutor, lo pondrías después de wa.me/
      window.open(`https://wa.me/?text=${mensaje}`, '_blank');
    });
  }

  // --- 3. FUNCIÓN ENVIAR POR CORREO ---
  if (btnCorreo) {
    btnCorreo.addEventListener('click', () => {
      if (!validarFormulario()) return;
      
      playCuteSound('click');
      
      const gato = nombreGatoInput.value.trim();
      const tutor = nombreTutorInput.value.trim();
      const indicaciones = indicacionesInput.value.trim();
      
      // Construir el correo
      const asunto = `Receta Médica Felina - Paciente: ${gato}`;
      const cuerpo = `Hola ${tutor},\n\n` +
                     `Adjunto las indicaciones médicas para tu michi "${gato}" de parte de la Dra. A. Kanagusico.\n\n` +
                     `--- INDICACIONES Y MEDICAMENTOS ---\n` +
                     `${indicaciones}\n\n` +
                     `-----------------------------------\n` +
                     `Dra. A. Kanagusico | KanaVet\n` +
                     `Especialista en Medicina Felina\n\n` +
                     `¡Que se mejore pronto! 🐾`;
      
      // mailto: abre la aplicación de correo por defecto del usuario
      const mailtoLink = `mailto:?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpo)}`;
      window.location.href = mailtoLink;
    });
  }
});