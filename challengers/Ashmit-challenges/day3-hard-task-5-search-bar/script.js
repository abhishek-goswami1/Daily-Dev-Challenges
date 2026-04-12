class SearchBar {
    constructor() {
        this.mockData = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry', 'Fig', 'Grape', 'Honeydew'];
        this.init();
        this.setupVoiceSearch();
    }

    init() {
        // Suggestions search
        const suggestionsInput = document.querySelector('.suggestions-input');
        const suggestionsList = suggestionsInput.parentElement.querySelector('.suggestions-list');
        if (suggestionsInput) {
            suggestionsInput.addEventListener('focus', () => suggestionsList.style.display = 'block');
            suggestionsInput.addEventListener('blur', () => setTimeout(() => suggestionsList.style.display = 'none', 200));
            suggestionsInput.addEventListener('input', (e) => this.updateSuggestions(e.target, suggestionsList));
        }

        // Autocomplete search
        const autocompleteInput = document.querySelector('.autocomplete-input');
        const autocompleteList = autocompleteInput?.parentElement.querySelector('.autocomplete-list');
        if (autocompleteInput) {
            autocompleteInput.addEventListener('input', (e) => this.updateAutocomplete(e.target, autocompleteList));
        }

        // Filter buttons
        document.querySelectorAll('.filter-chip').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleFilterClick(e.target));
        });

        // Advanced search
        const advancedBtn = document.querySelector('.advanced-btn');
        const advancedOptions = document.querySelector('.advanced-options');
        if (advancedBtn) {
            advancedBtn.addEventListener('click', () => {
                advancedOptions.style.display = advancedOptions.style.display === 'none' ? 'block' : 'none';
            });
        }

        // All search inputs
        document.querySelectorAll('.search-input').forEach(input => {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.performSearch(input.value);
                }
            });
        });

        // Clear buttons
        document.querySelectorAll('.clear-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const input = e.target.previousElementSibling.previousElementSibling;
                input.value = '';
                input.focus();
            });
        });
    }

    updateSuggestions(input, suggestionsList) {
        const value = input.value.toLowerCase();
        if (!value) {
            suggestionsList.style.display = 'none';
            return;
        }

        const filtered = this.mockData.filter(item => item.toLowerCase().startsWith(value));
        suggestionsList.innerHTML = '';

        filtered.forEach(suggestion => {
            const div = document.createElement('div');
            div.className = 'suggestion-item';
            div.textContent = suggestion;
            div.addEventListener('click', () => {
                input.value = suggestion;
                this.performSearch(suggestion);
                suggestionsList.style.display = 'none';
            });
            suggestionsList.appendChild(div);
        });

        suggestionsList.style.display = filtered.length > 0 ? 'block' : 'none';
    }

    updateAutocomplete(input, autocompleteList) {
        const value = input.value.toLowerCase();
        if (!value) {
            autocompleteList.style.display = 'none';
            return;
        }

        const languages = ['JavaScript', 'Java', 'jQuery', 'Julia', 'Python', 'TypeScript', 'C++', 'C#'];
        const filtered = languages.filter(lang => lang.toLowerCase().includes(value));
        autocompleteList.innerHTML = '';

        filtered.forEach(lang => {
            const div = document.createElement('div');
            div.className = 'autocomplete-item';
            div.textContent = lang;
            div.addEventListener('click', () => {
                input.value = lang;
                this.performSearch(lang);
                autocompleteList.style.display = 'none';
            });
            autocompleteList.appendChild(div);
        });

        autocompleteList.style.display = filtered.length > 0 ? 'block' : 'none';
    }

    handleFilterClick(btn) {
        document.querySelectorAll('.filter-chip').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    }

    performSearch(query) {
        const resultsContainer = document.getElementById('resultsContainer');
        if (!query.trim()) {
            resultsContainer.innerHTML = '<p style="color: #999; text-align: center; padding: 20px;">Enter a search term</p>';
            return;
        }

        const results = [
            { title: 'Result 1: ' + query, description: 'Found a match for ' + query },
            { title: 'Result 2: ' + query, description: 'Another relevant result' },
            { title: 'Result 3: ' + query, description: 'Similar information available' }
        ];

        resultsContainer.innerHTML = results.map((result, idx) => `
            <div class="result-item">
                <h3>${result.title}</h3>
                <p>${result.description}</p>
                <a href="#">Learn more →</a>
            </div>
        `).join('');
    }

    setupVoiceSearch() {
        const voiceBtn = document.querySelector('.voice-btn');
        if (voiceBtn && 'webkitSpeechRecognition' in window) {
            const recognition = new webkitSpeechRecognition();
            voiceBtn.addEventListener('click', () => {
                voiceBtn.classList.toggle('listening');
                if (voiceBtn.classList.contains('listening')) {
                    recognition.start();
                    voiceBtn.textContent = '🎙️';
                } else {
                    recognition.stop();
                    voiceBtn.textContent = '🎤';
                }
            });

            recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                const voiceInput = voiceBtn.previousElementSibling;
                voiceInput.value = transcript;
                this.performSearch(transcript);
                voiceBtn.classList.remove('listening');
                voiceBtn.textContent = '🎤';
            };

            recognition.onerror = () => {
                voiceBtn.classList.remove('listening');
                voiceBtn.textContent = '🎤';
            };
        } else {
            voiceBtn.style.opacity = '0.5';
            voiceBtn.disabled = true;
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new SearchBar();
});
