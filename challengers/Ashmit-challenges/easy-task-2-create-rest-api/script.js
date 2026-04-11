class RestApiConsumer {
    constructor() {
        this.methodSelect = document.getElementById('method');
        this.urlInput = document.getElementById('url');
        this.headersInput = document.getElementById('headers');
        this.bodyInput = document.getElementById('body');
        this.sendBtn = document.getElementById('sendBtn');
        this.copyBtn = document.getElementById('copyBtn');
        this.responseBody = document.getElementById('responseBody');
        this.statusCode = document.getElementById('statusCode');
        this.responseTime = document.getElementById('responseTime');
        this.loading = document.getElementById('loading');
        this.exampleBtns = document.querySelectorAll('.example-btn');

        this.init();
    }

    init() {
        this.sendBtn.addEventListener('click', () => this.sendRequest());
        this.copyBtn.addEventListener('click', () => this.copyResponse());
        this.urlInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && e.ctrlKey) this.sendRequest();
        });

        this.exampleBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.urlInput.value = e.target.dataset.url;
                this.methodSelect.value = e.target.dataset.method;
                this.sendRequest();
            });
        });
    }

    async sendRequest() {
        const method = this.methodSelect.value;
        const url = this.urlInput.value.trim();

        if (!url) {
            alert('Please enter a valid URL');
            return;
        }

        this.loading.style.display = 'flex';
        this.sendBtn.disabled = true;

        try {
            const startTime = performance.now();

            const options = {
                method: method,
                headers: this.parseHeaders()
            };

            if (['POST', 'PUT'].includes(method)) {
                const body = this.bodyInput.value.trim();
                if (body) {
                    options.body = body;
                }
            }

            const response = await fetch(url, options);
            const endTime = performance.now();
            const responseTime = (endTime - startTime).toFixed(2);

            let data;
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                data = await response.json();
            } else {
                data = await response.text();
            }

            this.displayResponse(response.status, responseTime, data);
        } catch (error) {
            this.displayError(error.message);
        } finally {
            this.loading.style.display = 'none';
            this.sendBtn.disabled = false;
        }
    }

    parseHeaders() {
        const headersText = this.headersInput.value.trim();
        if (!headersText) return {};

        try {
            return JSON.parse(headersText);
        } catch (e) {
            console.warn('Invalid headers JSON:', e);
            return {};
        }
    }

    displayResponse(status, time, data) {
        this.statusCode.textContent = status;
        this.responseTime.textContent = time + 'ms';
        
        if (typeof data === 'string') {
            this.responseBody.textContent = data;
        } else {
            this.responseBody.textContent = JSON.stringify(data, null, 2);
        }

        // Add status color
        if (status >= 200 && status < 300) {
            this.statusCode.className = 'value success';
        } else if (status >= 400 && status < 500) {
            this.statusCode.className = 'value error';
        } else if (status >= 500) {
            this.statusCode.className = 'value server-error';
        } else {
            this.statusCode.className = 'value';
        }
    }

    displayError(error) {
        this.statusCode.textContent = 'ERROR';
        this.statusCode.className = 'value error';
        this.responseTime.textContent = '-';
        this.responseBody.textContent = `Error: ${error}`;
    }

    copyResponse() {
        const text = this.responseBody.textContent;
        navigator.clipboard.writeText(text).then(() => {
            const originalText = this.copyBtn.textContent;
            this.copyBtn.textContent = '✅ Copied!';
            setTimeout(() => {
                this.copyBtn.textContent = originalText;
            }, 2000);
        });
    }
}

const apiConsumer = new RestApiConsumer();
