const { app, BrowserWindow, ipcMain, screen } = require("electron/main");
const path = require("node:path");

let screenWidth = 0;
let screenHeight = 0;

function returnScreenSize() {
  return { width: screenWidth, height: screenHeight };
}

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
    },
  });

  ipcMain.on("set-title", (event, title) => {
    const webContents = event.sender;
    const win = BrowserWindow.fromWebContents(webContents);
    win.setTitle(title);
  });

  ipcMain.on("set-size", (event, size) => {
    win.setSize(size.width, size.height);
  });

  ipcMain.on("set-pos", (event, pos) => {
    win.setPosition(pos.left, pos.top);
  });

  win.setMenu(null);
  win.loadFile("index.html");
}

app.whenReady().then(() => {
  const primaryDisplay = screen.getPrimaryDisplay();
  const { width, height } = primaryDisplay.workAreaSize;
  screenWidth = width;
  screenHeight = height;
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
