const electron = require('electron');
const BrowserWindow = electron.BrowserWindow;
const url = require('url');
const path = require('path');

module.exports = class WindowManager
{
	constructor(storage)
	{
		this.mainWindow = null;
		this.settingsWindow = null;
		this.storage = storage;
		this.fullSize = false;
		this.screenWidth = electron.screen.getPrimaryDisplay().size.width;
		this.screenHeight =  electron.screen.getPrimaryDisplay().size.height;
	}

	createMainWindow()
	{
		this.mainWindow = new BrowserWindow({
			width: this.screenWidth,
			height: Math.round(this.screenHeight / 1.6),
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

		this.mainWindow.loadURL(url.format({
			pathname: path.join(__dirname, '../../html/main.html'),
			protocol: 'file:',
			slashes: true
		}));

		this.mainWindow.on('closed', () => {
			this.mainWindow = null
		})
	}

	createSettingsMenu()
	{
		if (this.settingsWindow !== null)
			return;

		this.settingsWindow = new BrowserWindow({
			parent: this.mainWindow,
			modal: false,
			hasShadow: true,
			resizable: false,
			width: 800,
			height: 600
		});

		this.settingsWindow.loadURL(url.format({
			pathname: path.join(__dirname, '../../html/settings.html'),
			protocol: 'file:',
			slashes: true
		}));

		this.settingsWindow.on('closed', () => {
			this.settingsWindow = null;
		});
	}

	toggleMainSize()
	{
		if(this.fullSize)
		{
			this.fullSize = false;
			this.mainWindow.setSize(this.screenWidth, Math.round(this.screenHeight / 1.6));
		}
		else
			{
				this.fullSize = true;
				this.mainWindow.setSize(this.screenWidth, this.screenHeight);
			}
	}

};