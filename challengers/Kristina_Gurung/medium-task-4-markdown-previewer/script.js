const editor = document.getElementById('editor');
const preview = document.getElementById('preview');

function convertMarkdown(text) {
  return text
    .split('\n')
    .map(line => {
      if (/^###\s+/.test(line)) return `<h3>${line.replace(/^###\s+/, '')}</h3>`;
      if (/^##\s+/.test(line)) return `<h2>${line.replace(/^##\s+/, '')}</h2>`;
      if (/^#\s+/.test(line)) return `<h1>${line.replace(/^#\s+/, '')}</h1>`;
      if (/^\*\s+/.test(line)) return `<li>${line.replace(/^\*\s+/, '')}</li>`;
      return `<p>${line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>')}</p>`;
    })
    .join('')
    .replace(/<li>(.*?)<\/li>/g, '<ul><li>$1</li></ul>')
    .replace(/<ul><\/ul>/g, '');
}

function renderPreview() {
  preview.innerHTML = convertMarkdown(editor.value);
}

editor.addEventListener('input', renderPreview);
editor.value = '# Markdown Previewer\n\nType **bold** text, *italic* text, or use headers like #, ##, ###.\n\n* Item one\n* Item two';
renderPreview();
