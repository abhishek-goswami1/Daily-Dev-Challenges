const input = document.getElementById('url-input');
const button = document.getElementById('shorten-btn');
const result = document.getElementById('result');

function generateCode() {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

function shortenUrl(url) {
  try {
    const parsed = new URL(url);
    return `${parsed.origin}/${generateCode()}`;
  } catch (error) {
    return null;
  }
}

button.addEventListener('click', () => {
  const url = input.value.trim();
  const shortUrl = shortenUrl(url);

  if (!shortUrl) {
    result.textContent = 'Please enter a valid URL.';
    result.style.color = '#b91c1c';
    return;
  }

  result.innerHTML = `<strong>Shortened URL:</strong> <a href="${shortUrl}" target="_blank">${shortUrl}</a>`;
  result.style.color = '#0f172a';
});
