const Std = require('./Std.js');

module.exports = class Service
{
	constructor()
	{
		Std.Log("[Service] added '" + this.constructor.name + "' as Service", Std.LogLevel.INFO);
	}
};