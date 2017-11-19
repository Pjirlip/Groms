const electron = require('electron');
const Menu = electron.Menu;
const Tray = electron.Tray;
const path = require('path');

module.exports = class TrayMenu
{
	constructor(app, windowManager)
	{
		this.app = app;
		this.windowManager = windowManager;
		this.tray = null;
		this.contextMenu = null;
		this.iconName = process.platform === 'win32' ? '../../assets/icons/icon.png' : '../../assets/icons/icon.png';
		this.iconPath = path.join(__dirname, this.iconName);
		this.createTray();

	}

	createTray()
	{
		this.tray = new Tray(this.iconPath);

		this.contextMenu = Menu.buildFromTemplate([
			{label: 'Einstellungen', type: 'normal', click: () => {this.windowManager.createSettingsMenu()}},
			{
				label: 'Beenden', type: 'normal', click: () => {
				if (this.windowManager.settingsWindow !== null)
				{
					//console.log(this.windowManager.settingsWindow);
					this.windowManager.settingsWindow.close();
				}
				this.app.quit()
			}
			},
		]);
		this.tray.setToolTip('Groms');
		this.tray.setContextMenu(this.contextMenu);
	}

};