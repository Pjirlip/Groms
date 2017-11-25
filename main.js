const electron = require('electron');
const Menu = electron.Menu;
const WindowManager = require('./js/lib/WindowManager.js');
const TrayMenu = require('./js/lib/TrayMenu.js');
const Shortcuts = require('./js/lib/Shortcuts.js');
const Storage = require('./js/lib/Storage.js');
const ServiceHandler = require('./js/lib/ServiceHandler.js');
const ApplicationMenu = require('./js/lib/ApplicationMenu');
const ipc = electron.ipcMain;
const Std = require('./js/lib/Services/Std.js');
const app = electron.app;
app.dock.hide();

let storage = new Storage();
storage.resetToDefault();
//console.dir(storage);

let windowManager = null;
let trayMenu = null;
let shortcuts = null;
let serviceHandler = null;
let applicationsmenu = null;

app.on('ready', () => {

	//Std.notifyOS("App is Running");
	windowManager = new WindowManager(storage);
	windowManager.createMainWindow();
	applicationsmenu = new ApplicationMenu(windowManager);
	trayMenu = new TrayMenu(app, windowManager);
	serviceHandler = new ServiceHandler(storage, windowManager);
	shortcuts = new Shortcuts(windowManager);


	ipc.on('syncshowSettings', (event, arg) => {
		event.returnValue = '';
		windowManager.createSettingsMenu();
	});


	ipc.on('setService', (event, arg) => {
		event.returnValue = '';
		switch (arg)
		{
			case ServiceHandler.SERVICE.ALLE:
				serviceHandler.activeService = ServiceHandler.SERVICE.ALLE;
				break;

			case ServiceHandler.SERVICE.IRC:
				serviceHandler.activeService = ServiceHandler.SERVICE.IRC;
				break;

			case ServiceHandler.SERVICE.DISCORD:
				serviceHandler.activeService = ServiceHandler.SERVICE.DISCORD;
				break;

			case ServiceHandler.SERVICE.TELEGRAM:
				serviceHandler.activeService = ServiceHandler.SERVICE.TELEGRAM;
				break;

			case ServiceHandler.SERVICE.WHATSAPP:
				serviceHandler.activeService = ServiceHandler.SERVICE.WHATSAPP;
				break;

			case ServiceHandler.SERVICE.FACEBOOK:
				serviceHandler.activeService = ServiceHandler.SERVICE.FACEBOOK;
				break;
		}

	});

	ipc.on('toggleWindowSize', (event, arg) =>
	{
		event.returnValue = '';
		windowManager.toggleMainSize();
	});

});

app.on('will-quit', function () {
	storage.saveData();
});


