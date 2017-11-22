const electron = require('electron');
const app = electron.app;
const Menu = electron.Menu;
const MenuItem = electron.MenuItem;




module.exports = class ApplicationMenu
{
	constructor(windowManager)
	{
		this.windowManager = windowManager;
		this.template = null;
		this.createTemplate();

		this.menu = Menu.buildFromTemplate(this.template);
		Menu.setApplicationMenu(this.menu);
	}

	createTemplate()
	{
		this.template = [
			{
				label: 'Edit',
				submenu: [
					{role: 'copy'},
					{role: 'paste'},
					{role: 'selectall'}
				]
			},
			{
				label: 'View',
				submenu: [
					{role: 'reload'},
					{role: 'forcereload'},
					{role: 'toggledevtools'},
					{type: 'separator'},
					{role: 'resetzoom'},
					{role: 'zoomin'},
					{role: 'zoomout'},
					{type: 'separator'},
					{role: 'togglefullscreen'},
					{
						label: 'ToggleSize',
						accelerator: 'Cmd+Enter',
						click: () => { this.windowManager.toggleMainSize() }
					}
				]
			},
			{
				role: 'help',
				submenu: [
					{
						label: 'Learn More',
						click() { require('electron').shell.openExternal('https://electron.atom.io') }
					}
				]
			}
		]

		if (process.platform === 'darwin')
		{
			this.template.unshift({
				label: app.getName(),
				submenu: [
					{role: 'about'},
					{type: 'separator'},
					{role: 'services', submenu: []},
					{type: 'separator'},
					{role: 'hide'},
					{role: 'hideothers'},
					{role: 'unhide'},
					{type: 'separator'},
					{role: 'quit'}
				]
			})

			// Edit menu
			this.template[1].submenu.push(
				{type: 'separator'},
				{
					label: 'Speech',
					submenu: [
						{role: 'startspeaking'},
						{role: 'stopspeaking'}
					]
				}
			)

			// Window menu
			this.template[3].submenu = [
				{role: 'close'},
				{role: 'minimize'},
				{role: 'zoom'},
				{type: 'separator'},
				{role: 'front'}
			]
		}


	}



};