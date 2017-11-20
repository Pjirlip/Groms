const electron = require('electron');
const Menu = electron.Menu;
const WindowManager = require('./js/lib/WindowManager.js');
const TrayMenu = require('./js/lib/TrayMenu.js');
const Shortcuts = require('./js/lib/Shortcuts.js');
const Storage = require('./js/lib/Storage.js');
const DefaultSettings = require('./assets/defaultSettings.json');

const app = electron.app;
Menu.setApplicationMenu(null);

let storage = new Storage({
	configName: 'grom_user_settings',
	defaults: DefaultSettings
});

let windowManager = new WindowManager(storage);
let trayMenu = null;
let shortcuts = null;


app.on('ready', () => {
	windowManager.createMainWindow();
	trayMenu = new TrayMenu(app, windowManager);
	shortcuts = new Shortcuts(windowManager);
	storage.set("bla", "morebla");
});


