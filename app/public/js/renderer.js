// renderer.js
const { ipcRenderer } = require('electron');

ipcRenderer.on('copy-clipitem', (event, clipboardItem) => {
    // Assuming clipboardItem is the content you want to copy
    navigator.clipboard.writeText(clipboardItem)
        .then(() => console.log('Copied to clipboard'))
        .catch(err => console.error('Failed to copy text: ', err));
});


