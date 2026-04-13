# Day 7 - MEDIUM Task 4: Markdown to HTML Previewer

## Description
A sophisticated, modern Markdown previewer application. Features a split-pane layout with a custom resizer, allowing users to type markdown on the left and see the styled HTML output on the right instantly.

### Features
- ⚡ **Real-time Parsing**: Powered by `marked.js` for instant Github Flavored Markdown parsing.
- ↔️ **Draggable Resizer**: Custom JavaScript implementation allowing adjusting the width of the panes.
- 💾 **Local Storage**: Automatically saves your draft as you type so you don't lose work on refresh.
- 🎨 **Premium Styling**: Dark theme, custom scrollbars, and customized typography (`Fira Code` for editor, `Inter` for preview).
- 📋 **Export HTML**: One-click button to copy the raw generated HTML to the clipboard.

## Technologies Used
- HTML5
- CSS3 (Flexbox, Drag Cursor States)
- Vanilla JavaScript (DOM manipulation, LocalStorage, Mouse event tracking)
- External Library: `marked.js`
- Google Fonts

## Deployment
Launch `index.html` in an environment with internet access (to fetch the CDN scripts and fonts) to see the application in action.
