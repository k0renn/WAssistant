const { app, ipcMain, BrowserWindow, globalShortcut } = require('electron');
const { state, initPuppeteer, extractQR } = require('./Bot');
const { handleLoadQR } = require('./Handler');
const path = require('path');
const fs = require('fs')

if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1600,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  if (process.platform === 'darwin') {
    globalShortcut.register('Command+Q', () => {
        app.quit();
    })
  }

  initPuppeteer()
    .then(([browser, page]) => {
      state.browser = browser;
      state.page = page;
      return extractQR(page);
    })
    .then(qr => state.qr = qr)
    .catch(console.error)
  
  ipcMain.handle('loadQr', handleLoadQR)

  mainWindow.loadFile(path.join(__dirname, 'LoginPage/login.html'));

  // mainWindow.webContents.openDevTools();
};


app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  fs.stat('./qr.png', (err) => {
    console.log('deleting qr', err)
    if (!err) fs.unlink('./qr.png', () => null);  
  });
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.