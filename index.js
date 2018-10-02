const electron = require ('electron');
const {app, BrowserWindow, ipcMain, Menu} = electron;

const isIOS = process.platform === 'darwin';

let mainWindow;
let addWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({});
  mainWindow.loadURL(`file://${__dirname}/main.html`);
  // when main window is closed, quit the app so no child windows
  // remain open
  mainWindow.on('closed', () => app.quit());
  const mainMenu = Menu.buildFromTemplate(menuTemplate);

  Menu.setApplicationMenu(mainMenu);
});

function createAddWindow() {
  addWindow = new BrowserWindow({
    height: 200,
    width: 300,
    title: 'Add Todo'
  });
  addWindow.loadURL(`file://${__dirname}/add.html`);
}

const menuTemplate = [
  {
    label: 'File',
    submenu: [
      {
        label: 'New Todo',
        click() {
          createAddWindow();
        }
      },
      {
        label: 'Quit',
        accelerator: isIOS ? 'Command+Q' : 'Ctrl+Q',
        click() {
          app.quit();
        }
      }
    ]
  }
];

// IOS needs an empty object as the first element in the 
// menuTemplate array
if (isIOS) {
  menuTemplate.unshift({});
}
