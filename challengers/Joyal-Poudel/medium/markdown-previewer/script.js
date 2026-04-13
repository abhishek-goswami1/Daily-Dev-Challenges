// Default Template
const defaultMarkdown = `# Welcome to MarkView Pro! 🚀

This is a premium, real-time Markdown to HTML previewer.

## Features
- **Real-time formatting**: Type on the left, see on the right.
- **Syntax Highlighting**: Supports code blocks beautifully.
- **Customizable pane width**: Drag the center divider (on desktop).

### Code Example
\`\`\`javascript
function greet(name) {
    return \`Hello \${name}, welcome to Day 7!\`;
}
console.log(greet("Developer"));
\`\`\`

### Elements supported:
1. Lists (Ordered & Unordered)
2. Blockquotes
> This is a beautiful blockquote with a primary border!
3. **Bold** and *Italic* text
4. [Links to cool places](https://github.com)

Enjoy formatting your readmes!`;

document.addEventListener('DOMContentLoaded', () => {
    const editor = document.getElementById('editor');
    const preview = document.getElementById('preview');
    const clearBtn = document.getElementById('clear-btn');
    const copyBtn = document.getElementById('copy-html');
    
    // Setup Marked.js options
    marked.setOptions({
        breaks: true, // translate newlines into <br>
        gfm: true, // Github Flavored Markdown
    });

    // Initialize editor
    const savedMarkdown = localStorage.getItem('joyal_markdown_draft');
    if (savedMarkdown) {
        editor.value = savedMarkdown;
    } else {
        editor.value = defaultMarkdown;
    }
    
    updatePreview();

    // Event Listener for typing
    editor.addEventListener('input', () => {
        updatePreview();
        // optionally debounce saving to localStorage
        localStorage.setItem('joyal_markdown_draft', editor.value);
    });

    function updatePreview() {
        const markdownText = editor.value;
        const html = marked.parse(markdownText);
        preview.innerHTML = html;
    }

    // Button Actions
    clearBtn.addEventListener('click', () => {
        if(confirm('Are you sure you want to clear the editor?')) {
            editor.value = '';
            updatePreview();
            localStorage.removeItem('joyal_markdown_draft');
        }
    });

    copyBtn.addEventListener('click', () => {
        const html = marked.parse(editor.value);
        navigator.clipboard.writeText(html).then(() => {
            const icon = copyBtn.querySelector('i');
            const originalHTML = copyBtn.innerHTML;
            
            copyBtn.innerHTML = '<i class="fa-solid fa-check"></i> Copied!';
            copyBtn.classList.add('success');
            
            setTimeout(() => {
                copyBtn.innerHTML = originalHTML;
                copyBtn.classList.remove('success');
            }, 2000);
        });
    });

    // --- Resizer Logic ---
    const resizer = document.getElementById('resizer');
    const editorPane = document.querySelector('.editor-pane');
    
    let isResizing = false;

    resizer.addEventListener('mousedown', (e) => {
        isResizing = true;
        document.body.style.cursor = 'col-resize';
    });

    document.addEventListener('mousemove', (e) => {
        if (!isResizing) return;
        
        // Prevent selecting text while resizing
        document.body.style.userSelect = 'none';

        // Calculate new width
        const containerWidth = document.body.clientWidth;
        // Don't let editor pane get too small or too large
        const newWidth = Math.max(200, Math.min(e.clientX, containerWidth - 200));
        
        editorPane.style.flex = `0 0 ${newWidth}px`;
    });

    document.addEventListener('mouseup', () => {
        if (isResizing) {
            isResizing = false;
            document.body.style.cursor = 'default';
            document.body.style.userSelect = 'auto';
        }
    });
});
