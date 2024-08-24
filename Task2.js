document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.btn');
    const display = document.getElementById('display');
    let currentInput = '';
    let operator = '';
    let firstOperand = null;

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.getAttribute('data-value');

            if (value === 'C') {
                currentInput = '';
                firstOperand = null;
                operator = '';
                display.value = '';
                return;
            }

            if (value === '=') {
                if (operator && firstOperand !== null) {
                    currentInput = calculate(firstOperand, currentInput, operator);
                    display.value = currentInput;
                    firstOperand = null;
                    operator = '';
                }
                return;
            }

            if (['+', '-', '*', '/'].includes(value)) {
                if (firstOperand === null) {
                    firstOperand = currentInput;
                } else if (operator) {
                    firstOperand = calculate(firstOperand, currentInput, operator);
                    display.value = firstOperand;
                }
                operator = value;
                currentInput = '';
                return;
            }

            currentInput += value;
            display.value = currentInput;
        });
    });

    function calculate(first, second, operator) {
        const a = parseFloat(first);
        const b = parseFloat(second);
        switch (operator) {
            case '+': return (a + b).toString();
            case '-': return (a - b).toString();
            case '*': return (a * b).toString();
            case '/': return (a / b).toString();
        }
    }
});
