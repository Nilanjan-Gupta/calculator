const inputBox = document.getElementById('inputbox');
const buttons = document.querySelectorAll('button');

let currentInput = '';
let lastInput = '';
let operatorSet = false;

function updateDisplay(value) {
    inputBox.value = value || '0';
}

buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        const btnValue = e.target.textContent;

        if (btnValue === 'AC') {
            currentInput = '';
            updateDisplay(currentInput);
        } else if (btnValue === 'DEL') {
            currentInput = currentInput.slice(0, -1);
            updateDisplay(currentInput);
        } else if (btnValue === '=') {
            try {
                let expression = currentInput
                    .replace(/÷/g, '/')
                    .replace(/x/g, '*');
                let result = eval(expression);
                updateDisplay(result);
                currentInput = result.toString();
            } catch {
                updateDisplay('Error');
                currentInput = '';
            }
        } else if (btnValue === '%') {
            if (currentInput) {
                try {
                    let expression = currentInput
                        .replace(/÷/g, '/')
                        .replace(/x/g, '*');
                    let result = eval(expression) / 100;
                    updateDisplay(result);
                    currentInput = result.toString();
                } catch {
                    updateDisplay('Error');
                    currentInput = '';
                }
            }
        } else {
            // Prevent multiple operators in a row
            if (['+', '-', 'x', '÷'].includes(btnValue)) {
                if (currentInput === '' || /[+\-x÷]$/.test(currentInput)) return;
            }
            // Prevent multiple decimals in a number
            if (btnValue === '.') {
                const parts = currentInput.split(/[+\-x÷]/);
                if (parts[parts.length - 1].includes('.')) return;
            }
            currentInput += btnValue;
            updateDisplay(currentInput);
        }
    });
});

updateDisplay(currentInput);