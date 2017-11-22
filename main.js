const electron = require('electron');
const Menu = electron.Menu;
const WindowManager = require('./js/lib/WindowManager.js');
const TrayMenu = require('./js/lib/TrayMenu.js');
const Shortcuts = require('./js/lib/Shortcuts.js');
const Storage = require('./js/lib/Storage.js');
const ServiceHandler = require('./js/lib/ServiceHandler.js');
const ipc = electron.ipcMain;
const Std = require('./js/lib/Services/Std.js');

const app = electron.app;
Menu.setApplicationMenu(null);

let storage = new Storage();
storage.resetToDefault();
//console.dir(storage);

let windowManager = new WindowManager(storage);
let trayMenu = null;
let shortcuts = null;
let serviceHandler = null;


app.on('ready', () => {

	Std.notifyOS("App is Running");
	windowManager.createMainWindow();
	trayMenu = new TrayMenu(app, windowManager);
	shortcuts = new Shortcuts(windowManager);
	serviceHandler = new ServiceHandler(storage, windowManager);


	ipc.on('syncshowSettings', (event, arg) =>
	{
		event.returnValue = '';
		windowManager.createSettingsMenu();
	});

});

app.on('will-quit', function() {
	storage.saveData();
});


