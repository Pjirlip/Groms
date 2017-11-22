const electron = require('electron');
const path = require('path');
const fs = require('fs');
const keytar = require('keytar');
const defaultSettings = require('../../assets/defaultSettings.json');
const service = 'groms';
const Std = require('./Services/Std.js');
const configName = 'grom_user_settings';


module.exports = class Storage
{
	constructor()
	{
		const userDataPath = (electron.app || electron.remote.app).getPath('userData');
		this.path = path.join(userDataPath, configName + '.json');
		this.data = this.parseDataFile(this.path, defaultSettings);
	}

	saveData()
	{
		fs.writeFileSync(this.path, JSON.stringify(this.data));
	}

	setPassword(account, pw)
	{
		keytar.setPassword(service, account, pw);
	}

	getPassword(account)
	{
		keytar.getPassword(service).then((pw) => {return pw}, (err) => {
			console.log(error);
			Std.Log(error, Std.LogLevel.ERROR);
			return null;
		});
	}

	parseDataFile(filePath, defaults)
	{
		try
		{
			return JSON.parse(fs.readFileSync(filePath));
		} catch (error)
		{
			return defaults;
		}
	}

	resetToDefault()
	{
		this.data = defaultSettings;
		this.saveData();
	}

};