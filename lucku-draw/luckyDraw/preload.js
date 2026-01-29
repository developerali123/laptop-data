const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('dialog', {
  // options: { type: 'none'|'info'|'error'|'question'|'warning', title, message, buttons }
  show: (options) => ipcRenderer.invoke('dialog:show', options),
});

// Printing bridge: render provided HTML in a hidden window and print
contextBridge.exposeInMainWorld('printer', {
  ticket: (html) => ipcRenderer.invoke('print:ticket', { html }),
  list: () => ipcRenderer.invoke('print:list'),
});
