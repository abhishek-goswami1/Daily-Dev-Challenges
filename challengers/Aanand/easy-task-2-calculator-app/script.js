const display = document.getElementById('display');
let firstValue = '';
let operator = null;
let waitingForSecondValue = false;

function updateDisplay(text) {
    display.textContent = text;
}

function calculate(a, b, op) {
    const first = parseFloat(a);
    const second = parseFloat(b);
    if (op === '+') return first + second;
    if (op === '−') return first - second;
    if (op === '×') return first * second;
    if (op === '÷') return second === 0 ? 'Error' : first / second;
    return second;
}

document.querySelector('.buttons').addEventListener('click', event => {
    const button = event.target;
    if (button.tagName !== 'BUTTON') return;

    const action = button.dataset.action;
    const buttonValue = button.textContent;
    const currentValue = display.textContent;

    if (!action) {
        if (waitingForSecondValue) {
            updateDisplay(buttonValue);
            waitingForSecondValue = false;
        } else if (currentValue === '0' || currentValue === 'Error') {
            updateDisplay(buttonValue);
        } else {
            updateDisplay(currentValue + buttonValue);
        }
        return;
    }

    if (action === 'clear') {
        updateDisplay('0');
        firstValue = '';
        operator = null;
        waitingForSecondValue = false;
        return;
    }

    if (action === 'delete') {
        if (currentValue.length === 1 || currentValue === 'Error') {
            updateDisplay('0');
            return;
        }
        updateDisplay(currentValue.slice(0, -1));
        return;
    }

    if (action === 'percent') {
        updateDisplay((parseFloat(currentValue) / 100).toString());
        return;
    }

    if (action === 'operator') {
        if (!waitingForSecondValue) {
            firstValue = currentValue;
            operator = buttonValue;
            waitingForSecondValue = true;
        } else {
            const result = calculate(firstValue, currentValue, operator);
            updateDisplay(result.toString());
            operator = buttonValue;
            firstValue = result.toString();
            waitingForSecondValue = true;
        }
        return;
    }

    if (action === 'equals') {
        if (!operator || waitingForSecondValue) return;
        const result = calculate(firstValue, currentValue, operator);
        updateDisplay(result.toString());
        operator = null;
        waitingForSecondValue = false;
    }
});
