const input = document.getElementById('search');
const log = document.getElementById('log');

function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

const handleTyping = debounce((event) => {
  const value = event.target.value.trim();
  const time = new Date().toLocaleTimeString();
  const message = value ? `Debounced input: "${value}" at ${time}` : `Debounced input cleared at ${time}`;
  const line = document.createElement('p');
  line.textContent = message;
  log.prepend(line);
}, 500);

input.addEventListener('input', handleTyping);
