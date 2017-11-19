const electron = require('electron');
const Menu = electron.Menu;
const WindowManager = require('./js/lib/WindowManager.js');
const TrayMenu = require('./js/lib/TrayMenu.js');
const Shortcuts = require('./js/lib/Shortcuts.js');
const globalShortcut = electron.globalShortcut;
const app = electron.app;


Menu.setApplicationMenu(null);
let windowManager = new WindowManager();
let trayMenu = null;
let shortcuts = null;

app.on('ready', () => {
	windowManager.createMainWindow();
	trayMenu = new TrayMenu(app, windowManager);
	shortcuts = new Shortcuts(windowManager);
});

/*// Quit when all windows are closed.
app.on('window-all-closed', function () {
	if (trayMenu.tray) trayMenu.tray.destroy();
	globalShortcut.unregisterAll();
});*/

/*app.on('activate', function () {
	// On OS X it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (mainWindow === null)
	{
		windowManager.createMainWindow();
	}
});*/

