class Calculator {
    constructor() {
        this.display = document.getElementById('display');
        this.historyList = document.getElementById('historyList');
        this.currentValue = '0';
        this.previousValue = '';
        this.operation = null;
        this.history = this.loadHistory();
        this.renderHistory();
    }

    appendNumber(num) {
        if (num === '.' && this.currentValue.includes('.')) return;
        
        if (this.currentValue === '0' && num !== '.') {
            this.currentValue = num;
        } else if (this.currentValue === '0' && num === '.') {
            this.currentValue = '0.';
        } else {
            this.currentValue += num;
        }
        
        this.updateDisplay();
    }

    appendOperator(op) {
        if (this.currentValue === '') return;
        
        if (this.previousValue !== '') {
            this.calculate();
        }
        
        this.operation = op;
        this.previousValue = this.currentValue;
        this.currentValue = '';
        this.updateDisplay();
    }

    calculate() {
        if (!this.operation || this.previousValue === '' || this.currentValue === '') {
            return;
        }

        const prev = parseFloat(this.previousValue);
        const current = parseFloat(this.currentValue);
        let result;

        switch (this.operation) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '/':
                result = current !== 0 ? prev / current : 0;
                break;
            case '%':
                result = prev % current;
                break;
            default:
                return;
        }

        const expression = `${prev} ${this.operation} ${current} = ${result}`;
        this.addToHistory(expression);

        this.currentValue = result.toString();
        this.previousValue = '';
        this.operation = null;
        this.updateDisplay();
    }

    clear() {
        this.currentValue = '0';
        this.previousValue = '';
        this.operation = null;
        this.updateDisplay();
    }

    delete() {
        if (this.currentValue === '') return;
        
        this.currentValue = this.currentValue.toString().slice(0, -1);
        if (this.currentValue === '') {
            this.currentValue = '0';
        }
        this.updateDisplay();
    }

    updateDisplay() {
        const displayValue = this.currentValue || '0';
        this.display.textContent = displayValue;
    }

    addToHistory(expression) {
        this.history.unshift({
            expression: expression,
            timestamp: new Date().toLocaleTimeString()
        });

        if (this.history.length > 10) {
            this.history.pop();
        }

        this.saveHistory();
        this.renderHistory();
    }

    renderHistory() {
        this.historyList.innerHTML = '';
        
        if (this.history.length === 0) {
            this.historyList.innerHTML = '<p style="color: #999; padding: 10px; text-align: center;">No calculations yet</p>';
            return;
        }

        this.history.forEach((item, index) => {
            const historyItem = document.createElement('div');
            historyItem.className = 'history-item';
            historyItem.innerHTML = `
                <span class="history-expression">${item.expression}</span>
                <span class="history-time">${item.timestamp}</span>
            `;
            historyItem.addEventListener('click', () => {
                const result = item.expression.split(' = ')[1];
                this.currentValue = result;
                this.updateDisplay();
            });
            this.historyList.appendChild(historyItem);
        });
    }

    clearHistory() {
        this.history = [];
        this.saveHistory();
        this.renderHistory();
    }

    saveHistory() {
        localStorage.setItem('calculatorHistory', JSON.stringify(this.history));
    }

    loadHistory() {
        const stored = localStorage.getItem('calculatorHistory');
        return stored ? JSON.parse(stored) : [];
    }
}

const calculator = new Calculator();

// Keyboard support
document.addEventListener('keydown', (e) => {
    if (/\d/.test(e.key)) calculator.appendNumber(e.key);
    if (e.key === '.') calculator.appendNumber('.');
    if (e.key === '+') calculator.appendOperator('+');
    if (e.key === '-') calculator.appendOperator('-');
    if (e.key === '*') calculator.appendOperator('*');
    if (e.key === '/') {
        e.preventDefault();
        calculator.appendOperator('/');
    }
    if (e.key === 'Enter' || e.key === '=') calculator.calculate();
    if (e.key === 'Backspace') calculator.delete();
    if (e.key === 'Escape') calculator.clear();
});
