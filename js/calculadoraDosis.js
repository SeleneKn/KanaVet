
function calculateDose() {
      const weight = parseFloat(document.getElementById('weight').value);
      const dose = parseFloat(document.getElementById('dose').value);
      const concentration = parseFloat(document.getElementById('concentration').value);

      const totalMg = weight * dose;
      const totalMl = totalMg / concentration;

      document.getElementById('totalMg').textContent = totalMg.toFixed(2);
      document.getElementById('totalMl').textContent = totalMl.toFixed(2);

      const resultBox = document.getElementById('resultBox');

      resultBox.style.display = 'block';
    }


calculateDose();

