const electron = require('electron');
const globalShortcut = electron.globalShortcut;
const app = electron.app;

module.exports = class Shortcuts
{
	constructor(windowManager)
	{
		this.windowManager = windowManager;
		this.isHidden = false;
		this.toggleVisibillity = null;
		this.toggleSize = null;
		this.registerShortcuts();
	}

	registerShortcuts()
	{
		this.toggleVisibillity = globalShortcut.register('Control+Tab', () => {
			if (this.isHidden)
			{
				this.isHidden = false;
				this.windowManager.mainWindow.show();
			}
			else
			{
				if (this.windowManager.settingsWindow)
					this.windowManager.settingsWindow.close();

				this.isHidden = true;
				this.windowManager.mainWindow.hide();
			}
		});


	}
};