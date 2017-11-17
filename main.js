const electron = require('electron');

// Module to control application life.
const app = electron.app;
//app.dock.hide();
const Menu = electron.Menu;
const Tray = electron.Tray;
let tray = null;


let settingsWindow = null;
Menu.setApplicationMenu(null);


// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;
const path = require('path');
const url = require('url');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;


function createWindow()
{
	let screenElectron = electron.screen;
	let mainScreen = screenElectron.getPrimaryDisplay();


	// Create the browser window.
	mainWindow = new BrowserWindow({
		width: mainScreen.size.width,
		height: mainScreen.size.height / 1.8,
		frame: false,
		alwaysOnTop: true,
		hasShadow: true,
		resizable: false,
		x: 0,
		y: 0,
		minimizable: false,
		maximizable: false,
		fullscreen: false
	});
	// and load the index.html of the app.
	mainWindow.loadURL(url.format({
		pathname: path.join(__dirname, 'index.html'),
		protocol: 'file:',
		slashes: true
	}));


	// Emitted when the window is closed.
	mainWindow.on('closed', function () {
		// Dereference the window object, usually you would store windows
		// in an array if your app supports multi windows, this is the time
		// when you should delete the corresponding element.
		mainWindow = null
	})
}

function createSettingsMenu()
{
	if (settingsWindow !== null)
		return;

	settingsWindow = new BrowserWindow({
		parent: mainWindow,
		modal: true,
		hasShadow: true,
		resizable: false,
		width: 800,
		height: 600
	});

	settingsWindow.loadURL(url.format({
		pathname: path.join(__dirname, 'settings.html'),
		protocol: 'file:',
		slashes: true
	}));

	settingsWindow.on('closed', function () {
		settingsWindow = null;
	})
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
	createWindow();

	const iconName = process.platform === 'win32' ? './assets/icons/icon.png' : './assets/icons/icon.png';
	const iconPath = path.join(__dirname, iconName);
	tray = new Tray(iconPath);
	const contextMenu = Menu.buildFromTemplate([
		{label: 'Einstellungen', type: 'normal', click: createSettingsMenu},
		{
			label: 'Beenden', type: 'normal', click: () => {
			if (settingsWindow !== null)
				settingsWindow.close();
			app.quit()
		}
		},
	]);
	tray.setToolTip('Electron Demo in the tray.');
	tray.setContextMenu(contextMenu);
});

// Quit when all windows are closed.
app.on('window-all-closed', function () {
	// On OS X it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if (process.platform !== 'darwin')
	{
		if (tray) tray.destroy();
		app.quit()
	}
});


app.on('activate', function () {
	// On OS X it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (mainWindow === null)
	{
		createWindow();
	}
});


// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
