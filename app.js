// Aguardar o carregamento do DOM
document.addEventListener('DOMContentLoaded', function() {
    // Capturar o formulário
    const form = document.getElementById('imc-form');
    
    // Adicionar evento de envio ao formulário
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Obter valores
        const weight = parseFloat(document.getElementById('weight').value);
        const height = parseFloat(document.getElementById('height').value);
        
        // Verificar se os valores são válidos
        if (weight <= 0 || height <= 0) {
            showResult('Por favor, insira valores válidos maiores que zero.', 'error');
            return;
        }
        
        // Calcular IMC
        const imc = weight / (height * height);
        
        // Determinar categoria
        let category, color, percentage;
        
        if (imc < 18.5) {
            category = "Abaixo do peso";
            color = "#3498db";
            percentage = 15;
        } else if (imc < 25) {
            category = "Peso normal";
            color = "#2ecc71";
            percentage = 37;
        } else if (imc < 30) {
            category = "Sobrepeso";
            color = "#f39c12";
            percentage = 63;
        } else if (imc < 35) {
            category = "Obesidade Grau I";
            color = "#e74c3c";
            percentage = 75;
        } else if (imc < 40) {
            category = "Obesidade Grau II";
            color = "#c0392b";
            percentage = 87;
        } else {
            category = "Obesidade Grau III";
            color = "#8e44ad";
            percentage = 95;
        }
        
        // Exibir resultado
        const resultText = `Seu IMC é ${imc.toFixed(2)} kg/m²<br>Classificação: <strong>${category}</strong>`;
        showResult(resultText, color);
        
        // Atualizar barra de status
        document.getElementById('status-container').style.display = 'block';
        document.getElementById('category-labels').style.display = 'flex';
        
        const statusBar = document.getElementById('status-bar');
        statusBar.style.width = '0%';
        statusBar.style.backgroundColor = color;
        
        // Animação da barra
        setTimeout(() => {
            statusBar.style.width = percentage + '%';
        }, 100);
    });
});

/**
 * Exibe o resultado do cálculo
 * @param {string} message - A mensagem a ser exibida
 * @param {string} color - A cor a ser aplicada ao resultado
 */
function showResult(message, color) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = message;
    resultDiv.style.backgroundColor = color === 'error' ? '#ffdddd' : '#f9f9f9';
    resultDiv.style.color = color === 'error' ? '#e74c3c' : '#333';
    resultDiv.style.borderLeft = color === 'error' ? '4px solid #e74c3c' : `4px solid ${color}`;
    resultDiv.style.display = 'block';
}