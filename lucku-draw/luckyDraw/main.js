const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const { spawn } = require('child_process');

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 700,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
    });

    mainWindow.loadFile(path.join(__dirname, 'renderer/index.html'));
}

// Dialog bridge
ipcMain.handle('dialog:show', async (event, options) => {
    const win = BrowserWindow.fromWebContents(event.sender) || null;
    return dialog.showMessageBox(win, Object.assign({
        type: 'info',
        title: 'Notice',
        message: '',
        buttons: ['OK']
    }, options));
});

// Print ticket to "MPOS Printer"
ipcMain.handle('print:ticket', async (event, { html }) => {
    const parent = BrowserWindow.fromWebContents(event.sender) || undefined;
    const printWin = new BrowserWindow({ parent, show: false, width: 480, height: 800 });
    return new Promise((resolve, reject) => {
        printWin.once('closed', () => resolve({ closed: true }));
        printWin.webContents.once('did-finish-load', () => {
            const TARGET = 'MPOS Printer';
            const getList = printWin.webContents.getPrintersAsync
                ? printWin.webContents.getPrintersAsync.bind(printWin.webContents)
                : () => Promise.resolve(printWin.webContents.getPrinters());

            getList().then((printers) => {
                const match = printers.find(p => (p.name === TARGET) || (p.displayName === TARGET));
                if (!match) {
                    try { printWin.close(); } catch (_) { }
                    return reject(new Error(`Printer "${TARGET}" not found`));
                }

                const opts = { silent: true, printBackground: true, deviceName: TARGET };
                printWin.webContents.print(opts, (success, failureReason) => {
                    try { printWin.close(); } catch (_) { }
                    if (!success) reject(new Error(failureReason || 'Print failed'));
                    else resolve({ success: true, device: TARGET });
                });
            }).catch(err => {
                try { printWin.close(); } catch (_) { }
                reject(err);
            });
        });
        const dataUrl = 'data:text/html;charset=utf-8,' + encodeURIComponent(html || '');
        printWin.loadURL(dataUrl).catch(err => { try { printWin.close(); } catch (_) { } reject(err); });
    });
});

// List printers
ipcMain.handle('print:list', async (event) => {
    const wc = event.sender;
    if (wc.getPrintersAsync) return await wc.getPrintersAsync();
    return wc.getPrinters();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

app.whenReady().then(() => {
    const backendPath = path.join(process.resourcesPath, 'backend', 'server.js');

    console.log('Backend Path:', backendPath);

    const backend = spawn(process.execPath, [backendPath], {
        cwd: path.dirname(backendPath),
        env: { ...process.env, PORT: 3000 }
    });

    backend.stdout.on('data', (data) => console.log(`Backend: ${data}`)); // ✅ fixed
    backend.stderr.on('data', (data) => console.error(`Backend Error: ${data}`)); // ✅ fixed

    backend.on('close', (code) => console.log(`Backend exited with code ${code}`)); // ✅ fixed

    createWindow();
});
