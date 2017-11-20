const electron = require('electron');
const path = require('path');
const fs = require('fs');
const keytar = require('keytar');
const service = "groms";

module.exports = class Storage
{
	constructor(opts)
	{
		const userDataPath = (electron.app || electron.remote.app).getPath('userData');
		this.path = path.join(userDataPath, opts.configName + '.json');
		this.data = this.parseDataFile(this.path, opts.defaults);
		keytar.setPassword(service, 'myTestAccount', 'superSecretPassword');
		keytar.findPassword()
	}

	get(key)
	{
		return this.data[key];
	}

	set(key, val)
	{
		this.data[key] = val;
		fs.writeFileSync(this.path, JSON.stringify(this.data));
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

	setPassword(account, pw)
	{
		keytar.setPassword(service, account, pw);
	}

	getPassword(account)
	{
		keytar.getPassword(service).then((pw) => {return pw}, (err) => {
			console.log(error);
			return null;
		});
	}
};